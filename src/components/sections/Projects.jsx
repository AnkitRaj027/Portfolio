import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Maximize2 } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { projects } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';
import ProjectModal from '../ui/ProjectModal';

function ProjectCard({ project, index, inView, onOpen }) {
  return (
    <motion.article
      className="project-card cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`Open ${project.title} details`}
    >
      {/* Gradient header */}
      <div
        className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden group`}
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
            <circle cx="90" cy="60" r="50" stroke="white" strokeWidth="1" />
            <circle cx="90" cy="60" r="30" stroke="white" strokeWidth="1" />
            <line x1="40" y1="60" x2="140" y2="60" stroke="white" strokeWidth="1" />
            <line x1="90" y1="10" x2="90" y2="110" stroke="white" strokeWidth="1" />
            <circle cx="90" cy="60" r="6" fill="white" />
          </svg>
        </div>
        <div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl"
          style={{ background: project.accentColor + '30' }}
        />
        <span
          className="absolute top-4 left-4 text-xs font-bold font-display tracking-widest"
          style={{ color: project.accentColor }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Open modal hint */}
        <div
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}
        >
          <Maximize2 size={12} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
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
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
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
