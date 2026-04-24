# Lemon Research Lab

一个面向科研、学术研究、资料分享的个人实验室博客网站。项目基于 Next.js App Router、TypeScript、Tailwind CSS 和 MDX，内容通过本地 Markdown / MDX 文件维护，不依赖数据库，默认以静态导出方式部署到 GitHub Pages，也可以部署到 Vercel / Netlify。

## 已实现功能

- 首页：个人实验室简介、研究方向、代表论文、代表项目、最新动态、最近内容。
- 内容系统：`posts`、`papers`、`projects`、`tutorials` 四类内容，统一使用 frontmatter。
- 文章详情：MDX 渲染、代码高亮、数学公式、目录 TOC、阅读时间、上一篇 / 下一篇、相关文章。
- 论文页：支持作者、年份、会议 / 期刊、DOI、arXiv、阅读笔记、贡献、方法、优缺点、评价。
- 项目页：支持项目状态、技术栈、GitHub、Demo 链接和详情说明。
- 教程页：复用文章系统，适合软件教程、环境配置和工具链说明。
- 标签 / 分类：支持全站标签、分类索引和详情页。
- 归档：按年份和月份聚合所有公开内容。
- 搜索：基于 Fuse.js 的本地静态搜索，覆盖标题、摘要、标签、分类和正文。
- SEO：Open Graph metadata、`sitemap.xml`、`robots.txt`、`rss.xml`、manifest。
- GitHub Pages：内置静态导出配置和 GitHub Actions 自动部署工作流。
- 体验增强：深色 / 浅色模式、响应式布局、阅读进度条、返回顶部、复制代码按钮。
- 扩展预留：giscus 评论、Umami / Plausible 统计、多语言结构可继续扩展。

## 目录结构

```text
.
├── app
│   ├── page.tsx
│   ├── layout.tsx
│   ├── posts
│   ├── papers
│   ├── projects
│   ├── tutorials
│   ├── archive
│   ├── tags
│   ├── categories
│   ├── search
│   ├── about
│   ├── icon.svg
│   └── manifest.ts
├── components
│   ├── blog
│   ├── layout
│   ├── mdx
│   └── ui
├── content
│   ├── posts
│   ├── papers
│   ├── projects
│   └── tutorials
├── lib
│   ├── content.ts
│   ├── seo.ts
│   ├── types.ts
│   └── utils.ts
├── public
│   └── images
├── scripts
│   └── generate-static-files.mjs
├── .github
│   └── workflows
│       └── deploy-github-pages.yml
├── site.config.ts
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## 本地运行

环境要求：

- Node.js 18.17 或更高版本，推荐 Node.js 20 LTS。
- npm 9 或更高版本。
- 不需要数据库。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 查看网站。

生产构建：

```bash
npm run build
npm run start
```

`npm run build` 会输出静态文件到 `out` 目录。`npm run start` 会用本地静态服务器预览 `out`。

类型检查与代码检查：

```bash
npm run typecheck
npm run lint
```

如果终端提示 `npm` 不存在，请先安装 Node.js LTS，并重新打开终端确认：

```bash
node --version
npm --version
```

## 新增内容

在对应目录中新建 `.md` 或 `.mdx` 文件即可。文件名会成为 URL slug，例如：

```text
content/posts/my-first-note.mdx -> /posts/my-first-note
content/papers/my-paper-note.mdx -> /papers/my-paper-note
content/projects/my-project.mdx -> /projects/my-project
content/tutorials/my-tutorial.mdx -> /tutorials/my-tutorial
```

也可以从模板复制起步：

```text
content/templates/post-template.mdx
content/templates/paper-template.mdx
content/templates/project-template.mdx
content/templates/tutorial-template.mdx
```

普通文章 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要"
date: "2026-01-01"
updated: "2026-01-02"
tags: ["科研", "机器学习"]
categories: ["研究笔记"]
draft: false
cover: "/images/example.jpg"
---
```

论文笔记 frontmatter：

```yaml
---
title: "论文标题"
type: "paper"
description: "论文摘要或阅读说明"
authors: ["Author A", "Author B"]
venue: "NeurIPS"
year: 2025
doi: ""
arxiv: ""
tags: ["Deep Learning", "LLM"]
categories: ["论文阅读"]
draft: false
---
```

项目 frontmatter：

```yaml
---
title: "项目名称"
description: "项目简介"
date: "2026-01-01"
status: "进行中"
techStack: ["Next.js", "Python", "PyTorch"]
github: "https://github.com/example/project"
demo: ""
tags: ["科研项目", "开源"]
categories: ["项目"]
draft: false
---
```

`draft: true` 的内容在生产环境不会展示，开发环境可以预览。

推荐发布流程：

1. 从 `content/templates` 复制一个模板到目标内容目录。
2. 修改文件名，例如 `content/posts/research-note.mdx`。
3. 填写 frontmatter。
4. 写正文，使用 Markdown / MDX。
5. 本地运行 `npm run dev` 预览。
6. 确认无误后把 `draft` 改为 `false`。

## Markdown / MDX 能力

当前 MDX 渲染支持：

- 标题锚点和自动目录 TOC。
- 代码块高亮与复制按钮。
- LaTeX / KaTeX 数学公式，例如 `$$ E = mc^2 $$`。
- GFM 表格。
- 图片，建议放在 `public/images` 并使用 `/images/example.svg` 这类路径。
- 引用块、列表、外链、内链。
- 自定义 `Callout` 组件。

