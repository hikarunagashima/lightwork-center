import Link from "next/link";
import type { Article } from "@/lib/content";
import { articleKicker, getCategoryLabel, isNewArticle } from "@/lib/content";
import ArticleVisual from "./ArticleVisual";
import NewBadge from "./NewBadge";

type ArticleCardProps = {
  article: Article;
  featured?: boolean;
};

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const label = `${articleKicker(article)} / ${getCategoryLabel(article.category)}`;
  const isNew = isNewArticle(article);

  if (featured) {
    return (
      <article className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-px bg-border border-y border-border">
        <Link href={`/articles/${article.slug}`} className="block bg-background">
          <ArticleVisual article={article} variant="featured" />
        </Link>
        <div className="bg-background p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <p className="serif-en text-xs tracking-[0.35em] text-accent flex items-center gap-3">
              <span>{label}</span>
              {isNew ? <NewBadge /> : null}
            </p>
            <Link href={`/articles/${article.slug}`} className="group">
              <h2 className="serif-jp text-3xl sm:text-4xl leading-[1.5] font-light mt-6 group-hover:text-accent transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="serif-jp text-sm sm:text-base leading-[2] text-muted mt-8">
              {article.description}
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between gap-6">
            <span className="serif-en text-xs tracking-[0.25em] text-muted">
              {article.readingMinutes} MIN READ
            </span>
            <Link
              href={`/articles/${article.slug}`}
              className="serif-en text-xs tracking-[0.25em] border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              Read Article
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="block">
        <ArticleVisual article={article} variant="card" />
        <p className="serif-en text-[11px] tracking-[0.35em] text-accent mt-5 flex items-center gap-3">
          <span>{label}</span>
          {isNew ? <NewBadge /> : null}
        </p>
        <h2 className="serif-jp text-xl sm:text-2xl leading-[1.6] font-light mt-3 group-hover:text-accent transition-colors">
          {article.title}
        </h2>
        <p className="serif-jp text-sm leading-[1.95] text-muted mt-4">
          {article.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="sans-jp text-[11px] tracking-[0.12em] text-muted border border-border-soft px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
