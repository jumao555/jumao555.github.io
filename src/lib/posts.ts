export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  cover?: string;
  pinned?: boolean;
  content: string;
  wordCount: number;
  readingMinutes: number;
  headings: TocHeading[];
}

// Vite 编译期自动扫描 src/content/posts/ 下的所有 .md 文章
const rawModules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[] | boolean>;
  content: string;
} {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: normalized.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const data: Record<string, string | string[] | boolean> = {};

  for (const line of frontmatterBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    const rawValue = trimmed.slice(colonIdx + 1).trim();

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      const inner = rawValue.slice(1, -1).trim();
      data[key] = inner
        ? inner
            .split(',')
            .map((item) => stripQuotes(item))
            .filter(Boolean)
        : [];
    } else if (rawValue === 'true' || rawValue === 'false') {
      data[key] = rawValue === 'true';
    } else {
      data[key] = stripQuotes(rawValue);
    }
  }

  return { data, content: body.trim() };
}

// 与 rehype-slug / github-slugger 保持一致的中文友好标题锚点生成
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{}\\|;:'",.<>/?]/g, '')
    .replace(/\s+/g, '-');
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const usedIds = new Map<string, number>();
  let inCodeBlock = false;

  for (const line of markdown.split('\n')) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`~]/g, '').trim();
    const baseId = slugifyHeading(text);
    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    headings.push({ id, text, level });
  }
  return headings;
}

function countWords(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`[\]()!-]/g, ' ');
  const cnChars = (plain.match(/[\u4e00-\u9fa5]/g) || []).length;
  const enWords = (plain.match(/[A-Za-z0-9_]+/g) || []).length;
  return cnChars + enWords;
}

const parsedPosts: Post[] = Object.entries(rawModules)
  .map(([filePath, raw]) => {
    const fileName = filePath.split('/').pop() ?? 'untitled.md';
    const slug = fileName.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    const wordCount = countWords(content);
    const readingMinutes = Math.max(1, Math.ceil(wordCount / 320));

    return {
      slug,
      title: String(data.title || slug),
      date: String(data.date || '2026-11-24'),
      summary: String(data.summary || content.slice(0, 110).replace(/\n/g, ' ') + '...'),
      category: String(data.category || '随笔'),
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover ? String(data.cover) : undefined,
      pinned: Boolean(data.pinned),
      content,
      wordCount,
      readingMinutes,
      headings: extractHeadings(content),
    };
  })
  .sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.date.localeCompare(a.date);
  });

export function getAllPosts(): Post[] {
  return parsedPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return parsedPosts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): { prev?: Post; next?: Post } {
  const index = parsedPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? parsedPosts[index - 1] : undefined,
    next: index < parsedPosts.length - 1 ? parsedPosts[index + 1] : undefined,
  };
}

export function getCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of parsedPosts) {
    map.set(post.category, (map.get(post.category) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTags(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of parsedPosts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function searchPosts(query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) return parsedPosts.slice(0, 6);
  return parsedPosts.filter((post) => {
    const haystack = [
      post.title,
      post.summary,
      post.category,
      post.tags.join(' '),
      post.content,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
