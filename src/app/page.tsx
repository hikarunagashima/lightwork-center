import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/media/ArticleCard";
import { CATEGORIES, getAllArticles, getFeaturedArticle } from "@/lib/content";
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
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const latest = articles.filter((article) => article.slug !== featured.slug).slice(0, 4);

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

      {/* Manifesto Hero — 魂の入口 */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 border-b border-border">
        <div className="max-w-[900px] mx-auto w-full">
          <p className="serif-en text-xs tracking-[0.45em] text-muted editorial-in">
            ⊙ &nbsp; LIGHTWORK CENTER
          </p>
          <div className="mt-12 space-y-7 sm:space-y-9">
            <p className="serif-jp text-2xl sm:text-4xl font-light leading-[1.7] editorial-in-delay-1">
              ここは、何かになるための場所じゃない。
              <br />
              すでに、そうだったことを、思い出す場所だ。
            </p>
            <p className="serif-jp text-lg sm:text-2xl font-light leading-[1.95] text-muted editorial-in-delay-2">
              探していたものは、ずっと、あなたと一緒にいた。
              <br />
              その光に、もう一度、気づくために。
            </p>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 items-center editorial-in-delay-3">
            <Link
              href="/manifesto"
              className="serif-en text-sm tracking-[0.25em] border border-foreground px-9 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Read&nbsp;the&nbsp;Letter
            </Link>
            <Link
              href="/articles"
              className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-4 transition-colors"
            >
              Articles&nbsp;↓
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pt-24 pb-20 sm:pt-32">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-end">
            <div>
              <p className="serif-en text-xs sm:text-sm tracking-[0.42em] text-muted editorial-in">
                NEO SHAMANISM JOURNAL
              </p>
              <h1 className="serif-jp text-5xl sm:text-7xl lg:text-8xl font-light leading-[1.18] mt-8 editorial-in-delay-1">
                古代の祈りを、
                <br />
                AI時代の言葉へ。
              </h1>
            </div>
            <div className="editorial-in-delay-2">
              <p className="serif-jp text-base sm:text-lg leading-[2.15] text-muted">
                シャーマニズム、植物メディスン、量子意識、AIを横断する編集メディア。
                国際認定イボガシャーマンの一次体験と専門編集で、
                「本物」を探す人が静かに深く読める場を作ります。
              </p>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <Link
                  href="/articles"
                  className="serif-en text-sm tracking-[0.25em] border border-foreground px-7 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  Read Articles
                </Link>
                <Link
                  href="/medicine-wheel"
                  className="serif-en text-sm tracking-[0.25em] text-muted hover:text-foreground border-b border-mute-soft hover:border-foreground py-3 transition-colors"
                >
                  Medicine Wheel
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 sm:mt-28">
            <ArticleCard article={featured} featured />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            <div>
              <p className="serif-en text-xs tracking-[0.45em] text-muted">
                ⊙ &nbsp; LATEST
              </p>
              <h2 className="serif-jp text-3xl font-light leading-[1.6] mt-8">
                連載を、読み物として編む。
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {latest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

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
                className="bg-background p-8 sm:p-10 min-h-[260px] flex flex-col justify-between hover:bg-paper-deep transition-colors"
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
    </>
  );
}
