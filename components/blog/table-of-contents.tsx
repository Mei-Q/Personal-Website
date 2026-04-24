import type { Heading } from "@/lib/types";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <nav
      className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 lg:p-5"
      aria-label="文章目录"
    >
      <h2 className="text-sm font-semibold">目录</h2>
      <ol className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1 text-sm lg:max-h-[calc(100vh-16rem)]">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
            <a
              href={`#${heading.id}`}
              className="text-[rgb(var(--muted-foreground))] hover:text-lab-teal"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
