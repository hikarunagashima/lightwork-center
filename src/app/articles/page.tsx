import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/media/ArticleCard";
import { CATEGORIES, getAllArticles, getAllTags } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "ネオシャーマニズム講座を中心に、シャーマニズム・量子意識・AI・植物メディスンを読み解く記事一覧。",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles | LIGHTWORK CENTER",
    description:
      "シャーマニズム・量子意識・AI・植物メディスンを読み解く記事一覧。",
    url: absoluteUrl("/articles"),
    type: "website",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const popularTags = getAllTags().slice(0, 10);

  return (
    <div>
      <section className="px-6 pt-28 pb-16">
        <div className="max-w-[1320px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; ARTICLES
          </p>
          <h1 className="serif-jp text-5xl sm:text-7xl font-light leading-[1.2] mt-8">
            読み物としての
            <br />
            ネオシャーマニズム。
          </h1>
          <p className="serif-jp text-base sm:text-lg leading-[2.15] text-muted max-w-2xl mt-12">
            現代のポップカルチャーを入り口に、
            シャーマニズム、量子意識、AI、メディスンホイールへ橋を架ける読み物です。
          </p>

          {/* 棚への横移動（黄金律 D-1: カテゴリへの常時導線） */}
          <nav aria-label="カテゴリで絞り込む" className="mt-12 flex flex-wrap gap-3">
            <span
              aria-current="page"
              className="serif-jp text-xs tracking-[0.12em] border border-foreground bg-foreground text-background px-4 py-2 select-none"
            >
              すべて
            </span>
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="serif-jp text-xs tracking-[0.12em] text-muted border border-border-soft px-4 py-2 hover:text-foreground hover:border-foreground transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {popularTags.length > 0 ? (
            <aside aria-label="タグから探す" className="mt-24 border-t border-border pt-10">
              <p className="serif-en text-xs tracking-[0.35em] text-muted">
                BROWSE BY TAG
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {popularTags.map((entry) => (
                  <Link
                    key={entry.tag}
                    href={`/tag/${encodeURIComponent(entry.tag)}`}
                    className="sans-jp text-xs tracking-[0.12em] text-muted border border-border-soft px-4 py-2 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    #{entry.tag}
                    <span className="text-mute-soft">&nbsp;{entry.count}</span>
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </div>
  );
}
