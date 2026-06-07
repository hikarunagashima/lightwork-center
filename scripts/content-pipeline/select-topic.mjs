#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const backlogPath = path.join(root, "content", "topic-backlog.json");
const articlesDir = path.join(root, "content", "articles");
const briefsDir = path.join(root, "content", "topic-briefs");

const allowedCategories = new Set([
  "neo-shamanism",
  "quantum-consciousness",
  "resonance",
  "practice",
  "kotodama",
  "self-transcendence",
]);

const args = new Set(process.argv.slice(2));
const getArg = (name) => {
  const prefix = `${name}=`;
  const hit = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
};

const dryRun = args.has("--dry-run");
const jsonOutput = args.has("--json");
const topicId = getArg("--topic-id");
const audience = getArg("--audience");
const stage = getArg("--stage");
const medicine = getArg("--medicine");

const medicineIdPrefixes = {
  "ハペ": "hape",
  "hape": "hape",
  "Hape": "hape",
  "サナンガ": "sananga",
  "sananga": "sananga",
  "Sananga": "sananga",
  "カンボ": "kambo",
  "kambo": "kambo",
  "Kambo": "kambo",
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listExistingArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return new Set();
  return new Set(
    fs
      .readdirSync(articlesDir)
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx?$/, "")),
  );
}

function sourceExists(ref) {
  return fs.existsSync(path.join(root, ref));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function scoreTopic(topic, existingSlugs) {
  const missingSources = (topic.sourceRefs || []).filter((ref) => !sourceExists(ref));
  const invalidCategory = !allowedCategories.has(topic.category);
  const alreadyDrafted = existingSlugs.has(topic.id);

  const medicineWheel = clamp(Number(topic.medicineWheelRelevance || 0), 0, 5) * 5;
  const primaryInfo = clamp(Number(topic.primaryInfoStrength || 0), 0, 5) * 5;
  const searchIntent = clamp(Number(topic.searchIntentStrength || 0), 0, 5) * 4;
  const riskPenalty = clamp(Number(topic.riskLevel || 0), 0, 5) * 4;
  const sourcePenalty = missingSources.length * 8;
  const categoryPenalty = invalidCategory ? 20 : 0;
  const duplicatePenalty = alreadyDrafted ? 30 : 0;

  const stageBonus =
    topic.funnelStage === "BOFU" ? 6 : topic.funnelStage === "MOFU" ? 4 : 2;
  const certaintyBonus = topic.audience === "確信層" ? 4 : 0;

  const total =
    medicineWheel +
    primaryInfo +
    searchIntent +
    stageBonus +
    certaintyBonus -
    riskPenalty -
    sourcePenalty -
    categoryPenalty -
    duplicatePenalty;

  return {
    total,
    breakdown: {
      medicineWheel,
      primaryInfo,
      searchIntent,
      stageBonus,
      certaintyBonus,
      riskPenalty,
      sourcePenalty,
      categoryPenalty,
      duplicatePenalty,
    },
    missingSources,
    invalidCategory,
    alreadyDrafted,
  };
}

function applyFilters(topics) {
  return topics.filter((topic) => {
    if (topicId && topic.id !== topicId) return false;
    if (audience && topic.audience !== audience) return false;
    if (stage && topic.funnelStage !== stage) return false;
    if (medicine) {
      const prefix = medicineIdPrefixes[medicine] || medicine;
      if (!topic.id.startsWith(`${prefix}-`)) return false;
    }
    return true;
  });
}

function toBriefMarkdown(topic, scored) {
  return `# Topic Brief: ${topic.title}

## Selection
- id: ${topic.id}
- primaryKeyword: ${topic.primaryKeyword}
- category: ${topic.category}
- funnelStage: ${topic.funnelStage}
- audience: ${topic.audience}
- score: ${scored.total}

## Intent
${topic.intent}

## Seed Keywords
${(topic.seedKeywords || []).map((keyword) => `- ${keyword}`).join("\n")}

## Tags
${(topic.tags || []).map((tag) => `- ${tag}`).join("\n")}

## Source References
${(topic.sourceRefs || []).map((ref) => `- ${ref}`).join("\n")}

## Editorial Notes
${topic.notes || ""}

## Score Breakdown
${Object.entries(scored.breakdown)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join("\n")}

## Safety Notes
- CTA is fixed to /medicine-wheel.
- Do not use iboga.jp as an application destination.
- Do not state that Hikaru personally spoke at Osaka Expo.
- Follow knowledge/compliance.md and knowledge/onboarding-principles.md.
`;
}

function main() {
  if (!fs.existsSync(backlogPath)) {
    throw new Error(`Missing topic backlog: ${path.relative(root, backlogPath)}`);
  }

  const backlog = readJson(backlogPath);
  const existingSlugs = listExistingArticleSlugs();
  const candidates = applyFilters(backlog.topics || []);

  if (candidates.length === 0) {
    throw new Error("No topic candidates matched the requested filters.");
  }

  const ranked = candidates
    .map((topic) => ({
      topic,
      scored: scoreTopic(topic, existingSlugs),
    }))
    .sort((a, b) => b.scored.total - a.scored.total);

  const selected = ranked[0];

  const result = {
    selected: {
      ...selected.topic,
      score: selected.scored.total,
      scoreBreakdown: selected.scored.breakdown,
      missingSources: selected.scored.missingSources,
      invalidCategory: selected.scored.invalidCategory,
      alreadyDrafted: selected.scored.alreadyDrafted,
    },
    ranked: ranked.map(({ topic, scored }) => ({
      id: topic.id,
      title: topic.title,
      primaryKeyword: topic.primaryKeyword,
      category: topic.category,
      funnelStage: topic.funnelStage,
      audience: topic.audience,
      score: scored.total,
    })),
  };

  if (!dryRun) {
    ensureDir(briefsDir);
    const outPath = path.join(briefsDir, `${selected.topic.id}.md`);
    fs.writeFileSync(outPath, toBriefMarkdown(selected.topic, selected.scored));
    result.briefPath = path.relative(root, outPath);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`Selected: ${selected.topic.title}`);
  console.log(`ID: ${selected.topic.id}`);
  console.log(`Primary KW: ${selected.topic.primaryKeyword}`);
  console.log(`Category: ${selected.topic.category}`);
  console.log(`Stage: ${selected.topic.funnelStage}`);
  console.log(`Score: ${selected.scored.total}`);
  if (selected.scored.missingSources.length > 0) {
    console.log(`Missing sources: ${selected.scored.missingSources.join(", ")}`);
  }
  if (result.briefPath) {
    console.log(`Brief: ${result.briefPath}`);
  }
  console.log("\nTop candidates:");
  result.ranked.slice(0, 5).forEach((item, index) => {
    console.log(`${index + 1}. ${item.id} (${item.score}) - ${item.primaryKeyword}`);
  });
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
