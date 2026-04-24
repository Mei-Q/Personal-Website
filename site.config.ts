import { FlaskConical, Github, GraduationCap, Mail, Newspaper, Rss } from "lucide-react";

export const siteConfig = {
  name: "Lemon Research Lab",
  shortName: "Lemon Lab",
  description:
    "一个用于科研记录、论文阅读、项目展示与资料分享的个人实验室主页。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "zh-CN",
  author: {
    name: "Sweet Lemon",
    title: "Researcher / Full-stack Developer",
    affiliation: "Personal Research Lab",
    email: "hello@example.com",
    location: "China",
    avatar: "/images/avatar.svg",
    bio: "关注智能系统、工程工具链、可复现实验和知识管理，长期维护个人研究笔记与开源实验项目。",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/example",
        icon: Github
      },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com",
        icon: GraduationCap
      },
      {
        label: "ORCID",
        href: "https://orcid.org",
        icon: FlaskConical
      },
      {
        label: "Email",
        href: "mailto:hello@example.com",
        icon: Mail
      },
      {
        label: "RSS",
        href: "/rss.xml",
        icon: Rss
      }
    ]
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/posts" },
    { label: "论文", href: "/papers" },
    { label: "项目", href: "/projects" },
    { label: "教程", href: "/tutorials" },
    { label: "归档", href: "/archive" },
    { label: "搜索", href: "/search" },
    { label: "关于", href: "/about" }
  ],
  researchInterests: [
    {
      title: "智能系统与 LLM 应用",
      description: "围绕检索增强生成、工具调用、智能体工作流与评测体系做工程化研究。",
      accent: "teal"
    },
    {
      title: "科研软件与可复现实验",
      description: "整理实验环境、数据流水线、仿真工具和结果复现的长期实践。",
      accent: "amber"
    },
    {
      title: "知识管理与学术写作",
      description: "用 Markdown / MDX、引用管理和自动化工具沉淀阅读笔记、教程和资源索引。",
      accent: "rose"
    }
  ],
  updates: [
    {
      date: "2026-04-25",
      title: "个人实验室主页上线",
      description: "完成首页、内容系统、搜索、RSS、sitemap 和示例内容。"
    },
    {
      date: "2026-04-18",
      title: "整理论文阅读模板",
      description: "为论文笔记补充贡献、方法、优缺点和个人评价字段。"
    },
    {
      date: "2026-04-05",
      title: "新增可复现实验工作流",
      description: "记录 Python、CUDA、容器化和实验日志管理经验。"
    }
  ],
  analytics: {
    umamiWebsiteId: "",
    plausibleDomain: ""
  },
  comments: {
    giscusRepo: "",
    giscusRepoId: "",
    giscusCategory: "",
    giscusCategoryId: ""
  },
  socialImage: "/images/og.svg",
  icon: Newspaper
};

export type SiteConfig = typeof siteConfig;
