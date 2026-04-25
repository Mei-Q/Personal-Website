import type { Metadata } from "next";
import { ContentList } from "@/components/blog/content-list";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllTags, getContentByTag } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { normalizeRouteParam } from "@/lib/utils";

type PageProps = {
  params: { tag: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tag = normalizeRouteParam(params.tag);
  return createMetadata({
    title: `标签：${tag}`,
    description: `查看标签 ${tag} 下的所有公开内容。`,
    path: `/tags/${encodeURIComponent(tag)}`
  });
}

export default function TagDetailPage({ params }: PageProps) {
  const tag = normalizeRouteParam(params.tag);
  const items = getContentByTag(tag);

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Tag"
        title={`#${tag}`}
        description={`共 ${items.length} 篇内容。`}
      />
      <ContentList items={items} emptyText="这个标签下还没有公开内容。" />
    </Container>
  );
}
