import type { Metadata } from "next";
import ArticleCard from "@/components/media/ArticleCard";
import { getAllArticles } from "@/lib/content";
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

  return (
    <div>
      <section className="px-6 pt-28 pb-20">
        <div className="max-w-[1180px] mx-auto">
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
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
