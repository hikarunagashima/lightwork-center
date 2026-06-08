import fs from "node:fs";
import path from "node:path";

export type CategoryId =
  | "neo-shamanism"
  | "quantum-consciousness"
  | "resonance"
  | "practice"
  | "kotodama"
  | "self-transcendence";

export type FunnelStage = "TOFU" | "MOFU" | "BOFU";

export type Article = {
  slug: string;
  sourceFile: string;
  volume: number;
  title: string;
  description: string;
  category: CategoryId;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  youtubeUrl: string;
  funnelStage: FunnelStage;
  primaryKeyword: string;
  body: string;
  readingMinutes: number;
};

export type Category = {
  id: CategoryId;
  label: string;
  en: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "neo-shamanism",
    label: "ネオシャーマニズム",
    en: "Neo Shamanism",
    description: "古代シャーマニズム、量子意識、AIを同じ地平で読み直す総論。",
  },
  {
    id: "quantum-consciousness",
    label: "量子意識",
    en: "Quantum Consciousness",
    description: "空、間、直感、神人合一を、意識の構造として扱う記事群。",
  },
  {
    id: "resonance",
    label: "共鳴と関係性",
    en: "Resonance",
    description: "推し活、人間関係、相性、モーフィックフィールドを読む。",
  },
  {
    id: "practice",
    label: "実践と瞑想",
    en: "Practice",
    description: "眠り、瞑想、セレモニー、日常への統合を扱う実装領域。",
  },
  {
    id: "kotodama",
    label: "言霊と声",
    en: "Kotodama",
    description: "声、タマ体系、霊主体従をめぐる光さんの核領域。",
  },
  {
    id: "self-transcendence",
    label: "自己超越",
    en: "Self Transcendence",
    description: "強さ、祈り、守る力、アダムカドモンへ向かう軸。",
  },
];

const SOURCE_DIR = path.join(
  process.cwd(),
  "content",
  "_source",
  "neoshamanism",
);

const ARTICLE_INDEX: Omit<Article, "body" | "readingMinutes" | "title">[] = [
  {
    slug: "hero-as-soul-role",
    sourceFile: "vol01-article.md",
    volume: 1,
    description:
      "ドラクエの勇者論を入り口に、魂の役割、天命、古代シャーマニズムとAI時代の意識進化を読む。",
    category: "neo-shamanism",
    tags: ["勇者", "天命", "AXXYXX", "メディスンホイール"],
    publishedAt: "2026-05-24",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=L9Tr8P9xXxY",
    funnelStage: "TOFU",
    primaryKeyword: "ネオシャーマニズムとは",
  },
  {
    slug: "ma-and-quantum-intuition",
    sourceFile: "vol02-article.md",
    volume: 2,
    description:
      "ストリートファイターの勝負の間から、空、直感、ハイヤーセルフ、多次元意識をほどく。",
    category: "quantum-consciousness",
    tags: ["間", "直感", "空", "ハイヤーセルフ"],
    publishedAt: "2026-05-25",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=udhFc5bwFRE",
    funnelStage: "TOFU",
    primaryKeyword: "直感 量子意識",
  },
  {
    slug: "oshi-and-soul-resonance",
    sourceFile: "vol03-article.md",
    volume: 3,
    description:
      "推し活に起きる魂の共鳴と、商業主義のトラップを見分ける感覚を読む。",
    category: "resonance",
    tags: ["推し活", "魂の共鳴", "モーフィックフィールド", "違和感"],
    publishedAt: "2026-05-26",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=rDmLE6CTax4",
    funnelStage: "TOFU",
    primaryKeyword: "魂の共鳴",
  },
  {
    slug: "relationship-as-browser",
    sourceFile: "vol04-article.md",
    volume: 4,
    description:
      "ポケモンのタイプ相性から、人間関係、数霊カリキュラム、メディスンホイール全体構造へ入る山場回。",
    category: "resonance",
    tags: ["相性", "数霊", "カバラ", "ライトトレーサー"],
    publishedAt: "2026-05-27",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=6XmVNJQ5NM8",
    funnelStage: "MOFU",
    primaryKeyword: "人間関係 共鳴",
  },
  {
    slug: "sleep-and-meditation-gate",
    sourceFile: "vol05-article.md",
    volume: 5,
    description:
      "睡眠BGMを入口に、眠り、無意識、瞑想、サナンガ、魂に反した生き方のサインを読む。",
    category: "practice",
    tags: ["睡眠", "瞑想", "無意識", "サナンガ"],
    publishedAt: "2026-05-28",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=IN0dAcrDIkI",
    funnelStage: "MOFU",
    primaryKeyword: "瞑想 眠り シャーマニズム",
  },
  {
    slug: "kotodama-and-voice",
    sourceFile: "vol06-article.md",
    volume: 6,
    description:
      "音声入力と魔法の比喩から、言霊、タマ体系、声に宿る力、霊主体従を読む。",
    category: "kotodama",
    tags: ["言霊", "声", "タマ体系", "霊主体従"],
    publishedAt: "2026-05-29",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=7qqKnPnlKSM",
    funnelStage: "MOFU",
    primaryKeyword: "言霊 声 シャーマニズム",
  },
  {
    slug: "strength-as-protective-prayer",
    sourceFile: "vol07-article.md",
    volume: 7,
    description:
      "北斗の拳の強さ論から、怒りではなく守る祈り、自己超越、神人合一へ向かう軸を読む。",
    category: "self-transcendence",
    tags: ["強さ", "守る祈り", "自己超越", "アダムカドモン"],
    publishedAt: "2026-05-30",
    updatedAt: "2026-06-02",
    youtubeUrl: "https://www.youtube.com/watch?v=G42NrVzXBZg",
    funnelStage: "MOFU",
    primaryKeyword: "自己超越 シャーマニズム",
  },
];

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function fmValue(frontmatter: string, key: string): string {
  const quoted = frontmatter.match(new RegExp(`^${key}:\\s*"([^"]*)"\\s*$`, "m"));
  if (quoted) return quoted[1];
  const bare = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  return bare ? bare[1].trim() : "";
}

