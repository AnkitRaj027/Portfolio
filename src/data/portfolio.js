/**
 * ============================================================
 * PORTFOLIO DATA — Edit this file to update your portfolio
 * ============================================================
 * All personal information is stored here.
 * The UI components read from this file — no hardcoded data.
 * ============================================================
 */

export const personal = {
  name: "Ankit Raj",
  initials: "AR",
  role: "AI/ML Developer",
  tagline: "Building intelligent applications with Machine Learning, Generative AI, and modern software technologies.",
  availability: "Available for opportunities",
  email: "iamankitraj027@gmail.com", // ← Replace with your actual email
  location: "India",
  profileImage: "/photo.jpg", // ← Add your image path here e.g. "/profile.jpg"
  formspreeId: "xzepjwej", // ← Replace after creating a Formspree account at formspree.io
  socials: {
    github: "https://github.com/AnkitRaj027",   // ← Replace with your GitHub URL
    linkedin: "https://www.linkedin.com/in/ankitraj027/", // ← Replace with your LinkedIn URL
    twitter: null, // ← Add if you have one
  },
  githubUsername: "AnkitRaj027", // ← Your GitHub username for stats section
  openToWork: true, // ← Set to false to hide the Open to Work banner
  resume: "/Ankit_Raj_Resume.pdf", // ← Set to "/resume.pdf" after dropping your PDF in /public
};

export const about = {
  intro: `I'm a B.Tech student specializing in Artificial Intelligence & Machine Learning at Lovely Professional University. I'm passionate about building practical AI systems and software that solve real problems.`,
  body: `My interests span across Machine Learning, Generative AI, Retrieval-Augmented Generation (RAG), Agentic AI, Natural Language Processing, and Knowledge Graphs. I enjoy turning complex research concepts into functional, deployable applications.`,
  passion: `Beyond academics, I actively build projects, participate in hackathons, and explore the intersection of AI research and software engineering.`,
  stats: [
    { label: "Degree", value: "B.Tech AI/ML", icon: "GraduationCap" },
    { label: "Projects Built", value: "5+", icon: "Code2" },       // ← Update number
    { label: "Technologies", value: "20+", icon: "Cpu" },            // ← Update number
    { label: "Hackathons", value: "2+", icon: "Trophy" },            // ← Update number
  ],
};

