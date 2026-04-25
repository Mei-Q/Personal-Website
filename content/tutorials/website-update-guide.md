---
title: "网站内容与图片更新指南"
description: "整理个人实验室网站的日常维护流程，包括修改首页信息、新增文章、更新论文笔记、上传图片、本地预览和部署发布。"
date: "2026-04-25"
updated: "2026-04-25"
tags: ["网站维护", "Markdown", "Vercel", "GitHub Pages", "图片管理"]
categories: ["网站教程"]
draft: false
cover: "/images/tutorial-stack.svg"
---

## 这篇指南解决什么问题

这份指南用于记录本站的日常更新流程。以后想修改个人资料、研究方向、文章内容、论文阅读笔记、项目展示、教程页面或网站图片时，可以直接按这里的步骤操作。

本站内容主要通过 Markdown 文件维护，不需要数据库。只要把内容文件放到对应目录，再推送到 GitHub，Vercel 主站和 GitHub Pages 镜像站就会自动重新部署。

## 项目目录

当前网站项目位于：

```text
D:\Sweet_Lemon\Desktop\Personal website
```

常用目录如下：

| 目录或文件 | 用途 |
| --- | --- |
| `site.config.ts` | 网站名称、作者信息、导航、研究方向、最新动态、联系方式 |
| `content/posts` | 普通文章、研究笔记、经验总结 |
| `content/papers` | 论文阅读笔记、论文总结 |
| `content/projects` | 科研项目、开源项目、实验项目 |
| `content/tutorials` | 软件教程、环境配置、网站维护说明 |
| `public/images` | 网站头像、封面图、文章插图、项目截图 |
| `public/files` | PDF、DOCX、ZIP、数据文件等下载资料 |
| `README.md` | 项目安装、开发和部署说明 |

## 修改网站基本信息

网站的名称、简介、作者身份、研究方向、首页最新动态和社交链接主要在 `site.config.ts` 中维护。

常见修改位置：

```ts
export const siteConfig = {
  name: "Lemon Research Lab",
  shortName: "Lemon Lab",
  description: "一个用于科研记录、论文阅读、项目展示与资料分享的个人实验室主页。",
  author: {
    name: "Sweet Lemon",
    title: "Researcher / Full-stack Developer",
    affiliation: "Personal Research Lab",
    email: "hello@example.com",
    avatar: "/images/avatar.svg"
  }
};
```

如果要换头像，只需要把新图片放到 `public/images`，然后把 `avatar` 改成新的路径，例如：

```ts
avatar: "/images/avatar.png"
```

## 图片可以使用哪些格式

可以使用常见网页图片格式：

| 格式 | 适合场景 |
| --- | --- |
| `.png` | 截图、带透明背景的图片、图标 |
| `.jpg` / `.jpeg` | 照片、实验场景图、封面图 |
| `.webp` | 体积更小的网页图片 |
| `.svg` | 矢量图、Logo、简单插画 |

推荐把图片统一放在：

```text
public/images
```

例如你放入一张图片：

```text
public/images/lab-cover.jpg
```

在 Markdown 正文里这样引用：

```md
![实验室工作台](/images/lab-cover.jpg)
```

在文章 frontmatter 中作为封面图这样写：

```yaml
cover: "/images/lab-cover.jpg"
```

不要写成 `public/images/lab-cover.jpg`，网页访问时应该从 `/images/...` 开始。

## 上传 PDF / DOCX 作为独立内容

除了 `.md` 和 `.mdx`，本站也支持把 PDF、DOC、DOCX、PPTX、XLSX、CSV、ZIP 等文件作为独立内容发布。

推荐放置目录：

| 内容类型 | 文件目录 | 示例链接 |
| --- | --- | --- |
| 文章附件或 PDF 文章 | `public/files/posts` | `/posts/my-paper-note` |
| 论文原文或阅读资料 | `public/files/papers` | `/papers/transformer-reading` |
| 项目报告或压缩包 | `public/files/projects` | `/projects/research-dashboard` |
| 教程讲义或 Word 文档 | `public/files/tutorials` | `/tutorials/python-env-guide` |

