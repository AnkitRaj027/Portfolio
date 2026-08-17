import { useState, useEffect } from 'react';
import { X, Briefcase } from 'lucide-react';
import { personal } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

export default function OpenToWorkBanner() {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Show banner if not dismissed this session
    const dismissed = sessionStorage.getItem('otw-dismissed');
    if (!dismissed && personal.openToWork) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('otw-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  const isLight = theme === 'light';
  
  // High contrast theme mappers
  const bannerBg = isLight
    ? 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%)'
    : 'linear-gradient(90deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.06) 100%)';
  const borderCol = isLight ? '#bbf7d0' : 'rgba(34,197,94,0.2)';
  const textColor = isLight ? '#166534' : '#86efac';
  const actionColor = isLight ? '#15803d' : '#4ade80';

  return (
    <div
      className="relative z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
      style={{
        background: bannerBg,
        borderBottom: `1px solid ${borderCol}`,
      }}
    >
      <div className="pulse-dot" style={{ background: '#22c55e' }} />
      <Briefcase size={14} style={{ color: textColor }} />
      <span style={{ color: textColor }}>
        {personal.availability} —{' '}
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
          style={{ color: actionColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
        >
          Get in touch
        </button>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Dismiss banner"
        style={{ color: textColor }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
