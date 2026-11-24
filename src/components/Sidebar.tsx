import { useNavigate } from 'react-router-dom';
import { Github, Mail, Globe, Rss, Folder, Tag, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { getAllPosts, getCategories, getTags } from '../lib/posts';

interface SidebarProps {
  activeCategory?: string | null;
  activeTag?: string | null;
}

export function Sidebar({ activeCategory, activeTag }: SidebarProps) {
  const navigate = useNavigate();
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getTags();

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      case 'rss':
        return <Rss className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      {/* 个人名片毛玻璃卡片 */}
      <div className="glass-card rounded-3xl p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4 group">
          <div
            className="absolute -inset-1 rounded-3xl opacity-50 blur-md transition-opacity group-hover:opacity-80"
            style={{
              background:
                'linear-gradient(135deg, hsla(var(--hue), 85%, 62%, 0.75), hsla(calc(var(--hue) + 45), 85%, 68%, 0.6))',
            }}
          />
          <img
            src={SITE_CONFIG.avatar}
            alt={SITE_CONFIG.author}
            className="relative w-24 h-24 rounded-3xl object-cover ring-2 ring-white/90 dark:ring-white/15 shadow-md transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {SITE_CONFIG.author}
        </h2>
        <p className="text-xs font-mono-code text-[var(--text-muted)] mt-0.5">
          {SITE_CONFIG.handle}
        </p>

        {/* 在线状态小胶囊 */}
        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          <span>{SITE_CONFIG.statusText}</span>
        </div>

        <p className="text-[13px] leading-relaxed text-[var(--text-secondary)] mt-3.5">
          {SITE_CONFIG.bio}
        </p>

        {/* 数据统计 */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => navigate('/archives')}
            className="rounded-xl py-1.5 hover:bg-accent-soft transition-colors cursor-pointer"
          >
            <div className="text-base font-bold text-[var(--text-primary)]">
              {posts.length}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">文章</div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-xl py-1.5 hover:bg-accent-soft transition-colors cursor-pointer"
          >
            <div className="text-base font-bold text-[var(--text-primary)]">
              {categories.length}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">分类</div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/archives')}
            className="rounded-xl py-1.5 hover:bg-accent-soft transition-colors cursor-pointer"
          >
            <div className="text-base font-bold text-[var(--text-primary)]">
              {tags.length}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">标签</div>
          </button>
        </div>

        {/* 社交链接 */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SITE_CONFIG.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel={s.url.startsWith('http') ? 'noreferrer' : undefined}
              title={s.name}
              aria-label={s.name}
              className="w-9 h-9 rounded-xl bg-black/4 dark:bg-white/6 hover:bg-accent-soft text-[var(--text-secondary)] hover:text-accent flex items-center justify-center transition-all hover:-translate-y-0.5"
            >
              {renderSocialIcon(s.icon)}
            </a>
          ))}
        </div>
      </div>

      {/* 分类卡片 */}
      <div className="glass-card rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="w-1 h-4 rounded-full bg-accent" />
          <Folder className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">文章分类</h3>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => {
            const active = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  navigate(
                    active ? '/' : `/?category=${encodeURIComponent(cat.name)}`
                  )
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-accent-soft text-accent font-medium'
                    : 'text-[var(--text-secondary)] hover:bg-black/4 dark:hover:bg-white/6 hover:text-[var(--text-primary)] hover:pl-4'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-xs font-mono-code px-2 py-0.5 rounded-lg ${
                    active
                      ? 'bg-accent text-white'
                      : 'bg-black/5 dark:bg-white/8 text-[var(--text-muted)]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 标签云卡片 */}
      <div className="glass-card rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="w-1 h-4 rounded-full bg-accent" />
          <Tag className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">热门标签</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const active = activeTag === tag.name;
            return (
              <button
                key={tag.name}
                type="button"
                onClick={() =>
                  navigate(active ? '/' : `/?tag=${encodeURIComponent(tag.name)}`)
                }
                className={`px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-accent-soft text-[var(--text-secondary)] hover:text-accent hover:scale-105'
                }`}
              >
                # {tag.name}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
