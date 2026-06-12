import { getEditorialArticles } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  // 体験談はRSSに流さない（フィードは編集記事の更新チャネル — 配信ポリシー）
  const articles = getEditorialArticles();
  const items = articles
    .map((article) => {
      const url = absoluteUrl(article.href);
      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${escapeXml(article.description)}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(SITE_TITLE)}</title>
        <link>${SITE_URL}</link>
        <description>${escapeXml(SITE_DESCRIPTION)}</description>
        <language>ja</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
