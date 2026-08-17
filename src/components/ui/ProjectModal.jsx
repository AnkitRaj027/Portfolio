import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-accent)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}
          initial={{ scale: 0.92, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          {/* Gradient header */}
          <div
            className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex-shrink-0`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-8">
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none" className="opacity-10">
                <circle cx="110" cy="80" r="60" stroke="white" strokeWidth="1" />
                <circle cx="110" cy="80" r="40" stroke="white" strokeWidth="1" />
                <line x1="50" y1="80" x2="170" y2="80" stroke="white" strokeWidth="1" />
                <line x1="110" y1="20" x2="110" y2="140" stroke="white" strokeWidth="1" />
                <circle cx="110" cy="80" r="8" fill="white" />
              </svg>
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
            {/* Project number */}
            <span
              className="absolute bottom-4 left-6 text-xs font-bold font-display tracking-widest"
              style={{ color: project.accentColor }}
            >
              Featured Project
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              {project.description}
            </p>

            {/* Extended details if available */}
            {project.details && (
              <>
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                  How it works
                </h3>
                <ul className="space-y-2 mb-5">
                  {project.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Tech tags */}
            <div className="mb-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 justify-center min-w-[120px]"
                >
                  <GithubIcon size={15} />
                  View Code
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center min-w-[120px]"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              ) : (
                <button
                  className="btn-secondary flex-1 justify-center min-w-[120px] opacity-50 cursor-not-allowed"
                  disabled
                >
                  Demo Coming Soon
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
