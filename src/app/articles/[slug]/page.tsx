import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/media/MarkdownContent";
import ArticleCard from "@/components/media/ArticleCard";
import ArticleVisual from "@/components/media/ArticleVisual";
import FollowCta from "@/components/media/FollowCta";
import NextReadBar from "@/components/media/NextReadBar";
import SeriesNav from "@/components/media/SeriesNav";
import ShareButtons from "@/components/media/ShareButtons";
import {
  getAllArticles,
  getArticleBySlug,
  getCategoryLabel,
  getRelatedArticles,
  getSeriesNeighbors,
} from "@/lib/content";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const ogImage = article.thumbnail || `/api/og?title=${encodeURIComponent(article.title)}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/articles/${article.slug}`),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["長島光"],
      tags: article.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);
  const { next: nextInSeries } = getSeriesNeighbors(article);
  const articleUrl = absoluteUrl(`/articles/${article.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
    inLanguage: "ja-JP",
    author: {
      "@type": "Person",
      name: "長島光",
      jobTitle: "国際認定イボガシャーマン",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    keywords: [article.primaryKeyword, ...article.tags].join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: absoluteUrl("/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLdSafe(jsonLd)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article>
        <header className="px-6 pt-24 pb-16 border-b border-border">
          <div className="max-w-[980px] mx-auto">
            <nav className="serif-en text-xs tracking-[0.25em] text-muted flex flex-wrap gap-3">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-foreground transition-colors">
                Articles
              </Link>
              <span>/</span>
              <Link
                href={`/category/${article.category}`}
                className="hover:text-foreground transition-colors"
              >
                {getCategoryLabel(article.category)}
              </Link>
            </nav>
            <p className="serif-en text-xs tracking-[0.42em] text-accent mt-14">
              NEO SHAMANISM LECTURE / VOL.
              {String(article.volume).padStart(2, "0")}
            </p>
            <h1 className="serif-jp text-4xl sm:text-6xl font-light leading-[1.45] mt-8">
              {article.title}
            </h1>
            <Link href="/about" className="group inline-block mt-7">
              <p className="serif-jp text-sm tracking-[0.1em] text-muted group-hover:text-foreground transition-colors">
                文・長島 光
                <span className="text-mute-soft"> — 国際認定イボガシャーマン</span>
              </p>
            </Link>
            <p className="serif-jp text-base leading-[2.1] text-muted mt-8 max-w-3xl">
              {article.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted">
              <span className="serif-en tracking-[0.24em]">{article.publishedAt}</span>
              <span className="text-accent" aria-hidden>⊙</span>
              <span className="serif-jp tracking-[0.1em]">{article.readingMinutes}分で読む</span>
              <span className="text-accent" aria-hidden>⊙</span>
              <a
                href={article.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="serif-en tracking-[0.24em] border-b border-mute-soft hover:text-foreground hover:border-foreground transition-colors"
              >
                SOURCE AUDIO
              </a>
            </div>
            {article.tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="sans-jp text-[11px] tracking-[0.12em] text-muted border border-border-soft px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : null}
            <div className="mt-9">
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </div>
        </header>

        <div className="px-6 pt-12 sm:pt-16">
          <div className="max-w-[980px] mx-auto">
            <ArticleVisual article={article} variant="featured" />
          </div>
        </div>

        <div className="px-6 py-16 sm:py-24">
          <div className="max-w-[760px] mx-auto">
            <MarkdownContent markdown={article.body} />

            <div className="mt-14 border-t border-border-soft pt-8">
              <ShareButtons url={articleUrl} title={article.title} />
            </div>

            <aside className="mt-12 border border-border p-6 sm:p-8 bg-paper-deep">
              <p className="serif-en text-xs tracking-[0.35em] text-muted">
                MEDICAL NOTICE
              </p>
              <p className="serif-jp text-sm leading-[2] text-muted mt-5">
                この記事はシャーマニズムの伝統的実践と個人の体験を扱う読み物であり、
                医療行為ではありません。診断・治療・処方は行いません。既往症のある方、
                服薬中の方、心身に不安がある方は、必ず医師など専門家に相談してください。
              </p>
            </aside>

            <aside className="mt-12 flex items-start gap-5 sm:gap-6 border-t border-border pt-10">
              <div
                className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-paper-deep border border-border"
                aria-hidden
              />
              <div>
                <p className="serif-en text-xs tracking-[0.35em] text-accent">
                  AUTHOR
                </p>
                <p className="serif-jp text-lg font-light mt-3">
                  長島 光 — Hikaru Nagashima
                </p>
                <p className="serif-jp text-xs tracking-[0.16em] text-muted mt-1">
                  国際認定イボガシャーマン / ライトワークセンター主宰
                </p>
                <p className="serif-jp text-sm leading-[1.95] text-muted mt-4">
                  ガボン共和国ブウィティ伝統の系譜を受け継ぎ、植物メディスンと量子意識のワークを統合する実践者。一次体験と専門編集で、古代の祈りをAI時代の言葉へ翻訳している。
                </p>
              </div>
            </aside>

            <SeriesNav article={article} />

            <aside className="mt-12 border-y border-border py-10">
              <p className="serif-en text-xs tracking-[0.35em] text-accent">
                NEXT STEP
              </p>
              <h2 className="serif-jp text-2xl sm:text-3xl font-light leading-[1.6] mt-5">
                読み物を、実践の場へ移したい人へ。
              </h2>
              <p className="serif-jp text-sm leading-[2] text-muted mt-5">
                メディスンホイールは、記事で扱う思想を個別の意図と状態に合わせて
                受け取るための中核プログラムです。効果を約束するものではなく、
                事前の対話と安全確認を前提に進めます。
              </p>
              <Link
                href="/medicine-wheel"
                className="serif-en inline-block text-xs tracking-[0.25em] border border-foreground px-6 py-3 mt-8 hover:bg-foreground hover:text-background transition-colors"
              >
                Medicine Wheel
              </Link>
            </aside>

            <div className="mt-12">
              <FollowCta />
            </div>
          </div>
        </div>
      </article>

      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-[1180px] mx-auto">
          <p className="serif-en text-xs tracking-[0.45em] text-muted">
            ⊙ &nbsp; RELATED
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>

      {nextInSeries ? (
        <NextReadBar
          href={`/articles/${nextInSeries.slug}`}
          kicker={`NEXT / VOL.${String(nextInSeries.volume).padStart(2, "0")}`}
          label={nextInSeries.title}
        />
      ) : (
        <NextReadBar
          href="/medicine-wheel"
          kicker="PROGRAMME"
          label="読み物を、実践の場へ — メディスンホイール"
        />
      )}
    </>
  );
}

function articleJsonLdSafe<T>(value: T) {
  return value;
}
