import type { Metadata } from "next";
import { CollectionPage } from "@/components/blog/collection-page";
import { createMetadata, pageDescription } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "项目",
  description: pageDescription("projects"),
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <CollectionPage
      collection="projects"
      eyebrow="Projects"
      title="科研项目与开源代码"
      description="展示个人实验项目、开源工具、研究原型和工程实践。"
    />
  );
}
