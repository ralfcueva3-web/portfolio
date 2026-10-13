// ============================================
// PORTFOLIO CONTENT — Single source of truth
// Edit this file to update all site content.
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
  name: 'Alex Chen',
  title: 'Alex Chen — Full-Stack Developer & AI Engineer',
  description:
    'Full-Stack Developer and AI Engineer crafting exceptional digital experiences with modern web technologies, 3D graphics, and artificial intelligence.',
  url: 'https://alexchen.dev',
  ogImage: '/og-image.png',
};

// ---- Hero Section ----

export const hero = {
  greeting: "Hello, I'm",
  name: 'Alex Chen',
  roles: [
    'Full-Stack Developer',
    'AI Engineer',
    'Creative Technologist',
    'Open Source Contributor',
  ],
  tagline:
    'I build digital experiences that live at the intersection of design, engineering, and artificial intelligence.',
  cta: {
    primary: 'View My Work',
    secondary: "Let's Talk",
  },
};

// ---- About Section ----

export const about = {
  title: 'About Me',
  paragraphs: [
    "I'm a full-stack developer and AI engineer with 5+ years of experience building production applications that scale. My passion lies in creating seamless user experiences powered by intelligent systems.",
    'From architecting microservices to training machine learning models, I bridge the gap between complex backend systems and beautiful frontend interfaces. I believe the best products are built when engineering excellence meets thoughtful design.',
    "When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or exploring the latest advances in generative AI.",
  ],
  stats: [
    { label: 'Years Experience', value: 5 },
    { label: 'Projects Completed', value: 30 },
    { label: 'GitHub Stars', value: 2400 },
    { label: 'Articles Written', value: 15 },
  ],
  resumeUrl: '/resume.pdf',
};

// ---- Skills Section ----

export const skills = {
  title: 'Skills & Technologies',
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
      'AI-powered conversational platform with real-time streaming and multi-model support.',
    longDescription:
      'A full-stack conversational AI platform that supports multiple LLM providers, real-time streaming responses, conversation history, and an intelligent RAG pipeline. Built with a focus on sub-200ms latency and enterprise-grade reliability.',
    stack: ['Next.js', 'TypeScript', 'Groq', 'LangChain', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://neuralchat.demo.dev',
    githubUrl: 'https://github.com/alexchen/neuralchat',
    image: '/images/project-neuralchat.jpg',
    video: null,
    featured: true,
  },
  {
    id: 'devflow',
    title: 'DevFlow',
    description:
      'Developer productivity dashboard with AI-powered code review and analytics.',
    longDescription:
      'An intelligent developer dashboard that aggregates GitHub activity, automates code reviews with GPT-4, tracks sprint velocity, and surfaces actionable productivity insights. Features real-time collaboration and Slack integration.',
    stack: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'GraphQL', 'WebSockets'],
    liveUrl: 'https://devflow.demo.dev',
    githubUrl: 'https://github.com/alexchen/devflow',
    image: '/images/project-devflow.jpg',
    video: null,
    featured: true,
  },
  {
    id: 'pixelforge',
    title: 'PixelForge',
    description:
      'Real-time collaborative design tool with WebGL rendering and version control.',
    longDescription:
      'A browser-based design tool supporting real-time multi-user collaboration, WebGL-accelerated canvas rendering, layer management, and Git-like version control for design files. Supports exporting to Figma and SVG formats.',
    stack: ['Next.js', 'Three.js', 'Y.js', 'PostgreSQL', 'AWS S3', 'WebRTC'],
    liveUrl: 'https://pixelforge.demo.dev',
    githubUrl: 'https://github.com/alexchen/pixelforge',
    image: '/images/project-pixelforge.jpg',
    video: null,
    featured: false,
  },
  {
    id: 'datalens',
    title: 'DataLens',
    description:
      'ML-powered data analytics platform with natural language querying.',
    longDescription:
      'An analytics platform that lets non-technical users query complex datasets using natural language. Features automated data visualization, anomaly detection, and scheduled report generation powered by fine-tuned transformer models.',
    stack: ['Python', 'FastAPI', 'React', 'PyTorch', 'PostgreSQL', 'Docker', 'Kubernetes'],
    liveUrl: 'https://datalens.demo.dev',
    githubUrl: 'https://github.com/alexchen/datalens',
    image: '/images/project-datalens.jpg',
    video: null,
    featured: false,
  },
];

// ---- Experience Timeline ----

export const experience: TimelineEntry[] = [
  {
    year: '2024 — Present',
    role: 'Senior Software Engineer',
    company: 'TechVentures Inc.',
    description:
      'Leading the AI platform team building next-generation developer tools. Architected a RAG-based code assistant serving 50K+ developers with sub-200ms latency.',
    technologies: ['Next.js', 'Python', 'LangChain', 'Kubernetes', 'PostgreSQL'],
  },
  {
    year: '2022 — 2024',
    role: 'Full-Stack Developer',
    company: 'InnovateLab',
    description:
      'Built and shipped 12+ production features for a B2B SaaS platform serving Fortune 500 clients. Reduced page load times by 60% through strategic code splitting and edge caching.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
  },
  {
    year: '2021 — 2022',
    role: 'Frontend Engineer',
    company: 'DigitalCraft Studio',
    description:
      'Developed interactive web experiences and 3D product configurators for luxury brands. Implemented WebGL-based animations achieving 60fps on mobile devices.',
    technologies: ['Three.js', 'React', 'GSAP', 'Tailwind CSS', 'Figma'],
  },
  {
    year: '2019 — 2021',
    role: 'Junior Developer',
    company: 'StartupXYZ',
    description:
      'First engineering hire at an early-stage startup. Built the entire frontend from scratch and helped scale the product from 0 to 10K users.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Heroku'],
  },
];

// ---- Testimonials ----

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'VP of Engineering',
    company: 'TechVentures Inc.',
    text: "Alex is one of the most talented engineers I've worked with. His ability to bridge AI and full-stack development is rare and incredibly valuable. He consistently delivers solutions that are both technically excellent and beautifully crafted.",
    avatar: '/images/avatar-sarah.jpg',
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateLab',
    text: "Working with Alex transformed our product. His deep understanding of performance optimization and modern web architecture helped us achieve metrics we didn't think were possible. A true 10x engineer.",
    avatar: '/images/avatar-david.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'DigitalCraft Studio',
    text: "Alex has an exceptional eye for design and motion. He brought our most ambitious creative concepts to life with flawless 3D web experiences. Collaborating with him was an absolute pleasure.",
    avatar: '/images/avatar-emily.jpg',
  },
];

// ---- Contact ----

export const contact = {
  title: "Let's Build Something Amazing",
  description:
    "Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas.",
  email: 'hello@alexchen.dev',
  socials: {
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    twitter: 'https://twitter.com/alexchendev',
  },
};

// ---- Navigation ----

export const navigation: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// ---- AI Chat Suggested Questions ----

export const suggestedQuestions = [
  'What technologies does Alex specialize in?',
  'Tell me about his AI projects',
  'What is his experience with React and Next.js?',
  'How can I hire Alex for a project?',
];
