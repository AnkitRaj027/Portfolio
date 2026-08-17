import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, { duration = 1800, start = 0, enabled = true } = {}) {
  const [count, setCount] = useState(start);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    // Extract numeric part from strings like "10+", "20+"
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const suffix = String(target).replace(/[0-9.]/g, '');
    if (isNaN(numeric)) { setCount(target); return; }

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (numeric - start) * eased);
      setCount(`${current}${suffix}`);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, enabled, duration, start]);

  return count;
}
