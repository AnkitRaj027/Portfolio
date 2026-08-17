import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Brain, GitBranch, Cloud } from 'lucide-react';
import { currentlyLearning } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

const iconMap = { Sparkles, Bot, Brain, GitBranch, Cloud };

export default function CurrentlyLearning() {
  const [ref, inView] = useInView();

  return (
    <section id="learning" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="07"
            label="Growth"
            title="Currently Exploring"
            subtitle="Topics I'm actively studying and building with right now."
            center
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {currentlyLearning.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.name}
                className="glass rounded-xl p-5 text-center group cursor-default"
                style={{ border: '1px solid var(--border)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: 'var(--border-accent)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all"
                  style={{ background: 'var(--accent-dim)' }}
                >
                  <Icon
                    size={20}
                    style={{ color: 'var(--accent)' }}
                    className="transition-transform group-hover:scale-110"
                  />
                </div>
                <p className="font-display font-semibold text-sm text-white mb-1.5">
                  {item.name}
                </p>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
