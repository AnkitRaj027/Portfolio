import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, X, Sparkles, MessageSquare, CornerDownLeft } from 'lucide-react';
import { personal, projects, skills, education, certifications } from '../../data/portfolio';

// Simulated typing speed configuration
const TYPING_DELAY = 15; // ms per char

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hi! I'm Ankit's AI Assistant. Ask me anything about Ankit's projects, skills, certifications, or how to contact him.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Suggested questions
  const quickQuestions = [
    { label: "🚀 Projects", query: "projects" },
    { label: "🧠 Core Skills", query: "skills" },
    { label: "🎓 Education", query: "education" },
    { label: "📜 Certifications", query: "certifications" },
    { label: "💼 Availability", query: "hiring" },
    { label: "📧 Contact Info", query: "contact" }
  ];

  // Helper to handle AI reply formulation
  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Projects
    if (q.includes('project') || q.includes('work') || q.includes('build')) {
      const projectList = projects.map(p => `• **${p.title}**: ${p.shortDesc} (built with ${p.tags.slice(0, 3).join(', ')})`).join('\n');
      return `Ankit has worked on several advanced AI & engineering projects. Here are the highlights:\n\n${projectList}\n\nClick on any project card in the "Featured Work" section for live demos and in-depth details!`;
    }

    // 2. Skills
    if (q.includes('skill') || q.includes('technology') || q.includes('language') || q.includes('python') || q.includes('react') || q.includes('cpp')) {
      const topSkills = skills.map(s => `• **${s.category}**: ${s.items.map(item => item.name).slice(0, 4).join(', ')}`).join('\n');
      return `Ankit's primary stack spans Machine Learning, Generative AI, and modern web technologies. Key domains:\n\n${topSkills}\n\nHe is highly proficient in Python, C++, SQL, LangChain, and React.`;
    }

    // 3. Contact & Socials
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('social') || q.includes('linkedin') || q.includes('github') || q.includes('twitter')) {
      return `You can connect with Ankit through the following channels:\n\n• 📧 **Email**: ${personal.email}\n• 🔗 **LinkedIn**: [Ankit's LinkedIn](${personal.socials.linkedin})\n• 💻 **GitHub**: [Ankit's GitHub](${personal.socials.github})\n\nFeel free to send a message using the Contact form at the bottom of the page!`;
    }

    // 4. Education
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('study') || q.includes('lpu') || q.includes('cgpa')) {
      const edu = education[0];
      return `Ankit is pursuing his **${edu.degree}** at **${edu.institution}** (Class of ${edu.duration.split('–')[1].trim()}).\n\n• 📍 **Location**: ${edu.location}\n• 📊 **CGPA**: ${edu.cgpa ?? '8.85'} / 10\n• 📚 **Key Coursework**: ML, Deep Learning, NLP, Data Structures & Algorithms.`;
    }

    // 5. Certifications
    if (q.includes('cert') || q.includes('credentials') || q.includes('course')) {
      const certList = certifications.map(c => `• **${c.name}** (Issued by ${c.issuer}, ${c.date})`).slice(0, 4).join('\n');
      return `Ankit holds several industry certifications:\n\n${certList}\n\nYou can click on any credential under the "Certifications" section to verify them!`;
    }

    // 6. Availability & Job Status
    if (q.includes('hiring') || q.includes('job') || q.includes('opportunity') || q.includes('intern') || q.includes('available')) {
      return `Ankit is currently **${personal.availability}**! He is open to Software Engineering (SDE) and AI/ML Developer roles. He is excited to apply generative AI, RAG architectures, and agentic workflows to real-world products.`;
    }

    // 7. Resume
    if (q.includes('resume') || q.includes('cv')) {
      return `You can view and download Ankit's full resume directly here: [Download Resume PDF](${personal.resume}). There are also download links in the header and footer!`;
    }

    // Default Fallback
    return `I'm a client-side AI, so I might not have caught that. Try asking about his **projects**, **skills**, **education**, **certifications**, or **how to contact him**!`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    const userMsg = { sender: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay and response typing
    setTimeout(() => {
      const replyText = getBotResponse(query);
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: replyText, timestamp: new Date() }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer select-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, var(--accent), var(--accent-dark, #1e40af))',
          boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="text-white" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="text-white fill-white/10" size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[380px] h-[500px] rounded-2xl glass-strong shadow-2xl flex flex-col overflow-hidden border border-slate-800"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white leading-none">Ankit AI</h4>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-900 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/45 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                        <Bot size={13} />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {msg.text.split('\n').map((para, idx) => {
                        // Render simple markdown links
                        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                        let content = para;
                        const links = [];
                        let match;
                        while ((match = linkRegex.exec(para)) !== null) {
                          links.push({ text: match[1], url: match[2], raw: match[0] });
                        }

                        if (links.length > 0) {
                          let tempNode = [content];
                          links.forEach(link => {
                            tempNode = tempNode.flatMap(node => {
                              if (typeof node === 'string') {
                                const parts = node.split(link.raw);
                                return [
                                  parts[0],
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline font-semibold"
                                  >
                                    {link.text}
                                  </a>,
                                  parts[1]
                                ];
                              }
                              return node;
                            });
                          });
                          return <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{tempNode}</p>;
                        }

                        // Bold text parsing
                        const boldParts = para.split('**');
                        if (boldParts.length > 1) {
                          const nodes = boldParts.map((part, index) => 
                            index % 2 === 1 ? <strong key={index} className="text-white font-semibold">{part}</strong> : part
                          );
                          return <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{nodes}</p>;
                        }

                        return <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{para}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                      <Bot size={13} />
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="p-3 bg-slate-950/20 border-t border-slate-900 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto scrollbar-none">
              {quickQuestions.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.query)}
                  className="px-2.5 py-1 text-[10px] rounded-full border border-slate-800 hover:border-blue-500/40 bg-slate-900/60 hover:bg-blue-600/10 text-slate-300 hover:text-blue-400 font-medium transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-slate-950/80 border-t border-slate-900 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, skills, contact..."
                className="flex-grow bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
