import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDetail } from "@/components/blog/content-detail";
import { getAdjacentItems, getCollection, getContentItem } from "@/lib/content";
import { createContentMetadata } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollection("tutorials").map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getContentItem("tutorials", params.slug);
  if (!item) return {};
  return createContentMetadata(item);
}

export default function TutorialDetailPage({ params }: PageProps) {
  const item = getContentItem("tutorials", params.slug);
  if (!item) notFound();
  const adjacent = getAdjacentItems("tutorials", params.slug);
  return <ContentDetail item={item} previous={adjacent.previous} next={adjacent.next} />;
}