function parseTags(frontmatter: string): string[] {
  const inline = frontmatter.match(/^tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return inline[1]
      .split(",")
      .map((t) => t.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  const block = frontmatter.match(/^tags:\s*\n((?:[ \t]*-[ \t]*.+\n?)+)/m);
  if (block) {
    return block[1]
      .split(/\n/)
      .map((l) => l.replace(/^[ \t]*-[ \t]*/, "").trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return [];
}

// content/articles/*.md（frontmatter付き）を走査。status: published のみ返す（draftは非表示）。
function readArticleFiles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const out: Article[] = [];
  for (const file of fs.readdirSync(ARTICLES_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    const fm = m[1];
    const body = m[2].trim();
    if (fmValue(fm, "status") !== "published") continue;
    const volumeRaw = fmValue(fm, "volume");
    out.push({
      slug: fmValue(fm, "slug") || file.replace(/\.md$/, ""),
      sourceFile: `articles/${file}`,
      volume: volumeRaw ? Number(volumeRaw) : 0,
      title: fmValue(fm, "title"),
      description: fmValue(fm, "description"),
      category: fmValue(fm, "category") as CategoryId,
      tags: parseTags(fm),
      publishedAt: fmValue(fm, "publishedAt"),
      updatedAt: fmValue(fm, "updatedAt") || fmValue(fm, "publishedAt"),
      youtubeUrl: fmValue(fm, "youtubeUrl"),
      funnelStage: (fmValue(fm, "funnelStage") || "TOFU") as FunnelStage,
      primaryKeyword: fmValue(fm, "primaryKeyword"),
      body,
      readingMinutes: estimateReadingMinutes(body),
    });
  }
  return out;
}

function readSource(fileName: string) {
  return fs.readFileSync(path.join(SOURCE_DIR, fileName), "utf8");
}

function splitTitleAndBody(markdown: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine?.replace(/^#\s+/, "").trim() || "Untitled";
  const body = lines
    .filter((line, index) => !(index === 0 && line.startsWith("# ")))
    .join("\n")
    .trim();

  return { title, body };
}

function estimateReadingMinutes(body: string) {
  const compact = body.replace(/\s+/g, "");
  return Math.max(3, Math.ceil(compact.length / 850));
}

export function getAllArticles(): Article[] {
  // 既存7記事（_source + ARTICLE_INDEX）。常に published 扱い。
  const indexed: Article[] = ARTICLE_INDEX.map((meta) => {
    const { title, body } = splitTitleAndBody(readSource(meta.sourceFile));
    return {
      ...meta,
      title,
      body,
      readingMinutes: estimateReadingMinutes(body),
    };
  });

  // content/articles/*.md（frontmatter・status:published のみ）をマージ。slug重複は既存優先。
  const seen = new Set(indexed.map((a) => a.slug));
  const merged = [...indexed];
  for (const article of readArticleFiles()) {
    if (!seen.has(article.slug)) {
      merged.push(article);
      seen.add(article.slug);
    }
  }

  return merged.sort((a, b) => {
    if (a.publishedAt !== b.publishedAt) {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    }
    return b.volume - a.volume;
  });
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}

export function getArticlesByCategory(id: string) {
  return getAllArticles().filter((article) => article.category === id);
}

export function getFeaturedArticle() {
  return getAllArticles().find((article) => article.volume === 5) || getAllArticles()[0];
}

export function getRelatedArticles(article: Article, limit = 3) {
  const sameCategory = getAllArticles().filter(
    (candidate) =>
      candidate.slug !== article.slug && candidate.category === article.category,
  );
  const fallback = getAllArticles().filter((candidate) => candidate.slug !== article.slug);

  return [...sameCategory, ...fallback]
    .filter(
      (candidate, index, list) =>
        list.findIndex((item) => item.slug === candidate.slug) === index,
    )
    .slice(0, limit);
}

export function getCategoryLabel(id: CategoryId) {
  return getCategoryById(id)?.label || id;
}
