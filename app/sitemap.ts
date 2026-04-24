import type { MetadataRoute } from "next";
import { getAllStaticPaths } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllStaticPaths();
}
