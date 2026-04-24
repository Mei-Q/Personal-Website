# Lemon Research Lab

一个面向科研、学术研究、资料分享的个人实验室博客网站。项目基于 Next.js App Router、TypeScript、Tailwind CSS 和 MDX，内容通过本地 Markdown / MDX 文件维护，不依赖数据库，推荐部署到 Vercel。

## 功能概览

- 首页：个人实验室简介、研究方向、代表论文、代表项目、最新动态、最近内容。
- 内容系统：`posts`、`papers`、`projects`、`tutorials` 四类内容，统一使用 frontmatter。
- 文章详情：MDX 渲染、代码高亮、数学公式、目录 TOC、阅读时间、上一篇 / 下一篇、相关文章。
- 论文页：支持作者、年份、会议 / 期刊、DOI、arXiv、阅读笔记、贡献、方法、优缺点、评价。
- 项目页：支持项目状态、技术栈、GitHub、Demo 链接和详情说明。
- 标签 / 分类：支持全站标签、分类索引和详情页。
- 归档：按年份和月份聚合所有公开内容。
- 搜索：基于 Fuse.js 的本地搜索，覆盖标题、摘要、标签、分类和正文。
- SEO：Open Graph metadata、`sitemap.xml`、`robots.txt`、`rss.xml`、manifest。
- 体验增强：深色 / 浅色模式、响应式布局、阅读进度条、返回顶部、复制代码按钮。

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
│   ├── rss.xml
│   ├── sitemap.ts
│   └── robots.ts
├── components
│   ├── blog
│   ├── layout
│   ├── mdx
│   └── ui
├── content
│   ├── posts
│   ├── papers
│   ├── projects
│   ├── tutorials
│   └── templates
├── lib
├── public
├── site.config.ts
├── vercel.json
├── next.config.mjs
└── package.json
```

## 本地运行

环境要求：

- Node.js 20 或更高版本。
- npm 9 或更高版本。
- 不需要数据库。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 查看网站。

生产构建：

```bash
npm run typecheck
npm run build
npm run start
```

## 新增内容

在对应目录中新建 `.md` 或 `.mdx` 文件即可。文件名会成为 URL slug：

```text
content/posts/my-note.mdx -> /posts/my-note
content/papers/my-paper.mdx -> /papers/my-paper
content/projects/my-project.mdx -> /projects/my-project
content/tutorials/my-tutorial.mdx -> /tutorials/my-tutorial
```

也可以从模板复制：

```text
content/templates/post-template.mdx
content/templates/paper-template.mdx
content/templates/project-template.mdx
content/templates/tutorial-template.mdx
```

`draft: true` 的内容在生产环境不会展示，开发环境可以预览。

## MDX 支持

- 代码块高亮与复制按钮。
- LaTeX / KaTeX 数学公式。
- GFM 表格。
- 图片、引用块、列表、外链、内链。
- 标题锚点与自动目录。
- 自定义 `Callout` 组件。

示例见：

```text
content/tutorials/academic-mdx-writing.mdx
```

## 站点配置

主要配置在 `site.config.ts`：

- 站点名称、描述、域名。
- 作者姓名、身份、头像、邮箱、GitHub、Google Scholar、ORCID。
- 导航菜单。
- 首页研究方向。
- 最新动态。
- giscus 评论和 Umami / Plausible 统计预留字段。

生产部署时推荐在 Vercel 环境变量中配置：

```text
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

如果绑定了自定义域名，就改成你的自定义域名。

## 部署到 Vercel

项目已准备好 Vercel 配置：

```text
vercel.json
```

推荐流程：

1. 将项目推送到 GitHub。
2. 打开 Vercel，选择 `Add New Project`。
3. 导入你的 GitHub 仓库。
4. Framework Preset 选择 `Next.js`。
5. Build Command 使用 `npm run build`。
6. Install Command 使用 `npm install`。
7. Output Directory 保持空白。
8. 在 Environment Variables 添加：

```text
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

部署完成后，检查：

```text
/
/posts
/papers
/projects
/tutorials
/search
/rss.xml
/sitemap.xml
/robots.txt
```

## 依赖说明

- `next-mdx-remote`：在 App Router 中渲染本地 MDX 内容。
- `gray-matter`：解析 Markdown / MDX frontmatter。
- `remark-gfm`：支持表格、任务列表等 GitHub Flavored Markdown。
- `remark-math` 与 `rehype-katex`：支持 LaTeX / KaTeX 数学公式。
- `rehype-pretty-code` 与 `shiki`：代码块语法高亮。
- `rehype-slug` 与 `rehype-autolink-headings`：给标题生成锚点，支持 TOC。
- `fuse.js`：本地搜索。
- `next-themes`：深色 / 浅色模式。
- `lucide-react`：图标。
