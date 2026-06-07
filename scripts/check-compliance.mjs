import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const targets = [
  "src/app",
  "src/components",
  "src/lib",
  "content/_source/neoshamanism",
];

// 効果の断定 — 伝承の形でも常にNG
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
];

// 文化的・伝承的な表現 — 「伝承マーカー」を同じ行に伴う場合のみ許容
// （例: 「アマゾン先住民の伝統では地球最強の解毒剤と称されてきた」はOK／
//   「地球最強の解毒剤です」のような断定はNG）
const forbiddenUnlessLore = [
  "地球最強の解毒剤",
  "最強の解毒剤",
  "松果体の浄化",
  "視力回復",
];

// 伝承・伝統・民族誌の文脈を示すマーカー
const loreMarkers = [
  "伝統的",
  "伝統で",
  "伝承",
  "先住民",
  "古くから",
  "言い伝え",
  "呼ばれて",
  "称されて",
  "と言われて",
  "とされ",
];

const allowedContext = [
  "医療行為ではありません",
  "医療行為ではなく",
  "診断・治療・処方は行いません",
  "診断・治療・処方は行わない",
  "治療効果を断定するものではありません",
  "治る」と書かず",
  "効果や治癒を約束するものではない",
];

const allowedFiles = new Set([
  "knowledge/compliance.md",
  "knowledge/medicine-wheel.md",
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(tsx?|md|mdx)$/.test(entry.name)) return [];
    if (entry.name.endsWith(".md") && !entry.name.endsWith("-article.md")) return [];
    return [full];
  });
}

const files = targets.flatMap((target) => walk(path.join(root, target)));
const violations = [];

for (const file of files) {
  const rel = path.relative(root, file);
  if (allowedFiles.has(rel)) continue;

  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (allowedContext.some((allowed) => line.includes(allowed))) return;

    forbiddenAlways.forEach((word) => {
      if (line.includes(word)) {
        violations.push({ file: rel, line: index + 1, word, text: line.trim() });
      }
    });

    const hasLore = loreMarkers.some((marker) => line.includes(marker));
    forbiddenUnlessLore.forEach((word) => {
      if (line.includes(word) && !hasLore) {
        violations.push({
          file: rel,
          line: index + 1,
          word: `${word}（伝承マーカー無し・断定NG）`,
          text: line.trim(),
        });
      }
    });
  });
}

if (violations.length > 0) {
  console.error("Compliance check failed:\n");
  violations.forEach((violation) => {
    console.error(
      `${violation.file}:${violation.line} contains "${violation.word}"\n  ${violation.text}`,
    );
  });
  process.exit(1);
}

console.log("Compliance check passed.");
