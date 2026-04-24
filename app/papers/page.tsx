import type { Metadata } from "next";
import { CollectionPage } from "@/components/blog/collection-page";
import type { SearchParams } from "@/lib/filters";
import { createMetadata, pageDescription } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "论文阅读",
  description: pageDescription("papers"),
  path: "/papers"
});

export default function PapersPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  return (
    <CollectionPage
      collection="papers"
      eyebrow="Paper Notes"
      title="论文与学术阅读"
      description="按论文类型管理引用信息、核心贡献、方法概述、优缺点和个人评价。"
      searchParams={searchParams}
    />
  );
}
