import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import type { ContentItem } from "@/lib/types";
import { absoluteUrl, collectionLabel, getCollectionHref, withBasePath } from "@/lib/utils";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.socialImage,
  type = "website",
  keywords = []
}: MetadataOptions = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.shortName}` : siteConfig.name;
  const url = absoluteUrl(siteConfig.url, path);
  const imageUrl = absoluteUrl(siteConfig.url, image);

  return {
    metadataBase: new URL(siteConfig.url),
    manifest: withBasePath("/manifest.webmanifest"),
    title: resolvedTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl(siteConfig.url, "/rss.xml")
      }
    },
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl]
    }
  };
}

export function createContentMetadata(item: ContentItem): Metadata {
  const metadata = createMetadata({
    title: item.title,
    description: item.description,
    path: getCollectionHref(item.collection, item.slug),
    image: item.cover ?? siteConfig.socialImage,
    type: item.collection === "projects" ? "website" : "article",
    keywords: [...item.tags, ...item.categories]
  });

  if (item.collection === "projects") return metadata;

  const openGraph = metadata.openGraph ?? {};

  return {
    ...metadata,
    openGraph: {
      ...openGraph,
      type: "article",
      publishedTime: item.date,
      modifiedTime: item.updated ?? item.date,
      authors: item.authors?.length ? item.authors : [siteConfig.author.name],
      tags: item.tags
    }
  };
}

export function pageDescription(collection: string) {
  const descriptions: Record<string, string> = {
    posts: "研究文章、实验记录、经验总结与长期技术笔记。",
    papers: "论文阅读笔记、引用信息、核心贡献、方法概述与个人评价。",
    projects: "科研项目、开源代码、实验工具和个人工程实践展示。",
    tutorials: "软件使用、环境配置、工具链说明和可复现工作流教程。"
  };

  return descriptions[collection] ?? `${collectionLabel(collection)}内容列表`;
}
