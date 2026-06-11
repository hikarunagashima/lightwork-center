import Link from "next/link";
import type { Article } from "@/lib/content";
import { SERIES_NAME, getSeriesNeighbors } from "@/lib/content";

type SeriesNavProps = {
  article: Article;
};

/**
 * 連載の前後の回への導線。
 * 黄金律 A-2/C-3（連載・シリーズ構造が回遊と再訪の根幹）に基づく。
 * 読了直後に「次の回」をいちばん近い場所へ置く。
 */
export default function SeriesNav({ article }: SeriesNavProps) {
  const { prev, next } = getSeriesNeighbors(article);

  if (!prev && !next) {
    return null;
  }

  return (
    <nav aria-label={`連載 ${SERIES_NAME} の前後の回`} className="mt-12">
      <div className="flex items-baseline justify-between gap-6">
        <p className="serif-en text-xs tracking-[0.35em] text-accent">SERIES</p>
        <Link
          href="/guide"
          className="serif-jp text-xs tracking-[0.12em] text-muted border-b border-mute-soft pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
        >
          連載の歩き方へ
        </Link>
      </div>
      <p className="serif-jp text-sm text-muted mt-3">{SERIES_NAME}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
        {prev ? (
          <Link
            href={`/articles/${prev.slug}`}
            className="group bg-background p-6 sm:p-7 hover:bg-paper-deep transition-colors"
          >
            <p className="serif-en text-[11px] tracking-[0.3em] text-muted">
              ← PREV / VOL.{String(prev.volume).padStart(2, "0")}
            </p>
            <p className="serif-jp text-base leading-[1.8] mt-3 group-hover:text-accent transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="bg-background p-6 sm:p-7">
            <p className="serif-en text-[11px] tracking-[0.3em] text-mute-soft">
              FIRST EPISODE
            </p>
            <p className="serif-jp text-sm leading-[1.9] text-muted mt-3">
              ここが連載のはじまりの回です。
            </p>
          </div>
        )}

        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="group bg-background p-6 sm:p-7 hover:bg-paper-deep transition-colors sm:text-right"
          >
            <p className="serif-en text-[11px] tracking-[0.3em] text-accent">
              NEXT / VOL.{String(next.volume).padStart(2, "0")} →
            </p>
            <p className="serif-jp text-base leading-[1.8] mt-3 group-hover:text-accent transition-colors">
              {next.title}
            </p>
          </Link>
        ) : (
          <div className="bg-background p-6 sm:p-7 sm:text-right">
            <p className="serif-en text-[11px] tracking-[0.3em] text-mute-soft">
              LATEST EPISODE
            </p>
            <p className="serif-jp text-sm leading-[1.9] text-muted mt-3">
              ここが最新回。続きは、静かに準備されています。
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
