import type { ContentItem } from "@/lib/types";
import { uniq } from "@/lib/utils";

export type SearchParams = Record<string, string | string[] | undefined>;

export function getSearchParam(params: SearchParams | undefined, key: string) {
  const value = params?.[key];
  const firstValue = Array.isArray(value) ? value[0] : value;
  return firstValue ? decodeURIComponent(firstValue).trim() : undefined;
}

export function getContentFilterState(items: ContentItem[], searchParams?: SearchParams) {
  const tag = getSearchParam(searchParams, "tag");
  const category = getSearchParam(searchParams, "category");

  return {
    tag,
    category,
    tags: uniq(items.flatMap((item) => item.tags)).sort((a, b) => a.localeCompare(b)),
    categories: uniq(items.flatMap((item) => item.categories)).sort((a, b) =>
      a.localeCompare(b)
    ),
    items: items.filter((item) => {
      if (tag && !item.tags.includes(tag)) return false;
      if (category && !item.categories.includes(category)) return false;
      return true;
    })
  };
}
