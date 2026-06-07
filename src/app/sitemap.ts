import type { MetadataRoute } from "next";
import { CATEGORIES, getAllArticles } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/articles",
    "/medicine-wheel",
    "/about",
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

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
