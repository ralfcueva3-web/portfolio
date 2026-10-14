# Ralf.dev — Portfolio

A designer-built portfolio site with an editorial brutalist aesthetic. Not a template.

Built with Next.js 16, React Three Fiber, Framer Motion, GSAP, and an AI chat assistant.

![Dark theme](https://img.shields.io/badge/theme-dark-0a0a0a) ![Light theme](https://img.shields.io/badge/theme-light-f5f0ea) ![Accent](https://img.shields.io/badge/accent-%23ff4d00-ff4d00)

---

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (optional, for AI features)
cp .env.example .env.local
# Add your GROQ_API_KEY and/or GOOGLE_AI_API_KEY

# Run development server
npm run dev

# Production build
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Optional | Groq API key for Llama 3 chat (primary AI provider) |
| `GOOGLE_AI_API_KEY` | Optional | Google Gemini API key (fallback AI provider) |

> The site works without AI keys — the chat widget will show an error state gracefully.

---

## How to Edit

### Content (text, projects, links)

**Single file:** [`data/content.ts`](data/content.ts)

Everything is here: hero copy, about paragraphs, skills, projects, experience entries, contact info, navigation items, and suggested AI questions. Change text, add projects, update links — no need to touch any components.

```typescript
// Example: update your name and tagline
export const hero = {
  nameTop: 'Your Name',
  nameBottom: 'aka Handle',
  descriptor: 'Your Role',
  tagline: 'Your one-liner...',
  // ...
};
```

### AI Knowledge Base

**File:** [`data/knowledge.md`](data/knowledge.md)

This Markdown file is loaded as context for the AI chat assistant. Update it with your real bio, skills, project details, and FAQ answers. The AI will only answer based on what's in this file.

### Colors & Theme

**File:** [`src/app/globals.css`](src/app/globals.css)

All colors are CSS custom properties. Edit the `:root` block for dark theme and `.light` block for light theme:

```css
/* Dark theme */
:root {
  --accent: #ff4d00;        /* Change this to your accent color */
  --bg-primary: #0a0a0a;    /* Main background */
  --text-primary: #e8e4de;  /* Main text */
}

/* Light theme */
.light {
  --accent: #e64500;
  --bg-primary: #f5f0ea;
  --text-primary: #1a1a1a;
}
```

### Fonts

**File:** [`src/app/layout.tsx`](src/app/layout.tsx)

Fonts are loaded via `next/font/google`. Replace `Space_Grotesk` or `JetBrains_Mono` with any Google Font:

```typescript
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", ... });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", ... });
```

### 3D Visuals

**File:** [`src/components/three/SceneConfig.ts`](src/components/three/SceneConfig.ts)

All 3D settings in one config object — particle count, colors, speeds, sphere radius, performance limits:

```typescript
export const SCENE_CONFIG = {
  hero: {
    particleCount: 600,     // Reduce for better perf
    color: '#ff4d00',       // Primary particle color
    secondaryColor: '#e8e4de',
    rotationSpeed: 0.12,
    mouseInfluence: 0.25,
  },
  // ...
};
```

### Adding a New Project

In `data/content.ts`, add to the `projects` array:

```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'Short description for cards.',
  longDescription: 'Longer description shown on the project page.',
  stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  liveUrl: 'https://myproject.com',
  githubUrl: 'https://github.com/you/myproject',
  image: '/images/project-myproject.jpg',
  video: null,
  featured: true,
  year: '2024',
}
```

---

## Architecture

```
portfolio/
├── data/
│   ├── content.ts          # All site content (single source of truth)
│   └── knowledge.md        # AI assistant knowledge base
├── docs/
│   ├── gemini-work.md      # Phase 1 file log
│   └── opus-work.md        # Phase 2 (redesign) file log
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens + Tailwind v4 theme
│   │   ├── layout.tsx      # Root layout, fonts, ThemeProvider
│   │   ├── page.tsx        # Home page assembly
│   │   ├── template.tsx    # Page transitions
│   │   └── api/
│   │       ├── chat/       # AI streaming chat endpoint
│   │       └── summarize/  # Project summarizer endpoint
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, LoadingScreen, etc.
│   │   ├── sections/       # About, Skills, Projects, Experience, Contact
│   │   ├── three/          # R3F 3D scenes (HeroScene, SkillsCloud)
│   │   ├── ui/             # Button, Badge, SurfaceCard, Marquee, etc.
│   │   └── ai/             # ChatWidget
│   ├── hooks/              # useMousePosition, useReducedMotion, etc.
│   ├── lib/                # ai.ts, utils, rate-limit, sanitize
│   └── stores/             # Zustand app store
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-variable theming)
- **3D:** React Three Fiber + drei + three.js
- **Animation:** Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll
- **AI:** Groq (Llama 3) primary, Google Gemini fallback
- **State:** Zustand
- **Theming:** next-themes (class-based, localStorage, system preference)

## Design Direction

**Editorial Brutalist / "Technical Journal"**

- Restrained palette: near-black ink + warm paper + one signal orange accent
- Oversized display typography with tight tracking
- Monospace metadata labels, numbered sections, hairline rules
- Asymmetric layouts — no two sections share the same grid
- Every interaction is intentional: hover states, focus rings, cursor changes

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Deploy-ready for Vercel. Add `GROQ_API_KEY` and/or `GOOGLE_AI_API_KEY` to your Vercel environment variables for AI features.

---

## License

MIT