例如你上传：

```text
public/files/tutorials/python-env-guide.pdf
```

网站会自动生成一个教程条目：

```text
/tutorials/python-env-guide
```

详情页会显示下载按钮。PDF 可以在浏览器里打开或下载，DOCX 通常会直接下载到本地。

### 给 PDF / DOCX 补充标题和标签

如果只上传文件，网站会用文件名生成标题。若想补充摘要、日期、标签、分类，可以在同一目录放一个同名 `.json` 文件。

例如：

```text
public/files/tutorials/python-env-guide.pdf
public/files/tutorials/python-env-guide.json
```

`python-env-guide.json` 可以这样写：

```json
{
  "title": "Python 科研环境配置讲义",
  "description": "一份可下载的 PDF 教程，整理 Python 虚拟环境、依赖管理和实验目录规范。",
  "date": "2026-04-25",
  "updated": "2026-04-25",
  "tags": ["Python", "开发环境", "PDF"],
  "categories": ["工具教程"],
  "draft": false,
  "downloadDescription": "适合离线阅读和打印的 PDF 版本。"
}
```

如果是论文资料，也可以补充作者、年份、会议等字段：

```json
{
  "title": "Attention Is All You Need 阅读资料",
  "description": "Transformer 论文原文和阅读材料下载。",
  "authors": ["Ashish Vaswani", "Noam Shazeer"],
  "venue": "NeurIPS",
  "year": 2017,
  "tags": ["Transformer", "Deep Learning"],
  "categories": ["论文阅读"],
  "draft": false
}
```

### 支持的文件格式

当前自动识别这些文件作为可下载内容：

```text
.pdf, .doc, .docx, .pptx, .xls, .xlsx, .csv, .zip, .rar, .7z, .txt
```

建议文件名使用英文小写和连字符，例如：

```text
python-env-guide.pdf
research-report-2026.docx
experiment-data.zip
```

这样生成的网址更稳定，也更适合分享。

## 给已有文章添加下载附件

如果一篇内容仍然使用 Markdown 编写，但你想额外提供 PDF、DOCX、代码压缩包或数据文件下载，可以在 frontmatter 中添加 `downloads` 字段。

示例：

```yaml
downloads:
  - label: "PDF 版本"
    href: "/files/posts/my-research-note.pdf"
    type: "PDF"
    size: "1.2 MB"
    description: "适合离线阅读和打印的版本。"
  - label: "Word 模板"
    href: "/files/tutorials/research-template.docx"
    type: "DOCX"
    description: "可直接编辑的笔记模板。"
```

完整示例：

```md
---
title: "文章标题"
description: "这里写文章摘要。"
date: "2026-04-25"
tags: ["科研", "教程"]
categories: ["研究笔记"]
draft: false
downloads:
  - label: "下载 PDF"
    href: "/files/posts/article.pdf"
    type: "PDF"
  - label: "下载 DOCX"
    href: "/files/posts/article.docx"
    type: "DOCX"
---

## 正文

这里写网页正文，右侧会自动出现下载资料面板。
```

也可以使用 `attachments` 字段，效果和 `downloads` 相同。

## 在正文中直接放下载链接

如果只想在正文某个位置放下载链接，可以这样写：

```md
[下载 PDF 讲义](/files/tutorials/python-env-guide.pdf)

[下载 Word 模板](/files/tutorials/research-template.docx)
```

网站会自动处理 GitHub Pages 镜像路径，本地文件链接也会按下载文件处理。
## 新增普通文章

普通文章放在：

```text
content/posts
```

新建文件示例：

```text
content/posts/my-research-note.md
```

推荐模板：

```md
---
title: "文章标题"
description: "这里写文章摘要，会显示在列表页和搜索结果中。"
date: "2026-04-25"
updated: "2026-04-25"
tags: ["科研", "机器学习"]
categories: ["研究笔记"]
draft: false
cover: "/images/lab-cover.jpg"
---

## 背景

这里写正文。

## 方法

可以写公式、代码、图片、表格和引用块。

## 小结

这里写你的结论和后续计划。
```

