import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/media/ArticleCard";
import FollowCta from "@/components/media/FollowCta";
import NewBadge from "@/components/media/NewBadge";
import {
  CATEGORIES,
  getEditorialArticles,
  getFeaturedArticle,
  getStartHereArticles,
  isNewArticle,
  articleKicker,
} from "@/lib/content";
import { SITE_DESCRIPTION, SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("NEO SHAMANISM JOURNAL")}`,
        width: 1200,
        height: 630,
        alt: "LIGHTWORK CENTER — Neo Shamanism Journal",
      },
    ],
  },
};

export default function Home() {
  // ヒーロー・LATEST は編集記事のみ（体験談は /voices と Articles 一覧で読む — 配信ポリシー）
  const articles = getEditorialArticles();
  const featured = getFeaturedArticle();
  const heroList = articles.slice(0, 3);
  const latest = articles.filter((article) => article.slug !== featured.slug).slice(0, 6);
  const startHere = getStartHereArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LIGHTWORK CENTER",
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: "LIGHTWORK CENTER",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — 世界観と最新記事を同じ視界に置く（黄金律 B-1: FVで複数記事を露出） */}
      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-24">
            <div>
              <p className="serif-en text-xs sm:text-sm tracking-[0.42em] text-muted editorial-in">
                ⊙ &nbsp; NEO SHAMANISM JOURNAL
              </p>
              <h1 className="serif-jp text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.25] mt-8 editorial-in-delay-1">
                古代の祈りを、
                <br />
                AI時代の言葉へ。
              </h1>
              <p className="serif-jp text-base sm:text-lg leading-[2.1] text-muted mt-10 editorial-in-delay-2">
                ここは、何かになるための場所じゃない。
                <br />
                すでに、そうだったことを、思い出す場所だ。
              </p>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 editorial-in-delay-3">
                <Link
                  href="/articles"
                  className="serif-en text-sm tracking-[0.25em] border border-foreground px-7 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  Read Articles
                </Link>
                <Link
                  href="/manifesto"
                  className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-3 transition-colors"
                >
                  Read the Letter
                </Link>
              </div>
            </div>

            <nav aria-label="最新の記事" className="editorial-in-delay-2">
              <p className="serif-en text-xs tracking-[0.45em] text-accent">LATEST</p>
              <ol className="mt-6 border-t border-border">
                {heroList.map((article) => (
                  <li key={article.slug} className="border-b border-border">
                    <Link
                      href={article.href}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      <span className="serif-en text-xs tracking-[0.25em] text-muted shrink-0">
                        {articleKicker(article)}
                      </span>
                      <span className="min-w-0">
                        <span className="serif-jp text-base sm:text-lg leading-[1.7] font-light group-hover:text-accent transition-colors line-clamp-2">
                          {article.title}
                        </span>
                        <span className="serif-en flex items-center gap-3 text-[10px] tracking-[0.25em] text-mute-soft mt-1.5">
                          <span>{article.readingMinutes} MIN READ</span>
                          {isNewArticle(article) ? <NewBadge /> : null}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                href="/articles"
                className="serif-en inline-block text-xs tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground mt-6 pb-1 transition-colors"
              >
                All Articles →
              </Link>
            </nav>
          </div>

          <div className="mt-16 sm:mt-24">
            <ArticleCard article={featured} featured />
          </div>
        </div>
      </section>

      {/* 新着ゾーン（黄金律 B-5: 新着・入口・棚の3ゾーン分離） */}
      <section className="px-6 py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-baseline justify-between gap-6">
            <p className="serif-en text-xs tracking-[0.45em] text-muted">
              ⊙ &nbsp; NEW ARRIVALS
            </p>
            <Link
              href="/articles"
              className="serif-en text-xs tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground pb-1 transition-colors"
            >
              All Articles
            </Link>
          </div>
          <h2 className="serif-jp text-3xl font-light leading-[1.6] mt-8">
            連載を、読み物として編む。
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* はじめての方の入口（編集部ピック） */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <div>
              <p className="serif-en text-xs tracking-[0.45em] text-muted">
                ⊙ &nbsp; START HERE
              </p>
              <h2 className="serif-jp text-3xl font-light leading-[1.6] mt-8">
                はじめての方は、
                <br />
                この三本から。
              </h2>
              <p className="serif-jp text-sm leading-[2.1] text-muted mt-8">
                入口、実践、そして中核へ。
                連載の水脈をたどる最短の三歩です。
              </p>
              <Link
                href="/guide"
                className="serif-en inline-block text-xs tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground mt-8 pb-1 transition-colors"
              >
                Reading Guide →
              </Link>
            </div>
            <ol className="border-t border-border">
              {startHere.map((article, index) => (
                <li key={article.slug} className="border-b border-border">
                  <Link
                    href={article.href}
                    className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-10 py-8 items-baseline"
                  >
                    <span className="serif-en text-2xl sm:text-3xl font-light text-mute-soft group-hover:text-accent transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="serif-jp text-xl sm:text-2xl leading-[1.6] font-light group-hover:text-accent transition-colors">
                        {article.title}
                      </span>
                      <span className="serif-jp block text-sm leading-[1.95] text-muted mt-3">
                        {article.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* カテゴリの棚 */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-[1320px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; CURATION SHELVES
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-border">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-background p-8 sm:p-10 min-h-[240px] flex flex-col justify-between hover:bg-paper-deep transition-colors"
              >
                <div>
                  <p className="serif-en text-xs tracking-[0.3em] text-accent">
                    {category.en}
                  </p>
                  <h2 className="serif-jp text-2xl font-light mt-5">
                    {category.label}
                  </h2>
                </div>
                <p className="serif-jp text-sm leading-[2] text-muted mt-10">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* プログラム導線 */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; PROGRAMME
          </p>
          <h2 className="serif-jp text-3xl sm:text-5xl font-light leading-[1.55] mt-8">
            読むだけでは終わらない人へ。
          </h2>
          <p className="serif-jp text-base leading-[2.15] text-muted mt-10">
            メディスンホイールは、記事で扱う思想を実践の場へ移すための中核プログラムです。
            医療行為ではなく、シャーマニズムの伝統的実践として、
            受け取る方の意図と状態を確認しながら進めます。
          </p>
          <Link
            href="/medicine-wheel"
            className="serif-en inline-block text-sm tracking-[0.25em] border border-foreground px-8 py-4 mt-12 hover:bg-foreground hover:text-background transition-colors"
          >
            View Medicine Wheel
          </Link>
        </div>
      </section>

      {/* 再訪導線 */}
      <section className="px-6 pb-24">
        <div className="max-w-[980px] mx-auto">
          <FollowCta />
        </div>
      </section>
    </>
  );
}
