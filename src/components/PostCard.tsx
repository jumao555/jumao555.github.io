import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Folder, Pin, ArrowUpRight, Hash } from 'lucide-react';
import type { Post } from '../lib/posts';

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover rounded-3xl overflow-hidden group"
    >
      <Link
        to={`/posts/${post.slug}`}
        className={`flex flex-col ${post.cover ? 'md:flex-row' : ''} items-stretch`}
      >
        {/* 主文字区域 */}
        <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between min-w-0">
          <div>
            {/* 顶部元信息 */}
            <div className="flex items-center flex-wrap gap-x-3.5 gap-y-1.5 text-xs text-[var(--text-muted)] mb-3">
              {post.pinned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-soft text-accent font-medium">
                  <Pin className="w-3 h-3" />
                  置顶
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 font-mono-code">
                <Calendar className="w-3.5 h-3.5 text-accent/80" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-accent/80" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent/80" />
                约 {post.readingMinutes} 分钟
              </span>
            </div>

            {/* 标题 */}
            <h2 className="text-xl sm:text-[22px] font-bold tracking-tight text-[var(--text-primary)] group-hover:text-accent transition-colors flex items-start gap-2 leading-snug">
              <span className="inline-block w-1.5 h-6 rounded-full bg-accent mt-0.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              <span className="-ml-3.5 group-hover:ml-0 transition-all">{post.title}</span>
            </h2>

            {/* 摘要 */}
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)] line-clamp-2">
              {post.summary}
            </p>
          </div>

          {/* 底部标签与阅读引导 */}
          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
            <div className="flex items-center flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-lg text-xs bg-black/4 dark:bg-white/6 text-[var(--text-secondary)]"
                >
                  <Hash className="w-2.5 h-2.5 text-accent" />
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent shrink-0 group-hover:translate-x-0.5 transition-transform">
              阅读全文
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* 右侧可选封面图 */}
        {post.cover && (
          <div className="md:w-64 lg:w-72 shrink-0 overflow-hidden relative min-h-[190px] md:min-h-0">
            <img
              src={post.cover}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
          </div>
        )}
      </Link>
    </motion.article>
  );
}
