import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Sparkles, Monitor, Wrench, CheckCircle2 } from 'lucide-react';
import { skills } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';
import { useTheme } from '../../context/ThemeContext';

const iconMap = { Code2, Brain, Sparkles, Monitor, Wrench };

const categoryColors = {
  blue:    { text: '#3b82f6', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.2)',  glow: 'rgba(59,130,246,0.18)' },
  violet:  { text: '#8b5cf6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.2)', glow: 'rgba(139,92,246,0.18)' },
  cyan:    { text: '#06b6d4', bg: 'rgba(6,182,212,0.06)',   border: 'rgba(6,182,212,0.2)',   glow: 'rgba(6,182,212,0.18)' },
  emerald: { text: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.18)' },
  orange:  { text: '#f97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.2)',  glow: 'rgba(249,115,22,0.18)' },
};

function SkillItem({ item, color }) {
  const colors = categoryColors[color] || categoryColors.blue;

  return (
    <motion.div
      className="p-3 px-4 rounded-xl border flex items-center justify-between transition-all select-none group/item"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
      whileHover={{
        x: 4,
        borderColor: colors.text,
        background: colors.bg,
        boxShadow: `0 4px 12px ${colors.glow}`,
      }}
    >
      <div className="flex items-center gap-2.5">
        <CheckCircle2 size={13} style={{ color: colors.text }} className="opacity-60 group-hover/item:opacity-100 transition-opacity" />
        <span className="font-medium text-sm text-white group-hover:text-white transition-colors">
          {item.name}
        </span>
      </div>
      <span className="text-[10px] opacity-0 group-hover/item:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
        Active
      </span>
    </motion.div>
  );
}

function CategoryCard({ category, index, inView, theme }) {
  const Icon = iconMap[category.icon];
  const colors = categoryColors[category.color] || categoryColors.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -8,
        scale: 1.015,
        boxShadow: `0 20px 40px ${colors.glow}`,
        borderColor: colors.text,
      }}
      className="glass rounded-2xl p-6 relative overflow-hidden group/card transition-colors duration-300"
      style={{
        border: '1px solid var(--border)',
      }}
    >
      {/* Dynamic backdrop glowing orb */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ background: colors.text }}
      />

      <div className="flex items-center gap-4 mb-6">
        {Icon && (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/card:scale-105"
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Icon size={22} style={{ color: colors.text }} />
          </div>
        )}
        <div>
          <h3 className="font-display text-base font-bold text-white transition-colors group-hover/card:text-white">
            {category.category}
          </h3>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            {category.items.length} Tech Stack
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {category.items.map((item) => (
          <SkillItem
            key={item.name}
            item={item}
            color={category.color}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Interactive Skill Dashboard ────────────────────── */
function SkillDashboard({ theme }) {
  const [activeCat, setActiveCat] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const activeCategory = skills[activeCat];
  const catColor = categoryColors[activeCategory.color] || categoryColors.blue;
  const ActiveIcon = iconMap[activeCategory.icon];

  // Set default description to first item in the list
  const currentSkillDetail = hoveredSkill || activeCategory.items[0];

  // Reset hovered skill if category changes
  useEffect(() => {
    setHoveredSkill(null);
  }, [activeCat]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Category selector (Sidebar) */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none">
        {skills.map((cat, idx) => {
          const isActive = idx === activeCat;
          const colors = categoryColors[cat.color] || categoryColors.blue;
          const Icon = iconMap[cat.icon];

          return (
            <button
              key={cat.category}
              onClick={() => setActiveCat(idx)}
              className="flex items-center gap-3.5 px-5 py-4 rounded-xl text-left border transition-all flex-shrink-0 w-auto lg:w-full"
              style={{
                background: isActive ? colors.bg : 'var(--bg-card)',
                borderColor: isActive ? colors.text : 'var(--border)',
                boxShadow: isActive ? `0 8px 24px ${colors.glow}` : 'none',
              }}
            >
              {Icon && (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'var(--accent-dim)',
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? '#fff' : colors.text }} />
                </div>
              )}
              <div
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: isActive ? (theme === 'light' ? colors.text : '#fff') : 'var(--text-primary)' }}
              >
                {cat.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-8 glass rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
        {/* Glow corner background */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
          style={{ background: catColor.text }}
        />

        <div>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 border-b pb-5" style={{ borderColor: 'var(--border)' }}>
            {ActiveIcon && (
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: catColor.bg,
                  border: `1px solid ${catColor.border}`,
                }}
              >
                <ActiveIcon size={22} style={{ color: catColor.text }} />
              </div>
            )}
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                {activeCategory.category}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Hover over a technology badge below to view its specific applications.
              </p>
            </div>
          </div>

          {/* Grid of technologies (rendered as clean pills/badges to prevent redundancy) */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {activeCategory.items.map((item) => {
              const isSelected = currentSkillDetail.name === item.name;
              return (
                 <motion.div
                  key={item.name}
                  onMouseEnter={() => setHoveredSkill(item)}
                  className="px-6 py-3 rounded-xl border text-sm font-medium cursor-pointer select-none transition-all flex items-center justify-center"
                  style={{
                    background: isSelected ? catColor.bg : 'var(--bg-secondary)',
                    borderColor: isSelected ? catColor.text : 'var(--border)',
                    boxShadow: isSelected ? `0 6px 16px ${catColor.glow}` : 'none',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hover detail card at bottom */}
        <div
          className="rounded-xl p-5 border transition-all duration-300 relative overflow-hidden"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: catColor.text,
            boxShadow: `0 8px 24px ${catColor.glow}`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4
              className="font-display font-bold text-base"
              style={{ color: 'var(--text-primary)' }}
            >
              {currentSkillDetail.name}
            </h4>
            <span
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border"
              style={{
                borderColor: catColor.text,
                color: catColor.text,
                background: catColor.bg,
              }}
            >
              Technology Focus
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {currentSkillDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'cards'
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      className="py-24 px-6"
      ref={ref}
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <SectionHeader
            number="02"
            label="Expertise"
            title="Skills & Technologies"
            subtitle="I build advanced architectures with modern AI models, machine learning, and clean backend stacks."
          />

          {/* View toggle */}
          <div
            className="flex items-center rounded-lg p-1 flex-shrink-0 self-start md:self-end mb-14"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {['dashboard', 'cards'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all"
                style={{
                  background: view === v ? 'var(--accent)' : 'transparent',
                  color: view === v ? '#fff' : 'var(--text-muted)',
                }}
              >
                {v === 'dashboard' ? '📊 Dashboard' : '▦ Cards'}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <SkillDashboard theme={theme} />
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skills.map((cat, i) => (
                <CategoryCard
                  key={cat.category}
                  category={cat}
                  index={i}
                  inView={inView}
                  theme={theme}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
