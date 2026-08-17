export default function SectionHeader({ number, label, title, subtitle, center = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {(number || label) && (
        <div className={`flex items-center gap-3 mb-3 ${center ? 'justify-center' : ''}`}>
          {number && (
            <span className="section-number">{number}</span>
          )}
          {number && label && <span className="w-px h-3 bg-accent-500/50" />}
          {label && (
            <span className="section-number">{label}</span>
          )}
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
