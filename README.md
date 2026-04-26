# Sweet Lemon Research Lab

一个面向科研、学术研究、论文阅读、项目展示和资料分享的个人实验室主页。项目基于 Next.js App Router、TypeScript、Tailwind CSS 和 MDX，内容通过本地 Markdown / MDX 文件与静态下载文件维护，不依赖数据库。

## 主要功能

- 首页：个人实验室简介、研究方向、代表论文、精选项目、最新动态和最近内容。
- 内容系统：`posts`、`papers`、`projects`、`tutorials` 四类内容，统一使用 frontmatter。
- 文件发布：支持将 PDF、DOCX、PPTX、XLSX、CSV、ZIP、Markdown 源文件等作为独立内容或下载附件。
- PDF 体验：本地 PDF 附件会在详情页自动生成在线预览。
- 学术 CV：提供 `/cv` 页面展示教育经历、研究方向、项目经历、技能和亮点。
- 文章详情：MDX 渲染、代码高亮、数学公式、目录 TOC、阅读时间、上一篇 / 下一篇、相关文章。
- 下载卡片：MDX 正文可使用 `DownloadCard` 展示 PDF、DOCX、ZIP 等资料。
- 搜索：基于 Fuse.js 的本地静态搜索，自动解析常见 PDF 文本流和 DOCX 正文，也支持同名 `.txt` 旁路文件补充搜索文本。
- SEO：Open Graph、自动生成的页面分享图、RSS、sitemap、robots、manifest。
- 体验增强：响应式布局、深色模式、阅读进度、返回顶部、代码复制、下载资料面板。
- 可配置增强：Umami / Plausible 访问统计。
- 质量保障：内容校验脚本和 GitHub Actions CI。

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
│   ├── cv
│   ├── about
│   ├── rss.xml
│   ├── sitemap.ts
│   └── robots.ts
├── components
├── content
│   ├── posts
│   ├── papers
│   ├── projects
│   ├── tutorials
│   └── templates
├── docs
├── lib
├── public
│   ├── images
│   └── files
│       ├── posts
│       ├── papers
│       ├── projects
│       ├── tutorials
│       └── about
├── scripts
│   ├── export-content-downloads.mjs
│   ├── generate-og-images.mjs
│   └── validate-content.mjs
├── site.config.ts
├── next.config.mjs
├── vercel.json
└── package.json
```

## 本地运行

推荐使用 Node.js 20。

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

常用检查：

```bash
npm run prepare:static
npm run validate:content
npm run typecheck
npm run lint
npm run build
```

## 新增 Markdown / MDX 内容

在对应目录中新建 `.md` 或 `.mdx` 文件即可。文件名会成为 URL slug。

```text
content/posts/my-note.mdx -> /posts/my-note
content/papers/my-paper.mdx -> /papers/my-paper
content/projects/my-project.mdx -> /projects/my-project
content/tutorials/my-tutorial.mdx -> /tutorials/my-tutorial
```

可以从模板复制：

```text
content/templates/post-template.mdx
content/templates/paper-template.mdx
content/templates/project-template.mdx
content/templates/tutorial-template.mdx
content/templates/paper-deep-reading-template.mdx
content/templates/project-report-template.mdx
content/templates/software-tutorial-template.mdx
```

`draft: true` 的内容不会在生产环境展示。

可以使用 `language` 标注内容语言，列表页和搜索页会自动提供语言筛选；不写时系统会根据正文粗略推断：

```yaml
language: "zh"
# 或
language: "en"
```

## 发布 PDF / DOCX / 下载文件

除了 Markdown / MDX，网站也支持把 PDF、DOC、DOCX、PPT、PPTX、XLS、XLSX、CSV、ZIP、RAR、7Z、TXT、BibTeX、TeX 等静态文件发布为内容或附件。

独立内容放置目录：

```text
public/files/posts      -> /posts/<file-name>
public/files/papers     -> /papers/<file-name>
public/files/projects   -> /projects/<file-name>
public/files/tutorials  -> /tutorials/<file-name>
```

例如放入：

```text
public/files/tutorials/python-env-guide.pdf
public/files/tutorials/python-env-guide.docx
```

网站会自动生成：

```text
/tutorials/python-env-guide
```

同名 PDF 和 DOCX 会合并到同一个详情页，并在“下载资料”面板中显示多个下载按钮。本地 PDF 附件会自动出现在详情页的“PDF 在线预览”区域。

如果要补充标题、摘要、标签和分类，可以添加同名 JSON 元数据文件：

```text
public/files/tutorials/python-env-guide.json
```

示例：

```json
{
  "title": "Python 科研环境配置讲义",
  "description": "一份可下载的 PDF / DOCX 教程。",
  "date": "2026-04-25",
  "tags": ["Python", "开发环境"],
  "categories": ["工具教程"],
  "draft": false
}
```

PDF / DOCX 会在构建时自动提取正文进入搜索索引。为了避免 Vercel 构建超时，默认只自动解析 8MB 以内的 PDF / DOCX，并把提取文本裁剪到约 120000 个字符；少数扫描版 PDF、复杂编码 PDF、大文件或旧版 `.doc` 无法稳定解析时，可以添加同名 `.txt` 文件补充关键词：

```text
public/files/tutorials/python-env-guide.pdf
public/files/tutorials/python-env-guide.txt
```

`.txt` 会进入搜索索引，但不会作为单独下载条目展示。Markdown / MDX 正文在构建前也会自动复制到 `public/files/<collection>`，因此文章和教程默认可以下载源文件。自动解析上限可通过 Vercel 环境变量 `CONTENT_EXTRACT_MAX_BYTES` 和 `CONTENT_EXTRACT_MAX_CHARS` 调整。

给已有 Markdown / MDX 内容添加下载附件，可以在 frontmatter 中使用 `downloads` 或 `attachments`：

```yaml
downloads:
  - label: "PDF 版本"
    href: "/files/posts/article.pdf"
    type: "PDF"
    size: "1.2 MB"
  - label: "Word 版本"
    href: "/files/posts/article.docx"
    type: "DOCX"
