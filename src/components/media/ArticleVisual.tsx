import Image from "next/image";
import type { Article, CategoryId } from "@/lib/content";
import { articleKicker, articleShelfLabel } from "@/lib/content";

// カテゴリごとに生成り×墨×金の範囲で微差をつけ、識別性とブランド統一を両立する
const TINTS: Record<CategoryId, { base: string; glow: string }> = {
  "neo-shamanism": { base: "#F1EBDD", glow: "#C8A96E" },
  "quantum-consciousness": { base: "#E8EDEE", glow: "#8FA6AC" },
  resonance: { base: "#F1E7E1", glow: "#C2907A" },
  practice: { base: "#EBEFE5", glow: "#9DAE82" },
  kotodama: { base: "#EEE8EE", glow: "#A98FB0" },
  "self-transcendence": { base: "#F2EADC", glow: "#CBA85F" },
};

// カテゴリ（テーマの棚）に属さないコンテンツ（体験談など）の色。帰還の声＝あたたかい金
const SHELFLESS_TINT = { base: "#F3ECDF", glow: "#C9A35B" };

type ArticleVisualProps = {
  article: Article;
  variant?: "card" | "featured";
};

export default function ArticleVisual({ article, variant = "card" }: ArticleVisualProps) {
  const tint = article.category
    ? (TINTS[article.category] ?? TINTS["neo-shamanism"])
    : SHELFLESS_TINT;
  // ⊙ の光の位置を volume でシードし、各記事で異なる表情にする
  const gx = 26 + ((article.volume * 17) % 50);
  const gy = 28 + ((article.volume * 13) % 38);
  const big = variant === "featured";

  // Note転用サムネがあれば画像、なければ従来の⊙生成ビジュアル。
  // サムネはNote標準の1280×670。枠をネイティブ比率に合わせ、見切れさせない。
  // 号数・タイトルは画像内に焼き込まれているため、オーバーレイは重ねない。
  if (article.thumbnail) {
    return (
      <div className="relative w-full overflow-hidden border border-border-soft aspect-[1280/670]">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          sizes={big ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          priority={big}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden flex flex-col justify-between border border-border-soft ${
        big ? "aspect-[16/11] min-h-[320px]" : "aspect-[3/2]"
      }`}
      style={{
        background: `radial-gradient(circle at ${gx}% ${gy}%, ${tint.glow}66, transparent 58%), linear-gradient(135deg, ${tint.base}, var(--color-background) 74%)`,
      }}
    >
      <div className="flex justify-end p-4 sm:p-6">
        <span
          className={`serif-en text-accent leading-none select-none ${big ? "text-6xl" : "text-4xl"}`}
          style={{ opacity: 0.72 }}
        >
          ⊙
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <p
          className={`serif-en tracking-[0.32em] text-foreground/75 ${big ? "text-sm" : "text-xs"}`}
        >
          {articleKicker(article)}
        </p>
        <p
          className={`serif-jp tracking-[0.16em] text-muted mt-1.5 ${big ? "text-sm" : "text-[11px]"}`}
        >
          {articleShelfLabel(article)}
        </p>
      </div>
    </div>
  );
}
