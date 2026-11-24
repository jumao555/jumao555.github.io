import { motion } from 'framer-motion';
import { Github, Mail, MapPin, Sparkles, Code2, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 sm:pt-28 space-y-6">
      {/* 个人名片大卡片 */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-[2rem] p-7 sm:p-10"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div
              className="absolute -inset-1.5 rounded-[1.75rem] opacity-55 blur-md"
              style={{
                background:
                  'linear-gradient(135deg, hsla(var(--hue), 85%, 62%, 0.75), hsla(calc(var(--hue) + 45), 85%, 68%, 0.6))',
              }}
            />
            <img
              src={SITE_CONFIG.avatar}
              alt={SITE_CONFIG.author}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[1.5rem] object-cover ring-2 ring-white/90 dark:ring-white/15 shadow-lg"
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.statusText}</span>
            </div>

            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              你好，我是 {SITE_CONFIG.author} 👋
            </h1>

            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {SITE_CONFIG.bio}
              这里是我用代码搭起的一座数字花园——记录移动端开发心得、Agent 学习笔记，以及成长路上的技术思考与日常。
            </p>

            <div className="mt-5 flex items-center justify-center sm:justify-start flex-wrap gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                {SITE_CONFIG.location}
              </span>
              <a
                href={`https://github.com/${SITE_CONFIG.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4 text-accent" />
                github.com/{SITE_CONFIG.githubUsername}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 技术栈 & 建站历程 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="glass-card rounded-3xl p-6 sm:p-7"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">常用技术栈</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {SITE_CONFIG.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-accent-soft text-accent border border-accent/25"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="glass-card rounded-3xl p-6 sm:p-7"
        >
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">站点历程</h2>
          </div>
          <div className="space-y-4">
            {SITE_CONFIG.timeline.map((item) => (
              <div
                key={item.title}
                className="relative pl-4 border-l-2 border-accent/40"
              >
                <div className="text-xs font-mono-code text-accent font-medium">
                  {item.date}
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
                  {item.title}
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] mt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
