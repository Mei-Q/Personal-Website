import { ExternalLink, Github, CalendarDays, Clock3, RefreshCw } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { BackToTop } from "@/components/blog/back-to-top";
import { CodeCopyEnhancer } from "@/components/blog/code-copy-enhancer";
import { PrevNext } from "@/components/blog/prev-next";
import { ProgressBar } from "@/components/blog/progress-bar";
import { RelatedContent } from "@/components/blog/related-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { formatDate, typeLabel } from "@/lib/utils";

type ContentDetailProps = {
  item: ContentItem;
  previous: ContentItem | null;
  next: ContentItem | null;
};

function MetadataPanel({ item }: { item: ContentItem }) {
  if (item.collection === "papers") {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
        <h2 className="text-sm font-semibold">论文信息</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {item.authors?.length ? (
            <div>
              <dt className="text-[rgb(var(--muted-foreground))]">作者</dt>
              <dd className="mt-1">{item.authors.join(", ")}</dd>
            </div>
          ) : null}
          {item.venue || item.year ? (
            <div>
              <dt className="text-[rgb(var(--muted-foreground))]">发表信息</dt>
              <dd className="mt-1">{[item.venue, item.year].filter(Boolean).join(" · ")}</dd>
            </div>
          ) : null}
          {item.doi ? (
            <div>
              <dt className="text-[rgb(var(--muted-foreground))]">DOI</dt>
              <dd className="mt-1 break-all">
                <a className="text-lab-teal hover:underline" href={item.doi}>
                  {item.doi}
                </a>
              </dd>
            </div>
          ) : null}
          {item.arxiv ? (
            <div>
              <dt className="text-[rgb(var(--muted-foreground))]">arXiv</dt>
              <dd className="mt-1 break-all">
                <a className="text-lab-teal hover:underline" href={item.arxiv}>
                  {item.arxiv}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    );
  }

  if (item.collection === "projects") {
    return (
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
        <h2 className="text-sm font-semibold">项目信息</h2>
        <div className="mt-4 space-y-4 text-sm">
          {item.status ? (
            <div>
              <p className="text-[rgb(var(--muted-foreground))]">状态</p>
              <p className="mt-1 font-medium">{item.status}</p>
            </div>
          ) : null}
          {item.techStack?.length ? (
            <div>
              <p className="mb-2 text-[rgb(var(--muted-foreground))]">技术栈</p>
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {item.github ? (
              <a
                href={item.github}
                className="inline-flex items-center gap-2 rounded-md bg-lab-teal px-3 py-2 text-sm font-medium text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            ) : null}
            {item.demo ? (
              <a
                href={item.demo}
                className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function ContentDetail({ item, previous, next }: ContentDetailProps) {
  return (
    <>
      <ProgressBar />
      <main>
        <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <header className="max-w-3xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge>{typeLabel(item.type)}</Badge>
              {item.categories.map((category) => (
                <Badge key={category} href={`/categories/${encodeURIComponent(category)}`}>
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="break-words text-3xl font-semibold tracking-normal sm:text-5xl">
              {item.title}
            </h1>
            {item.description ? (
              <p className="mt-5 text-lg leading-8 text-[rgb(var(--muted-foreground))]">
                {item.description}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
              {item.date ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(item.date)}
                </span>
              ) : null}
              {item.updated ? (
                <span className="inline-flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  更新于 {formatDate(item.updated)}
                </span>
              ) : null}
              {item.collection !== "projects" ? (
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {item.readingTime}
                </span>
              ) : null}
            </div>
            {item.tags.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                    #{tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </header>

          <div className="mt-8 grid min-w-0 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="min-w-0">
              <div className="prose prose-neutral max-w-none dark:prose-invert sm:prose-lg prose-headings:scroll-mt-24 prose-headings:tracking-normal prose-p:leading-8 prose-a:no-underline prose-pre:text-sm hover:prose-a:underline">
                <MdxRenderer source={item.body} />
              </div>
              <PrevNext previous={previous} next={next} />
            </div>
            <aside className="order-first space-y-5 lg:order-none lg:sticky lg:top-28 lg:self-start">
              <MetadataPanel item={item} />
              <TableOfContents headings={item.headings} />
            </aside>
          </div>
          <RelatedContent item={item} />
        </article>
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 text-sm text-[rgb(var(--muted-foreground))]">
            讨论区预留：在 <code>site.config.ts</code> 中填写 giscus 配置后，可替换为正式评论组件。
          </div>
        </section>
      </main>
      <CodeCopyEnhancer />
      <BackToTop />
    </>
  );
}
