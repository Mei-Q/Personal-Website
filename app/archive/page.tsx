import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getArchiveGroups } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { collectionLabel, formatDate, getCollectionHref } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "归档",
  description: "按年份和月份查看所有公开内容。",
  path: "/archive"
});

export default function ArchivePage() {
  const archive = getArchiveGroups();

  return (
    <Container className="py-10">
      <SectionHeading
        eyebrow="Archive"
        title="内容归档"
        description="长期积累后，可以按年份和月份快速回看研究文章、论文笔记、教程和项目记录。"
      />
      <div className="space-y-10">
        {archive.map((yearGroup) => (
          <section key={yearGroup.year}>
            <h2 className="mb-4 text-2xl font-semibold">{yearGroup.year}</h2>
            <div className="space-y-6">
              {yearGroup.months.map((monthGroup) => (
                <div key={`${yearGroup.year}-${monthGroup.month}`} className="grid gap-4 md:grid-cols-[8rem_1fr]">
                  <h3 className="text-sm font-semibold text-[rgb(var(--muted-foreground))]">
                    {monthGroup.month}
                  </h3>
                  <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))]">
                    {monthGroup.items.map((item) => (
                      <Link
                        key={`${item.collection}-${item.slug}`}
                        href={getCollectionHref(item.collection, item.slug)}
                        className="flex flex-col gap-1 border-b border-[rgb(var(--border))] px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="font-medium hover:text-lab-teal">{item.title}</span>
                        <span className="text-xs text-[rgb(var(--muted-foreground))]">
                          {formatDate(item.date)} · {collectionLabel(item.collection)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
