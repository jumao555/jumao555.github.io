---
title: 你好，欢迎来到我的通透数字花园
date: 2026-11-24
category: 建站札记
tags: [设计美学, 毛玻璃, React, 博客]
cover: /images/post-design.jpg
pinned: true
summary: 灵感源自 Innei 与 Fuwari 的通透毛玻璃美学：支持全站动态主题色相调节、圆形涟漪暗黑切换、Ctrl+K 实时检索以及开箱即用的 Markdown 写作流。
---

欢迎光临 **Jumao's Space**！这是我从零搭建的个人博客与数字花园，用来安放代码笔记、设计灵感与生活碎片。

> “好的个人网站就像一间阳光通透的书房——不必喧嚣，但推门而入的瞬间，每一处光影与留白都让人感到舒适。”

## 这座博客的设计巧思

在视觉语言上，本站融合了现代中文独立博客的通透感与克制的微交互细节：

- **全站实时调色盘**：点击顶部导航栏的调色板图标，你可以自由滑动 `0° ~ 360°` 色相环，或一键切换「晴空蓝 / 翡翠青 / 樱花粉 / 暮光紫 / 琥珀橙」，全站光晕、卡片边框、标签与代码高亮强调色都会实时同步。
- **涟漪式暗黑模式**：借助浏览器原生 `View Transitions API`，切换明暗模式时会从点击处向外丝滑展开光影过渡。
- **全局快捷搜索**：随时按下 `Ctrl + K`（macOS 为 `⌘ + K`），即可在毫秒间模糊搜索所有文章标题、标签与正文。
- **纯净 Markdown 工作流**：虽然由 Vite + React 驱动，但你依然只需把 `.md` 文件放进指定目录，站点就会自动生成目录（TOC）、字数与阅读时长估算。

## 一段优雅的代码示例

文章内建了暗色质感代码卡片，自带语言标识与一键复制按钮：

```tsx
// 动态色相驱动通透毛玻璃视觉系统
export function applyThemeHue(hue: number) {
  const clamped = Math.max(0, Math.min(360, hue));
  document.documentElement.style.setProperty('--hue', String(clamped));
  localStorage.setItem('blog-hue', String(clamped));
}
```

## 技术选型一览

| 模块 | 选型方案 | 亮点说明 |
| :--- | :--- | :--- |
| 构建与框架 | Vite 6 + React 19 | 秒级热更新，组件扩展自由度极高 |
| 样式体系 | Tailwind CSS v4 + CSS 变量 | 原生毛玻璃与动态 `--hue` 色彩引擎 |
| 动效引擎 | Framer Motion | 自然的弹簧物理过渡与页面入场节奏 |
| 托管部署 | GitHub Pages + Actions | 推送 `main` 分支即自动构建上线 |

希望你在这里逛得开心，也欢迎点击文章右下角的小爱心打个招呼！
