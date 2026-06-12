import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ArticleCard from "@/components/media/ArticleCard";
import {
  CONTENT_TYPES,
  contentTypeIndexHref,
  getContentTypeById,
} from "@/lib/content-types";
import { getArticlesByType } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type TypePageProps = {
  params: Promise<{
    type: string;
  }>;
};

export function generateStaticParams() {
  // 体験談の一覧は /voices が正規。ここでは生成しない（二重インデックス回避）
  return CONTENT_TYPES.filter((type) => type.id !== "voice").map((type) => ({
    type: type.id,
  }));
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { type } = await params;
  const contentType = getContentTypeById(type);

  if (!contentType) {
    return {};
  }

  return {
    title: `${contentType.label}の記事一覧`,
    description: contentType.description,
    alternates: {
      canonical: `/articles/type/${contentType.id}`,
    },
    openGraph: {
      title: `${contentType.label}の記事一覧 | LIGHTWORK CENTER`,
      description: contentType.description,
      url: absoluteUrl(`/articles/type/${contentType.id}`),
      type: "website",
    },
  };
}

export default async function ArticlesByTypePage({ params }: TypePageProps) {
  const { type } = await params;
  const contentType = getContentTypeById(type);

  if (!contentType) {
    notFound();
  }

  // 体験談一覧の正規は /voices
  if (contentType.id === "voice") {
    redirect("/voices");
  }

  const articles = getArticlesByType(contentType.id);

  return (
    <div>
      <section className="px-6 pt-28 pb-16 border-b border-border">
        <div className="max-w-[1180px] mx-auto">
          <nav className="serif-en text-xs tracking-[0.25em] text-muted flex gap-3">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/articles"
              className="hover:text-foreground transition-colors"
            >
              Articles
            </Link>
            <span>/</span>
            <span>{contentType.en}</span>
          </nav>
          <p className="serif-en text-xs tracking-[0.45em] text-accent mt-14">
            ⊙ &nbsp; {contentType.en.toUpperCase()}
          </p>
          <h1 className="serif-jp text-5xl sm:text-7xl font-light leading-[1.2] mt-8">
            {contentType.label}
          </h1>
          <p className="serif-jp text-base leading-[2.15] text-muted max-w-2xl mt-10">
            {contentType.description}
          </p>
          <nav
            aria-label="種別で記事を絞り込む"
            className="mt-12 flex flex-wrap gap-x-3 gap-y-3"
          >
            <Link
              href="/articles"
              className="serif-jp text-xs tracking-[0.1em] text-muted border border-border-soft px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
            >
              すべて
            </Link>
            {CONTENT_TYPES.map((item) => (
              <Link
                key={item.id}
                href={contentTypeIndexHref(item.id)}
                aria-current={item.id === contentType.id ? "page" : undefined}
                className={`serif-jp text-xs tracking-[0.1em] border px-3 py-1.5 transition-colors ${
                  item.id === contentType.id
                    ? "border-foreground text-foreground"
                    : "border-border-soft text-muted hover:text-foreground hover:border-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-[1180px] mx-auto">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-border-soft p-8 sm:p-12 max-w-[760px]">
              <p className="serif-jp text-muted leading-[2]">
                この種別の記事は、まだ掲載準備中です。
              </p>
              <Link
                href="/articles"
                className="serif-en inline-block text-xs tracking-[0.25em] border-b border-foreground mt-8 pb-1 hover:text-accent hover:border-accent transition-colors"
              >
                Back to Articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
