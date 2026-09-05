import confetti from 'canvas-confetti';
import { useCallback } from 'react';

/**
 * useParticleBurst – fires a branded confetti burst from a DOM element's position.
 *
 * Usage:
 *   const burst = useParticleBurst();
 *   <button onClick={(e) => burst(e.currentTarget)}>Click me</button>
 *
 * @returns {function(element: HTMLElement, options?: object): void}
 */
export default function useParticleBurst() {
  const burst = useCallback((element, options = {}) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    // Normalize origin to 0-1 relative to the viewport
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Primary branded burst — blues & violets
    confetti({
      particleCount: options.particleCount ?? 60,
      spread: options.spread ?? 70,
      origin: { x, y },
      colors: options.colors ?? ['#3b82f6', '#6366f1', '#22d3ee', '#a78bfa', '#ffffff'],
      startVelocity: options.startVelocity ?? 30,
      gravity: options.gravity ?? 0.8,
      scalar: options.scalar ?? 0.85,
      ticks: options.ticks ?? 80,
      disableForReducedMotion: true,
    });

    // Secondary smaller burst with slight delay for depth
    if (!options.minimal) {
      setTimeout(() => {
        confetti({
          particleCount: 20,
          spread: 50,
          origin: { x, y },
          colors: ['#3b82f6', '#60a5fa', '#e0f2fe'],
          startVelocity: 18,
          gravity: 1.2,
          scalar: 0.6,
          ticks: 50,
          disableForReducedMotion: true,
        });
      }, 100);
    }
  }, []);

  return burst;
}
