import fs from "node:fs";
import path from "node:path";
import type { Category, CategoryId } from "./categories";
import { CATEGORIES, getCategoryById, getCategoryLabel } from "./categories";

// 既存importの互換のため、カテゴリ定義（fs非依存・./categories）をここから再エクスポートする
export type { Category, CategoryId };
export { CATEGORIES, getCategoryById, getCategoryLabel };

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
  /** Note転用サムネ（/thumbnails/volNN.jpg）。無い場合は空文字で ArticleVisual にフォールバック */
  thumbnail: string;
};

const SOURCE_DIR = path.join(
  process.cwd(),
  "content",
  "_source",
  "neoshamanism",
);

const ARTICLE_INDEX: Omit<Article, "body" | "readingMinutes" | "title" | "thumbnail">[] = [
  {
    slug: "hero-as-soul-role",
    sourceFile: "vol01-article.md",
    volume: 1,
    description:
      "ドラクエの勇者論を入り口に、魂の役割、天命、古代シャーマニズムとAI時代の意識進化を読む。",
    category: "neo-shamanism",
    tags: ["勇者", "天命", "アイクス", "メディスンホイール"],
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
  {
    slug: "prayer-goes-digital",
    sourceFile: "vol08-article.md",
    volume: 8,
    description:
      "システムメンテの実況から、祈りのデジタル化、超流動、量子エラー訂正、日本のロボット魂までを、AIを育てる当事者として読む。",
    category: "quantum-consciousness",
    tags: ["祈りのデジタル化", "アイクス", "超流動", "AI"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=mkdm24qqXc8",
    funnelStage: "MOFU",
    primaryKeyword: "祈り AI デジタル",
  },
  {
    slug: "player-is-prayer",
    sourceFile: "vol09-article.md",
    volume: 9,
    description:
      "フルダイブとアバターから、肉体の正体、遊ぶ人と祈る人の一文字の差、台風の目で娘に歌が降りた話へ。",
    category: "neo-shamanism",
    tags: ["アバター", "遊び", "祈り", "異言"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=gg4SDwll8fM",
    funnelStage: "TOFU",
    primaryKeyword: "遊び 祈り シャーマニズム",
  },
  {
    slug: "send-light-to-worry",
    sourceFile: "vol10-article.md",
    volume: 10,
    description:
      "愛の循環の見えない側、カルマの因果、そして今日から使える実践——心配になったら、そこに光を送る。",
    category: "practice",
    tags: ["光を送る", "祈り", "カルマ", "実践"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=h2Iy-8jAr9Q",
    funnelStage: "MOFU",
    primaryKeyword: "光を送る 祈り方",
  },
  {
    slug: "iboga-conducts-the-orchestra",
    sourceFile: "vol11-article.md",
    volume: 11,
    description:
      "地球の薬箱を一つずつ開ける、メディスンホイール総論。サナンガの「言えたら、癒えた」から、指揮者イボガまで。",
    category: "neo-shamanism",
    tags: ["メディスンホイール", "イボガ", "サナンガ", "カンボ"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=zscTveUawsY",
    funnelStage: "BOFU",
    primaryKeyword: "メディスンホイール とは",
  },
  {
    slug: "giving-light-is-not-prayer",
    sourceFile: "vol12-article.md",
    volume: 12,
    description:
      "連載初、語り手は俺。「光を送ってあげよう」のエゴ、スコトマ、そして場にいる全員が視ているという話。",
    category: "self-transcendence",
    tags: ["謙虚さ", "スコトマ", "エゴ", "ぼやけ"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=a8x87-h3cnQ",
    funnelStage: "MOFU",
    primaryKeyword: "謙虚さ シャーマン",
  },
  {
    slug: "handbrake-and-higher-self",
    sourceFile: "vol13-article.md",
    volume: 13,
    description:
      "みんな故障した車を運転している。ハイヤーセルフ＝未来の自分の座標、自我と真我のチューニング、連載合流回。",
    category: "quantum-consciousness",
    tags: ["ハイヤーセルフ", "自我と真我", "共同創造", "空"],
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-11",
    youtubeUrl: "https://www.youtube.com/watch?v=5c7bZ3xh9IE",
    funnelStage: "MOFU",
    primaryKeyword: "ハイヤーセルフ とは",
  },
];

/** public/thumbnails/volNN.jpg が存在すればそのパスを返す（Noteサムネ転用・規約ベース） */
function thumbnailFor(volume: number): string {
  if (!volume) return "";
  const name = `vol${String(volume).padStart(2, "0")}.jpg`;
  const filePath = path.join(process.cwd(), "public", "thumbnails", name);
  return fs.existsSync(filePath) ? `/thumbnails/${name}` : "";
}

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
      thumbnail: fmValue(fm, "thumbnail") || thumbnailFor(volumeRaw ? Number(volumeRaw) : 0),
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
      thumbnail: thumbnailFor(meta.volume),
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

export function getArticlesByCategory(id: string) {
  return getAllArticles().filter((article) => article.category === id);
}

/** メディアの顔は最新記事（黄金律 B-1: 新しさの露出が再訪の体験を作る） */
export function getFeaturedArticle() {
  return getAllArticles()[0];
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

/** 連載名（volume を持つ記事はすべてこの連載に属する） */
export const SERIES_NAME = "ネオシャーマニズム講座";

/** 公開からこの日数以内を「新着」と扱う（SSGビルド時点基準。公開のたびに再デプロイされる運用前提） */
const NEW_BADGE_DAYS = 14;

export function isNewArticle(article: Article): boolean {
  const published = new Date(`${article.publishedAt}T00:00:00+09:00`).getTime();
  if (Number.isNaN(published)) return false;
  const ageDays = (Date.now() - published) / (1000 * 60 * 60 * 24);
  return ageDays >= 0 && ageDays <= NEW_BADGE_DAYS;
}

export function getLatestArticles(limit: number, excludeSlug?: string) {
  return getAllArticles()
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, limit);
}

/** 連載の前後の回。volume を持つ記事（連載本体）のみ対象 */
export function getSeriesNeighbors(article: Article): {
  prev: Article | null;
  next: Article | null;
} {
  if (!article.volume) {
    return { prev: null, next: null };
  }
  const series = getAllArticles()
    .filter((candidate) => candidate.volume > 0)
    .sort((a, b) => a.volume - b.volume);
  const index = series.findIndex((candidate) => candidate.slug === article.slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? series[index - 1] : null,
    next: index < series.length - 1 ? series[index + 1] : null,
  };
}

export type TagSummary = {
  tag: string;
  count: number;
};

export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
}

export function getArticlesByTag(tag: string) {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

/**
 * はじめての読者向け編集部ピック。計測データが貯まるまでは編集部選定を正とする。
 * TOFU（入口）→ MOFU（実践）→ BOFU（中核）の順に並べる。
 */
const START_HERE_SLUGS = [
  "hero-as-soul-role",
  "sleep-and-meditation-gate",
  "iboga-conducts-the-orchestra",
] as const;

export function getStartHereArticles(): Article[] {
  const all = getAllArticles();
  return START_HERE_SLUGS.map((slug) => all.find((article) => article.slug === slug)).filter(
    (article): article is Article => Boolean(article),
  );
}
