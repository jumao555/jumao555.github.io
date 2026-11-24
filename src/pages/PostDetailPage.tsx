import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Folder,
  Hash,
  FileText,
  Copy,
  Check,
  Heart,
  List,
} from 'lucide-react';
import { getAdjacentPosts, getPostBySlug } from '../lib/posts';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return '';
}

function CodeBlock({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  let language = 'text';
  if (React.isValidElement<{ className?: string }>(children)) {
    const cls = children.props.className || '';
    const match = cls.match(/language-([\w-]+)/);
    if (match) language = match[1];
  }

  const rawCode = extractText(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="my-5 rounded-2xl overflow-hidden bg-[#131926] border border-slate-700/50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-xs font-mono-code uppercase tracking-wider text-slate-400">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制代码</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-[13.5px] leading-relaxed font-mono-code m-0">
        {children}
      </pre>
    </div>
  );
}

export function PostDetailPage() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  useEffect(() => {
    if (!post) return;
    try {
      const savedLiked = localStorage.getItem(`post-liked-${post.slug}`) === '1';
      const baseCount = 8 + (post.slug.length % 11);
      setLiked(savedLiked);
      setLikeCount(savedLiked ? baseCount + 1 : baseCount);
    } catch {
      // ignore
    }
  }, [post]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  useEffect(() => {
    if (!post || post.headings.length === 0) return;
    const elements = post.headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;
    setActiveHeading(elements[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  const handleToggleLike = () => {
    if (!post) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((c) => (nextLiked ? c + 1 : c - 1));
    try {
      localStorage.setItem(`post-liked-${post.slug}`, nextLiked ? '1' : '0');
    } catch {
      // ignore
    }
  };

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-16 text-center">
        <div className="glass-card rounded-3xl p-12">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            文章未找到
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            这篇文章可能已被移动或删除。
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 顶部极细阅读进度条 */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, hsl(var(--hue), 85%, 56%), hsl(calc(var(--hue) + 36), 88%, 64%))',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28">
        <div className="mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-card text-xs sm:text-sm text-[var(--text-secondary)] hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回文章列表
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] gap-6 xl:gap-8 items-start">
          {/* 正文毛玻璃卡片 */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-[2rem] overflow-hidden min-w-0"
          >
            {/* 可选头图 */}
            {post.cover && (
              <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-10 md:p-12">
              {/* 文章头部信息 */}
              <header className="pb-7 mb-8 border-b border-[var(--border-subtle)]">
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <Link
                    to={`/?category=${encodeURIComponent(post.category)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent-soft text-accent text-xs font-medium hover:opacity-85 transition-opacity"
                  >
                    <Folder className="w-3.5 h-3.5" />
                    {post.category}
                  </Link>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-xl bg-black/4 dark:bg-white/6 text-xs text-[var(--text-secondary)] hover:text-accent transition-colors"
                    >
                      <Hash className="w-3 h-3 text-accent" />
                      {tag}
                    </Link>
                  ))}
                </div>

                <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                  {post.title}
                </h1>

                <div className="mt-5 flex items-center flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5 font-mono-code">
                    <Calendar className="w-4 h-4 text-accent/80" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-accent/80" />
                    约 {post.wordCount} 字
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent/80" />
                    预计阅读 {post.readingMinutes} 分钟
                  </span>
                </div>
              </header>

              {/* Markdown 正文 */}
              <div className="prose-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeHighlight]}
                  components={{
                    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* 底部点赞互动栏 */}
              <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  如果这篇文章对你有启发，欢迎点个赞支持一下 ✨
                </p>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={handleToggleLike}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                    liked
                      ? 'bg-rose-500/15 text-rose-500 border border-rose-400/40 shadow-sm'
                      : 'bg-accent-soft text-accent border border-accent/30 hover:scale-[1.03]'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      liked ? 'fill-rose-500 scale-110' : ''
                    }`}
                  />
                  <span>{liked ? '已赞' : '喜欢这篇'}</span>
                  <span className="font-mono-code text-xs opacity-85">
                    {likeCount}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.article>

          {/* 右侧悬浮目录 TOC */}
          {post.headings.length > 0 && (
            <aside className="hidden xl:block sticky top-24">
              <div className="glass-card rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-3.5 text-sm font-semibold text-[var(--text-primary)]">
                  <List className="w-4 h-4 text-accent" />
                  <span>文章目录</span>
                </div>
                <nav className="space-y-1 max-h-[65vh] overflow-y-auto pr-1">
                  {post.headings.map((h) => {
                    const active = activeHeading === h.id;
                    return (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block py-1.5 rounded-xl text-[13px] transition-all truncate ${
                          h.level === 3 ? 'pl-6 pr-2.5' : 'px-3'
                        } ${
                          active
                            ? 'bg-accent-soft text-accent font-medium'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/4 dark:hover:bg-white/6'
                        }`}
                      >
                        {h.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* 上一篇 / 下一篇导航 */}
        {(prev || next) && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 xl:max-w-[calc(100%-292px)]">
            {prev ? (
              <Link
                to={`/posts/${prev.slug}`}
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-3 group"
              >
                <ArrowLeft className="w-4 h-4 text-accent shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <div className="text-xs text-[var(--text-muted)]">上一篇</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-accent truncate mt-0.5">
                    {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                to={`/posts/${next.slug}`}
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center justify-end gap-3 text-right group"
              >
                <div className="min-w-0">
                  <div className="text-xs text-[var(--text-muted)]">下一篇</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-accent truncate mt-0.5">
                    {next.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
