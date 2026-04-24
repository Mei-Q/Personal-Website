import type { Metadata } from "next";
import { ContentList } from "@/components/blog/content-list";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllCategories, getContentByCategory } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { normalizeRouteParam } from "@/lib/utils";

type PageProps = {
  params: { category: string };
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.name }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = normalizeRouteParam(params.category);
  return createMetadata({
    title: `分类：${category}`,
    description: `查看分类 ${category} 下的所有公开内容。`,
    path: `/categories/${encodeURIComponent(category)}`
  });
}

export default function CategoryDetailPage({ params }: PageProps) {
  const category = normalizeRouteParam(params.category);
  const items = getContentByCategory(category);

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Category"
        title={category}
        description={`共 ${items.length} 篇内容。`}
      />
      <ContentList items={items} emptyText="这个分类下还没有公开内容。" />
    </Container>
  );
}
