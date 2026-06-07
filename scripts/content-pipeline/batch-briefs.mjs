#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const backlogPath = path.join(root, "content", "topic-backlog.json");
const args = process.argv.slice(2);
const getArg = (name) => {
  const prefix = `${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
};

const medicine = getArg("--medicine") || "all";
const withDraft = args.includes("--draft");

const medicinePrefixes = {
  "ハペ": ["hape"],
  "hape": ["hape"],
  "サナンガ": ["sananga"],
  "sananga": ["sananga"],
  "カンボ": ["kambo"],
  "kambo": ["kambo"],
  "all": ["hape", "sananga", "kambo"],
};

function run(commandArgs) {
  execFileSync("node", commandArgs, {
    cwd: root,
    stdio: "inherit",
  });
}

function main() {
  if (!fs.existsSync(backlogPath)) {
    throw new Error("Missing content/topic-backlog.json");
  }

  const backlog = JSON.parse(fs.readFileSync(backlogPath, "utf8"));
  const prefixes = medicinePrefixes[medicine];
  if (!prefixes) {
    throw new Error("Unknown --medicine. Use ハペ, サナンガ, カンボ, or all.");
  }

  const topics = (backlog.topics || []).filter((topic) =>
    prefixes.some((prefix) => topic.id.startsWith(`${prefix}-`)),
  );

  if (topics.length === 0) {
    throw new Error("No matching medicine topics.");
  }

  console.log(`Creating briefs for ${topics.length} topics (${medicine})`);

  for (const topic of topics) {
    console.log(`\n=== ${topic.id} ===`);
    run(["scripts/content-pipeline/select-topic.mjs", `--topic-id=${topic.id}`]);
    run(["scripts/content-pipeline/make-brief.mjs", `--topic-id=${topic.id}`]);
    if (withDraft) {
      run(["scripts/content-pipeline/draft-article.mjs", `--topic-id=${topic.id}`, "--force"]);
      run(["scripts/content-pipeline/check-article.mjs", `content/articles/${topic.id}.md`]);
    }
  }

  console.log("\nBatch complete.");
  if (!withDraft) {
    console.log("Use --draft when you want to create content/articles/*.md draft scaffolds.");
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
