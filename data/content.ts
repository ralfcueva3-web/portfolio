// BUILT-BY: opus-4.6
// ============================================
// PORTFOLIO CONTENT — Single source of truth
// Edit this file to update all site content.
// Brand: Ralf.dev | Ayush, aka Ralf
// ============================================

// ---- Type Definitions ----

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0–100
}

export interface SkillCategory {
  name: string;
  items: Skill[];
}

export interface CaseStudy {
  problem: string;
  approach: string;
  challenges: string[];
  outcome: string;
  metrics: { label: string; value: string }[];
  screenshots: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  video: string | null;
  featured: boolean;
  year: string;
  caseStudy: CaseStudy;
}

export interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NowItem {
  emoji: string;
  text: string;
}

// ---- Site Configuration ----

export const siteConfig = {
  name: 'Ralf.dev',
  role: 'Full-Stack Developer & AI Engineer',
  title: 'Ralf.dev | Full-Stack Developer & AI Engineer',
  description:
    'Full-stack engineer building production systems with Next.js, TypeScript, and AI. Not another portfolio template.',
  url: 'https://Ralf.dev',
  ogImage: '/og-image.png',
  keywords: [
    'Ralf.dev',
    'Ayush',
    'Full-Stack Developer',
    'AI Engineer',
    'Next.js',
    'TypeScript',
    'React Three Fiber',
    'Tailwind CSS',
    'Portfolio',
  ],
};

// ---- Hero Section ----

export const hero = {
  nameTop: 'Ayush',
  nameBottom: 'aka Ralf',
  descriptor: 'Full-Stack Developer & AI Engineer',
  tagline:
    'I build systems that ship — not slide decks. Currently focused on AI-native web apps, real-time infra, and interfaces that feel like they were designed by someone who actually uses them.',
  location: 'Kolkata, IN',
  coordinates: '22.5726° N, 88.3639° E',
  status: 'Available for work',
  cta: {
    primary: 'Selected work ↓',
    secondary: 'Get in touch',
  },
};

// ---- About Section ----

export const about = {
  title: 'Background',
  paragraphs: [
    "I'm a full-stack developer who got into this because I wanted to build things that actually work, not because someone told me it was a good career. Five years in, that hasn't changed.",
    "My days split between architecting backends that don't fall over at 3 AM and building frontends that don't make designers wince. I've shipped RAG pipelines, real-time collaborative tools, and enough CRUD apps to know when not to build another one.",
    "I think most developer portfolios are boring. So I tried to make this one slightly less boring. You're welcome.",
  ],
  stats: [
    { label: 'Years shipping code', value: 5 },
    { label: 'Production projects', value: 30 },
    { label: 'GitHub stars', value: 2400 },
    { label: 'Technical articles', value: 15 },
  ],
  resumeUrl: '/resume.pdf',
};

// ---- "Now" Section ----

export const now = {
  title: 'What I\'m up to',
  subtitle: 'Updated October 2026',
  items: [
    { emoji: '🔧', text: 'Building an AI-powered code review tool that actually understands context' },
    { emoji: '📖', text: 'Deep-diving into Rust for systems programming — rewriting a hot path in our pipeline' },
    { emoji: '🧠', text: 'Experimenting with local LLMs (Ollama + Llama 3) for privacy-first AI features' },
    { emoji: '✍️', text: 'Writing a blog series on "RAG patterns that actually work in production"' },
    { emoji: '🎮', text: 'Playing through Elden Ring DLC — no spoilers please' },
  ] as NowItem[],
};

// ---- Skills Section ----

export const skills = {
  title: 'Capabilities',
  categories: [
    {
      name: 'Frontend',
      items: [
        { name: 'React / Next.js', icon: 'SiReact', level: 95 },
        { name: 'TypeScript', icon: 'SiTypescript', level: 92 },
        { name: 'Tailwind CSS', icon: 'SiTailwindcss', level: 90 },
        { name: 'Three.js / R3F', icon: 'SiThreedotjs', level: 80 },
        { name: 'Framer Motion', icon: 'SiFramer', level: 85 },
      ],
    },
    {
      name: 'Backend',
      items: [
        { name: 'Node.js', icon: 'SiNodedotjs', level: 90 },
        { name: 'Python', icon: 'SiPython', level: 88 },
        { name: 'PostgreSQL', icon: 'SiPostgresql', level: 85 },
        { name: 'MongoDB', icon: 'SiMongodb', level: 87 },
        { name: 'Redis', icon: 'SiRedis', level: 78 },
      ],
    },
    {
      name: 'AI / ML',
      items: [
        { name: 'PyTorch', icon: 'SiPytorch', level: 82 },
        { name: 'LangChain', icon: 'SiOpenai', level: 85 },
        { name: 'Hugging Face', icon: 'SiHuggingface', level: 80 },
        { name: 'TensorFlow', icon: 'SiTensorflow', level: 75 },
      ],
    },
    {
      name: 'DevOps',
      items: [
        { name: 'Docker', icon: 'SiDocker', level: 85 },
        { name: 'AWS', icon: 'SiAmazonwebservices', level: 82 },
        { name: 'GitHub Actions', icon: 'SiGithubactions', level: 88 },
        { name: 'Vercel', icon: 'SiVercel', level: 90 },
      ],
    },
  ] as SkillCategory[],
};

