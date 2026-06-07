#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const briefsDir = path.join(root, "content", "topic-briefs");
const outDir = path.join(root, "content", "article-briefs");

const getArg = (name) => {
  const prefix = `${name}=`;
  const hit = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
};

const dryRun = process.argv.includes("--dry-run");
const topicId = getArg("--topic-id");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extractListSection(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return [];
  const items = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith("## ")) break;
    const item = line.match(/^-\s+(.+)$/);
    if (item) items.push(item[1].trim());
  }
  return items;
}

function extractField(markdown, field) {
  const match = markdown.match(new RegExp(`^- ${field}: (.+)$`, "m"));
  return match ? match[1].trim() : "";
}

function pickSourceExcerpts(refs) {
  return refs.map((ref) => {
    const full = path.join(root, ref);
    if (!fs.existsSync(full)) {
      return { ref, excerpt: "MISSING SOURCE" };
    }

    const content = read(full);
    const headings = content
      .split(/\r?\n/)
      .filter((line) => /^#{1,3}\s+/.test(line))
      .slice(0, 12)
      .join("\n");
    const keywordHits = content
      .split(/\r?\n/)
      .filter((line) =>
        /メディスンホイール|アダムカドモン|神人合一|サナンガ|ハペ|カンボ|イボガ|天命|天職|テレパシー/.test(
          line,
        ),
      )
      .slice(0, 16)
      .join("\n");

    return {
      ref,
      excerpt: [headings, keywordHits].filter(Boolean).join("\n\n").slice(0, 5000),
    };
  });
}

function createOutline({ primaryKeyword, funnelStage }) {
  const base = [
    "導入: なぜ今このテーマを読むのか",
    `${primaryKeyword}の定義: 言葉を短く、断定しすぎず説明する`,
    "思想の骨格: 古代シャーマニズム・量子意識・AI時代の接続",
    "光さんの一次情報: 既存連載から1つ以上入れる",
    "メディスンホイールとの接続: 手続き・意図・安全確認を説明する",
    "医療ではないこと・判断を本人に返すこと",
    "CTA: /medicine-wheel へ静かに接続する",
  ];

  if (funnelStage === "BOFU") {
    base.splice(4, 0, "申込前に知っておくこと: 実施可否・法域・事前対話");
  }

  return base.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function renderBrief(topicBrief, sourceExcerpts) {
  const id = extractField(topicBrief, "id");
  const primaryKeyword = extractField(topicBrief, "primaryKeyword");
  const category = extractField(topicBrief, "category");
  const funnelStage = extractField(topicBrief, "funnelStage");
  const audience = extractField(topicBrief, "audience");
  const score = extractField(topicBrief, "score");
  const tags = extractListSection(topicBrief, "Tags");
  const seedKeywords = extractListSection(topicBrief, "Seed Keywords");
  const title = topicBrief.match(/^# Topic Brief: (.+)$/m)?.[1]?.trim() || id;

  return `# Article Brief: ${title}

## Metadata
- slug: ${id}
- title: ${title}
- primaryKeyword: ${primaryKeyword}
- category: ${category}
- funnelStage: ${funnelStage}
- audience: ${audience}
- selectionScore: ${score}
- cta: /medicine-wheel

## Keyword Cluster
${seedKeywords.map((keyword) => `- ${keyword}`).join("\n")}

## Tags
${tags.map((tag) => `- ${tag}`).join("\n")}

## Search Intent
読者は「${primaryKeyword}」を、単なる用語説明ではなく、申込前に自分の直感と安全性の両方を確認するために読む。

## Editorial Angle
「これは何か」を説明するだけで終わらせない。シャーマニズムの思想、光さんの一次情報、メディスンホイールの実践導線を、煽らず静かにつなぐ。

## Suggested Outline
${createOutline({ primaryKeyword, funnelStage })}

## Source Excerpts
${sourceExcerpts
  .map(
    ({ ref, excerpt }) => `### ${ref}

${excerpt}`,
  )
  .join("\n\n")}

## Compliance Notes
- 効果断定は禁止。治る/効く/治療/診断/改善する等を使わない。
- イボガインは日本で麻薬指定。国内施術を想起させない。
- iboga.jp は申込導線にしない。CTAは /medicine-wheel。
- 光さん本人を大阪万博登壇者として書かない。
- 逡巡層向けの恐怖診断・緊急性演出・残席/期限/割引は禁止。
- 本文にH1を書かない。MarkdownはH2から。
`;
}

function main() {
  if (!topicId) {
    throw new Error("Usage: node scripts/content-pipeline/make-brief.mjs --topic-id=<id>");
  }

  const topicBriefPath = path.join(briefsDir, `${topicId}.md`);
  if (!fs.existsSync(topicBriefPath)) {
    throw new Error(`Missing topic brief: ${path.relative(root, topicBriefPath)}`);
  }

  const topicBrief = read(topicBriefPath);
  const refs = extractListSection(topicBrief, "Source References");
  const sourceExcerpts = pickSourceExcerpts(refs);
  const articleBrief = renderBrief(topicBrief, sourceExcerpts);
  const outPath = path.join(outDir, `${topicId}.md`);

  if (!dryRun) {
    ensureDir(outDir);
    fs.writeFileSync(outPath, articleBrief);
  }

  console.log(`Article brief ${dryRun ? "preview" : "created"}: ${path.relative(root, outPath)}`);
  console.log(`Sources: ${refs.length}`);
  if (dryRun) {
    console.log("\n" + articleBrief.slice(0, 2000));
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
