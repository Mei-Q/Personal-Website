import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  FlaskConical,
  GraduationCap,
  Microscope,
  Newspaper,
  Search
} from "lucide-react";
import { siteConfig } from "@/site.config";
import { ContentCard } from "@/components/blog/content-card";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCollection,
  getFeaturedProjects,
  getRecentContent
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const recent = getRecentContent(6);
  const papers = getCollection("papers").slice(0, 2);
  const projects = getFeaturedProjects(3);

  return (
    <Container className="py-8 sm:py-12">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_26rem] lg:items-center">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge>个人实验室主页</Badge>
            <Badge>科研博客</Badge>
            <Badge>Open Research Notes</Badge>
          </div>
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[rgb(var(--muted-foreground))] sm:text-lg sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-lab-teal px-4 py-2.5 text-sm font-medium text-white"
            >
              <Newspaper className="h-4 w-4" />
              阅读文章
            </Link>
            <Link
              href="/papers"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-4 py-2.5 text-sm font-medium"
            >
              <BookOpenText className="h-4 w-4" />
              论文笔记
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-4 py-2.5 text-sm font-medium"
            >
              <Search className="h-4 w-4" />
              全站搜索
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["研究文章", getCollection("posts").length],
              ["论文笔记", getCollection("papers").length],
              ["项目档案", getCollection("projects").length]
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4"
              >
                <div className="text-2xl font-semibold">{value}</div>
                <div className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 shadow-soft">
          <div className="flex items-center gap-4 border-b border-[rgb(var(--border))] pb-5">
            <Image
              src={siteConfig.author.avatar}
              alt={`${siteConfig.author.name} 头像`}
              width={72}
              height={72}
              className="h-16 w-16 rounded-lg border border-[rgb(var(--border))]"
              priority
            />
            <div className="min-w-0">
              <p className="font-semibold">{siteConfig.author.name}</p>
              <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                {siteConfig.author.title}
              </p>
              <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                {siteConfig.author.affiliation}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {siteConfig.author.bio}
          </p>
          <div className="mt-5 grid gap-3">
            {siteConfig.author.links.slice(0, 4).map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm transition hover:border-lab-teal"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-lab-teal" />
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Research Focus"
          title="研究方向"
          description="首页以个人实验室的方式呈现研究身份、长期兴趣和正在维护的知识资产。"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {siteConfig.researchInterests.map((interest, index) => {
            const icons = [Microscope, FlaskConical, GraduationCap];
            const Icon = icons[index] ?? Microscope;
            return (
              <div
                key={interest.title}
                className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5"
              >
                <Icon className="h-6 w-6 text-lab-teal" />
                <h3 className="mt-4 text-lg font-semibold">{interest.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  {interest.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Latest Notes"
          title="最新动态与文章"
          description="聚合研究文章、教程和论文阅读，适合长期记录实验过程与资料整理。"
          href="/archive"
          actionLabel="查看归档"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((item) => (
            <ContentCard key={`${item.collection}-${item.slug}`} item={item} compact />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <SectionHeading
            eyebrow="Projects"
            title="代表项目"
            description="展示科研工具、实验系统和开源项目，详情页可继续补充设计记录与实验结果。"
            href="/projects"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
        <aside>
          <SectionHeading eyebrow="Papers" title="代表论文阅读" href="/papers" />
          <div className="space-y-4">
            {papers.map((paper) => (
              <Link
                key={paper.slug}
                href={`/papers/${paper.slug}`}
                className="block rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 transition hover:border-lab-teal"
              >
                <p className="text-sm font-semibold leading-6">{paper.title}</p>
                <p className="mt-2 text-xs text-[rgb(var(--muted-foreground))]">
                  {[paper.venue, paper.year].filter(Boolean).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Lab Log" title="近期研究动态" />
        <div className="space-y-4 border-l border-[rgb(var(--border))] pl-5">
          {siteConfig.updates.map((update) => (
            <div key={`${update.date}-${update.title}`} className="relative">
              <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[rgb(var(--background))] bg-lab-teal" />
              <time className="text-xs text-[rgb(var(--muted-foreground))]">
                {formatDate(update.date)}
              </time>
              <h3 className="mt-1 font-semibold">{update.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                {update.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
