import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/media/ArticleCard";
import {
  CATEGORIES,
  getArticlesByCategory,
  getCategoryById,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{
    cat: string;
  }>;
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    cat: category.id,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { cat } = await params;
  const category = getCategoryById(cat);

  if (!category) {
    return {};
  }

  return {
    title: category.label,
    description: category.description,
    alternates: {
      canonical: `/category/${category.id}`,
    },
    openGraph: {
      title: `${category.label} | LIGHTWORK CENTER`,
      description: category.description,
      url: absoluteUrl(`/category/${category.id}`),
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat } = await params;
  const category = getCategoryById(cat);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.id);

  return (
    <div>
      <section className="px-6 pt-28 pb-20 border-b border-border">
        <div className="max-w-[1180px] mx-auto">
          <nav className="serif-en text-xs tracking-[0.25em] text-muted flex gap-3">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>{category.en}</span>
          </nav>
          <p className="serif-en text-xs tracking-[0.45em] text-accent mt-14">
            CURATION SHELF
          </p>
          <h1 className="serif-jp text-5xl sm:text-7xl font-light leading-[1.25] mt-8">
            {category.label}
          </h1>
          <p className="serif-jp text-base sm:text-lg leading-[2.15] text-muted max-w-2xl mt-10">
            {category.description}
          </p>
          <p className="serif-jp text-sm text-muted mt-6">{articles.length}本の記事</p>

          {/* 棚から棚への横移動（黄金律 D-1） */}
          <nav aria-label="ほかの棚へ" className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="serif-jp text-xs tracking-[0.12em] text-muted border border-border-soft px-4 py-2 hover:text-foreground hover:border-foreground transition-colors"
            >
              すべて
            </Link>
            {CATEGORIES.map((entry) =>
              entry.id === category.id ? (
                <span
                  key={entry.id}
                  aria-current="page"
                  className="serif-jp text-xs tracking-[0.12em] border border-foreground bg-foreground text-background px-4 py-2 select-none"
                >
                  {entry.label}
                </span>
              ) : (
                <Link
                  key={entry.id}
                  href={`/category/${entry.id}`}
                  className="serif-jp text-xs tracking-[0.12em] text-muted border border-border-soft px-4 py-2 hover:text-foreground hover:border-foreground transition-colors"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-[1180px] mx-auto">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-border-soft p-8 sm:p-12">
              <p className="serif-jp text-muted leading-[2]">
                この棚の記事はまだ編集中です。ネオシャーマニズム連載から順に追加していきます。
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
