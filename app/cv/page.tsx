import type { Metadata } from "next";
import { Award, BookOpen, BriefcaseBusiness, Download, GraduationCap, Mail } from "lucide-react";
import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Academic CV",
  description: "个人学术简历、研究方向、教育经历、项目经历和技能概览。",
  path: "/cv"
});

export default function CvPage() {
  return (
    <main>
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeading
              eyebrow="Academic CV"
              title={siteConfig.author.name}
              description={siteConfig.author.bio}
            />

            <section className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">身份</p>
                  <p className="mt-1 font-medium">{siteConfig.author.title}</p>
                </div>
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">机构</p>
                  <p className="mt-1 font-medium">{siteConfig.author.affiliation}</p>
                </div>
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">位置</p>
                  <p className="mt-1 font-medium">{siteConfig.author.location}</p>
                </div>
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">邮箱</p>
                  <a className="mt-1 inline-flex items-center gap-2 font-medium text-lab-teal" href={`mailto:${siteConfig.author.email}`}>
                    <Mail className="h-4 w-4" />
                    {siteConfig.author.email}
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <GraduationCap className="h-5 w-5 text-lab-teal" />
                Education
              </h2>
              <div className="space-y-4">
                {siteConfig.cv.education.map((item) => (
                  <div key={`${item.title}-${item.organization}`} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{item.organization}</p>
                      </div>
                      <Badge>{item.period}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <BriefcaseBusiness className="h-5 w-5 text-lab-teal" />
                Experience
              </h2>
              <div className="space-y-4">
                {siteConfig.cv.experiences.map((item) => (
                  <div key={`${item.title}-${item.period}`} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge>{item.period}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <section className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-lab-teal" />
                Research Interests
              </h2>
              <div className="mt-4 space-y-3">
                {siteConfig.researchInterests.map((interest) => (
                  <div key={interest.title}>
                    <p className="text-sm font-medium">{interest.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[rgb(var(--muted-foreground))]">{interest.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Award className="h-4 w-4 text-lab-teal" />
                Highlights
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                {siteConfig.cv.highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5">
              <h2 className="text-sm font-semibold">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {siteConfig.cv.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-5 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
              <div className="mb-2 flex items-center gap-2 font-semibold text-[rgb(var(--foreground))]">
                <Download className="h-4 w-4 text-lab-teal" />
                CV PDF 预留
              </div>
              将简历 PDF 放到 <code>/public/files/about/cv.pdf</code> 或在本页添加下载链接后，可作为正式学术简历分享。
            </section>
          </aside>
        </div>
      </Container>
    </main>
  );
}