文件名会成为文章链接的一部分。例如 `my-research-note.md` 对应的链接是：

```text
/posts/my-research-note
```

## 新增论文阅读笔记

论文笔记放在：

```text
content/papers
```

新建文件示例：

```text
content/papers/attention-is-all-you-need.md
```

推荐模板：

```md
---
title: "Attention Is All You Need"
type: "paper"
description: "Transformer 论文阅读笔记，整理核心贡献、方法结构和个人评价。"
authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar"]
venue: "NeurIPS"
year: 2017
doi: ""
arxiv: "https://arxiv.org/abs/1706.03762"
date: "2026-04-25"
tags: ["Transformer", "Deep Learning", "NLP"]
categories: ["论文阅读"]
draft: false
cover: "/images/paper-cover.jpg"
---

## 阅读背景

这篇论文解决了什么问题，为什么值得读。

## 核心贡献

- 提出完全基于注意力机制的序列建模架构。
- 去掉循环结构，提高并行计算效率。

## 方法概述

这里概括模型结构、训练方式和关键公式。

## 优点

- 并行效率高。
- 架构扩展性强。

## 局限

- 对长上下文的计算复杂度较高。
- 对数据和算力有一定依赖。

## 个人评价

这里写你自己的理解、启发和后续可复现方向。
```

## 新增项目

项目内容放在：

```text
content/projects
```

新建文件示例：

```text
content/projects/research-dashboard.md
```

推荐模板：

```md
---
title: "Research Dashboard"
description: "用于管理实验记录、论文阅读和项目进度的个人科研仪表盘。"
date: "2026-04-25"
status: "进行中"
techStack: ["Next.js", "TypeScript", "Python"]
github: "https://github.com/example/research-dashboard"
demo: ""
tags: ["科研项目", "开源", "知识管理"]
categories: ["实验系统"]
draft: false
featured: true
cover: "/images/project-dashboard.jpg"
---

## 项目简介

这里介绍项目目标和使用场景。

## 主要功能

- 实验日志管理。
- 论文阅读记录。
- 项目进度追踪。

## 技术方案

这里写前端、后端、数据存储和部署方式。

## 当前状态

这里记录已完成内容和下一步计划。
```

如果希望项目显示在首页精选项目中，可以设置：

```yaml
featured: true
```

## 新增教程

教程内容放在：

```text
content/tutorials
```

新建文件示例：

```text
content/tutorials/install-python-env.md
```

推荐模板：

```md
---
title: "教程标题"
description: "这里写教程摘要。"
date: "2026-04-25"
updated: "2026-04-25"
tags: ["工具链", "教程"]
categories: ["工具教程"]
draft: false
cover: "/images/tutorial-stack.svg"
---

## 目标

这篇教程要解决什么问题。

## 准备工作

需要提前安装或准备什么。

## 操作步骤

1. 第一步。
2. 第二步。
3. 第三步。

## 常见问题

这里整理报错和解决方法。
```

## Markdown 常用写法

### 标题

```md
## 二级标题

### 三级标题
```

文章目录会自动读取二级标题和三级标题。

### 代码块

````md
```ts
const siteName = "Lemon Research Lab";
```
````

也可以给代码块加文件名：

````md
```powershell title="publish.ps1"
npm run build
```
````

### 数学公式

行内公式：

```md
损失函数可以写作 $L(\theta)$。
```

块级公式：

```md
$$
\mathcal{L}(\theta) = - \sum_{i=1}^{n} y_i \log p_\theta(y_i)
$$
```

### 表格

```md
| 字段 | 说明 |
| --- | --- |
| `title` | 标题 |
| `description` | 摘要 |
| `date` | 发布日期 |
```

### 引用块

```md
> 这里可以放论文原文短句、个人提醒或重要结论。
```

### 图片

```md
![图片说明](/images/example.png)
```

## 草稿与正式发布

如果一篇内容还没有写完，可以设置：

```yaml
draft: true
```

草稿在生产环境不会展示。写完后改成：

```yaml
draft: false
```

