import { motion } from 'framer-motion';
import { GraduationCap, Code2, Cpu, Trophy, Brain, GitBranch } from 'lucide-react';
import { about, personal } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import useCountUp from '../../hooks/useCountUp';
import SectionHeader from '../ui/SectionHeader';

const iconMap = { GraduationCap, Code2, Cpu, Trophy, Brain, GitBranch };

const interests = [
  'Machine Learning', 'Generative AI', 'RAG Systems', 'Agentic AI',
  'NLP', 'Knowledge Graphs', 'Software Development',
];

/* Animated stat card with count-up */
function StatCard({ stat, index, inView }) {
  const Icon = iconMap[stat.icon];
  const animated = useCountUp(stat.value, { enabled: inView, duration: 1600 });

  return (
    <motion.div
      className="glass p-5 rounded-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
      style={{ border: '1px solid var(--border)' }}
    >
      {Icon && (
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Icon size={18} style={{ color: 'var(--accent)' }} />
        </div>
      )}
      <div className="font-display text-2xl font-bold text-white mb-0.5">
        {animated}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

/* Profile avatar / image */
function ProfileVisual() {
  if (personal.profileImage) {
    return (
      <div className="relative w-full max-w-xs mx-auto">
        <motion.img
          src={personal.profileImage}
          alt={personal.name}
          className="w-full rounded-2xl object-cover aspect-square profile-avatar"
          style={{ boxShadow: '0 24px 60px rgba(59,130,246,0.15)' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Glow ring */}
        <div
          className="absolute -inset-1 rounded-2xl -z-10 blur-xl"
          style={{ background: 'rgba(59,130,246,0.12)' }}
        />
      </div>
    );
  }

  // Placeholder avatar with initials
  return (
    <motion.div
      className="relative w-56 h-56 rounded-3xl mx-auto profile-avatar flex items-center justify-center"
      style={{ boxShadow: '0 24px 60px rgba(59,130,246,0.12)' }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.08))',
        }}
      />
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" rx="24"/>
      </svg>
      {/* Initials */}
      <span className="relative font-display text-6xl font-bold gradient-text select-none">
        {personal.initials}
      </span>
      {/* Orbiting dots */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: 'var(--accent)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
          initial={{ rotate: deg }}
        >
          <div
            className="absolute"
            style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: i === 0 ? '#3b82f6' : i === 1 ? '#6366f1' : '#22d3ee',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))}
      <p className="absolute bottom-4 text-xs text-center w-full" style={{ color: 'var(--text-muted)' }}>
        Add photo in portfolio.js
      </p>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="01"
            label="About Me"
            title="Building AI that matters"
            subtitle="A brief introduction to who I am and what I care about."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {about.intro}
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {about.body}
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {about.passion}
            </p>

            {/* Interests */}
            <div className="pt-2">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span key={interest} className="tag">{interest}</span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {about.stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Right: Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <ProfileVisual />

            {/* Currently focused card */}
            <div
              className="w-full max-w-xs rounded-xl p-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%)',
                border: '1px solid var(--border-accent)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="pulse-dot" />
                <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                  Currently Focused On
                </span>
              </div>
              <p className="font-display text-base font-semibold text-white mb-1">
                Generative AI & Agentic Systems
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Exploring LangGraph, RAG pipelines, and multi-agent orchestration.
              </p>
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ background: 'rgba(59,130,246,0.12)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
