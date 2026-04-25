"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { Download, FileText, FolderSearch, Languages, Search, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import type { Collection, SearchItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { collectionLabel, formatDate, languageLabel, typeLabel, uniq } from "@/lib/utils";

type SearchClientProps = {
  items: SearchItem[];
};

type SearchFilter = Collection | "all";
type LanguageFilter = string | "all";

const filters: { label: string; value: SearchFilter }[] = [
  { label: "全部", value: "all" },
  { label: "文章", value: "posts" },
  { label: "论文", value: "papers" },
  { label: "项目", value: "projects" },
  { label: "教程", value: "tutorials" }
];

export function SearchClient({ items }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState<SearchFilter>("all");
  const [language, setLanguage] = useState<LanguageFilter>("all");
  const languages = useMemo(
    () => uniq(items.map((item) => item.language).filter(Boolean) as string[]).sort((a, b) => a.localeCompare(b)),
    [items]
  );

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 0.32 },
          { name: "description", weight: 0.2 },
          { name: "tags", weight: 0.16 },
          { name: "categories", weight: 0.1 },
          { name: "downloadTypes", weight: 0.06 },
          { name: "language", weight: 0.04 },
          { name: "plainText", weight: 0.12 }
        ],
        threshold: 0.34,
        ignoreLocation: true,
        minMatchCharLength: 1
      }),
    [items]
  );

  const results = useMemo(() => {
    const base = query.trim() ? fuse.search(query.trim()).map((result) => result.item) : items;
    return base
      .filter((item) => collection === "all" || item.collection === collection)
      .filter((item) => language === "all" || item.language === language)
      .slice(0, 50);
  }, [collection, fuse, items, language, query]);

  return (
    <div>
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4">
        <label className="flex items-center gap-3 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2">
          <Search className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、摘要、标签、正文、PDF/DOCX 全文或下载资料关键词"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setCollection(filter.value)}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                collection === filter.value
                  ? "border-lab-teal bg-lab-teal text-white"
                  : "border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {languages.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLanguage("all")}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                language === "all"
                  ? "border-lab-teal bg-lab-teal text-white"
                  : "border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              全部语言
            </button>
            {languages.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setLanguage(entry)}
                className={`rounded-md border px-3 py-1.5 text-sm transition ${
                  language === entry
                    ? "border-lab-teal bg-lab-teal text-white"
                    : "border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                }`}
              >
                {languageLabel(entry)}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-[rgb(var(--muted-foreground))]">找到 {results.length} 条结果</p>
        {results.length ? (
          results.map((item) => (
            <Link
              key={`${item.collection}-${item.slug}`}
              href={item.href}
              className="block rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 transition hover:border-lab-teal"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge>{typeLabel(item.type)}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))]">
                  <FileText className="h-3.5 w-3.5" />
                  {collectionLabel(item.collection)}
                </span>
                {item.language ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-[rgb(var(--border))] px-2 py-1 text-xs text-[rgb(var(--muted-foreground))]">
                    <Languages className="h-3.5 w-3.5" />
                    {languageLabel(item.language)}
                  </span>
                ) : null}
                {item.hasAttachments ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-[rgb(var(--border))] px-2 py-1 text-xs text-[rgb(var(--muted-foreground))]">
                    <Download className="h-3.5 w-3.5" />
                    {item.downloadTypes.length ? item.downloadTypes.join(" / ") : "下载资料"}
                  </span>
                ) : null}
                {item.date ? (
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">
                    {formatDate(item.date)}
                  </span>
                ) : null}
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                {item.description || item.plainText}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[rgb(var(--muted-foreground))]">
                {item.categories.length ? (
                  <span className="inline-flex items-center gap-1">
                    <FolderSearch className="h-3.5 w-3.5" />
                    {item.categories.join(", ")}
                  </span>
                ) : null}
                {item.tags.length ? (
                  <span className="inline-flex items-center gap-1">
                    <Tags className="h-3.5 w-3.5" />
                    {item.tags.join(", ")}
                  </span>
                ) : null}
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-[rgb(var(--border))] p-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
            没有找到匹配内容。可以尝试减少关键词，或改用标签 / 分类 / 语言筛选。
          </div>
        )}
      </div>
    </div>
  );
}