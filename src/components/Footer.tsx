import { ArrowUp, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const yearLabel =
    currentYear > SITE_CONFIG.startYear
      ? `${SITE_CONFIG.startYear} - ${currentYear}`
      : `${SITE_CONFIG.startYear}`;

  return (
    <footer className="mt-16 pb-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl glass-card rounded-3xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>© {yearLabel}</span>
          <span className="font-semibold text-[var(--text-primary)]">
            {SITE_CONFIG.author}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> &amp;
            Glassmorphism
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>Powered by Vite + React · GitHub Pages</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="回到顶部"
            title="回到顶部"
            className="w-8 h-8 rounded-xl bg-accent-soft text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