export const skills = [
  {
    category: "Programming",
    icon: "Code2",
    color: "blue",
    items: [
      { name: "Python", description: "Primary language for ML, scripting, and backend development." },
      { name: "C++", description: "Used for competitive programming and performance-critical tasks." },
      { name: "Java", description: "OOP fundamentals and academic projects." },
      { name: "JavaScript", description: "Frontend and full-stack web development." },
    ],
  },
  {
    category: "Machine Learning",
    icon: "Brain",
    color: "violet",
    items: [
      { name: "Machine Learning", description: "Supervised, unsupervised, and semi-supervised learning paradigms." },
      { name: "NLP", description: "Text processing, tokenization, embeddings, and language models." },
      { name: "Scikit-learn", description: "Classical ML algorithms and pipelines." },
      { name: "TF-IDF", description: "Text feature extraction for information retrieval." },
      { name: "Cosine Similarity", description: "Document and vector similarity measurement." },
    ],
  },
  {
    category: "Generative AI",
    icon: "Sparkles",
    color: "cyan",
    items: [
      { name: "RAG", description: "Retrieval-Augmented Generation for knowledge-grounded AI." },
      { name: "LangChain", description: "Framework for building LLM-powered applications." },
      { name: "LangGraph", description: "Graph-based orchestration for complex agentic workflows." },
      { name: "LlamaIndex", description: "Data framework for connecting LLMs to external knowledge." },
      { name: "Knowledge Graphs", description: "Structured knowledge representation for reasoning systems." },
    ],
  },
  {
    category: "Development",
    icon: "Monitor",
    color: "emerald",
    items: [
      { name: "React", description: "Component-based UI development for modern web apps." },
      { name: "Streamlit", description: "Rapid prototyping and deployment of ML demos." },
      { name: "FastAPI", description: "High-performance Python API development." },
      { name: "REST APIs", description: "Designing and consuming RESTful web services." },
      { name: "Gradio", description: "Quickly and easily create demos for ML models." },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "Wrench",
    color: "orange",
    items: [
      { name: "Git", description: "Version control and collaborative development." },
      { name: "GitHub", description: "Code hosting, project management, and CI/CD." },
      { name: "Linux", description: "Command-line proficiency and server environments." },
      { name: "VS Code", description: "Primary development environment with extensive tooling." },
    ],
  },
];

export const projects = [
  {
    id: "smart-resume-ranker",
    title: "ResumeAnalyzer",
    shortDesc: "ML-powered resume screening and ranking system.",
    description:
      "An intelligent resume screening system that uses NLP, TF-IDF vectorization, and cosine similarity to match resumes against job descriptions. Features skill extraction, automated ranking, and a clean web interface.",
    tags: ["Python", "NLP", "TF-IDF", "Scikit-learn", "Streamlit"],
    github: "https://github.com/AnkitRaj027/ResumeAnalyzer", // ← Update
    demo: "https://resumesinsight.streamlit.app/", // ← Add live demo URL if available
    featured: true,
    gradient: "from-blue-600/20 to-violet-600/20",
    accentColor: "#3b82f6",
    details: [
      "Parses and cleans resumes using NLP preprocessing pipelines",
      "TF-IDF vectorization converts text into numerical feature vectors",
      "Cosine similarity ranks candidates by relevance to job description",
      "Skill extraction identifies key technologies and qualifications",
      "Clean Streamlit UI for recruiter-friendly usage",
    ],
  },
  {
    id: "pocket-ca",
    title: "PocketCA",
    shortDesc: "AI-powered financial assistant for smart money management.",
    description:
      "An AI/finance-oriented application designed to help users understand and manage financial information intelligently. Leverages generative AI to provide contextual financial guidance.",
    tags: ["Python", "LangChain", "RAG", "FastAPI", "React"],
    github: "https://github.com/AnkitRaj027/PocketCA", // ← Update
    demo: "https://pocketca.streamlit.app/", // ← Add live demo URL if available
    featured: true,
    gradient: "from-emerald-600/20 to-cyan-600/20",
    accentColor: "#10b981",
    details: [
      "RAG pipeline retrieves relevant financial knowledge for accurate answers",
      "LangChain orchestrates document loading, chunking, and retrieval",
      "FastAPI backend serves AI responses with low latency",
      "React frontend provides an intuitive chat-based interface",
      "Designed to help users understand financial concepts and manage money",
    ],
  },
  {
    id: "distributed-file-system",
    title: "Distributed File System",
    shortDesc: "Fault-tolerant distributed storage with replication.",
    description:
      "A fault-tolerant distributed file system featuring file replication across nodes, node management, failure detection and handling. Built with a focus on consistency and availability.",
    tags: ["Python", "Distributed Systems", "Networking", "Replication"],
    github: "https://github.com/AnkitRaj027/DistributedFileSystem", // ← Update
    demo: "https://filesystemdistributed.vercel.app/",
    featured: true,
    gradient: "from-orange-600/20 to-red-600/20",
    accentColor: "#f97316",
    details: [
      "Files replicated across multiple nodes for fault tolerance",
      "Automatic failure detection with node health monitoring",
      "Consistent file access even during partial node failures",
      "Custom replication factor configurable per file type",
      "REST API for file upload, download, and management operations",
    ],
  },
];

export const experience = [
  // Replace with your actual experiences. Examples below are placeholders:
  {
    id: "exp-1",
    type: "hackathon", // hackathon | competition | certification | workshop | achievement
    title: "Hackathon Participant", // ← Replace with actual event name
    organization: "OnDemand", // ← Replace
    date: "2024", // ← Replace
    description: "Participated in a 24-hour hackathon building an AI-powered solution.", // ← Replace
    icon: "Trophy",
    tags: ["AI", "Python"],
  },
  {
    id: "exp-2",
    type: "workshop",
    title: "CPP Programming", // ← Replace
    organization: "Let's upgrade", // ← Replace
    date: "2025", // ← Replace
    description: "Attended a hands-on workshop on advanced ML concepts and practical applications.", // ← Replace
    icon: "BookOpen",
    tags: ["CPP"],
  },
  {
    id: "exp-3",
    type: "Community Development",
    title: "Cybersecurity Awareness & Digital Safety",
    organization: "WNS Cares Foundation",
    date: "2025",
    description:
      "Conducted cybersecurity awareness sessions for children, adults, and senior citizens, helping participants understand online safety, cyber threats, phishing, scams, password security, and responsible digital practices.",
    icon: "ShieldCheck",
    tags: ["Cybersecurity", "Digital Safety", "Awareness", "Community Outreach"],
  },
];

export const education = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    duration: "2022 – 2026", // ← Update if needed
    cgpa: "8.85", // ← Add your CGPA e.g. "8.5 / 10"
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
    ],
    achievements: [
      "Relevant coursework in AI/ML fundamentals and advanced techniques",
      // ← Add academic achievements here
    ],
  },
];

