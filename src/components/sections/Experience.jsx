import { motion } from 'framer-motion';
import { Trophy, BookOpen, Star, Award, Zap } from 'lucide-react';
import { experience } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';
import { useTheme } from '../../context/ThemeContext';

const iconMap = { Trophy, BookOpen, Star, Award, Zap };

const getTypeColors = (theme) => {
  const isLight = theme === 'light';
  return {
    hackathon:    { color: isLight ? '#d97706' : '#fbbf24', bg: isLight ? 'rgba(217,119,6,0.08)' : 'rgba(251,191,36,0.1)',  border: isLight ? 'rgba(217,119,6,0.15)' : 'rgba(251,191,36,0.2)'  },
    competition:  { color: isLight ? '#dc2626' : '#f87171', bg: isLight ? 'rgba(220,38,38,0.08)' : 'rgba(248,113,113,0.1)', border: isLight ? 'rgba(220,38,38,0.15)' : 'rgba(248,113,113,0.2)' },
    certification:{ color: isLight ? '#059669' : '#34d399', bg: isLight ? 'rgba(5,150,105,0.08)' : 'rgba(52,211,153,0.1)', border: isLight ? 'rgba(5,150,105,0.15)' : 'rgba(52,211,153,0.2)'  },
    workshop:     { color: isLight ? '#1d4ed8' : '#60a5fa', bg: isLight ? 'rgba(29,78,216,0.08)' : 'rgba(96,165,250,0.1)', border: isLight ? 'rgba(29,78,216,0.15)' : 'rgba(96,165,250,0.2)'  },
    achievement:  { color: isLight ? '#6d28d9' : '#a78bfa', bg: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(167,139,250,0.1)', border: isLight ? 'rgba(109,40,217,0.15)' : 'rgba(167,139,250,0.2)'},
  };
};

function TimelineItem({ item, index, inView }) {
  const { theme } = useTheme();
  const colors = getTypeColors(theme);
  const Icon = iconMap[item.icon] || Star;
  const isLeft = index % 2 === 0;
  const c = colors[item.type] || colors.achievement;

  return (
    <motion.div
      className={`relative flex items-start gap-6 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
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
        <h3 className="font-display font-bold text-white mb-0.5">{item.title}</h3>
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
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 mt-5 hidden md:flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
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
            title="Achievements & Milestones"
            subtitle="Hackathons, workshops, certifications, and key moments in my journey."
          />
        </motion.div>

        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />

          <div className="flex flex-col gap-8">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
