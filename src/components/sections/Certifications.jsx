import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award, Calendar, ChevronDown } from 'lucide-react';
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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="glass-strong relative z-10 rounded-2xl p-6 max-w-lg w-full overflow-hidden"
          style={{ border: '1px solid var(--border-accent)' }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20 bg-slate-900/60 p-1.5 rounded-full backdrop-blur-sm"
          >
            <X size={18} />
          </button>
          
          {cert.image && (
            <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center max-h-[320px]">
              <img 
                src={cert.image} 
                alt={cert.name} 
                className="w-full h-auto max-h-[320px] object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-4 items-start">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent-dim)' }}
              >
                <Award size={22} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white leading-snug mb-1">{cert.name}</h3>
                <p style={{ color: 'var(--accent)' }} className="text-sm font-medium">{cert.issuer}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{cert.date}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {cert.credentialUrl && cert.credentialUrl !== '#' && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-grow justify-center py-2.5"
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

export default function Certifications() {
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedCerts = showAll ? certifications : certifications.slice(0, 3);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert, i) => (
            <motion.button
              key={cert.id}
              className="glass rounded-xl overflow-hidden text-left w-full glow-accent-hover transition-all flex flex-col h-full group"
              style={{ border: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(cert)}
              whileHover={{ y: -4 }}
            >
              {cert.image ? (
                <div className="w-full aspect-[16/10] overflow-hidden border-b border-slate-800 bg-slate-950 relative">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                </div>
              ) : (
                <div className="p-5 pb-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center animate-pulse"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <Award size={18} style={{ color: 'var(--accent)' }} />
                  </div>
                </div>
              )}
              
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {!cert.image && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: 'var(--accent-dim)' }}
                    >
                      <Award size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                  )}
                  <h3 className="font-display font-bold text-white mb-1 text-sm leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>
                    {cert.issuer}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/40">
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Calendar size={11} /> {cert.date}
                  </span>
                  <span className="text-xs font-semibold flex items-center gap-0.5 animate-pulse" style={{ color: 'var(--accent)' }}>
                    View →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {certifications.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-slate-900/40"
            >
              {showAll ? 'Show Less' : 'Show More Certifications'}
              <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
