import type { Metadata } from "next";
import { CollectionPage } from "@/components/blog/collection-page";
import type { SearchParams } from "@/lib/filters";
import { createMetadata, pageDescription } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "文章",
  description: pageDescription("posts"),
  path: "/posts"
});

export default function PostsPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  return (
    <CollectionPage
      collection="posts"
      eyebrow="Posts"
      title="研究文章"
      description="记录科研想法、实验过程、技术总结和长期学习笔记。"
      searchParams={searchParams}
    />
  );
}
