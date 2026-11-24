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
      name: 'TronClass-Plus',
      description:
        '基于 Flutter 改造的 TronClass 校园客户端（重庆邮电大学适配版），完成重邮 CAS 统一身份认证与门户会话适配，修复登录页生命周期问题并加入手机端扫码诊断与异常记录。',
      tags: ['Flutter', 'Dart', 'Android', 'CAS Auth'],
      repoUrl: 'https://github.com/jumao555/TronClass-Plus',
      demoUrl: 'https://github.com/jumao555/TronClass-Plus/releases',
      status: 'Active',
      accentHue: 210,
    },
    {
      name: 'StudyAgent',
      description:
        '基于 Python 与 OpenAI Function Calling 打造的学习笔记检索 Agent，支持目录浏览、多关键词评分检索与按行读取上下文，并基于 SQLite 实现多轮对话状态持久化。',
      tags: ['Python', 'AI Agent', 'Tool Use', 'SQLite'],
      repoUrl: 'https://github.com/jumao555/StudyAgent',
      status: 'Building',
      accentHue: 172,
    },
    {
      name: 'SunnyWeather',
      description:
        '《第一行代码》Android 实战天气应用，基于 Kotlin 与 MVVM 架构，结合 Retrofit、ViewModel、LiveData 与协程实现城市搜索及实时、多日天气预报展示。',
      tags: ['Kotlin', 'Android', 'MVVM', 'Retrofit'],
      repoUrl: 'https://github.com/jumao555/SunnyWeather',
      status: 'Active',
      accentHue: 28,
    },
    {
      name: "Jumao's Space",
      description:
        '采用通透毛玻璃美学与动态色相系统打造的个人博客，基于 Vite + React 19 + TypeScript + Tailwind CSS v4 构建，通过 GitHub Actions 自动部署于 GitHub Pages。',
      tags: ['React 19', 'TypeScript', 'Tailwind v4', 'GitHub Pages'],
      repoUrl: 'https://github.com/jumao555/jumao555.github.io',
      demoUrl: 'https://jumao555.github.io',
      status: 'Active',
      accentHue: 262,
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
