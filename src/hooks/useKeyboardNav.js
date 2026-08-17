import { useEffect } from 'react';

const sectionIds = ['hero', 'about', 'skills', 'projects', 'achievements', 'education', 'certifications', 'learning', 'contact'];

export default function useKeyboardNav() {
  useEffect(() => {
    const handler = (e) => {
      // Ignore when typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        const id = sectionIds[num - 1];
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          // Show brief toast
          showToast(`Jumped to section ${num}`);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

function showToast(message) {
  const existing = document.getElementById('kb-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'kb-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '88px',
    right: '32px',
    background: 'rgba(59,130,246,0.15)',
    border: '1px solid rgba(59,130,246,0.3)',
    backdropFilter: 'blur(12px)',
    color: '#93c5fd',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
    zIndex: '9990',
    opacity: '0',
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 1600);
}
