import { motion } from 'framer-motion';
import { FolderGit2, Github, ExternalLink, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 text-accent text-xs font-medium mb-2">
          <FolderGit2 className="w-4 h-4" />
          <span>SELECTED WORKS</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          精选项目
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
          一些正在打磨的开源作品、效率工具与前端设计实验。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SITE_CONFIG.projects.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: idx * 0.06 }}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* 右上角柔和色相光晕 */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none"
              style={{ backgroundColor: `hsl(${project.accentHue}, 85%, 60%)` }}
            />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, hsl(${project.accentHue}, 82%, 58%), hsl(${project.accentHue + 28}, 85%, 65%))`,
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-accent transition-colors">
                    {project.name}
                  </h2>
                </div>

                <span
                  className={`text-[11px] font-mono-code px-2.5 py-0.5 rounded-full ${
                    project.status === 'Active'
                      ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/12 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-lg bg-black/4 dark:bg-white/6 text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/8 hover:bg-accent-soft text-xs font-medium text-[var(--text-secondary)] hover:text-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  源码
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent-soft text-accent text-xs font-medium hover:opacity-85 transition-opacity"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    访问
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
