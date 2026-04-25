import { Suspense } from "react";
import type { Collection } from "@/lib/types";
import { CollectionBrowser } from "@/components/blog/collection-browser";
import { ContentFilters } from "@/components/blog/content-filters";
import { ContentList } from "@/components/blog/content-list";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection } from "@/lib/content";
import { getContentFilterState } from "@/lib/filters";

type CollectionPageProps = {
  collection: Collection;
  eyebrow: string;
  title: string;
  description: string;
};

export function CollectionPage({
  collection,
  eyebrow,
  title,
  description
}: CollectionPageProps) {
  const allItems = getCollection(collection);
  const fallback = getContentFilterState(allItems);

  return (
    <Container className="py-8 sm:py-10">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <Suspense
        fallback={
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8">
            <ContentList items={fallback.items} />
            <ContentFilters
              basePath={`/${collection}`}
              tags={fallback.tags}
              categories={fallback.categories}
            />
          </div>
        }
      >
        <CollectionBrowser collection={collection} items={allItems} />
      </Suspense>
    </Container>
  );
}
