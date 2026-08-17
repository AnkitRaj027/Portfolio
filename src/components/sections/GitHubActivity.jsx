import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Users, BookOpen } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { personal } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

function StatCard({ icon: Icon, label, value, inView, delay }) {
  return (
    <motion.div
      className="glass rounded-xl p-5 flex flex-col items-center text-center"
      style={{ border: '1px solid var(--border)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ background: 'var(--accent-dim)' }}
      >
        <Icon size={18} style={{ color: 'var(--accent)' }} />
      </div>
      <div className="font-display text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  );
}

export default function GitHubActivity() {
  const [ref, inView] = useInView();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!personal.githubUsername || personal.githubUsername === 'ankitraj') {
      setError(true);
      return;
    }
    fetch(`https://api.github.com/users/${personal.githubUsername}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((d) => setStats(d))
      .catch(() => setError(true));
  }, []);

  const displayed = stats
    ? [
        { icon: BookOpen, label: 'Repositories', value: stats.public_repos ?? '—' },
        { icon: Users,    label: 'Followers',    value: stats.followers ?? '—' },
        { icon: Star,     label: 'Following',    value: stats.following ?? '—' },
        { icon: GitFork,  label: 'Platform',     value: 'GitHub' },
      ]
    : [
        { icon: BookOpen, label: 'Repositories', value: '—' },
        { icon: Users,    label: 'Followers',    value: '—' },
        { icon: Star,     label: 'Following',    value: '—' },
        { icon: GitFork,  label: 'Platform',     value: 'GitHub' },
      ];

  return (
    <section
      id="github"
      className="py-24 px-6"
      ref={ref}
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="08"
            label="Developer Activity"
            title="GitHub Profile"
            subtitle="Open source presence and developer activity."
          />
        </motion.div>

        {/* Profile card */}
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 mb-6"
          style={{ border: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-dim)', border: '2px solid var(--border-accent)' }}
            >
              <GithubIcon size={30} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-white">
                {stats?.name || personal.name}
              </h3>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                {stats?.bio || 'AI/ML Developer · Open Source Contributor'}
              </p>
              {error && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Update <code className="text-xs bg-surface-200 px-1 rounded">githubUsername</code> in{' '}
                  <code className="text-xs bg-surface-200 px-1 rounded">portfolio.js</code> to load live stats.
                </p>
              )}
            </div>
            {personal.socials.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2 px-5 flex-shrink-0"
              >
                <GithubIcon size={15} />
                View Profile
              </a>
            )}
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayed.map((s, i) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              label={s.label}
              value={s.value}
              inView={inView}
              delay={0.25 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