```

正文中也可以使用 MDX 下载卡片：

```mdx
<DownloadCard
  href="/files/tutorials/python-env-guide.pdf"
  label="下载 PDF 讲义"
  type="PDF"
  size="1.2 MB"
  description="适合离线阅读和打印的版本。"
/>
```

维护建议：文件名使用英文小写和连字符，例如 `research-report-2026.pdf`，避免中文路径和空格导致部署或分享链接不稳定。

## 内容校验

运行：

```bash
npm run validate:content
```

校验内容包括：

- Markdown / MDX frontmatter 是否能解析。
- `title`、`description`、`tags`、`categories`、`draft` 等字段类型是否合理。
- `downloads` / `attachments` 中的本地文件是否真实存在。
- `public/files` 下的同名 JSON 元数据是否能正确解析。
- 关键配置文件是否带 UTF-8 BOM。
- 构建前是否可以生成 Markdown / MDX 源文件下载和 Open Graph 分享图。

## 站点配置

主要配置文件：

```text
site.config.ts
```

可以修改：

- 站点名称、简介、URL。
- 作者姓名、身份、头像、邮箱、GitHub、学校主页、Google Scholar、ORCID。
- 首页研究方向、最新动态和学术 CV 内容。
- Umami / Plausible 统计配置。

## 访问统计

评论系统已经从当前项目中移除，网站保持静态、轻量和维护简单。访问统计默认不启用；如果需要，可以在 `site.config.ts` 中填写 Umami 或 Plausible 配置。

启用 Umami 或 Plausible：

```ts
analytics: {
  umamiWebsiteId: "...",
  umamiScriptUrl: "https://cloud.umami.is/script.js",
  plausibleDomain: "example.com"
}
```

## 部署到 Vercel

Vercel 是推荐主站部署方式。

1. 将代码推送到 GitHub。
2. 在 Vercel 导入仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用 `npm run build`。
5. Install Command 使用 `npm install` 或 `npm ci`。
6. Output Directory 保持空白。
7. 添加环境变量：

```text
NEXT_PUBLIC_SITE_URL=https://personal-website-kappa-gules-63.vercel.app
```

部署完成后检查：

```text
/
/posts
/papers
/projects
/tutorials
/search
/cv
/rss.xml
/sitemap.xml
/robots.txt
```

## GitHub Pages 镜像部署

项目保留 Vercel 作为主站，同时提供 GitHub Pages 静态镜像工作流：

```text
.github/workflows/deploy-github-pages.yml
```

镜像地址：

```text
https://mei-q.github.io/Personal-Website/
```

首次启用步骤：

1. 打开 GitHub 仓库。
2. 进入 `Settings -> Pages`。
3. 在 `Build and deployment` 中，将 `Source` 选择为 `GitHub Actions`。
4. 推送 `main` 分支后，GitHub Actions 会自动运行 `Deploy GitHub Pages Mirror`。
5. 部署成功后访问 `https://mei-q.github.io/Personal-Website/`。

GitHub Pages 构建时会启用静态导出，并设置：

```text
GITHUB_PAGES=true
NEXT_PUBLIC_BASE_PATH=/Personal-Website
NEXT_PUBLIC_SITE_URL=https://mei-q.github.io/Personal-Website
```

## GitHub Actions CI

项目包含基础 CI：

```text
.github/workflows/ci.yml
```

每次推送到 `main` 或创建 Pull Request 时，会自动运行：

```bash
npm run validate:content
npm run typecheck
npm run lint
npm run build
```

## 长期升级路线

长期规划见：

```text
docs/ROADMAP.md
```

真正的网页端上传和后台编辑需要登录、权限、后端接口和文件存储。当前项目保持静态优先，已为 Decap CMS / TinaCMS、Vercel Blob / S3 / Cloudflare R2、GitHub OAuth 和全文索引服务预留了内容结构与文档说明。

## 常用命令

```bash
npm run dev
npm run validate:content
npm run typecheck
npm run lint
npm run build
```

提交并推送内容更新：

```powershell
git --git-dir=gitdata-test --work-tree=. add .
git --git-dir=gitdata-test --work-tree=. commit -m "Update content"
git --git-dir=gitdata-test --work-tree=. push origin main
```

## 主要依赖

- `next-mdx-remote`：在 App Router 中渲染本地 MDX 内容。
- `gray-matter`：解析 Markdown / MDX frontmatter。
- `remark-gfm`：支持表格、任务列表等 GitHub Flavored Markdown。
- `remark-math` 和 `rehype-katex`：支持 LaTeX / KaTeX 数学公式。
- `rehype-pretty-code` 和 `shiki`：代码块语法高亮。
- `rehype-slug` 和 `rehype-autolink-headings`：标题锚点和 TOC。
- `fuse.js`：本地搜索。
- `next-themes`：深色 / 浅色模式。
- `lucide-react`：图标。
