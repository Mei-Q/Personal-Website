import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SearchClient } from "@/app/search/search-client";
import { getSearchIndex } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "搜索",
  description: "使用本地静态索引搜索标题、摘要、标签和正文。",
  path: "/search"
});

export default function SearchPage() {
  const items = getSearchIndex();

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Search"
        title="全站搜索"
        description="基于 Fuse.js 的本地搜索，不需要数据库或后端服务。"
      />
      <SearchClient items={items} />
    </Container>
  );
}
