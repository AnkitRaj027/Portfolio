import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Maximize2, ImageOff } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { projects } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';
import ProjectModal from '../ui/ProjectModal';

/* ── Parallax Image Header ─────────────────────────────── */
function ParallaxImageHeader({ project, index, isHovered, glow }) {
  const imgRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Reset on hover state change
  useEffect(() => {
    if (!isHovered) setParallaxY(0);
  }, [isHovered]);

  const hasImage = project.previewImage && !errored;

  return (
    <div
      className="h-40 relative overflow-hidden group/header"
      style={{ borderBottom: '1px solid var(--border)', zIndex: 1 }}
    >
      {/* Image layer */}
      {project.previewImage && (
        <img
          ref={imgRef}
          src={project.previewImage}
          alt={`${project.title} preview`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-100"
          style={{
            transform: `scale(1.12) translateY(${parallaxY}px)`,
            opacity: loaded && !errored ? 1 : 0,
            transition: isHovered
              ? 'transform 0.08s ease-out, opacity 0.4s ease'
              : 'transform 0.35s ease-in-out, opacity 0.4s ease',
          }}
        />
      )}

      {/* Gradient overlay — always present; also serves as fallback */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-300`}
        style={{ opacity: hasImage && loaded ? 0.55 : 1 }}
      />

      {/* Dark vignette at bottom for text legibility */}
      {hasImage && loaded && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      )}

      {/* Decorative SVG (shown when no image) */}
      {!hasImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
            <circle cx="90" cy="60" r="50" stroke="white" strokeWidth="1" />
            <circle cx="90" cy="60" r="30" stroke="white" strokeWidth="1" />
            <line x1="40" y1="60" x2="140" y2="60" stroke="white" strokeWidth="1" />
            <line x1="90" y1="10" x2="90" y2="110" stroke="white" strokeWidth="1" />
            <circle cx="90" cy="60" r="6" fill="white" />
          </svg>
        </div>
      )}

      {/* Glow orb */}
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl"
        style={{ background: project.accentColor + '30' }}
      />

      {/* Project index badge */}
      <span
        className="absolute top-4 left-4 text-xs font-bold font-display tracking-widest z-10"
        style={{ color: hasImage && loaded ? 'rgba(255,255,255,0.9)' : project.accentColor }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Open modal hint */}
      <div
        className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover/header:opacity-100 transition-opacity z-10"
        style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
      >
        <Maximize2 size={12} />
      </div>
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────── */
function ProjectCard({ project, index, inView, onOpen }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [parallaxY, setParallaxY] = useState(0);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    setGlow({ x, y });

    // Parallax: image shifts slightly opposite to mouse
    const py = ((y / rect.height) - 0.5) * -14;
    setParallaxY(py);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setParallaxY(0);
  };

  return (
    <motion.article
      className="project-card cursor-pointer group relative overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) translateY(-6px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.3s ease-in-out',
        willChange: 'transform',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`Open ${project.title} details`}
    >
      {/* Radial Cursor Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(59, 130, 246, 0.15), transparent 85%)`,
        }}
      />

      {/* Parallax Image / Gradient header */}
      <ParallaxImageHeader
        project={project}
        index={index}
        isHovered={isHovered}
        parallaxY={parallaxY}
        imgRef={imgRef}
      />

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="font-display text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {project.shortDesc || project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Actions — stop propagation so they don't open modal */}
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4 flex-1 justify-center"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4 flex-1 justify-center"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : (
            <button
              className="text-sm flex-1 text-center py-2 rounded-lg border transition-all"
              style={{
                color: 'var(--accent)',
                borderColor: 'var(--border-accent)',
                background: 'var(--accent-dim)',
              }}
              onClick={() => onOpen(project)}
            >
              View Details →
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <SectionHeader
            number="03"
            label="Featured Work"
            title="Projects I've Built"
            subtitle="Click any card for full details. A selection of projects spanning AI systems and distributed computing."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-slate-900/40"
            >
              {showAll ? 'Show Less' : 'Show More Projects'}
              <ArrowRight size={16} className={`transition-transform duration-300 ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
