export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'mail' | 'globe' | 'rss';
}

export interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  status: 'Active' | 'Building' | 'Archived';
  accentHue: number;
}

export interface PresetHue {
  name: string;
  hue: number;
}

export const SITE_CONFIG = {
  title: "Jumao's Space",
  subtitle: '在代码与光影之间，记录值得回味的思考与作品',
  author: 'Jumao',
  handle: '@jumao555',
  bio: '目前是一名大二学生，主攻 Android 客户端开发，同时持续探索 AI Agent 的设计与实践。',
  location: 'China',
  statusText: '正在打磨新想法 ✨',
  avatar: '/images/avatar.jpg',
  heroBanner: '/images/hero-banner.jpg',
  defaultHue: 210,
  startYear: 2026,
  githubUsername: 'jumao555',
  email: '2124166371@qq.com',
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/jumao555',
      icon: 'github',
    },
    {
      name: 'Email',
      url: 'mailto:2124166371@qq.com',
      icon: 'mail',
    },
    {
      name: 'Site',
      url: 'https://jumao555.github.io',
      icon: 'globe',
    },
  ] as SocialLink[],

  presetHues: [
    { name: '晴空蓝', hue: 210 },
    { name: '翡翠青', hue: 172 },
    { name: '樱花粉', hue: 336 },
    { name: '暮光紫', hue: 262 },
    { name: '琥珀橙', hue: 28 },
  ] as PresetHue[],

  projects: [
    {
      name: "Jumao's Space",
      description:
        '采用通透毛玻璃美学与动态色相系统打造的个人博客，基于 Vite + React + Markdown 构建，自动部署于 GitHub Pages。',
      tags: ['React 19', 'Vite', 'Tailwind v4', 'Glassmorphism'],
      repoUrl: 'https://github.com/jumao555/jumao555.github.io',
      demoUrl: 'https://jumao555.github.io',
      status: 'Active',
      accentHue: 210,
    },
    {
      name: 'Lumina Notes',
      description:
        '一款面向开发者的轻量化双链笔记实验项目，支持本地 Markdown 双向引用、快捷键命令面板与极速全文检索。',
      tags: ['TypeScript', 'Local-First', 'Markdown'],
      repoUrl: 'https://github.com/jumao555',
      status: 'Building',
      accentHue: 172,
    },
    {
      name: 'Prism UI Kit',
      description:
        '围绕细腻微交互、毛玻璃层次感与无障碍键盘导航设计的精巧前端组件集合，专注桌面与移动端的顺滑手感。',
      tags: ['Framer Motion', 'Design System', 'CSS'],
      repoUrl: 'https://github.com/jumao555',
      status: 'Active',
      accentHue: 262,
    },
    {
      name: 'Prompt Craft Studio',
      description:
        '用于日常整理与对比结构化 Prompt 模板的小工具，支持变量填充、版本记录与一键导出 Markdown。',
      tags: ['AI Workflow', 'React', 'Productivity'],
      repoUrl: 'https://github.com/jumao555',
      status: 'Building',
      accentHue: 336,
    },
  ] as ProjectItem[],

  techStack: [
    'Kotlin',
    'Java',
    'Jetpack Compose',
    'Android SDK',
    'Coroutines & Flow',
    'Retrofit & OkHttp',
    'MVVM & Jetpack',
    'Git & Gradle',
  ],

  timeline: [
    {
      date: '2026.11',
      title: '个人数字花园正式启航',
      detail: '从零设计了通透毛玻璃风格的个人博客，配置好 Markdown 自动解析与 GitHub Actions 自动部署。',
    },
    {
      date: '持续更新',
      title: '记录前端设计、工程实践与生活随笔',
      detail: '把零散的灵感整理成可复用、可分享的文章，保持好奇心与长期主义。',
    },
  ],
};
