import Link from "next/link";
import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; lines: string[] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "rule" };

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = href.startsWith("http://") || href.startsWith("https://");
        nodes.push(
          isExternal ? (
            <a
              key={`${href}-${match.index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent text-foreground hover:text-accent transition-colors"
            >
              {label}
            </a>
          ) : (
            <Link
              key={`${href}-${match.index}`}
              href={href}
              className="border-b border-accent text-foreground hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ),
        );
      }
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
        current.match(/^\d+\.\s+/)
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
