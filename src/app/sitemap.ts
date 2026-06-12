import type { MetadataRoute } from "next";
import { CATEGORIES, getAllArticles, getAllTags } from "@/lib/content";
import { getAllVoices, getProgramsWithVoices } from "@/lib/voices";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/articles",
    "/guide",
    "/medicine-wheel",
    "/voices",
    "/about",
    "/faq",
    "/manifesto",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/category/${category.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: article.funnelStage === "MOFU" ? 0.85 : 0.75,
  }));

  // 記事が2本以上あるタグのみ登録（薄いページで評価を割らない）
  const tagRoutes: MetadataRoute.Sitemap = getAllTags()
    .filter(({ count }) => count >= 2)
    .map(({ tag }) => ({
      url: `${SITE_URL}/tag/${encodeURIComponent(tag)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  const voiceRoutes: MetadataRoute.Sitemap = getAllVoices().map((voice) => ({
    url: `${SITE_URL}/voices/${voice.slug}`,
    // frontmatter に日付が無い場合に Invalid Date でビルドを壊さない
    lastModified: voice.updatedAt ? new Date(voice.updatedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 体験談が1件以上あるプログラムのみ登録（薄いページで評価を割らない）
  const programRoutes: MetadataRoute.Sitemap = getProgramsWithVoices().map(
    (program) => ({
      url: `${SITE_URL}/voices/program/${program.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...tagRoutes,
    ...voiceRoutes,
    ...programRoutes,
  ];
}