示例可以查看：

```text
content/tutorials/academic-mdx-writing.mdx
```

## SEO、RSS 与 Sitemap

项目已内置：

- 页面级 metadata 和 Open Graph。
- 内容详情页关键词、作者、发布时间、更新时间和标签 metadata。
- `/sitemap.xml` 自动收录页面、内容、标签和分类。
- `/rss.xml` 输出最近 30 条公开内容。
- `/robots.txt` 指向 sitemap。
- `/manifest.webmanifest` 和站点图标。
- `scripts/generate-static-files.mjs` 会在 `npm run dev` 和 `npm run build` 前自动生成 `public/rss.xml`、`public/sitemap.xml` 和 `public/robots.txt`。

部署前务必修改 `site.config.ts` 中的 `url`，否则 sitemap、RSS、canonical URL 和 Open Graph URL 会仍然使用示例域名。

## 站点配置

主要配置在 `site.config.ts`：

- 站点名称、描述、域名。
- 作者姓名、身份、头像、邮箱、GitHub、Google Scholar、ORCID。
- 导航菜单。
- 首页研究方向。
- 最新动态。
- giscus 评论和统计工具预留字段。
- Umami / Plausible 统计预留字段。

部署前请把：

```ts
url: "https://example.com"
```

改成你的真实站点域名，否则 sitemap、RSS 和 Open Graph URL 会指向示例域名。

## 部署到 GitHub Pages

项目已经内置 GitHub Actions 工作流：

```text
.github/workflows/deploy-github-pages.yml
```

推荐流程：

1. 在 GitHub 新建一个仓库。
2. 把本项目推送到仓库的 `main` 分支。
3. 进入仓库 `Settings -> Pages`。
4. `Build and deployment` 的 `Source` 选择 `GitHub Actions`。
5. 推送后等待 `Actions` 中的 `Deploy to GitHub Pages` 运行完成。

如果仓库名是普通仓库，例如：

```text
https://github.com/your-name/personal-lab-blog
```

最终地址通常是：

```text
https://your-name.github.io/personal-lab-blog/
```

如果仓库名是：

```text
your-name.github.io
```

最终地址通常是：

```text
https://your-name.github.io/
```

工作流会自动判断仓库名，并设置：

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_PATH`

因此部署到普通仓库子路径时，Next.js 静态资源路径也会自动适配。

### 手动本地构建 GitHub Pages 版本

普通仓库子路径部署时：

```bash
NEXT_PUBLIC_SITE_URL=https://your-name.github.io/repo-name NEXT_PUBLIC_BASE_PATH=/repo-name npm run build
```

Windows PowerShell：

```powershell
$env:NEXT_PUBLIC_SITE_URL="https://your-name.github.io/repo-name"
$env:NEXT_PUBLIC_BASE_PATH="/repo-name"
npm run build
```

用户主页仓库部署时：

```bash
NEXT_PUBLIC_SITE_URL=https://your-name.github.io npm run build
```

构建结果在 `out` 目录。

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 打开 Vercel，选择 `Add New Project`。
3. 导入该仓库。
4. Framework Preset 选择 `Next.js`。
5. Build Command 使用默认值 `npm run build`。
6. Output Directory 保持默认。
7. 部署完成后，在 `site.config.ts` 更新 `url` 为 Vercel 分配或你绑定的域名。

推荐在 Vercel 部署前本地执行：

```bash
npm run typecheck
npm run build
```

## 部署到 Netlify

构建命令：

```bash
npm run build
```

发布目录按 Netlify Next.js 插件默认配置即可。导入仓库时选择 Next.js 项目，Netlify 会自动识别。

如果使用 Netlify UI：

- Build command: `npm run build`
- Publish directory: 由 Next.js 插件自动处理
- Node version: 20

Vercel 也可以直接部署当前项目。由于项目已设置为静态导出，Vercel 会构建并发布静态站点。

## 移动端与阅读体验

- 顶部导航在手机端横向滚动。
- 列表页筛选面板在手机端优先显示，在桌面端固定在右侧。
- 文章详情页在手机端先显示论文 / 项目信息与目录，再进入正文。
- 长代码块、表格、数学公式会横向滚动，避免撑破屏幕。
- 正文图片自动响应式缩放。
- 中文阅读时间使用本地估算逻辑，不依赖英文分词。

## 额外依赖说明

- `next-mdx-remote`：在 App Router 中渲染本地 MDX 内容。
- `gray-matter`：解析 Markdown / MDX frontmatter。
- `remark-gfm`：支持表格、任务列表等 GitHub Flavored Markdown。
- `remark-math` 与 `rehype-katex`：支持 LaTeX / KaTeX 数学公式。
- `rehype-pretty-code` 与 `shiki`：代码块语法高亮。
- `rehype-slug` 与 `rehype-autolink-headings`：给标题生成锚点，支持 TOC。
- `fuse.js`：本地静态搜索。
- `next-themes`：深色 / 浅色模式。
- `lucide-react`：统一图标。

## 后续扩展方向

- 增加 BibTeX / RIS 引用导出。
- 增加论文图谱、项目图谱或主题知识图谱。
- 接入 giscus 评论。
- 接入 Umami / Plausible 统计。
- 为英文内容增加 `/en` 路由和多语言配置。
- 增加自动生成论文阅读模板的脚本。
- 增加 CI，在 Pull Request 中执行 `npm run build` 和 `npm run typecheck`。
