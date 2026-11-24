import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, FileText, ArrowRight, Hash } from 'lucide-react';
import { searchPosts } from '../lib/posts';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchPosts(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) =>
          results.length ? (i - 1 + results.length) % results.length : 0
        );
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(`/posts/${results[activeIndex].slug}`);
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, results, activeIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/35 dark:bg-black/55 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-popover w-full max-w-xl rounded-3xl overflow-hidden"
          >
            {/* 输入栏 */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-subtle)]">
              <Search className="w-5 h-5 text-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索文章标题、标签或内容..."
                className="w-full bg-transparent text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono-code px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* 搜索结果 */}
            <div className="max-h-[55vh] overflow-y-auto p-2.5">
              {results.length === 0 ? (
                <div className="py-12 text-center text-sm text-[var(--text-muted)]">
                  {query ? `没有找到包含 “${query}” 的文章` : '暂时还没有可搜索的文章'}
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((post, idx) => {
                    const active = idx === activeIndex;
                    return (
                      <li key={post.slug}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => {
                            navigate(`/posts/${post.slug}`);
                            onClose();
                          }}
                          className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                            active
                              ? 'bg-accent-soft border border-accent/40'
                              : 'border border-transparent hover:bg-black/4 dark:hover:bg-white/6'
                          }`}
                        >
                          <div
                            className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                              active
                                ? 'bg-accent text-white'
                                : 'bg-black/5 dark:bg-white/8 text-[var(--text-muted)]'
                            }`}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p
                                className={`font-medium text-sm truncate ${
                                  active ? 'text-accent' : 'text-[var(--text-primary)]'
                                }`}
                              >
                                {post.title}
                              </p>
                              <span className="text-[11px] font-mono-code text-[var(--text-muted)] shrink-0">
                                {post.date}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-1">
                              {post.summary}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="text-[11px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/8 text-[var(--text-secondary)]">
                                {post.category}
                              </span>
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-0.5 text-[11px] text-[var(--text-muted)]"
                                >
                                  <Hash className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          {active && (
                            <ArrowRight className="w-4 h-4 text-accent self-center shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="px-5 py-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>↑↓ 选择 · Enter 打开</span>
              <span>共 {results.length} 条结果</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
