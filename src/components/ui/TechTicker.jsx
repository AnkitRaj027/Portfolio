// Infinite auto-scrolling technology ticker strip
// Duplicates items for seamless loop effect

const techs = [
  'Python', 'React', 'LangChain', 'FastAPI', 'LlamaIndex',
  'Scikit-learn', 'RAG', 'LangGraph', 'Streamlit', 'Git',
  'JavaScript', 'C++', 'Knowledge Graphs', 'NLP', 'Linux',
  'Machine Learning', 'Generative AI', 'REST APIs', 'Agentic AI',
];

export default function TechTicker() {
  return (
    <div
      className="py-5 overflow-hidden border-y select-none"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Fade masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-secondary), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-secondary), transparent)' }}
        />

        <div className="flex" style={{ animation: 'ticker 28s linear infinite' }}>
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 flex-shrink-0 px-5 text-sm font-medium whitespace-nowrap"
              style={{ color: 'var(--text-muted)' }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
