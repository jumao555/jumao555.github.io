import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Archive, Hash } from 'lucide-react';
import { getAllPosts, getCategories } from '../lib/posts';

export function ArchivesPage() {
  const allPosts = getAllPosts();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const groupedByYear = useMemo(() => {
    const filtered =
      selectedCategory === '全部'
        ? allPosts
        : allPosts.filter((p) => p.category === selectedCategory);

    const groups = new Map<string, typeof filtered>();
    for (const post of filtered) {
      const year = post.date.slice(0, 4) || '2026';
      const list = groups.get(year) || [];
      list.push(post);
      groups.set(year, list);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [allPosts, selectedCategory]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-[2rem] p-6 sm:p-10"
      >
        {/* 页头 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-xs font-medium mb-2">
              <Archive className="w-4 h-4" />
              <span>TIMELINE ARCHIVES</span>
            </div>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              文章归档
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              目前已累计发布 {allPosts.length} 篇文章，按时间轨迹整理。
            </p>
          </div>
        </div>

        {/* 分类快捷过滤胶囊 */}
        <div className="flex items-center flex-wrap gap-2 mt-6 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory('全部')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === '全部'
                ? 'bg-accent text-white shadow-sm'
                : 'bg-black/4 dark:bg-white/6 text-[var(--text-secondary)] hover:text-accent'
            }`}
          >
            全部 ({allPosts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-black/4 dark:bg-white/6 text-[var(--text-secondary)] hover:text-accent'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* 仿 Fuwari 清爽虚线时间轴 */}
        <div className="space-y-9">
          {groupedByYear.map(([year, posts]) => (
            <section key={year}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold font-mono-code text-[var(--text-primary)]">
                  {year}
                </span>
                <span className="w-2.5 h-2.5 rounded-full ring-4 ring-accent/20 bg-accent" />
                <span className="text-xs text-[var(--text-muted)]">
                  {posts.length} 篇文章
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-1.5 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-px before:border-l before:border-dashed before:border-[var(--border-subtle)]">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/posts/${post.slug}`}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-2xl hover:bg-accent-soft transition-all"
                  >
                    {/* 悬浮拉长动态节点 */}
                    <span className="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-2 h-2 group-hover:h-5 rounded-full bg-[var(--text-muted)]/50 group-hover:bg-accent transition-all duration-200" />

                    <div className="flex items-baseline gap-3.5 min-w-0">
                      <span className="text-xs font-mono-code text-[var(--text-muted)] shrink-0">
                        {post.date.slice(5)}
                      </span>
                      <span className="text-[15px] font-medium text-[var(--text-primary)] group-hover:text-accent group-hover:translate-x-1 transition-all truncate">
                        {post.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-0.5 text-[11px] text-[var(--text-muted)] px-2 py-0.5 rounded-lg bg-black/4 dark:bg-white/6"
                        >
                          <Hash className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
