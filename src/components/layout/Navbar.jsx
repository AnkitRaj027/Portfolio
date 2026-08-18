import { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { personal } from '../../data/portfolio';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { href: '#about',        label: 'About' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact',      label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-xl text-white transition-opacity hover:opacity-80"
            aria-label="Go to top"
          >
            <span style={{ color: 'var(--accent)' }}>{personal.initials[0]}</span>
            <span>{personal.initials[1]}</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active text-white' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: theme + resume + hire */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {personal.resume && (
              <a
                href={personal.resume}
                download
                className="btn-download"
                aria-label="Download resume"
              >
                <Download size={13} />
                Resume
              </a>
            )}
            <button
              onClick={() => window.dispatchEvent(new Event('toggle-ai-assistant'))}
              className="btn-secondary text-sm py-2 px-4 ml-1 flex items-center gap-1.5 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-600/10 text-blue-400 font-medium cursor-pointer"
            >
              <Sparkles size={13} className="animate-pulse" />
              Ask AI
            </button>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary text-sm py-2 px-5 ml-1"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event('toggle-ai-assistant'))}
              className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Toggle AI Assistant"
            >
              <Sparkles size={16} className="animate-pulse" />
            </button>
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className="hamburger-line"
                style={{
                  transform: menuOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none',
                }}
              />
              <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span
                className="hamburger-line"
                style={{
                  transform: menuOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(16px)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full gap-8"
          style={{
            transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'transform 0.3s ease',
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-display text-2xl font-semibold text-white hover:text-accent-400 transition-colors"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            {personal.resume && (
              <a
                href={personal.resume}
                download
                className="btn-download"
                onClick={() => setMenuOpen(false)}
              >
                <Download size={13} />
                Resume
              </a>
            )}
            <button
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new Event('toggle-ai-assistant'));
              }}
              className="btn-secondary flex items-center gap-1.5 border border-blue-500/20 text-blue-400 font-medium"
            >
              <Sparkles size={13} className="animate-pulse" />
              Ask AI
            </button>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
