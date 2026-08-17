import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award, Calendar } from 'lucide-react';
import { certifications } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

function CertModal({ cert, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="glass-strong relative z-10 rounded-2xl p-6 max-w-md w-full"
          style={{ border: '1px solid var(--border-accent)' }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          <div className="mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-dim)' }}
            >
              <Award size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-1">{cert.name}</h3>
            <p style={{ color: 'var(--accent)' }} className="text-sm font-medium">{cert.issuer}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{cert.date}</p>
          </div>
          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              <ExternalLink size={15} />
              View Credential
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certifications() {
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="certifications"
      className="py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="06"
            label="Certifications"
            title="Credentials & Training"
            subtitle="Verified certifications and professional training."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.button
              key={cert.id}
              className="glass rounded-xl p-5 text-left w-full glow-accent-hover transition-all"
              style={{ border: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(cert)}
              whileHover={{ y: -3 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-dim)' }}
              >
                <Award size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-display font-bold text-white mb-1 text-sm leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>
                {cert.issuer}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <Calendar size={11} /> {cert.date}
                </span>
                <span className="text-xs" style={{ color: 'var(--accent)' }}>
                  View →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
