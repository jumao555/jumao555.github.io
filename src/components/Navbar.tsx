import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Palette,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Archive,
  FolderGit2,
  User,
  RotateCcw,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

const NAV_ITEMS = [
  { path: '/', label: '首页', icon: Home },
  { path: '/archives', label: '归档', icon: Archive },
  { path: '/projects', label: '项目', icon: FolderGit2 },
  { path: '/about', label: '关于', icon: User },
];

export function Navbar({ onOpenSearch }: NavbarProps) {
  const location = useLocation();
  const { isDark, hue, toggleTheme, setHue } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isNavActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/posts/');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`mx-auto max-w-6xl pointer-events-auto transition-all duration-300 ${
          scrolled ? 'max-w-5xl' : ''
        }`}
      >
        <nav className="glass-nav rounded-2xl px-3.5 sm:px-5 h-14 flex items-center justify-between gap-3">
          {/* 左侧品牌 */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden ring-2 ring-white/70 dark:ring-white/15 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={SITE_CONFIG.avatar}
                alt={SITE_CONFIG.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[var(--text-primary)] group-hover:text-accent transition-colors">
              {SITE_CONFIG.title}
            </span>
          </Link>

          {/* 中间桌面端导航 */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'text-accent'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-accent-soft border border-accent/40 -z-10"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="搜索文章"
              className="flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/8 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-[var(--text-muted)]">搜索</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono-code rounded-md bg-black/5 dark:bg-white/10 text-[var(--text-muted)]">
                Ctrl K
              </kbd>
            </button>

            {/* 调色盘选择器 */}
            <div className="relative" ref={paletteRef}>
              <button
                type="button"
                onClick={() => setPaletteOpen((v) => !v)}
                aria-label="自定义主题色"
                title="自定义主题色"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  paletteOpen
                    ? 'bg-accent-soft text-accent'
                    : 'text-[var(--text-secondary)] hover:text-accent hover:bg-black/5 dark:hover:bg-white/8'
                }`}
              >
                <Palette className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {paletteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="glass-popover absolute right-0 mt-3 w-72 rounded-2xl p-4 z-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: `hsl(${hue}, 80%, 55%)` }}
                        />
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          主题色相
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono-code px-2 py-0.5 rounded-md bg-accent-soft text-accent">
                          {hue}°
                        </span>
                        <button
                          type="button"
                          onClick={() => setHue(SITE_CONFIG.defaultHue)}
                          title="重置为默认色相"
                          className="p-1 rounded-lg text-[var(--text-muted)] hover:text-accent hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 彩虹滑动条 */}
                    <div className="relative mb-4">
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={hue}
                        onChange={(e) => setHue(Number(e.target.value))}
                        aria-label="色相滑块"
                        className="w-full h-3 rounded-full appearance-none cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(to right, hsl(0,85%,62%), hsl(60,85%,60%), hsl(120,75%,55%), hsl(180,80%,55%), hsl(240,85%,65%), hsl(300,82%,64%), hsl(360,85%,62%))',
                        }}
                      />
                    </div>

                    {/* 预设高颜值色板 */}
                    <div className="grid grid-cols-5 gap-2">
                      {SITE_CONFIG.presetHues.map((preset) => {
                        const active = Math.abs(hue - preset.hue) <= 4;
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => setHue(preset.hue)}
                            title={preset.name}
                            className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-all cursor-pointer ${
                              active
                                ? 'bg-accent-soft ring-1 ring-accent'
                                : 'hover:bg-black/5 dark:hover:bg-white/8'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full shadow-inner"
                              style={{ backgroundColor: `hsl(${preset.hue}, 82%, 58%)` }}
                            />
                            <span className="text-[11px] text-[var(--text-secondary)]">
                              {preset.name.slice(0, 2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 暗黑模式切换 */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? '切换为浅色模式' : '切换为暗黑模式'}
              title={isDark ? '切换为浅色模式' : '切换为暗黑模式'}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-accent hover:bg-black/5 dark:hover:bg-white/8 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* 移动端菜单按钮 */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="打开菜单"
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-accent hover:bg-black/5 dark:hover:bg-white/8 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* 移动端下拉毛玻璃菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="md:hidden glass-popover mt-2 rounded-2xl p-2 grid grid-cols-2 gap-1.5"
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-accent-soft text-accent'
                        : 'text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/8'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
