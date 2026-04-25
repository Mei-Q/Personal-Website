import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { withBasePath } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#f7f8f6",
    theme_color: "#0f766e",
    icons: [
      {
        src: withBasePath("/icon.svg"),
        sizes: "64x64",
        type: "image/svg+xml"
      }
    ]
  };
}
