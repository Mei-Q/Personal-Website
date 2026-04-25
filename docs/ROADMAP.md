# Roadmap

这份路线图记录网站后续可继续升级的方向。当前项目保持静态优先，不依赖数据库，适合 Vercel 和 GitHub Pages 双部署。

## 已落地

- 个人实验室主页、文章、论文、项目、教程、归档、标签、分类、搜索。
- Markdown / MDX 内容管理。
- PDF / DOCX / ZIP 等静态资料作为下载附件或独立内容。
- PDF 在线预览。
- 同名 `.txt` 旁路文件进入搜索索引，用于补充 PDF / DOCX 正文关键词。
- 学术 CV 页面。
- 可配置 giscus 评论。
- 可配置 Umami / Plausible 访问统计。
- 内容校验脚本与 GitHub Actions CI。

## 短期优化

- 补充正式个人简介、教育经历、项目经历和代表成果。
- 为每个重要项目增加截图、论文资料和复现实验说明。
- 为 PDF / DOCX 资料补充同名 `.json` 元数据和 `.txt` 搜索索引。
- 接入 giscus 评论和 Umami / Plausible 统计。

## 中期优化

- 为下载资料增加更细粒度的类型图标和分组展示。
- 为搜索结果增加“附件 / PDF / DOCX”标识。
- 为内容列表增加排序、年份过滤和精选筛选。
- 增加英文内容目录或 `/en` 路由。
- 使用 GitHub Releases、Git LFS 或对象存储管理大文件。

## 长期升级

真正的网页端上传和后台编辑需要登录、权限、后端接口和文件存储。可选方案：

1. Decap CMS / TinaCMS：适合用网页后台编辑 Markdown，并通过 GitHub 提交内容。
2. Vercel Blob / S3 / Cloudflare R2：适合存储大量 PDF、图片、数据集和压缩包。
3. GitHub OAuth：用于限制后台编辑权限。
4. 全文索引服务：如果 PDF / DOCX 很多，可以构建专门的搜索索引。

当前项目已经为这些方向预留了 `public/files`、内容元数据、下载面板、评论配置、统计配置和内容校验脚本。