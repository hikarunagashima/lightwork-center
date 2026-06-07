#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const briefsDir = path.join(root, "content", "article-briefs");
const articlesDir = path.join(root, "content", "articles");

const getArg = (name) => {
  const prefix = `${name}=`;
  const hit = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
};

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const topicId = getArg("--topic-id");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function field(markdown, key) {
  return markdown.match(new RegExp(`^- ${key}: (.+)$`, "m"))?.[1]?.trim() || "";
}

function listSection(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return [];
  const items = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith("## ")) break;
    const item = line.match(/^-\s+(.+)$/);
    if (item) items.push(item[1].trim());
    const orderedItem = line.match(/^\d+\.\s+(.+)$/);
    if (orderedItem) items.push(orderedItem[1].trim());
  }
  return items;
}

function yamlString(value) {
  return String(value).replaceAll('"', '\\"');
}

function today() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function frontmatter(meta) {
  return `---
title: "${yamlString(meta.title)}"
slug: "${yamlString(meta.slug)}"
description: "${yamlString(meta.description)}"
category: "${yamlString(meta.category)}"
tags:
${meta.tags.map((tag) => `  - "${yamlString(tag)}"`).join("\n")}
publishedAt: "${meta.publishedAt}"
updatedAt: "${meta.updatedAt}"
funnelStage: "${meta.funnelStage}"
primaryKeyword: "${yamlString(meta.primaryKeyword)}"
status: "draft"
---
`;
}

function makeDescription(title, primaryKeyword) {
  const base = `${title}。${primaryKeyword}を、シャーマニズムの思想、光さんの一次情報、安全確認の観点から静かに整理する。`;
  return base.length > 120 ? base.slice(0, 117) + "..." : base;
}

function articleBody({ title, primaryKeyword, tags, brief }) {
  const outline = listSection(brief, "Suggested Outline");
  const sourceRefs = [...brief.matchAll(/^### (.+)$/gm)].map((match) => match[1]);

  return `
## ${title}

${primaryKeyword}という言葉を、ここでは単なる用語としてではなく、シャーマニズムの実践へ入る前に読むための地図として扱う。

この記事は、効果や治癒を約束するものではない。読む人が自分の意図と状態を確かめ、必要なら専門家や医師にも相談しながら、自分の判断を取り戻すための読み物だ。

## この記事で扱うこと

${outline.map((item) => `- ${item.replace(/^\d+\.\s*/, "")}`).join("\n")}

## 編集メモ

この下書きはCodexの自動運用パイプラインによる初稿です。公開前に、光さんの一次情報・語り口・事実関係を必ず確認してください。

## 参照した一次情報

${sourceRefs.map((ref) => `- ${ref}`).join("\n")}

## キーワード

${tags.map((tag) => `- ${tag}`).join("\n")}

## 次に進みたい人へ

もっと深く受け取りたい人は、[メディスンホイール](/medicine-wheel) を読んでください。申込を急がせるためではなく、意図、実施可否、安全確認の流れを知るためのページです。

---

※この記事はシャーマニズムの伝統的実践と個人の体験を扱う読み物であり、医療行為ではありません。診断・治療・処方は行いません。既往症のある方、服薬中の方、心身に不安がある方は、必ず医師など専門家に相談してください。
`.trimStart();
}

function main() {
  if (!topicId) {
    throw new Error("Usage: node scripts/content-pipeline/draft-article.mjs --topic-id=<id>");
  }

  const briefPath = path.join(briefsDir, `${topicId}.md`);
  if (!fs.existsSync(briefPath)) {
    throw new Error(`Missing article brief: ${path.relative(root, briefPath)}`);
  }

  const brief = read(briefPath);
  const slug = field(brief, "slug") || topicId;
  const title = field(brief, "title") || topicId;
  const primaryKeyword = field(brief, "primaryKeyword");
  const category = field(brief, "category");
  const funnelStage = field(brief, "funnelStage");
  const tags = listSection(brief, "Tags");
  const outPath = path.join(articlesDir, `${slug}.md`);

  if (fs.existsSync(outPath) && !force) {
    throw new Error(`Draft already exists: ${path.relative(root, outPath)} (use --force to overwrite)`);
  }

  const meta = {
    title,
    slug,
    description: makeDescription(title, primaryKeyword),
    category,
    tags,
    publishedAt: today(),
    updatedAt: today(),
    funnelStage,
    primaryKeyword,
  };
  const markdown = `${frontmatter(meta)}\n${articleBody({
    title,
    primaryKeyword,
    tags,
    brief,
  })}`;

  if (!dryRun) {
    ensureDir(articlesDir);
    fs.writeFileSync(outPath, markdown);
  }

  console.log(`Draft ${dryRun ? "preview" : "created"}: ${path.relative(root, outPath)}`);
  if (dryRun) {
    console.log("\n" + markdown.slice(0, 2200));
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