// ---- Projects Section ----

export const projects: Project[] = [
  {
    id: 'neuralchat',
    slug: 'neuralchat',
    title: 'NeuralChat',
    description:
      'Conversational AI platform with real-time streaming and multi-model support.',
    longDescription:
      'A full-stack conversational AI platform that supports multiple LLM providers, real-time streaming responses, conversation history, and an intelligent RAG pipeline. Built with a focus on sub-200ms latency and enterprise-grade reliability.',
    stack: ['Next.js', 'TypeScript', 'Groq', 'LangChain', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://neuralchat.demo.dev',
    githubUrl: 'https://github.com/ralph/neuralchat',
    image: '/images/project-neuralchat.jpg',
    video: null,
    featured: true,
    year: '2024',
    caseStudy: {
      problem: 'Enterprise teams needed a self-hosted conversational AI that could switch between LLM providers without vendor lock-in, while maintaining conversation context and sub-200ms streaming latency.',
      approach: 'Built a provider-agnostic abstraction layer over Groq, OpenAI, and Anthropic APIs. Implemented a chunked RAG pipeline with PostgreSQL pgvector for semantic search, Redis for session caching, and Server-Sent Events for real-time streaming.',
      challenges: [
        'Achieving sub-200ms time-to-first-token across different LLM providers with varying response profiles',
        'Building a RAG pipeline that could ingest 10K+ documents without degrading query performance',
        'Handling graceful provider failover when one API goes down mid-conversation',
      ],
      outcome: 'Deployed to 3 enterprise clients. Average latency dropped to 180ms. The RAG pipeline handles 50K+ documents with 95% retrieval accuracy. Zero-downtime provider switching became a key selling point.',
      metrics: [
        { label: 'Time to first token', value: '< 180ms' },
        { label: 'Documents indexed', value: '50K+' },
        { label: 'Retrieval accuracy', value: '95%' },
        { label: 'Uptime', value: '99.97%' },
      ],
      screenshots: ['/images/neuralchat-1.jpg', '/images/neuralchat-2.jpg'],
    },
  },
  {
    id: 'devflow',
    slug: 'devflow',
    title: 'DevFlow',
    description:
      'Developer productivity dashboard with AI code review and analytics.',
    longDescription:
      'An intelligent developer dashboard that aggregates GitHub activity, automates code reviews with GPT-4, tracks sprint velocity, and surfaces actionable productivity insights. Features real-time collaboration and Slack integration.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'GraphQL', 'WebSockets'],
    liveUrl: 'https://devflow.demo.dev',
    githubUrl: 'https://github.com/ralf/devflow',
    image: '/images/project-devflow.jpg',
    video: null,
    featured: true,
    year: '2023',
    caseStudy: {
      problem: 'Engineering managers had no single place to see team velocity, code quality trends, and bottlenecks. Existing tools were either too expensive or too shallow.',
      approach: 'Integrated GitHub webhooks for real-time PR/commit data, built an AI code review layer using GPT-4 with custom prompts tuned for actionable feedback (not generic "add tests" noise), and created a GraphQL API for flexible frontend queries.',
      challenges: [
        'GitHub webhook volume — a single monorepo could generate 1000+ events/hour that needed deduplication',
        'Making AI code reviews actually useful instead of generic — required fine-tuning prompts per language and codebase conventions',
        'Real-time dashboard updates without overwhelming the WebSocket server',
      ],
      outcome: 'Used by 4 engineering teams (60+ developers). AI reviews catch 23% of issues before human review. Sprint velocity visibility increased team estimation accuracy by 40%.',
      metrics: [
        { label: 'Active developers', value: '60+' },
        { label: 'Issues caught by AI', value: '23%' },
        { label: 'Estimation accuracy', value: '+40%' },
        { label: 'Review time saved', value: '35%' },
      ],
      screenshots: ['/images/devflow-1.jpg', '/images/devflow-2.jpg'],
    },
  },
  {
    id: 'pixelforge',
    slug: 'pixelforge',
    title: 'PixelForge',
    description:
      'Real-time collaborative design tool with WebGL rendering.',
    longDescription:
      'A browser-based design tool supporting real-time multi-user collaboration, WebGL-accelerated canvas rendering, layer management, and Git-like version control for design files. Supports exporting to Figma and SVG formats.',
    stack: ['Next.js', 'Three.js', 'Y.js', 'PostgreSQL', 'AWS S3', 'WebRTC'],
    liveUrl: 'https://pixelforge.demo.dev',
    githubUrl: 'https://github.com/ralf/pixelforge',
    image: '/images/project-pixelforge.jpg',
    video: null,
    featured: false,
    year: '2023',
    caseStudy: {
      problem: 'Design teams needed a browser-based tool for real-time collaboration without the heavy client installs and proprietary file formats of existing solutions.',
      approach: 'Used Y.js CRDTs for conflict-free real-time collaboration, Three.js for GPU-accelerated canvas rendering, and WebRTC for peer-to-peer cursor/selection sharing. Implemented Git-like branching for design versions stored in PostgreSQL with S3 binary storage.',
      challenges: [
        'CRDT conflict resolution for complex nested objects like grouped layers with transforms',
        'Maintaining 60fps canvas rendering while syncing real-time updates from multiple users',
        'Implementing undo/redo that works correctly across collaborative sessions',
      ],
      outcome: 'Adopted by 2 design agencies. Supports 8 concurrent editors at 60fps. File version history with instant rollback became the most-loved feature.',
      metrics: [
        { label: 'Concurrent editors', value: '8' },
        { label: 'Canvas FPS', value: '60fps' },
        { label: 'Export formats', value: '5' },
        { label: 'Avg sync latency', value: '< 50ms' },
      ],
      screenshots: ['/images/pixelforge-1.jpg', '/images/pixelforge-2.jpg'],
    },
  },
  {
    id: 'datalens',
    slug: 'datalens',
    title: 'DataLens',
    description:
      'ML-powered analytics platform with natural language querying.',
    longDescription:
      'An analytics platform that lets non-technical users query complex datasets using natural language. Features automated data visualization, anomaly detection, and scheduled report generation powered by fine-tuned transformer models.',
    stack: ['Python', 'FastAPI', 'React', 'PyTorch', 'PostgreSQL', 'Docker', 'Kubernetes'],
    liveUrl: 'https://datalens.demo.dev',
    githubUrl: 'https://github.com/ralf/datalens',
    image: '/images/project-datalens.jpg',
    video: null,
    featured: false,
    year: '2022',
    caseStudy: {
      problem: 'Business analysts spent 60% of their time writing SQL queries and formatting reports instead of analyzing data. They needed a way to ask questions in plain English.',
      approach: 'Fine-tuned a transformer model to convert natural language to SQL, added a visualization recommendation engine that picks the right chart type based on query result shape, and built a scheduled report system with Slack/email delivery.',
      challenges: [
        'Natural language to SQL accuracy — ambiguous queries like "show me sales" needed smart defaults for time range, aggregation, and grouping',
        'Handling schema changes without breaking fine-tuned model accuracy',
        'Scaling the inference pipeline for concurrent query processing without GPU bottlenecks',
      ],
      outcome: 'Deployed at 2 mid-size companies. Reduced analyst time-to-insight by 70%. NL-to-SQL accuracy reached 89% on company-specific schemas after fine-tuning.',
      metrics: [
        { label: 'NL→SQL accuracy', value: '89%' },
        { label: 'Time saved', value: '70%' },
        { label: 'Daily queries', value: '500+' },
        { label: 'Chart types', value: '12' },
      ],
      screenshots: ['/images/datalens-1.jpg', '/images/datalens-2.jpg'],
    },
  },
];

// ---- Experience Timeline ----

export const experience: TimelineEntry[] = [
  {
    year: '2024 — Present',
    role: 'Senior Software Engineer',
    company: 'TechVentures Inc.',
    description:
      'Leading the AI platform team. Architected a RAG-based code assistant serving 50K+ developers with sub-200ms latency. Rewrote the deployment pipeline, cutting release cycles from 2 days to 40 minutes.',
    technologies: ['Next.js', 'Python', 'LangChain', 'Kubernetes', 'PostgreSQL'],
  },
  {
    year: '2022 — 2024',
    role: 'Full-Stack Developer',
    company: 'InnovateLab',
    description:
      'Shipped 12+ production features for a B2B SaaS platform serving Fortune 500 clients. Reduced page load times by 60% through code splitting and edge caching. Built the real-time notification system from scratch.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
  },
  {
    year: '2021 — 2022',
    role: 'Frontend Engineer',
    company: 'DigitalCraft Studio',
    description:
      'Developed interactive web experiences and 3D product configurators for luxury brands. Implemented WebGL animations achieving 60fps on mobile devices.',
    technologies: ['Three.js', 'React', 'GSAP', 'Tailwind CSS', 'Figma'],
  },
  {
    year: '2019 — 2021',
    role: 'Junior Developer',
    company: 'StartupXYZ',
    description:
      'First engineering hire. Built the frontend from scratch and helped scale the product from 0 to 10K users. Learned more in 2 years than most people learn in 5.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Heroku'],
  },
];

