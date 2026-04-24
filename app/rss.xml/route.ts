import { siteConfig } from "@/site.config";
import { getAllContent } from "@/lib/content";
import { absoluteUrl, escapeXml, getCollectionHref, parseDateValue } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const items = getAllContent().slice(0, 30);
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js route handler</generator>
    <atom:link href="${escapeXml(absoluteUrl(siteConfig.url, "/rss.xml"))}" rel="self" type="application/rss+xml" />
    ${items
      .map((item) => {
        const href = absoluteUrl(siteConfig.url, getCollectionHref(item.collection, item.slug));
        return `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(href)}</link>
      <guid>${escapeXml(href)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${(parseDateValue(item.date) ?? new Date()).toUTCString()}</pubDate>
      ${item.categories.map((category) => `<category>${escapeXml(category)}</category>`).join("\n      ")}
    </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
