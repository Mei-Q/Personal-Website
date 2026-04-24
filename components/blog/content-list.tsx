import type { ContentItem } from "@/lib/types";
import { ContentCard } from "@/components/blog/content-card";

type ContentListProps = {
  items: ContentItem[];
  emptyText?: string;
};

export function ContentList({ items, emptyText = "暂时没有内容。" }: ContentListProps) {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-[rgb(var(--border))] p-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <ContentCard key={`${item.collection}-${item.slug}`} item={item} />
      ))}
    </div>
  );
}
