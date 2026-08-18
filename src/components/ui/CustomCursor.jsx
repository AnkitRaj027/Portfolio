import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      if (!e.target) return;
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, .skill-card, .project-card, .tag, select');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      // Ring follows with slight lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovered ? 'scale-[0.6]' : ''}`}
        style={{ willChange: 'transform, left, top' }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? 'scale-[1.3]' : ''}`}
        style={{ willChange: 'transform, left, top' }}
      />
    </>
  );
}
