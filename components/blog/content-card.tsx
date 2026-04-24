import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { collectionLabel, formatDate, getCollectionHref, typeLabel } from "@/lib/utils";

type ContentCardProps = {
  item: ContentItem;
  compact?: boolean;
};

export function ContentCard({ item, compact = false }: ContentCardProps) {
  const href = getCollectionHref(item.collection, item.slug);

  return (
    <article className="group min-w-0 overflow-hidden rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] transition hover:-translate-y-0.5 hover:shadow-soft">
      {item.cover && !compact ? (
        <Link href={href} className="block border-b border-[rgb(var(--border))]">
          <Image
            src={item.cover}
            alt={`${item.title} 封面`}
            width={960}
            height={520}
            className="h-40 w-full object-cover sm:h-44"
          />
        </Link>
      ) : null}
      <div className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
          <Badge>{typeLabel(item.type)}</Badge>
          {item.date ? (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(item.date)}
            </span>
          ) : null}
          {item.collection !== "projects" ? (
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {item.readingTime}
            </span>
          ) : null}
        </div>
        <h3 className="break-words text-lg font-semibold leading-snug tracking-normal">
          <Link href={href} className="hover:text-lab-teal">
            {item.title}
          </Link>
        </h3>
        {item.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {item.description}
          </p>
        ) : null}
        {item.collection === "papers" ? (
          <p className="mt-3 text-sm text-[rgb(var(--muted-foreground))]">
            {[item.venue, item.year].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        {item.collection === "projects" && item.techStack?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        ) : null}
        {item.tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, compact ? 3 : 5).map((tag) => (
              <Badge key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                #{tag}
              </Badge>
            ))}
          </div>
        ) : null}
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-lab-teal hover:underline"
          aria-label={`阅读${collectionLabel(item.collection)}：${item.title}`}
        >
          阅读详情
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