// ---- Testimonials ----

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'VP of Engineering',
    company: 'TechVentures Inc.',
    text: "Ayush's ability to bridge AI and full-stack development is rare. He consistently delivers solutions that are technically excellent and ship on time.",
    avatar: '/images/avatar-sarah.jpg',
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateLab',
    text: "Working with Ayush transformed our product. His deep understanding of performance optimization helped us achieve metrics we didn't think were possible.",
    avatar: '/images/avatar-david.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'DigitalCraft Studio',
    text: "Ayush has an exceptional eye for design and motion. He brought our most ambitious creative concepts to life with flawless web experiences.",
    avatar: '/images/avatar-emily.jpg',
  },
];

// ---- Contact ----

export const contact = {
  title: "Let's work together",
  description:
    "Have something interesting to build? I'm always up for a conversation about AI, systems, or anything that ships.",
  email: 'hello@ralf.dev',
  socials: {
    github: 'https://github.com/ralf',
    linkedin: 'https://linkedin.com/in/ayush-ralf',
    twitter: 'https://twitter.com/ralfdev',
  },
};

// ---- Navigation ----

export const navigation: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// ---- AI Chat Suggested Questions ----

export const suggestedQuestions = [
  "What's Ayush's tech stack?",
  'Tell me about his AI projects',
  'What has he built with Next.js?',
  'Is he available for hire?',
];

