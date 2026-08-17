import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Calendar, Clock } from 'lucide-react';
import { blog } from '../../data/portfolio';
import useInView from '../../hooks/useInView';
import SectionHeader from '../ui/SectionHeader';

export default function Blog() {
  const [ref, inView] = useInView();

  if (!blog || blog.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            number="08"
            label="Writing"
            title="Thoughts & Articles"
            subtitle="I write about AI/ML concepts, project learnings, and software engineering."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blog.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 flex flex-col group"
              style={{ border: '1px solid var(--border)', textDecoration: 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'var(--border-accent)' }}
            >
              {/* Tag */}
              <span className="tag self-start mb-3">{post.tag}</span>

              <h3 className="font-display font-bold text-white text-base leading-snug mb-2 group-hover:text-accent-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                {post.summary}
              </p>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-3">
                  {post.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {post.date}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  )}
                </div>
                <ExternalLink size={13} style={{ color: 'var(--accent)' }} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
