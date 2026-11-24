import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { SITE_CONFIG } from '../config/site';

interface ThemeContextValue {
  isDark: boolean;
  hue: number;
  toggleTheme: (event?: React.MouseEvent) => void;
  setHue: (newHue: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const [hue, setHueState] = useState<number>(() => {
    if (typeof window === 'undefined') return SITE_CONFIG.defaultHue;
    const saved = localStorage.getItem('blog-hue');
    return saved ? Number(saved) : SITE_CONFIG.defaultHue;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--hue', String(hue));
    try {
      localStorage.setItem('blog-hue', String(hue));
    } catch {
      // ignore storage errors
    }
  }, [hue]);

  const setHue = useCallback((newHue: number) => {
    const clamped = Math.max(0, Math.min(360, Math.round(newHue)));
    setHueState(clamped);
  }, []);

  const applyThemeClass = useCallback((nextDark: boolean) => {
    document.documentElement.classList.toggle('dark', nextDark);
    setIsDark(nextDark);
    try {
      localStorage.setItem('blog-theme', nextDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, []);

  // 仿 Anthony Fu / Innei 的圆形水波扩散 View Transitions 切换动画
  const toggleTheme = useCallback(
    (event?: React.MouseEvent) => {
      const nextDark = !isDark;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (!doc.startViewTransition || prefersReducedMotion || !event) {
        applyThemeClass(nextDark);
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        applyThemeClass(nextDark);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 460,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    },
    [isDark, applyThemeClass]
  );

  return (
    <ThemeContext.Provider value={{ isDark, hue, toggleTheme, setHue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