## 本地预览网站

进入项目目录：

```powershell
cd "D:\Sweet_Lemon\Desktop\Personal website"
```

如果 Node.js 已经加入系统 PATH，可以运行：

```powershell
npm run dev
```

如果你使用的是 `E:\node` 下的 Node.js，可以运行：

```powershell
E:\node\npm.cmd run dev
```

启动成功后，在浏览器打开：

```text
http://localhost:3000
```

修改 Markdown 文件后，一般刷新页面就能看到变化。

## 发布到线上网站

确认内容没问题后，把修改提交到 GitHub：

```powershell
cd "D:\Sweet_Lemon\Desktop\Personal website"

git --git-dir=gitdata-test --work-tree=. status --short
git --git-dir=gitdata-test --work-tree=. add .
git --git-dir=gitdata-test --work-tree=. commit -m "Update site content"
git --git-dir=gitdata-test --work-tree=. push origin main
```

推送成功后，两个站点会自动更新：

| 站点 | 说明 |
| --- | --- |
| Vercel 主站 | 推荐分享给别人访问，访问速度和 Next.js 支持更完整 |
| GitHub Pages 镜像 | 备用访问地址，适合作为静态镜像 |

## 更新图片后没有立即变化怎么办

如果你换了图片，但网页上还是旧图，通常是浏览器缓存或 CDN 缓存。

可以按顺序尝试：

1. 使用 `Ctrl + F5` 强制刷新。
2. 用无痕窗口打开页面。
3. 等待几分钟后再刷新。
4. 修改图片文件名，例如从 `avatar.png` 改成 `avatar-v2.png`，并同步更新引用路径。

## 常见问题

### 页面找不到新文章

检查这几项：

- 文件是否放在正确目录。
- 文件后缀是否是 `.md` 或 `.mdx`。
- frontmatter 是否包含 `title`、`date`、`draft` 等字段。
- `draft` 是否仍然是 `true`。
- 文件名是否包含奇怪符号，推荐使用英文小写和连字符。

### 图片显示不出来

检查这几项：

- 图片是否放在 `public/images`。
- Markdown 路径是否写成 `/images/xxx.png`。
- 文件名大小写是否完全一致。
- 图片格式是否是浏览器支持的格式。
- GitHub Pages 镜像是否已经完成最新一次部署。

### Vercel 和 GitHub Pages 显示不一致

通常是部署时间不同。Vercel 通常更快，GitHub Pages 可能需要多等一会儿。

可以分别检查：

- Vercel 的 Deployments 是否成功。
- GitHub 的 Actions 是否成功。
- 浏览器是否缓存了旧页面。

### Git 推送时遇到 SSL 证书错误

可以先尝试让 Git 使用 Windows 证书：

```powershell
git config --global http.sslBackend schannel
git config --global http.sslVerify true
```

然后重新推送：

```powershell
git --git-dir=gitdata-test --work-tree=. push origin main
```

## 推荐维护习惯

- 每篇内容使用清晰的英文文件名，例如 `llm-agent-notes.md`。
- 每篇文章都写 `description`，方便首页、搜索和 SEO 展示。
- 图片放入 `public/images` 后再引用，避免使用本地绝对路径。
- 重要内容先用 `draft: true` 保存，确认后再发布。
- 大图尽量压缩后上传，提升移动端加载速度。
- 每次更新后先本地预览，再推送发布。

## 最小更新流程

最常用的完整流程如下：

```powershell
cd "D:\Sweet_Lemon\Desktop\Personal website"

# 1. 修改或新增 Markdown 内容
# 2. 把图片放入 public/images，PDF/DOCX 等文件放入 public/files
# 3. 本地预览
E:\node\npm.cmd run dev

# 4. 另开一个 PowerShell 窗口提交并推送
git --git-dir=gitdata-test --work-tree=. status --short
git --git-dir=gitdata-test --work-tree=. add .
git --git-dir=gitdata-test --work-tree=. commit -m "Update site content"
git --git-dir=gitdata-test --work-tree=. push origin main
```

这样就可以完成一次内容更新。


