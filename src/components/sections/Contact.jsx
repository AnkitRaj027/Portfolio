import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { personal } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (personal.formspreeId === 'YOUR_FORMSPREE_ID') {
      // Fallback: open mail client
      window.location.href = `mailto:${personal.email}?subject=Portfolio Contact: ${form.name}&body=${encodeURIComponent(form.message)}`;
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${personal.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
      ref={ref}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="section-number">08</span>
            <span className="w-px h-3 bg-accent-500/50" />
            <span className="section-number">Contact</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Let's build something interesting.
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have an idea, opportunity, or project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Socials */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-display text-lg font-semibold text-white mb-6">
              Get in touch
            </h3>

            {[
              {
                icon: Mail,
                label: 'Email',
                value: personal.email,
                href: `mailto:${personal.email}`,
              },
              personal.socials.linkedin && {
                icon: LinkedinIcon,
                label: 'LinkedIn',
                value: 'Connect with me',
                href: personal.socials.linkedin,
              },
              personal.socials.github && {
                icon: GithubIcon,
                label: 'GitHub',
                value: `@${personal.githubUsername}`,
                href: personal.socials.github,
              },
            ]
              .filter(Boolean)
              .map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)' }}
                  >
                    <Icon size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </a>
              ))}
          </motion.div>

          {/* Right: Form */}
          <motion.form
            className="md:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-5"
            style={{ border: '1px solid var(--border)' }}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={handleChange}
                className="form-input resize-none"
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try emailing me directly.
              </div>
            )}

            <button
              id="contact-submit"
              type="submit"
              className="btn-primary w-full justify-center"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                'Sending...'
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>

            {personal.formspreeId === 'YOUR_FORMSPREE_ID' && (
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Set your Formspree ID in <code className="bg-surface-200 px-1 rounded">portfolio.js</code> to enable form submission.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
