import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllCategories } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "分类",
  description: "查看所有内容分类。",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Categories"
        title="分类索引"
        description="分类更适合表达内容栏目，标签更适合表达横向主题。"
      />
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge key={category.name} href={`/categories/${encodeURIComponent(category.name)}`}>
            {category.name} · {category.count}
          </Badge>
        ))}
      </div>
    </Container>
  );
}
