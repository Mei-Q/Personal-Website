import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(baseUrl: string, path = "") {
  const base = baseUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

export function withBasePath(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${href}`;
}

export function parseDateValue(date?: string | number) {
  if (!date) return null;
  if (typeof date === "number") return new Date(date);

  const normalized = String(date).trim();
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDate(date?: string | number) {
  if (!date) return "";
  const value = parseDateValue(date);
  if (!value) return String(date);

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(value);
}

export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long"
  }).format(date);
}

export function uniq<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function byDateDesc<T extends { date?: string; year?: number }>(a: T, b: T) {
  const aTime = a.date ? (parseDateValue(a.date)?.getTime() ?? 0) : Number(a.year ?? 0);
  const bTime = b.date ? (parseDateValue(b.date)?.getTime() ?? 0) : Number(b.year ?? 0);
  return bTime - aTime;
}

export function getCollectionHref(collection: string, slug?: string) {
  const base = `/${collection}`;
  return slug ? `${base}/${slug}` : base;
}

export function collectionLabel(collection: string) {
  const labels: Record<string, string> = {
    posts: "文章",
    papers: "论文",
    projects: "项目",
    tutorials: "教程"
  };
  return labels[collection] ?? collection;
}

export function typeLabel(type: string) {
  const labels: Record<string, string> = {
    post: "研究文章",
    paper: "论文阅读",
    project: "科研项目",
    tutorial: "工具教程"
  };
  return labels[type] ?? type;
}

export function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function normalizeRouteParam(value: string) {
  return decodeURIComponent(value).trim();
}
