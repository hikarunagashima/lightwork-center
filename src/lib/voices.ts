import fs from "node:fs";
import path from "node:path";
import { PROGRAMS, type Program, type ProgramId } from "@/lib/programs";

export type Voice = {
  slug: string;
  /** 匿名イニシャル（例: "I."） */
  initial: string;
  age: string;
  profession: string;
  /** 受けたプログラム（複数可・programs.ts の id） */
  programs: ProgramId[];
  title: string;
  /** 一覧カード・meta description 用の抜粋 */
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  /** ⊙ 区切りのセクション（セクション＝段落の配列）。原文の構造を保持する */
  sections: string[][];
  readingMinutes: number;
};

const VOICES_DIR = path.join(process.cwd(), "content", "voices");

function fmValue(frontmatter: string, key: string): string {
  const quoted = frontmatter.match(new RegExp(`^${key}:\\s*"([^"]*)"\\s*$`, "m"));
  if (quoted) return quoted[1];
  const bare = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  return bare ? bare[1].trim() : "";
}

function parsePrograms(frontmatter: string): ProgramId[] {
  const inline = frontmatter.match(/^programs:\s*\[(.*)\]\s*$/m);
  if (!inline) return [];
  const known = new Set(PROGRAMS.map((p) => p.id));
  return inline[1]
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter((t): t is ProgramId => known.has(t as ProgramId));
}

/** 本文を「--- でセクション、空行で段落」の二層構造に分解する */
function parseSections(body: string): string[][] {
  return body
    .split(/\n---\n/)
    .map((section) =>
      section
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s*\n\s*/g, "").trim())
        // 本文冒頭などに残った区切り記号そのものを段落として混入させない
        .filter((p) => p && p !== "---"),
    )
    .filter((section) => section.length > 0);
}

function estimateReadingMinutes(sections: string[][]): number {
  const length = sections.flat().join("").replace(/\s+/g, "").length;
  return Math.max(2, Math.ceil(length / 850));
}

// content/voices/*.md（frontmatter付き）を走査。status: published のみ返す（draftは非表示）。
export function getAllVoices(): Voice[] {
  if (!fs.existsSync(VOICES_DIR)) return [];
  const out: Voice[] = [];
  for (const file of fs.readdirSync(VOICES_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(VOICES_DIR, file), "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    const fm = m[1];
    if (fmValue(fm, "status") !== "published") continue;
    const sections = parseSections(m[2].trim());
    out.push({
      slug: fmValue(fm, "slug") || file.replace(/\.md$/, ""),
      initial: fmValue(fm, "initial"),
      age: fmValue(fm, "age"),
      profession: fmValue(fm, "profession"),
      programs: parsePrograms(fm),
      title: fmValue(fm, "title"),
      excerpt: fmValue(fm, "excerpt"),
      publishedAt: fmValue(fm, "publishedAt"),
      updatedAt: fmValue(fm, "updatedAt") || fmValue(fm, "publishedAt"),
      sections,
      readingMinutes: estimateReadingMinutes(sections),
    });
  }
  return out.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getVoiceBySlug(slug: string): Voice | undefined {
  return getAllVoices().find((voice) => voice.slug === slug);
}

export function getVoicesByProgram(id: ProgramId): Voice[] {
  return getAllVoices().filter((voice) => voice.programs.includes(id));
}

/** 体験談が1件以上存在するプログラムのみ（フィルタナビ・静的生成用）。取得済みの voices があれば渡して再読込を避ける */
export function getProgramsWithVoices(voices: Voice[] = getAllVoices()): Program[] {
  const used = new Set(voices.flatMap((voice) => voice.programs));
  return PROGRAMS.filter((program) => used.has(program.id));
}
