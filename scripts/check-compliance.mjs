import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
// md: "suffix" = -article.md のみ（_source のINDEX等メタを除外） / "all" = 全mdが検査対象
const targets = [
  { dir: "src/app", md: "all" },
  { dir: "src/components", md: "all" },
  { dir: "src/lib", md: "all" },
  { dir: "content/_source/neoshamanism", md: "suffix" },
  { dir: "content/articles", md: "all" },
  // 体験談 — 本人の記述でも媒体掲載時の表現責任は媒体側にあるため本文ごと検査する。
  // 検出された場合は機械的に書き換えず、掲載可否を光さんに確認する
  { dir: "content/voices", md: "all" },
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

// 公開記事（content/articles/）の地の文に出してはいけない固有名
// 引用ブロック（"> "行）に元々含まれる場合のみ許容（2026-06-11 光さん指示）
const forbiddenOutsideQuote = ["朝陽"];

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

function walk(dir, md) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, md);
    if (!/\.(tsx?|md|mdx)$/.test(entry.name)) return [];
    if (
      entry.name.endsWith(".md") &&
      md === "suffix" &&
      !entry.name.endsWith("-article.md")
    )
      return [];
    return [full];
  });
}

const files = targets.flatMap((target) => walk(path.join(root, target.dir), target.md));
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

    // 公開記事の地の文に固有名を出さない（引用ブロック行のみ可・2026-06-11 光さん指示）
    if (rel.startsWith("content/articles/") && !/^\s*>/.test(line)) {
      forbiddenOutsideQuote.forEach((word) => {
        if (line.includes(word)) {
          violations.push({
            file: rel,
            line: index + 1,
            word: `${word}（地の文NG・引用ブロックのみ可）`,
            text: line.trim(),
          });
        }
      });
    }
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
