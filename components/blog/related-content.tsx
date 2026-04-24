import type { ContentItem } from "@/lib/types";
import { getRecommendedContent } from "@/lib/content";
import { ContentCard } from "@/components/blog/content-card";

type RelatedContentProps = {
  item: ContentItem;
};

export function RelatedContent({ item }: RelatedContentProps) {
  const related = getRecommendedContent(item, 3);
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-5 text-xl font-semibold">相关推荐</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {related.map((entry) => (
          <ContentCard key={`${entry.collection}-${entry.slug}`} item={entry} compact />
        ))}
      </div>
    </section>
  );
}
