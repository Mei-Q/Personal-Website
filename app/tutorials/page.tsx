import type { Metadata } from "next";
import { CollectionPage } from "@/components/blog/collection-page";
import type { SearchParams } from "@/lib/filters";
import { createMetadata, pageDescription } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "教程",
  description: pageDescription("tutorials"),
  path: "/tutorials"
});

export default function TutorialsPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  return (
    <CollectionPage
      collection="tutorials"
      eyebrow="Tutorials"
      title="教程与工具链"
      description="软件使用、环境配置、开发工具和可复现实验流程。"
      searchParams={searchParams}
    />
  );
}
