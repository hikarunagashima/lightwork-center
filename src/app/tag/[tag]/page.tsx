import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/media/ArticleCard";
import { getAllTags, getArticlesByTag } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

function decodeTagParam(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeTagParam(rawTag);
  const articles = getArticlesByTag(tag);

  if (articles.length === 0) {
    return {};
  }

  return {
    title: `#${tag} の記事`,
    description: `「${tag}」をめぐる記事一覧。シャーマニズム・量子意識・実践を、タグから横断して読む。`,
    alternates: {
      canonical: `/tag/${encodeURIComponent(tag)}`,
    },
    openGraph: {
      title: `#${tag} | LIGHTWORK CENTER`,
      description: `「${tag}」をめぐる記事一覧。`,
      url: absoluteUrl(`/tag/${encodeURIComponent(tag)}`),
      type: "website",
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: rawTag } = await params;
  const tag = decodeTagParam(rawTag);
  const articles = getArticlesByTag(tag);

  if (articles.length === 0) {
    notFound();
  }

  const otherTags = getAllTags()
    .filter((entry) => entry.tag !== tag)
    .slice(0, 12);

  return (
    <div>
      <section className="px-6 pt-28 pb-16 border-b border-border">
        <div className="max-w-[1180px] mx-auto">
          <nav className="serif-en text-xs tracking-[0.25em] text-muted flex gap-3">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-foreground transition-colors">
              Articles
            </Link>
            <span>/</span>
            <span className="serif-jp tracking-[0.1em]">#{tag}</span>
          </nav>
          <p className="serif-en text-xs tracking-[0.45em] text-accent mt-14">TAG</p>
          <h1 className="serif-jp text-5xl sm:text-6xl font-light leading-[1.3] mt-8">
            #{tag}
          </h1>
          <p className="serif-jp text-sm leading-[2] text-muted mt-6">
            {articles.length}本の記事
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {otherTags.length > 0 ? (
            <aside aria-label="ほかのタグ" className="mt-20 border-t border-border pt-10">
              <p className="serif-en text-xs tracking-[0.35em] text-muted">
                OTHER TAGS
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {otherTags.map((entry) => (
                  <Link
                    key={entry.tag}
                    href={`/tag/${encodeURIComponent(entry.tag)}`}
                    className="sans-jp text-xs tracking-[0.12em] text-muted border border-border-soft px-4 py-2.5 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    #{entry.tag}
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