export const certifications = [
  {
    id: "cert-1",
    name: "Google AI Professional Certificate", // ← Replace
    issuer: "Google", // ← Replace e.g. Coursera, Google, etc.
    date: "2026", // ← Replace
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/37TPTIH54V76", // ← Replace with actual credential URL
    image: "/googleai.png", // ← Add certificate image path
    tags: ["AI", "ML", "GEMINI"],
  },
  {
    id: "cert-2",
    name: "Programming in Python", // ← Replace
    issuer: "Google", // ← Replace
    date: "2026", // ← Replace
    credentialUrl: "https://coursera.org/share/412e01a65ac6497934d8ee3729c96da9", // ← Replace
    image: "/python.png",
    tags: ["Python"],
  },
  {
    id: "cert-3",
    name: "Prompt Engineering", // ← Replace
    issuer: "Vanderbilt University", // ← Replace
    date: "2026", // ← Replace
    credentialUrl: "#", // ← Replace
    image: "/prompt.png",
    tags: ["AI", "Prompt Engineering"],
  },
  {
    id: "cert-4",
    name: "Building RAG Applications", // ← Replace
    issuer: "IBM", // ← Replace
    date: "2026", // ← Replace
    credentialUrl: "https://coursera.org/share/95aa618c057142c277ff92c8426e60aa", // ← Replace
    image: "/rag.png",
    tags: ["AI", "RAG"],
  },
  {
    id: "cert-5",
    name: "Generative AI Application", // ← Replace
    issuer: "IBM", // ← Replace
    date: "2026", // ← Replace
    credentialUrl: "https://coursera.org/share/69130781fb6d2047ff17011aab3be8e3", // ← Replace
    image: "/gen.png",
    tags: ["AI", "Generative AI", "GenAI", "RAG", "LLM"],
  },
  {
    id: "cert-6",
    name: "Java", // ← Replace
    issuer: "iamneo", // ← Replace
    date: "2026", // ← Replace
    credentialUrl: "#", // ← Replace
    image: "/java.png",
    tags: ["Java"],
  },
  // ← Add more certifications
];

export const currentlyLearning = [
  { name: "Generative AI", icon: "Sparkles", description: "LLMs, prompt engineering, fine-tuning" },
  { name: "Agentic AI", icon: "Bot", description: "Multi-agent systems, tool use, planning" },
  { name: "Advanced ML", icon: "Brain", description: "Deep learning architectures, transformers" },
  { name: "DSA", icon: "GitBranch", description: "Competitive programming, system design" },
  { name: "Cloud & Deployment", icon: "Cloud", description: "Docker, AWS basics, CI/CD pipelines" },
];

/**
 * ─── Blog / Writing ────────────────────────────────────────
 * Add your real articles here. Set url to your Medium/Dev.to/Hashnode post.
 * Remove or leave empty to hide the Blog section.
 */
export const blog = [
  {
    id: "blog-1",
    title: "Understanding RAG: Retrieval-Augmented Generation Explained", // ← Replace
    summary: "A deep dive into how RAG pipelines work, when to use them, and how to build one with LangChain.", // ← Replace
    tag: "Generative AI",
    date: "2024", // ← Replace
    readTime: "5 min read",
    url: "#", // ← Replace with your actual article URL
  },
  {
    id: "blog-2",
    title: "Building a Resume Ranker with NLP and TF-IDF", // ← Replace
    summary: "How I built Smart Resume Ranker — from text preprocessing to cosine similarity scoring.", // ← Replace
    tag: "Machine Learning",
    date: "2024", // ← Replace
    readTime: "7 min read",
    url: "#", // ← Replace
  },
  {
    id: "blog-3",
    title: "Getting Started with LangGraph for Agentic Workflows", // ← Replace
    summary: "How to orchestrate complex multi-step AI agents using LangGraph's graph-based architecture.", // ← Replace
    tag: "Agentic AI",
    date: "2024", // ← Replace
    readTime: "6 min read",
    url: "#", // ← Replace
  },
  // ← Add more blog posts
];

export const seoMeta = {
  title: "Ankit Raj — AI/ML Developer & B.Tech Student",
  description:
    "Portfolio of Ankit Raj — B.Tech AI/ML student at LPU specializing in Machine Learning, Generative AI, RAG, and software development.",
  keywords: "Ankit Raj, AI ML developer, machine learning, generative AI, RAG, LangChain, portfolio",
  ogImage: "/og-image.png",
};
