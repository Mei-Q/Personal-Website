import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, BriefcaseBusiness, GraduationCap, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "关于",
  description: "个人简介、研究兴趣、经历和联系方式。",
  path: "/about"
});

const experiences = [
  {
    title: "个人实验室与科研博客维护",
    period: "2026 - Present",
    description: "持续整理论文阅读、实验项目、工程工具链和科研资源。"
  },
  {
    title: "科研软件与全栈开发实践",
    period: "2024 - 2026",
    description: "围绕数据处理、仿真工具、Web 可视化和自动化工作流进行实践。"
  },
  {
    title: "学术阅读与知识库建设",
    period: "Long-term",
    description: "建立可检索、可复用、可公开分享的 Markdown / MDX 知识库。"
  }
];

export default function AboutPage() {
  return (
    <Container className="py-10">
      <section className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 lg:self-start">
          <Image
            src={withBasePath(siteConfig.author.avatar)}
            alt={`${siteConfig.author.name} 头像`}
            width={320}
            height={320}
            className="h-44 w-full rounded-lg border border-[rgb(var(--border))] object-cover"
            priority
          />
          <h1 className="mt-5 text-2xl font-semibold">{siteConfig.author.name}</h1>
          <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
            {siteConfig.author.title}
          </p>
          <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-foreground))]">
            <p className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-lab-teal" />
              {siteConfig.author.affiliation}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lab-teal" />
              {siteConfig.author.location}
            </p>
            <a
              className="flex items-center gap-2 hover:text-lab-teal"
              href={`mailto:${siteConfig.author.email}`}
            >
              <Mail className="h-4 w-4 text-lab-teal" />
              {siteConfig.author.email}
            </a>
          </div>
          <div className="mt-5 grid gap-2">
            {siteConfig.author.links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={withBasePath(link.href)}
                  className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-sm hover:border-lab-teal"
                >
                  <Icon className="h-4 w-4 text-lab-teal" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </aside>
        <div>
          <SectionHeading
            eyebrow="About"
            title="个人简介"
            description={siteConfig.author.bio}
          />
          <div className="prose prose-neutral dark:prose-invert">
            <p>
              这个网站是一个公开的个人实验室主页，用来持续记录科研想法、论文阅读、项目代码、软件教程和资料整理。内容系统基于 Markdown / MDX，适合在长期研究过程中低成本维护。
            </p>
            <p>
              后续可以在 <code>site.config.ts</code> 中替换姓名、头像、邮箱、Google Scholar、ORCID、GitHub 等链接，也可以在 <code>content</code> 目录下新增不同类型的研究内容。
            </p>
          </div>

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <BookOpen className="h-5 w-5 text-lab-teal" />
              研究兴趣
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {siteConfig.researchInterests.map((interest) => (
                <div
                  key={interest.title}
                  className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4"
                >
                  <h3 className="font-semibold">{interest.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <GraduationCap className="h-5 w-5 text-lab-teal" />
              经历
            </h2>
            <div className="space-y-4">
              {experiences.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge>{item.period}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
}
