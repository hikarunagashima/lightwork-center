#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const target = process.argv[2];

const forbiddenAlways = [
  "依存症の克服",
  "肝機能の強靭",
  "肝機能の浄化",
  "免疫力を高める",
  "病気が治る",
  "うつが治る",
  "治る",
  "効く",
  "効果がある",
  "改善する",
  "安全です",
  "不安が消える",
  "必ず戻る",
  "必ず元に戻る",
  "可逆です",
  "斜視",
  "残席",
  "今だけ",
  "割引",
  "大阪万博2025登壇",
  "大阪万博登壇",
];

const forbiddenUnlessLore = ["地球最強の解毒剤", "最強の解毒剤", "松果体の浄化", "視力回復"];
const loreMarkers = ["伝統的", "伝統で", "伝承", "先住民", "古くから", "言い伝え", "呼ばれて", "称されて", "と言われて", "とされ"];
const allowedContext = [
  "医療行為ではありません",
  "医療行為ではなく",
  "診断・治療・処方は行いません",
  "治療効果を断定するものではありません",
  "効果や治癒を約束するものではない",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function filesToCheck() {
  if (!target) return walk(articlesDir);
  const full = path.isAbsolute(target) ? target : path.join(root, target);
  return [full];
}

const violations = [];

for (const file of filesToCheck()) {
  if (!fs.existsSync(file)) {
    violations.push({ file: path.relative(root, file), line: 0, word: "missing file", text: "" });
    continue;
  }

  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (allowedContext.some((allowed) => line.includes(allowed))) return;

    for (const word of forbiddenAlways) {
      if (line.includes(word)) {
        violations.push({ file: rel, line: index + 1, word, text: line.trim() });
      }
    }

    const hasLore = loreMarkers.some((marker) => line.includes(marker));
    for (const word of forbiddenUnlessLore) {
      if (line.includes(word) && !hasLore) {
        violations.push({
          file: rel,
          line: index + 1,
          word: `${word}（伝承マーカー無し・断定NG）`,
          text: line.trim(),
        });
      }
    }
  });
}

if (violations.length > 0) {
  console.error("Article compliance check failed:\n");
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} contains "${violation.word}"`);
    if (violation.text) console.error(`  ${violation.text}`);
  }
  process.exit(1);
}

console.log("Article compliance check passed.");
