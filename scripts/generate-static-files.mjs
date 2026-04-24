import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const collections = ["posts", "papers", "projects", "tutorials"];

const siteConfigText = fs.readFileSync(path.join(root, "site.config.ts"), "utf8");

function matchConfigString(key, fallback) {
  const match = siteConfigText.match(new RegExp(`${key}:\\s*(?:process\\.env\\.[A-Z0-9_]+\\s*\\?\\?\\s*)?"([^"]+)"`));
  return match?.[1] ?? fallback;
}

const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? matchConfigString("name", "Lemon Research Lab"),
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    matchConfigString("description", "一个用于科研记录、论文阅读、项目展示与资料分享的个人实验室主页。"),
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? matchConfigString("url", "https://example.com")).replace(/\/$/, ""),
  locale: matchConfigString("locale", "zh-CN")
};

function absoluteUrl(pathName = "/") {
  const suffix = pathName.startsWith("/") ? pathName : `/${pathName}`;
  return `${site.url}${suffix}`;
}

function escapeXml(input) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.map(String) : [String(value)];
}

function parseDateValue(value) {
  if (!value) return null;
  const normalized = String(value).trim();
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function byDateDesc(a, b) {
  const aTime = parseDateValue(a.date)?.getTime() ?? Number(a.year ?? 0);
  const bTime = parseDateValue(b.date)?.getTime() ?? Number(b.year ?? 0);
  return bTime - aTime;
}

function getContent() {
  return collections
    .flatMap((collection) => {
      const directory = path.join(contentRoot, collection);
      if (!fs.existsSync(directory)) return [];

      return fs
        .readdirSync(directory)
        .filter((file) => /\.(md|mdx)$/i.test(file))
        .map((file) => {
          const fullPath = path.join(directory, file);
          const parsed = matter(fs.readFileSync(fullPath, "utf8"));
          const data = parsed.data;
          const slug = path.basename(file).replace(/\.(md|mdx)$/i, "");

          return {
            collection,
            slug,
            title: String(data.title ?? slug),
            description: String(data.description ?? ""),
            date: data.date ? String(data.date) : data.year ? `${data.year}-01-01` : undefined,
            updated: data.updated ? String(data.updated) : undefined,
            tags: normalizeArray(data.tags),
            categories: normalizeArray(data.categories),
            draft: Boolean(data.draft),
            featured: Boolean(data.featured)
          };
        });
    })
    .filter((item) => !item.draft)
    .sort(byDateDesc);
}

function collectionHref(item) {
  return `/${item.collection}/${item.slug}`;
}

function writeFile(name, content) {
  fs.mkdirSync(publicRoot, { recursive: true });
  fs.writeFileSync(path.join(publicRoot, name), content, "utf8");
}

const content = getContent();
const tags = [...new Set(content.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b));
const categories = [...new Set(content.flatMap((item) => item.categories))].sort((a, b) =>
  a.localeCompare(b)
);

const staticPaths = [
  "/",
  "/posts",
  "/papers",
  "/projects",
  "/tutorials",
  "/archive",
  "/tags",
  "/categories",
  "/search",
  "/about",
  ...tags.map((tag) => `/tags/${encodeURIComponent(tag)}`),
  ...categories.map((category) => `/categories/${encodeURIComponent(category)}`),
  ...content.map(collectionHref)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map((pathName) => {
    const item = content.find((entry) => collectionHref(entry) === pathName);
    const lastmod = item?.updated ?? item?.date ?? new Date().toISOString();
    const priority = pathName === "/" ? "1.0" : item?.featured ? "0.8" : "0.7";
    const changefreq = pathName === "/" ? "weekly" : "monthly";

    return `  <url>
    <loc>${escapeXml(absoluteUrl(pathName))}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${escapeXml(site.locale)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js static export</generator>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />
${content
  .slice(0, 30)
  .map((item) => {
    const href = absoluteUrl(collectionHref(item));
    const pubDate = (parseDateValue(item.date) ?? new Date()).toUTCString();

    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(href)}</link>
      <guid>${escapeXml(href)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${item.categories.map((category) => `<category>${escapeXml(category)}</category>`).join("\n      ")}
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

writeFile("sitemap.xml", sitemap);
writeFile("rss.xml", rss);
writeFile("robots.txt", robots);

console.log(`Generated static SEO files for ${site.url}`);
