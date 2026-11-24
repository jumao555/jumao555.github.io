import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, X, ArrowDown, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllPosts } from '../lib/posts';
import { Sidebar } from '../components/Sidebar';
import { PostCard } from '../components/PostCard';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const activeTag = searchParams.get('tag');
  const allPosts = getAllPosts();

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (activeTag && !post.tags.includes(activeTag)) return false;
      return true;
    });
  }, [allPosts, activeCategory, activeTag]);

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-22 sm:pt-24">
      {/* 顶部通透风景 Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[2rem] overflow-hidden mb-8 sm:mb-10 shadow-xl border border-white/70 dark:border-white/10 group"
      >
        <div className="relative h-[260px] sm:h-[330px] md:h-[370px] w-full overflow-hidden">
          <img
            src={SITE_CONFIG.heroBanner}
            alt={SITE_CONFIG.title}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
          {/* 柔和光影遮罩，确保前景文字清晰通透 */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/20 to-slate-900/10" />
          <div
            className="absolute inset-0 opacity-25 mix-blend-soft-light"
            style={{
              background:
                'linear-gradient(125deg, hsla(var(--hue), 90%, 65%, 0.7), transparent 60%)',
            }}
          />

          {/* Hero 内容 */}
          <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/18 backdrop-blur-md border border-white/30 text-white/95 text-xs font-medium mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome to my digital garden</span>
              </div>

              <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-sm">
                {SITE_CONFIG.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base md:text-[17px] text-white/90 leading-relaxed max-w-xl drop-shadow-sm">
                {SITE_CONFIG.subtitle}
              </p>

              <div className="mt-5 flex items-center flex-wrap gap-3">
                <a
                  href="#posts-feed"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs sm:text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>开始阅读</span>
                  <ArrowDown className="w-3.5 h-3.5 opacity-70" />
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/16 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5"
                >
                  关于我
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 主体双栏区域 */}
      <div
        id="posts-feed"
        className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-6 xl:gap-8 items-start scroll-mt-24"
      >
        {/* 左侧边栏（桌面在左，移动端在下方） */}
        <div className="order-2 lg:order-1">
          <Sidebar activeCategory={activeCategory} activeTag={activeTag} />
        </div>

        {/* 右侧文章列表流 */}
        <main className="order-1 lg:order-2 space-y-5 min-w-0">
          {/* 当前筛选状态提示 */}
          {(activeCategory || activeTag) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between gap-3"
            >
              <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2 flex-wrap">
                <span>正在浏览</span>
                {activeCategory && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-accent-soft text-accent font-medium">
                    分类：{activeCategory}
                  </span>
                )}
                {activeTag && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-accent-soft text-accent font-medium">
                    标签：#{activeTag}
                  </span>
                )}
                <span className="text-xs text-[var(--text-muted)]">
                  （共 {filteredPosts.length} 篇）
                </span>
              </div>
              <button
                type="button"
                onClick={clearFilter}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/10 text-[var(--text-secondary)] hover:text-accent transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                清除筛选
              </button>
            </motion.div>
          )}

          {/* 文章流 */}
          {filteredPosts.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center">
              <p className="text-[var(--text-secondary)] text-sm">
                {allPosts.length === 0
                  ? '暂时还没有发布文章，新的思考正在路上 ✨'
                  : '当前筛选条件下还没有文章。'}
              </p>
              {allPosts.length > 0 && (
                <button
                  type="button"
                  onClick={clearFilter}
                  className="mt-4 px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium cursor-pointer"
                >
                  查看全部文章
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
