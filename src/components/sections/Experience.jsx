import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  BookOpen,
  Star,
  Award,
  Zap,
  Code2,
  ShieldCheck,
  Briefcase,
  Users,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  X,
  BrainCircuit,
} from 'lucide-react';
import { experience } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';
import { useTheme } from '../../context/ThemeContext';

const iconMap = {
  Trophy,
  BookOpen,
  Star,
  Award,
  Zap,
  Code2,
  ShieldCheck,
  Briefcase,
  Users,
  CheckCircle2,
  BrainCircuit,
};

const getTypeColors = (theme) => {
  const isLight = theme === 'light';
  return {
    hackathon:               { color: isLight ? '#d97706' : '#fbbf24', bg: isLight ? 'rgba(217,119,6,0.08)' : 'rgba(251,191,36,0.1)',   border: isLight ? 'rgba(217,119,6,0.15)' : 'rgba(251,191,36,0.2)'   },
    competition:             { color: isLight ? '#dc2626' : '#f87171', bg: isLight ? 'rgba(220,38,38,0.08)' : 'rgba(248,113,113,0.1)',  border: isLight ? 'rgba(220,38,38,0.15)' : 'rgba(248,113,113,0.2)'  },
    certification:           { color: isLight ? '#059669' : '#34d399', bg: isLight ? 'rgba(5,150,105,0.08)' : 'rgba(52,211,153,0.1)',  border: isLight ? 'rgba(5,150,105,0.15)' : 'rgba(52,211,153,0.2)'   },
    training:                { color: isLight ? '#0284c7' : '#38bdf8', bg: isLight ? 'rgba(2,132,199,0.08)' : 'rgba(56,189,248,0.1)',  border: isLight ? 'rgba(2,132,199,0.15)' : 'rgba(56,189,248,0.2)'   },
    workshop:                { color: isLight ? '#1d4ed8' : '#60a5fa', bg: isLight ? 'rgba(29,78,216,0.08)' : 'rgba(96,165,250,0.1)',   border: isLight ? 'rgba(29,78,216,0.15)' : 'rgba(96,165,250,0.2)'   },
    'community development': { color: isLight ? '#0d9488' : '#2dd4bf', bg: isLight ? 'rgba(13,148,136,0.08)' : 'rgba(45,212,191,0.1)',  border: isLight ? 'rgba(13,148,136,0.15)' : 'rgba(45,212,191,0.2)'  },
    community:               { color: isLight ? '#0d9488' : '#2dd4bf', bg: isLight ? 'rgba(13,148,136,0.08)' : 'rgba(45,212,191,0.1)',  border: isLight ? 'rgba(13,148,136,0.15)' : 'rgba(45,212,191,0.2)'  },
    internship:              { color: isLight ? '#2563eb' : '#38bdf8', bg: isLight ? 'rgba(37,99,235,0.08)' : 'rgba(56,189,248,0.1)',   border: isLight ? 'rgba(37,99,235,0.15)' : 'rgba(56,189,248,0.2)'   },
    achievement:             { color: isLight ? '#6d28d9' : '#a78bfa', bg: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(167,139,250,0.1)', border: isLight ? 'rgba(109,40,217,0.15)' : 'rgba(167,139,250,0.2)' },
  };
};

function ExperienceCertModal({ item, onClose }) {
  const { theme } = useTheme();
  const colors = getTypeColors(theme);
  const typeKey = (item.type || '').toLowerCase().trim();
  const c = colors[typeKey] || colors.achievement;
  const rawImage = item.certificateImage || (typeof item.certificate === 'string' && !item.certificate.startsWith('http') ? item.certificate : null);
  const certImage = rawImage?.startsWith('./') ? rawImage.slice(1) : rawImage;
  const certUrl = item.certificateUrl || (typeof item.certificate === 'string' && item.certificate.startsWith('http') ? item.certificate : null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="glass-strong relative z-10 rounded-2xl p-6 max-w-lg w-full overflow-hidden"
          style={{ border: `1px solid ${c.border}` }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20 bg-slate-900/60 p-1.5 rounded-full backdrop-blur-sm"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {certImage && (
            <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center max-h-[320px]">
              <img
                src={certImage}
                alt={`${item.title} certificate`}
                className="w-full h-auto max-h-[320px] object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-4 items-start">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: c.bg }}
              >
                <Award size={22} style={{ color: c.color }} />
              </div>
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 inline-block"
                  style={{ background: c.bg, color: c.color }}
                >
                  {item.type}
                </span>
                <h3 className="font-display text-lg font-bold text-white leading-snug mb-1">
                  {item.title}
                </h3>
                <p style={{ color: 'var(--accent)' }} className="text-sm font-medium">
                  {item.organization}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {certUrl && certUrl !== '#' && (
              <a
                href={certUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-grow justify-center py-2.5 text-sm"
              >
                <ExternalLink size={15} />
                Verify Credential
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TimelineItem({ item, index, inView, onSelectCert }) {
  const { theme } = useTheme();
  const colors = getTypeColors(theme);
  const Icon = iconMap[item.icon] || Star;
  const isLeft = index % 2 === 0;
  const typeKey = (item.type || '').toLowerCase().trim();
  const c = colors[typeKey] || colors.achievement;

  const hasCertificate = Boolean(item.certificateImage || item.certificateUrl || item.certificate);

  return (
    <motion.div
      className={`relative flex items-start gap-6 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.1 }}
    >
      {/* Card */}
      <div
        className="glass rounded-xl p-5 flex-1 md:max-w-sm"
        style={{ border: `1px solid ${c.border}` }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: c.bg, color: c.color }}
          >
            {item.type}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {item.date}
          </span>
        </div>
        <h3 className="font-display font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {item.title}
        </h3>
        <p className="text-sm mb-2" style={{ color: 'var(--accent)' }}>{item.organization}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map((tag) => (
              <span key={tag} className="tag text-xs">{tag}</span>
            ))}
          </div>
        )}

        {/* Certificate Attachment Badge & Action */}
        {hasCertificate && (
          <div
            className="mt-4 pt-3 border-t flex items-center justify-between gap-2"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="text-[11px] flex items-center gap-1.5 font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              <Award size={13} style={{ color: c.color }} /> Certificate
            </span>
            <button
              type="button"
              onClick={() => onSelectCert(item)}
              className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.border}`,
              }}
            >
              View Certificate →
            </button>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 mt-5 hidden md:flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          <Icon size={16} style={{ color: c.color }} />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const displayedExperience = showAll ? experience : experience.slice(0, 3);

  return (
    <section
      id="achievements"
      className="py-24 px-6"
      ref={ref}
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="04"
            label="Experience"
            title="Experiences"
            subtitle="Hackathons, workshops, certifications, and key moments in my journey."
          />
        </motion.div>

        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />

          <div className="flex flex-col gap-8">
            <AnimatePresence>
              {displayedExperience.map((item, i) => (
                <TimelineItem
                  key={item.id ? `${item.id}-${i}` : `exp-${i}`}
                  item={item}
                  index={i}
                  inView={inView}
                  onSelectCert={setSelectedCert}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {experience.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-slate-900/40"
            >
              {showAll ? 'Show Less' : 'Show More Experiences'}
              <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <ExperienceCertModal
          item={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
