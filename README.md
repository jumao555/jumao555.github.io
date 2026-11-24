# Jumao's Space — 通透毛玻璃个人博客

灵感源自 **Innei** 与 **Fuwari** 的通透毛玻璃现代清新风个人博客，基于 **Vite + React 19 + TypeScript + Tailwind CSS v4** 构建，支持原生 Markdown 写作与 **GitHub Actions** 全自动部署。

## 核心特性

- **通透毛玻璃美学**：流动渐变氛围光晕、柔和留白、暗黑黑曜石质感卡片
- **全站实时主题色相**：顶部调色盘自由调节 `0° ~ 360°` 色相与 5 套预设主题色
- **涟漪式明暗切换**：支持浏览器原生 View Transitions 圆形水波扩散动画
- **Markdown 原生写作**：往 `src/content/posts/` 放入 `.md` 文件即可自动生成列表、分类、标签、目录（TOC）与阅读时长
- **全局快捷搜索**：按 `Ctrl + K` / `⌘ + K` 毫秒级模糊检索文章
- **GitHub Pages 自动部署**：推送到 `main` 分支后自动构建并发布

## 本地开发

```bash
npm install
npm run dev
```

## 写新文章

在 `src/content/posts/` 新建 `.md` 文件，顶部添加 Frontmatter 即可：

```markdown
---
title: 文章标题
date: 2026-11-24
category: 分类名
tags: [标签1, 标签2]
summary: 一句话摘要
---

正文内容...
```

## 修改个人信息

编辑 `src/config/site.ts` 即可修改站点标题、昵称、头像、封面、社交链接、项目清单与技术栈。
