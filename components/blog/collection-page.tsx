import type { Collection } from "@/lib/types";
import { ContentFilters } from "@/components/blog/content-filters";
import { ContentList } from "@/components/blog/content-list";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection } from "@/lib/content";
import { getContentFilterState, type SearchParams } from "@/lib/filters";

type CollectionPageProps = {
  collection: Collection;
  eyebrow: string;
  title: string;
  description: string;
  searchParams?: SearchParams;
};

export function CollectionPage({
  collection,
  eyebrow,
  title,
  description,
  searchParams
}: CollectionPageProps) {
  const allItems = getCollection(collection);
  const filtered = getContentFilterState(allItems, searchParams);

  return (
    <Container className="py-8 sm:py-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
    </Container>
  );
}
