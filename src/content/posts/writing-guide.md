---
title: 写作与发布指南：三步更新你的 GitHub 个人博客
date: 2026-11-22
category: 使用指南
tags: [Markdown, GitHub Pages, 工作流]
summary: 一份极简的维护手册：教你如何修改个人资料、用 Markdown 撰写新文章，以及如何通过 Git 推送触发自动部署。
---

维护这座博客并不需要繁琐的后台数据库，所有文章都以纯文本 Markdown 形式保存在你的 Git 仓库里，天然拥有版本控制与永久备份。

## 第一步：修改你的个人资料

打开项目里的 `src/config/site.ts`，里面集中管理了整站的个性化配置：

- 网站标题、副标题、个人昵称与签名
- 头像（`public/images/avatar.jpg`）与首页封面（`public/images/hero-banner.jpg`）
- 社交链接、技术栈标签与「项目」页作品清单

修改保存后，全站会自动同步更新。

## 第二步：写一篇新文章

只需在 `src/content/posts/` 目录下新建一个 `.md` 文件（例如 `my-first-note.md`），在文件顶部写上 Frontmatter 元信息即可：

```markdown
---
title: 我的第一篇随笔
date: 2026-11-25
category: 随笔
tags: [思考, 日常]
summary: 用一句话概括这篇文章的核心内容。
---

这里开始写正文内容，支持 **加粗**、列表、表格、引用和代码块！
```

### 支持哪些 Frontmatter 字段？

1. `title`：文章标题（必填）
2. `date`：发布日期，格式 `YYYY-MM-DD`，列表会自动按日期倒序排列
3. `category`：分类名称，侧边栏和归档页会自动聚合统计
4. `tags`：标签数组，如 `[前端, 设计]`
5. `cover`：可选封面图路径，如 `/images/post-design.jpg`
6. `pinned`：设为 `true` 时会置顶在首页第一位

## 第三步：推送即自动上线

写完后只需执行常规的 Git 提交命令：

```bash
git add .
git commit -m "post: 添加新文章"
git push origin main
```

GitHub Actions 会自动拉取代码、执行 `npm run build` 并将产物部署到 `https://jumao555.github.io`，通常 1 分钟左右即可生效。
