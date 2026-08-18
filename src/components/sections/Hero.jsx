import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { personal } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

/* ── AI Network Canvas ─────────────────────────────────── */
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const COUNT = window.innerWidth < 600 ? 28 : 52;
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const MAX_DIST = 140;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Repel nodes from mouse and draw cursor connections
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach((n) => {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeDist = 180;
          if (dist < activeDist) {
            const alpha = (1 - dist / activeDist) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Repulsion force
            const repelDist = 100;
            if (dist < repelDist) {
              const force = (repelDist - dist) * 0.04;
              const angle = Math.atan2(dy, dx);
              n.x += Math.cos(angle) * force;
              n.y += Math.sin(angle) * force;
            }
          }
        });
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const alpha = 0.4 + Math.sin(n.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.45 }}
    />
  );
}

/* ── Stagger variants ──────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const { theme } = useTheme();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const isLight = theme === 'light';


  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
      }}
    >
      <NetworkCanvas />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 110%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-8">
            <span
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border"
              style={{
                background: isLight ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.08)',
                borderColor: isLight ? 'rgba(22,163,74,0.25)' : 'rgba(34,197,94,0.2)',
                color: isLight ? '#166534' : '#86efac',
              }}
            >
              <span className="pulse-dot" />
              {personal.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
          >
            {personal.name.split(' ').map((word, wi) => (
              <span key={wi}>
                {wi === 0 ? (
                  <span className="text-white">{word} </span>
                ) : (
                  <span className="gradient-text">{word}</span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Role */}
          <motion.div variants={item} className="mb-6">
            <span
              className="font-display text-xl md:text-2xl font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {personal.role}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-10">
            <button className="btn-primary" onClick={() => scrollToSection('projects')}>
              View My Work
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              Let's Connect
            </button>
            {personal.resume && (
              <a href={personal.resume} download className="btn-download">
                <Download size={14} />
                Download CV
              </a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex items-center gap-5">
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 text-sm transition-all hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                <GithubIcon size={20} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {personal.socials.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-sm transition-all"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <LinkedinIcon size={20} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="flex items-center gap-2 text-sm transition-all"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Mail size={20} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
