import { FlaskConical, Github, GraduationCap, Mail, Newspaper, Rss } from "lucide-react";

export const siteConfig = {
  name: "Sweet Lemon Research Lab",
  shortName: "M",
  description:
    "一个用于科研记录、论文阅读、项目展示、项目开源与资料分享的个人网站。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "zh-CN",
  author: {
    name: "Sweet Lemon",
    title: "Student",
    affiliation: "ECUT",
    email: "2584368372@qq.com",
    location: "江西",
    avatar: "/images/avatar.jpg",/*头像*/
    bio: "个人简介",
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
      /*
      {
        label: "ORCID",
        href: "https://orcid.org",
        icon: FlaskConical
      },
      */
      {
        label: "Email",
        href: "2584368372@qq.com",
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
      title: "地质三维可视化",
      description: "地质体的三维可视化技术",
      accent: "teal"/*蓝绿色*/
    },
    {
      title: "科研软件与可复现实验",
      description: "整理实验环境、数据流水线、仿真工具和结果复现的长期实践。",
      accent: "amber"/*琥珀色*/
    },
    {
      title: "知识管理与学术写作",
      description: "用 Markdown / MDX、引用管理和自动化工具沉淀阅读笔记、教程和资源索引。",
      accent: "rose"/*玫瑰色*/
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
