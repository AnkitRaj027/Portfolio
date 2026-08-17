import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Technologies organized by ring
const rings = [
  {
    label: 'Core',
    items: ['Python', 'JavaScript', 'C++', 'Java'],
    radius: 82,
    speed: 22,
    color: '#3b82f6',
    lightColor: '#1d4ed8',
  },
  {
    label: 'AI / ML',
    items: ['LangChain', 'RAG', 'Scikit-learn', 'NLP', 'LlamaIndex'],
    radius: 138,
    speed: 34,
    reverse: true,
    color: '#a78bfa',
    lightColor: '#6d28d9',
  },
  {
    label: 'Stack',
    items: ['React', 'FastAPI', 'Streamlit', 'Git', 'Linux', 'Docker'],
    radius: 194,
    speed: 48,
    color: '#22d3ee',
    lightColor: '#0891b2',
  },
];

function RingItem({ item, index, total, radius, color, lightColor, parentSpeed, reverse, theme }) {
  const [hovered, setHovered] = useState(false);
  const baseDeg = (index / total) * 360;
  const animDir = reverse ? 'orbitReverse' : 'orbit';
  const activeColor = theme === 'light' ? lightColor : color;

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        marginLeft: `-${radius}px`,
        marginTop: `-${radius}px`,
        animation: `${animDir} ${parentSpeed}s linear infinite`,
      }}
    >
      <div
        className="absolute"
        style={{
          top: '0%',
          left: '50%',
          transform: `translateX(-50%) rotate(${baseDeg}deg) translateY(-50%)`,
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute"
          style={{
            transform: `rotate(-${baseDeg}deg)`,
            animation: `${reverse ? 'counterOrbitReverse' : 'counterOrbit'} ${parentSpeed}s linear infinite`,
          }}
        >
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none cursor-pointer"
            style={{
              background: hovered ? `${activeColor}15` : 'var(--bg-card)',
              border: `1px solid ${hovered ? activeColor : 'var(--border)'}`,
              color: hovered ? activeColor : 'var(--text-secondary)',
              boxShadow: hovered 
                ? `0 0 16px ${activeColor}30, 0 4px 12px rgba(0,0,0,0.05)` 
                : '0 2px 8px rgba(0,0,0,0.02)',
              transform: `scale(${hovered ? 1.08 : 1})`,
              display: 'inline-block',
            }}
          >
            {item}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SkillOrbit() {
  const { theme } = useTheme();

  return (
    <div className="relative flex items-center justify-center select-none" style={{ height: 460 }}>
      {/* Ring SVG circles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 460 460"
        preserveAspectRatio="xMidYMid meet"
      >
        {rings.map((ring) => {
          const activeColor = theme === 'light' ? ring.lightColor : ring.color;
          return (
            <circle
              key={ring.label}
              cx="230"
              cy="230"
              r={ring.radius}
              fill="none"
              stroke={activeColor}
              strokeWidth={theme === 'light' ? '0.75' : '0.5'}
              strokeOpacity={theme === 'light' ? '0.15' : '0.2'}
              strokeDasharray="5 7"
            />
          );
        })}
      </svg>

      {/* Center node */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(29,78,216,0.1), rgba(29,78,216,0.02))'
              : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))',
            border: theme === 'light'
              ? '1px solid rgba(29,78,216,0.25)'
              : '1px solid rgba(59,130,246,0.4)',
            boxShadow: theme === 'light'
              ? '0 10px 30px rgba(29,78,216,0.08)'
              : '0 0 40px rgba(59,130,246,0.15)',
          }}
        >
          <span className="font-display text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            AR
          </span>
        </div>
        <span className="mt-2.5 text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
          Tech Stack
        </span>
      </div>

      {/* Orbiting items */}
      {rings.map((ring) =>
        ring.items.map((item, idx) => (
          <RingItem
            key={`${ring.label}-${item}`}
            item={item}
            index={idx}
            total={ring.items.length}
            radius={ring.radius}
            color={ring.color}
            lightColor={ring.lightColor}
            parentSpeed={ring.speed}
            reverse={ring.reverse}
            theme={theme}
          />
        ))
      )}
    </div>
  );
}
