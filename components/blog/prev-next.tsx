import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { getCollectionHref } from "@/lib/utils";

type PrevNextProps = {
  previous: ContentItem | null;
  next: ContentItem | null;
};

export function PrevNext({ previous, next }: PrevNextProps) {
  if (!previous && !next) return null;

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={getCollectionHref(previous.collection, previous.slug)}
          className="min-w-0 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 transition hover:border-lab-teal"
        >
          <span className="mb-2 inline-flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
            <ArrowLeft className="h-3.5 w-3.5" />
            上一篇
          </span>
          <span className="block break-words text-sm font-semibold">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={getCollectionHref(next.collection, next.slug)}
          className="min-w-0 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 text-left transition hover:border-lab-teal sm:text-right"
        >
          <span className="mb-2 inline-flex items-center justify-end gap-2 text-xs text-[rgb(var(--muted-foreground))]">
            下一篇
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="block break-words text-sm font-semibold">{next.title}</span>
        </Link>
      ) : null}
    </div>
  );
}
