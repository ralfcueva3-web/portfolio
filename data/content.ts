// BUILT-BY: opus-4.6
// ============================================
// PORTFOLIO CONTENT — Single source of truth
// Edit this file to update all site content.
// Brand: Ralph.dev | Raman, aka Ralph
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

export interface Project {
  id: string;
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

// ---- Site Configuration ----

export const siteConfig = {
  name: 'Ralph.dev',
  title: 'Raman — Full-Stack Developer & AI Engineer',
  description:
    'Full-stack engineer building production systems with Next.js, TypeScript, and AI. Not another portfolio template.',
  url: 'https://ralph.dev',
  ogImage: '/og-image.png',
};

// ---- Hero Section ----

export const hero = {
  // No generic "Hello, I'm" — editorial hero copy
  nameTop: 'Raman',
  nameBottom: 'aka Ralph',
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
  },
  {
    id: 'devflow',
    title: 'DevFlow',
    description:
      'Developer productivity dashboard with AI code review and analytics.',
    longDescription:
      'An intelligent developer dashboard that aggregates GitHub activity, automates code reviews with GPT-4, tracks sprint velocity, and surfaces actionable productivity insights. Features real-time collaboration and Slack integration.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'GraphQL', 'WebSockets'],
    liveUrl: 'https://devflow.demo.dev',
    githubUrl: 'https://github.com/ralph/devflow',
    image: '/images/project-devflow.jpg',
    video: null,
    featured: true,
    year: '2023',
  },
  {
    id: 'pixelforge',
    title: 'PixelForge',
    description:
      'Real-time collaborative design tool with WebGL rendering.',
    longDescription:
      'A browser-based design tool supporting real-time multi-user collaboration, WebGL-accelerated canvas rendering, layer management, and Git-like version control for design files. Supports exporting to Figma and SVG formats.',
    stack: ['Next.js', 'Three.js', 'Y.js', 'PostgreSQL', 'AWS S3', 'WebRTC'],
    liveUrl: 'https://pixelforge.demo.dev',
    githubUrl: 'https://github.com/ralph/pixelforge',
    image: '/images/project-pixelforge.jpg',
    video: null,
    featured: false,
    year: '2023',
  },
  {
    id: 'datalens',
    title: 'DataLens',
    description:
      'ML-powered analytics platform with natural language querying.',
    longDescription:
      'An analytics platform that lets non-technical users query complex datasets using natural language. Features automated data visualization, anomaly detection, and scheduled report generation powered by fine-tuned transformer models.',
    stack: ['Python', 'FastAPI', 'React', 'PyTorch', 'PostgreSQL', 'Docker', 'Kubernetes'],
    liveUrl: 'https://datalens.demo.dev',
    githubUrl: 'https://github.com/ralph/datalens',
    image: '/images/project-datalens.jpg',
    video: null,
    featured: false,
    year: '2022',
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
    text: "Raman's ability to bridge AI and full-stack development is rare. He consistently delivers solutions that are technically excellent and ship on time.",
    avatar: '/images/avatar-sarah.jpg',
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateLab',
    text: "Working with Raman transformed our product. His deep understanding of performance optimization helped us achieve metrics we didn't think were possible.",
    avatar: '/images/avatar-david.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'DigitalCraft Studio',
    text: "Raman has an exceptional eye for design and motion. He brought our most ambitious creative concepts to life with flawless web experiences.",
    avatar: '/images/avatar-emily.jpg',
  },
];

// ---- Contact ----

export const contact = {
  title: "Let's work together",
  description:
    "Have something interesting to build? I'm always up for a conversation about AI, systems, or anything that ships.",
  email: 'hello@ralph.dev',
  socials: {
    github: 'https://github.com/ralph',
    linkedin: 'https://linkedin.com/in/raman-ralph',
    twitter: 'https://twitter.com/ralphdev',
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
  "What's Raman's tech stack?",
  'Tell me about his AI projects',
  'What has he built with Next.js?',
  'Is he available for hire?',
];
