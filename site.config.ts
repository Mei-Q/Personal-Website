import { Github, GraduationCap, Mail, Newspaper, Rss } from "lucide-react";

export const siteConfig = {
  name: "Sweet Lemon Research Lab",
  shortName: "Sweet Lemon Lab",
  description:
    "一个面向地质三维可视化、科研软件实践、论文阅读和项目开源的个人实验室网站。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "zh-CN",
  author: {
    name: "Sweet Lemon",
    title: "Student / Research Software Learner",
    affiliation: "East China University of Technology (ECUT)",
    email: "2584368372@qq.com",
    location: "Jiangxi, China",
    avatar: "/images/avatar.jpg",
    bio: "关注地质三维可视化、科研软件工具链、可复现实验和知识管理。这个网站用于长期沉淀论文阅读、项目代码、实验记录、教程资料和可下载学术资源。",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mei-Q",
        icon: Github
      },
      {
        label: "School",
        href: "https://www.ecut.edu.cn/main.htm",
        icon: GraduationCap
      },
      {
        label: "Email",
        href: "mailto:2584368372@qq.com",
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
    { label: "CV", href: "/cv" },
    { label: "关于", href: "/about" }
  ],
  researchInterests: [
    {
      title: "地质三维可视化",
      description: "关注地质体建模、空间数据表达、Web 可视化和科研成果展示。",
      accent: "teal"
    },
    {
      title: "科研软件与可复现实验",
      description: "整理实验环境、数据流水线、仿真工具、版本管理和结果复现的长期实践。",
      accent: "amber"
    },
    {
      title: "知识管理与学术写作",
      description: "用 Markdown / MDX、引用管理、下载资料和自动化工具沉淀论文笔记、教程和资源索引。",
      accent: "rose"
    }
  ],
  updates: [
    {
      date: "2026-04-25",
      title: "个人实验室主页上线",
      description: "完成首页、内容系统、搜索、RSS、sitemap、下载资料和示例内容。"
    },
    {
      date: "2026-04-25",
      title: "新增 PDF / DOCX 资料发布流程",
      description: "支持把讲义、报告、论文资料作为独立内容或下载附件维护。"
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
  cv: {
    education: [
      {
        title: "Student",
        organization: "East China University of Technology (ECUT)",
        period: "Present",
        description: "持续学习地学数据处理、科研软件开发、三维可视化和工程化工具链。"
      }
    ],
    experiences: [
      {
        title: "个人实验室网站与科研知识库",
        period: "2026 - Present",
        description: "维护公开科研主页，沉淀文章、论文阅读、项目代码、教程和可下载资料。"
      },
      {
        title: "地质三维可视化方向实践",
        period: "Long-term",
        description: "围绕地质体空间表达、三维场景展示和可视化交互进行学习与项目积累。"
      },
      {
        title: "科研软件与全栈开发实践",
        period: "Long-term",
        description: "使用 Web、Python 和自动化工具整理可复现实验与研究资料发布流程。"
      }
    ],
    skills: [
      "Geological 3D Visualization",
      "Next.js / React / TypeScript",
      "Markdown / MDX Knowledge Base",
      "Python Scientific Workflow",
      "Git / GitHub / Vercel",
      "Research Note Taking"
    ],
    highlights: [
      "构建个人实验室主页，支持文章、论文、项目、教程、搜索、RSS、sitemap 和下载资料。",
      "维护面向科研场景的内容模板，方便长期积累论文阅读和项目记录。",
      "关注可复现实验、资料整理和科研成果的公开分享。"
    ]
  },
  analytics: {
    umamiWebsiteId: "",
    umamiScriptUrl: "https://cloud.umami.is/script.js",
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