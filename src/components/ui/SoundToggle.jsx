import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

/**
 * Floating sound toggle pill — appears in the bottom-left corner.
 * OFF by default; click to enable/disable audio feedback.
 */
export default function SoundToggle() {
  const { enabled, toggleEnabled } = useSound();

  return (
    <motion.button
      id="sound-toggle"
      onClick={toggleEnabled}
      title={enabled ? 'Disable sound effects' : 'Enable sound effects'}
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium transition-colors duration-300 select-none hidden md:flex"
      style={{
        background: enabled
          ? 'rgba(59,130,246,0.12)'
          : 'rgba(22,22,31,0.8)',
        borderColor: enabled
          ? 'rgba(59,130,246,0.35)'
          : 'rgba(255,255,255,0.08)',
        color: enabled ? '#60a5fa' : 'var(--text-muted)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={enabled ? 'on' : 'off'}
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {enabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
      </motion.span>
      <span>{enabled ? 'Sound On' : 'Sound Off'}</span>
    </motion.button>
  );
}
