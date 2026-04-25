# Lemon Research Lab

一个面向科研、学术研究、论文阅读、项目展示和资料分享的个人实验室主页。项目基于 Next.js App Router、TypeScript、Tailwind CSS 和 MDX，内容通过本地 Markdown / MDX 文件维护，不依赖数据库。

## 主要功能

- 首页：个人实验室简介、研究方向、代表论文、精选项目、最新动态和最近内容。
- 内容系统：`posts`、`papers`、`projects`、`tutorials` 四类内容，统一使用 frontmatter。
- 文章详情：MDX 渲染、代码高亮、数学公式、目录 TOC、阅读时间、上一篇 / 下一篇、相关文章。
- 论文页面：支持作者、年份、会议 / 期刊、DOI、arXiv、阅读笔记、贡献、方法、优缺点和个人评价。
- 项目页面：支持项目状态、技术栈、GitHub 链接、Demo 链接和详情页。
- 标签 / 分类 / 归档：适合长期内容积累。
- 搜索：基于 Fuse.js 的本地静态搜索。
- SEO：Open Graph、RSS、sitemap、robots、manifest。
- 体验增强：响应式布局、深色模式、阅读进度、返回顶部、代码复制。

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
├── content
│   ├── posts
│   ├── papers
│   ├── projects
│   ├── tutorials
│   └── templates
├── lib
├── public
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

生产构建：

```bash
npm run typecheck
npm run build
npm run start
```

## 新增内容

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
```

`draft: true` 的内容不会在生产环境展示。

## 站点配置

主要配置文件：

```text
site.config.ts
```

可以修改：

- 站点名称、简介、URL。
- 作者姓名、身份、头像、邮箱、GitHub、Google Scholar、ORCID。
- 导航菜单。
- 首页研究方向和最新动态。
- giscus 评论、Umami / Plausible 统计预留字段。

Vercel 主站环境变量：

```text
NEXT_PUBLIC_SITE_URL=https://personal-website-kappa-gules-63.vercel.app
```

## 部署到 Vercel

Vercel 是推荐主站部署方式。

1. 将代码推送到 GitHub。
2. 在 Vercel 导入仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用 `npm run build`。
5. Install Command 使用 `npm install`。
6. Output Directory 保持空白。
7. 添加环境变量：

```text
NEXT_PUBLIC_SITE_URL=https://personal-website-sweetlemon.vercel.app
```

部署完成后检查：

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

Vercel 不会使用这些变量，因此主站部署不受影响。

## 常用命令

```bash
npm run dev
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
