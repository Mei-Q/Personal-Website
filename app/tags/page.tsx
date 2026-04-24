import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllTags } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "标签",
  description: "查看所有内容标签。",
  path: "/tags"
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Tags"
        title="标签索引"
        description="标签用于跨文章、论文、项目和教程聚合同一主题。"
      />
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Badge key={tag.name} href={`/tags/${encodeURIComponent(tag.name)}`}>
            #{tag.name} · {tag.count}
          </Badge>
        ))}
      </div>
    </Container>
  );
}
