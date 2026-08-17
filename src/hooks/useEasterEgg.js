import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const TARGET = 'hire';

export default function useEasterEgg() {
  const bufferRef = useRef('');
  const firedRef = useRef(false);

  useEffect(() => {
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      bufferRef.current = (bufferRef.current + e.key).slice(-TARGET.length);

      if (bufferRef.current === TARGET && !firedRef.current) {
        firedRef.current = true;
        fireConfetti();
        // Reset after 3s so it can fire again
        setTimeout(() => { firedRef.current = false; }, 3000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;
  const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff', '#6366f1'];

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  // Show message
  const msg = document.createElement('div');
  msg.textContent = '🎉 You typed "hire" — good choice!';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(10,10,15,0.95)',
    border: '1px solid rgba(59,130,246,0.4)',
    backdropFilter: 'blur(16px)',
    color: '#fff',
    padding: '20px 32px',
    borderRadius: '16px',
    fontSize: '18px',
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: '600',
    zIndex: '99999',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    textAlign: 'center',
  });
  document.body.appendChild(msg);
  requestAnimationFrame(() => { msg.style.opacity = '1'; });
  setTimeout(() => {
    msg.style.opacity = '0';
    setTimeout(() => msg.remove(), 400);
  }, 2200);
}
