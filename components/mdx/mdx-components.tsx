import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { withBasePath } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  children: ReactNode;
};

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

const downloadableFilePattern = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|csv|json|txt)$/i;

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
  Callout
};