// ---- Command Palette Actions ----

export const commandPaletteActions = [
  { id: 'about', label: 'Go to About', section: 'Navigate', shortcut: '', action: 'navigate', target: '#about' },
  { id: 'projects', label: 'Go to Projects', section: 'Navigate', shortcut: '', action: 'navigate', target: '#projects' },
  { id: 'experience', label: 'Go to Experience', section: 'Navigate', shortcut: '', action: 'navigate', target: '#experience' },
  { id: 'contact', label: 'Go to Contact', section: 'Navigate', shortcut: '', action: 'navigate', target: '#contact' },
  { id: 'now', label: 'Go to Now', section: 'Navigate', shortcut: '', action: 'navigate', target: '#now' },
  { id: 'theme', label: 'Toggle theme', section: 'Actions', shortcut: '', action: 'theme', target: '' },
  { id: 'chat', label: 'Open RALF chat', section: 'Actions', shortcut: '', action: 'chat', target: '' },
  { id: 'email', label: 'Copy email address', section: 'Actions', shortcut: '', action: 'copy-email', target: 'hello@ralf.dev' },
  { id: 'resume', label: 'Download résumé', section: 'Actions', shortcut: '', action: 'download', target: '/resume.pdf' },
  { id: 'resume-page', label: 'View résumé page', section: 'Navigate', shortcut: '', action: 'link', target: '/resume' },
  { id: 'github', label: 'Open GitHub', section: 'Links', shortcut: '', action: 'external', target: 'https://github.com/ralf' },
  { id: 'linkedin', label: 'Open LinkedIn', section: 'Links', shortcut: '', action: 'external', target: 'https://linkedin.com/in/ayush-ralf' },
];

// ---- Resume Page ----

export const resumeData = {
  name: 'Ayush',
  alias: 'Ralf',
  title: 'Full-Stack Developer & AI Engineer',
  email: 'hello@ralf.dev',
  location: 'Kolkata, India',
  website: 'ralf.dev',
  summary: 'Full-stack engineer with 5+ years building production systems. Specialize in AI-native applications, real-time infrastructure, and interfaces that ship. Currently focused on LLM integration, RAG pipelines, and developer tooling.',
  pdfUrl: '/resume.pdf',
};
