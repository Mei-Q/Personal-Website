import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { siteConfig } from "@/site.config";
import type { ArchiveGroup, Collection, ContentItem, Heading, SearchItem } from "@/lib/types";
import { byDateDesc, formatMonth, getCollectionHref, parseDateValue, uniq } from "@/lib/utils";

export const collections: Collection[] = ["posts", "papers", "projects", "tutorials"];

const contentRoot = path.join(process.cwd(), "content");

const collectionTypeMap: Record<Collection, ContentItem["type"]> = {
  posts: "post",
  papers: "paper",
  projects: "project",
  tutorials: "tutorial"
};

function canShowDraft(draft: boolean) {
  return process.env.NODE_ENV !== "production" || !draft;
}

function getCollectionDir(collection: Collection) {
  return path.join(contentRoot, collection);
}

function getMdxFiles(collection: Collection) {
  const directory = getCollectionDir(collection);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .map((file) => path.join(directory, file));
}

function slugFromFile(filePath: string) {
  return path.basename(filePath).replace(/\.(md|mdx)$/i, "");
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~|=-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(content: string) {
  const text = stripMarkdown(content);
  const cjkCount = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinText = text.replace(/[\u3400-\u9fff]/g, " ");
  const latinWords = latinText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(cjkCount / 500 + latinWords / 220));

  return {
    text: `${minutes} 分钟阅读`,
    minutes
  };
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const text = match[2]
      .replace(/\{#.*?\}/g, "")
      .replace(/[`*_~]/g, "")
      .trim();

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length
    });
  }

  return headings;
}

function normalizeStringArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

function normalizeItem(collection: Collection, filePath: string): ContentItem {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data;
  const body = parsed.content.trim();
  const stats = estimateReadingTime(body);
  const type = (data.type as ContentItem["type"] | undefined) ?? collectionTypeMap[collection];

  return {
    slug: slugFromFile(filePath),
    collection,
    type,
    title: String(data.title ?? slugFromFile(filePath)),
    description: String(data.description ?? ""),
    date: data.date ? String(data.date) : data.year ? `${data.year}-01-01` : undefined,
    updated: data.updated ? String(data.updated) : undefined,
    tags: normalizeStringArray(data.tags),
    categories: normalizeStringArray(data.categories),
    draft: Boolean(data.draft),
    cover: data.cover ? String(data.cover) : undefined,
    body,
    plainText: stripMarkdown(body),
    readingTime: stats.text,
    readingMinutes: stats.minutes,
    headings: extractHeadings(body),
    featured: Boolean(data.featured),
    language: data.language ? String(data.language) : undefined,
    authors: normalizeStringArray(data.authors),
    venue: data.venue ? String(data.venue) : undefined,
    year: data.year ? Number(data.year) : undefined,
    doi: data.doi ? String(data.doi) : undefined,
    arxiv: data.arxiv ? String(data.arxiv) : undefined,
    status: data.status ? String(data.status) : undefined,
    techStack: normalizeStringArray(data.techStack),
    github: data.github ? String(data.github) : undefined,
    demo: data.demo ? String(data.demo) : undefined
  };
}

export function getCollection(collection: Collection) {
  return getMdxFiles(collection)
    .map((filePath) => normalizeItem(collection, filePath))
    .filter((item) => canShowDraft(item.draft))
    .sort(byDateDesc);
}

export function getAllContent() {
  return collections.flatMap((collection) => getCollection(collection)).sort(byDateDesc);
}

export function getContentItem(collection: Collection, slug: string) {
  return getCollection(collection).find((item) => item.slug === slug) ?? null;
}

export function getAdjacentItems(collection: Collection, slug: string) {
  const items = getCollection(collection);
  const index = items.findIndex((item) => item.slug === slug);

  return {
    previous: index >= 0 ? items[index + 1] ?? null : null,
    next: index >= 0 ? items[index - 1] ?? null : null
  };
}

export function getFeaturedProjects(limit = 3) {
  const projects = getCollection("projects");
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export function getRecentContent(limit = 6) {
  return getAllContent().filter((item) => item.collection !== "projects").slice(0, limit);
}

export function getRecommendedContent(current: ContentItem, limit = 3) {
  const currentTags = new Set(current.tags);
  return getAllContent()
    .filter((item) => item.slug !== current.slug || item.collection !== current.collection)
    .map((item) => ({
      item,
      score:
        item.tags.filter((tag) => currentTags.has(tag)).length * 2 +
        item.categories.filter((category) => current.categories.includes(category)).length
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.item, b.item))
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getAllTags() {
  const counts = new Map<string, number>();
  for (const item of getAllContent()) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getAllCategories() {
  const counts = new Map<string, number>();
  for (const item of getAllContent()) {
    for (const category of item.categories) counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getContentByTag(tag: string) {
  return getAllContent().filter((item) => item.tags.includes(tag)).sort(byDateDesc);
}

export function getContentByCategory(category: string) {
  return getAllContent().filter((item) => item.categories.includes(category)).sort(byDateDesc);
}

export function getArchiveGroups(): ArchiveGroup[] {
  const groups = new Map<string, Map<string, ContentItem[]>>();

  for (const item of getAllContent()) {
    if (!item.date) continue;
    const date = parseDateValue(item.date);
    if (!date) continue;
    const year = String(date.getFullYear());
    const month = formatMonth(date);

    if (!groups.has(year)) groups.set(year, new Map());
    const yearGroup = groups.get(year)!;
    yearGroup.set(month, [...(yearGroup.get(month) ?? []), item]);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries()).map(([month, items]) => ({
        month,
        items: items.sort(byDateDesc)
      }))
    }));
}

export function getSearchIndex(): SearchItem[] {
  return getAllContent().map((item) => ({
    slug: item.slug,
    collection: item.collection,
    type: item.type,
    title: item.title,
    description: item.description,
    date: item.date,
    updated: item.updated,
    tags: item.tags,
    categories: item.categories,
    plainText: item.plainText,
    readingTime: item.readingTime,
    href: getCollectionHref(item.collection, item.slug)
  }));
}

export function getAllStaticPaths() {
  const contentEntries = getAllContent().map((item) => ({
    url: new URL(getCollectionHref(item.collection, item.slug), siteConfig.url).toString(),
    lastModified: item.updated ?? item.date ?? new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: item.featured ? 0.8 : 0.6
  }));
  const tagPaths = getAllTags().map((tag) => `/tags/${encodeURIComponent(tag.name)}`);
  const categoryPaths = getAllCategories().map(
    (category) => `/categories/${encodeURIComponent(category.name)}`
  );

  const staticEntries = uniq([
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
    ...tagPaths,
    ...categoryPaths
  ]).map((pathName) => ({
    url: new URL(pathName, siteConfig.url).toString(),
    lastModified: new Date().toISOString(),
    changeFrequency: pathName === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: pathName === "/" ? 1 : 0.7
  }));

  return [...staticEntries, ...contentEntries];
}
