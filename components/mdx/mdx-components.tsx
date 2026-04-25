import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink, FileText, Info } from "lucide-react";
import { withBasePath } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  children: ReactNode;
};

type DownloadCardProps = {
  href: string;
  label?: string;
  type?: string;
  size?: string;
  description?: string;
};

function inferFileType(href: string) {
  const extension = href.split(/[?#]/)[0]?.split(".").pop();
  return extension ? extension.toUpperCase() : "FILE";
}

function DownloadCard({ href, label, type, size, description }: DownloadCardProps) {
  const isExternal = href.startsWith("http");
  const resolvedHref = href.startsWith("/") ? withBasePath(href) : href;
  const displayType = type ?? inferFileType(href);
  const displayLabel = label ?? href.split(/[?#]/)[0]?.split("/").pop() ?? "下载资料";

  return (
    <a
      href={resolvedHref}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={isExternal ? undefined : true}
      className="not-prose my-5 flex gap-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 text-sm transition hover:border-lab-teal hover:bg-[rgb(var(--background))]"
    >
      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-lab-teal" />
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3 font-semibold">
          <span className="break-words">{displayLabel}</span>
          {isExternal ? (
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
          ) : (
            <Download className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
          )}
        </span>
        <span className="mt-1 block text-xs text-[rgb(var(--muted-foreground))]">
          {[displayType, size].filter(Boolean).join(" · ")}
        </span>
        {description ? (
          <span className="mt-2 block leading-6 text-[rgb(var(--muted-foreground))]">
            {description}
          </span>
        ) : null}
      </span>
    </a>
  );
}

function Callout({ title = "Note", children }: CalloutProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Info className="h-4 w-4 text-lab-teal" />
        {title}
      </div>
      <div className="text-sm leading-6 text-[rgb(var(--muted-foreground))]">{children}</div>
    </div>
  );
}

const downloadableFilePattern = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|csv|json|txt|mdx?|tex|bib)$/i;

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isExternal = href.startsWith("http");
    const pathWithoutQuery = href.split(/[?#]/)[0] ?? "";
    const isStaticDownload =
      href.startsWith("/files/") || downloadableFilePattern.test(pathWithoutQuery);

    if (isExternal || !href.startsWith("/") || isStaticDownload) {
      const resolvedHref = href.startsWith("/") ? withBasePath(href) : href;
      return (
        <a
          href={resolvedHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          download={!isExternal && isStaticDownload ? true : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  img: ({ src = "", alt = "" }) => {
    if (typeof src !== "string") return null;
    return (
      <Image
        src={withBasePath(src)}
        alt={alt}
        width={1200}
        height={720}
        className="rounded-lg border border-[rgb(var(--border))]"
      />
    );
  },
  Callout,
  DownloadCard
};