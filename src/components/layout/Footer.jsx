import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { personal } from '../../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span>© {year}</span>
          <span className="font-semibold text-white">{personal.name}</span>
          <span>— Built with</span>
          <Heart size={12} className="text-accent-500" fill="currentColor" />
          <span>& React</span>
        </div>

        <div className="flex items-center gap-4">
          {personal.socials.github && (
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {personal.socials.linkedin && (
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-accent-400 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="text-slate-500 hover:text-accent-400 transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
