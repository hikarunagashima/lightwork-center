import Link from "next/link";
import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; lines: string[] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "youtube"; id: string; caption: string }
  | { type: "rule" };

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/,
  );
  return m ? m[1] : null;
}

function renderLink(label: string, href: string, key: number): ReactNode {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const className =
    "border-b border-accent text-foreground hover:text-accent transition-colors break-words";
  if (isExternal) {
    return (
      <a
        key={`l-${key}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }
  return (
    <Link key={`l-${key}`} href={href} className={className}>
      {label}
    </Link>
  );
}

// 太字(中にリンク可) / Markdownリンク / 生URL を処理。**[label](url)** のネストもOK。
function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-foreground">
          {parseInline(token.slice(2, -2))}
        </strong>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        nodes.push(renderLink(linkMatch[1], linkMatch[2], key++));
      } else {
        nodes.push(token);
      }
    } else {
      // 生URL → 自動ハイパーリンク
      nodes.push(renderLink(token, token, key++));
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function isTableDivider(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

// 行から YouTube リンク/URL を検出（**[label](yt)** や 生URL も拾う）
function detectYoutube(
  line: string,
): { id: string; caption: string; before: string } | null {
  const linked = line.match(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]*(?:youtube\.com|youtu\.be)[^\s)]*)\)/,
  );
  if (linked) {
    const id = youtubeId(linked[2]);
    if (id) {
      const before = line
        .slice(0, linked.index)
        .replace(/\*+$/g, "")
        .replace(/[:：]\s*$/g, "")
        .trim();
      return { id, caption: linked[1], before };
    }
  }
  const bare = line.match(
    /^\*{0,2}(https?:\/\/[^\s)]*(?:youtube\.com|youtu\.be)[^\s)]*)\*{0,2}$/,
  );
  if (bare) {
    const id = youtubeId(bare[1]);
    if (id) return { id, caption: "", before: "" };
  }
  return null;
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    // YouTube 埋め込み（動画URLは埋め込み・それ以外のURLはハイパーリンク）
    const yt = detectYoutube(line);
    if (yt) {
      if (yt.before) blocks.push({ type: "paragraph", text: yt.before });
      blocks.push({ type: "youtube", id: yt.id, caption: yt.caption });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3 | 4,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", lines: quoteLines });
      continue;
    }

    if (line.startsWith("|") && lines[index + 1] && isTableDivider(lines[index + 1])) {
      const rows: string[][] = [splitTableRow(line)];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const items: string[] = [];
      const orderedList = Boolean(ordered);
      while (index < lines.length) {
        const current = lines[index].trim();
        const item = orderedList
          ? current.match(/^\d+\.\s+(.+)$/)
          : current.match(/^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered: orderedList, items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        current === "---" ||
        current.startsWith("#") ||
        current.startsWith(">") ||
        current.startsWith("|") ||
        current.match(/^[-*]\s+/) ||
        current.match(/^\d+\.\s+/) ||
        detectYoutube(current)
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join("\n") });
  }

  return blocks;
}

export default function MarkdownContent({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="article-body serif-jp">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = block.text
            .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();
          if (block.level === 2) {
            return (
              <h2 key={index} id={id} className="scroll-mt-28">
                {parseInline(block.text)}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3 key={index} id={id} className="scroll-mt-28">
                {parseInline(block.text)}
              </h3>
            );
          }
          return (
            <h4 key={index} id={id} className="scroll-mt-28">
              {parseInline(block.text)}
            </h4>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {block.text.split("\n").map((line, lineIndex) => (
                <span key={`${index}-${lineIndex}`}>
                  {lineIndex > 0 ? <br /> : null}
                  {parseInline(line)}
                </span>
              ))}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index}>
              {block.lines.map((line, lineIndex) => (
                <p key={`${index}-${lineIndex}`}>{parseInline(line)}</p>
              ))}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={`${index}-${itemIndex}`}>{parseInline(item)}</li>
              ))}
            </List>
          );
        }

        if (block.type === "youtube") {
          return (
            <figure key={index} className="my-12">
              <div className="aspect-video w-full overflow-hidden border border-border-soft bg-paper-deep">
                <iframe
                  src={`https://www.youtube.com/embed/${block.id}`}
                  title={block.caption || "YouTube video"}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {block.caption ? (
                <figcaption className="serif-jp text-xs text-muted mt-3 text-center">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "table") {
          const [head, ...rows] = block.rows;
          return (
            <div key={index} className="my-12 overflow-x-auto border border-border-soft">
              <table>
                <thead>
                  <tr>
                    {head.map((cell, cellIndex) => (
                      <th key={`${index}-head-${cellIndex}`}>{parseInline(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${index}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${index}-cell-${rowIndex}-${cellIndex}`}>
                          {parseInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return <hr key={index} />;
      })}
    </div>
  );
}
