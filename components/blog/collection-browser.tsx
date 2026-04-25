"use client";

import { useSearchParams } from "next/navigation";
import type { ContentItem } from "@/lib/types";
import { ContentFilters } from "@/components/blog/content-filters";
import { ContentList } from "@/components/blog/content-list";
import { getContentFilterState, type SearchParams } from "@/lib/filters";

type CollectionBrowserProps = {
  collection: string;
  items: ContentItem[];
};

export function CollectionBrowser({ collection, items }: CollectionBrowserProps) {
  const searchParams = useSearchParams();
  const params: SearchParams = {
    tag: searchParams.get("tag") ?? undefined,
    category: searchParams.get("category") ?? undefined
  };
  const filtered = getContentFilterState(items, params);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8">
      <ContentList items={filtered.items} />
      <ContentFilters
        basePath={`/${collection}`}
        tags={filtered.tags}
        categories={filtered.categories}
        activeTag={filtered.tag}
        activeCategory={filtered.category}
      />
    </div>
  );
}
