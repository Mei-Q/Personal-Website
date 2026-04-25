"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";

function hasGiscusConfig() {
  const config = siteConfig.comments;
  return Boolean(
    config.giscusRepo &&
      config.giscusRepoId &&
      config.giscusCategory &&
      config.giscusCategoryId
  );
}

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasGiscusConfig() || !containerRef.current) return;
    if (containerRef.current.dataset.loaded === "true") return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", siteConfig.comments.giscusRepo);
    script.setAttribute("data-repo-id", siteConfig.comments.giscusRepoId);
    script.setAttribute("data-category", siteConfig.comments.giscusCategory);
    script.setAttribute("data-category-id", siteConfig.comments.giscusCategoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");

    containerRef.current.dataset.loaded = "true";
    containerRef.current.appendChild(script);
  }, []);

  if (!hasGiscusConfig()) {
    return (
      <div className="rounded-lg border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
        评论区预留：在 <code>site.config.ts</code> 中填写 giscus 配置后，这里会自动显示正式评论区。
      </div>
    );
  }

  return <div ref={containerRef} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4" />;
}