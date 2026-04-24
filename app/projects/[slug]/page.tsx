import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDetail } from "@/components/blog/content-detail";
import { getAdjacentItems, getCollection, getContentItem } from "@/lib/content";
import { createContentMetadata } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getCollection("projects").map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getContentItem("projects", params.slug);
  if (!item) return {};
  return createContentMetadata(item);
}

export default function ProjectDetailPage({ params }: PageProps) {
  const item = getContentItem("projects", params.slug);
  if (!item) notFound();
  const adjacent = getAdjacentItems("projects", params.slug);
  return <ContentDetail item={item} previous={adjacent.previous} next={adjacent.next} />;
}
