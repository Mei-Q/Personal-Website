import { CalendarDays, Clock3, Download, ExternalLink, FileText, Github, RefreshCw } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { BackToTop } from "@/components/blog/back-to-top";
import { CodeCopyEnhancer } from "@/components/blog/code-copy-enhancer";
import { PrevNext } from "@/components/blog/prev-next";
import { ProgressBar } from "@/components/blog/progress-bar";
import { RelatedContent } from "@/components/blog/related-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { formatDate, languageLabel, typeLabel, withBasePath } from "@/lib/utils";

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


function getPreviewablePdf(item: ContentItem) {
  return item.attachments.find((attachment) => {
    const isLocal = attachment.href.startsWith("/") && !attachment.href.startsWith("//");
    const type = attachment.type?.toLowerCase();
    return isLocal && (type === "pdf" || attachment.href.split(/[?#]/)[0]?.toLowerCase().endsWith(".pdf"));
  });
}

function PdfPreview({ item }: { item: ContentItem }) {
  const pdf = getPreviewablePdf(item);
  if (!pdf) return null;

  const href = withBasePath(pdf.href);

  return (
    <section className="not-prose mt-8 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">PDF 在线预览</h2>
          <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
            如果浏览器无法预览，请使用右侧下载资料获取文件。
          </p>
        </div>
        <a
          href={href}
          download
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm font-medium hover:border-lab-teal"
        >
          <Download className="h-4 w-4" />
          下载 PDF
        </a>
      </div>
      <iframe
        title={`${pdf.label} PDF 预览`}
        src={href}
        className="h-[70vh] min-h-[28rem] w-full rounded-md border border-[rgb(var(--border))] bg-white"
      />
    </section>
  );
}
function DownloadPanel({ item }: { item: ContentItem }) {
  if (!item.attachments.length) return null;

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
      <h2 className="text-sm font-semibold">下载资料</h2>
      <div className="mt-4 space-y-3">
        {item.attachments.map((attachment) => {
          const isExternal = attachment.href.startsWith("http");
          const href = isExternal ? attachment.href : withBasePath(attachment.href);

          return (
            <a
              key={`${attachment.href}-${attachment.label}`}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              download={isExternal ? undefined : true}
              className="group flex gap-3 rounded-md border border-[rgb(var(--border))] p-3 text-sm transition hover:border-lab-teal hover:bg-[rgb(var(--background))]"
            >
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-lab-teal" />
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2 font-medium">
                  <span className="break-words">{attachment.label}</span>
                  {isExternal ? (
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
                  ) : (
                    <Download className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                  )}
                </span>
                {attachment.type || attachment.size ? (
                  <span className="mt-1 block text-xs text-[rgb(var(--muted-foreground))]">
                    {[attachment.type, attachment.size].filter(Boolean).join(" · ")}
                  </span>
                ) : null}
                {attachment.description ? (
                  <span className="mt-1 block text-xs leading-5 text-[rgb(var(--muted-foreground))]">
                    {attachment.description}
                  </span>
                ) : null}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
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
              {item.language ? <Badge>{languageLabel(item.language)}</Badge> : null}
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
              {item.body ? (
                <div className="prose prose-neutral max-w-none dark:prose-invert sm:prose-lg prose-headings:scroll-mt-24 prose-headings:tracking-normal prose-p:leading-8 prose-a:no-underline prose-pre:text-sm hover:prose-a:underline">
                  <MdxRenderer source={item.body} />
                </div>
              ) : (
                <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-6 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                  这条内容以文件形式发布。请使用下载资料中的链接获取 PDF、DOCX 或其他附件。
                </div>
              )}
              <PdfPreview item={item} />
              <PrevNext previous={previous} next={next} />
            </div>
            <aside className="order-first space-y-5 lg:order-none lg:sticky lg:top-28 lg:self-start">
              <MetadataPanel item={item} />
              <DownloadPanel item={item} />
              <TableOfContents headings={item.headings} />
            </aside>
          </div>
          <RelatedContent item={item} />
        </article>

      </main>
      <CodeCopyEnhancer />
      <BackToTop />
    </>
  );
}





