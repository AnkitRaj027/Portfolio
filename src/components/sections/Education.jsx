import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { education } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

export default function Education() {
  const [ref, inView] = useInView();
  const edu = education[0];

  return (
    <section id="education" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="05"
            label="Education"
            title="Academic Background"
          />
        </motion.div>

        <motion.div
          className="glass rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Header */}
          <div
            className="p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-accent)' }}
              >
                <GraduationCap size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                  {edu.institution}
                </p>
                <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {edu.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {edu.duration}
                  </span>
                  {edu.cgpa && (
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} /> CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Coursework */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span key={course} className="tag">{course}</span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                Highlights
              </h4>
              <ul className="space-y-2">
                {edu.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
