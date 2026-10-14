// BUILT-BY: opus-4.6
import { hero } from '@/../../data/content';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Marquee from '@/components/ui/Marquee';
import ChatWidget from '@/components/ai/ChatWidget';
import HeroSceneWrapper from '@/components/three/HeroSceneWrapper';
import EasterEggs from '@/components/layout/EasterEggs';

/**
 * Home page — editorial brutalist layout.
 * Oversized typographic hero with integrated 3D, then distinct sections.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-16 pt-24"
        aria-label="Introduction"
      >
        {/* 3D Background — behind everything */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <HeroSceneWrapper />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Top metadata bar */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                {hero.status}
              </span>
            </div>
            <span className="font-mono text-xs text-text-muted tracking-wider hidden sm:block">
              {hero.coordinates}
            </span>
          </div>

          {/* Main hero typography — oversized, editorial */}
          <div className="space-y-4">
            <h1 className="text-[clamp(3rem,12vw,10rem)] font-display font-bold leading-[0.9] tracking-tighter text-text-primary">
              {hero.nameTop}
              <br />
              <span className="text-accent italic font-light">
                {hero.nameBottom}
              </span>
            </h1>

            <div className="max-w-xl space-y-4 pt-4">
              <p className="font-mono text-xs text-accent uppercase tracking-widest">
                {hero.descriptor}
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                {hero.tagline}
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex items-center gap-8 pt-6">
              <a
                href="#projects"
                className="font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent transition-colors link-underline"
              >
                {hero.cta.primary}
              </a>
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent transition-colors link-underline"
              >
                {hero.cta.secondary}
              </a>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="mt-12 md:mt-16 flex items-end justify-between">
            <span className="font-mono text-[11px] text-text-muted tracking-wider">
              {hero.location}
            </span>
            <span className="font-mono text-[11px] text-text-muted tracking-wider">
              SCROLL ↓
            </span>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE DIVIDER ===== */}
      <div className="border-y border-border-primary py-3 bg-bg-secondary">
        <Marquee speed="slow">
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase px-8">
            Full-Stack Development
          </span>
          <span className="text-accent px-4">◆</span>
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase px-8">
            AI Engineering
          </span>
          <span className="text-accent px-4">◆</span>
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase px-8">
            System Architecture
          </span>
          <span className="text-accent px-4">◆</span>
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase px-8">
            React &amp; Next.js
          </span>
          <span className="text-accent px-4">◆</span>
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase px-8">
            Three.js &amp; WebGL
          </span>
          <span className="text-accent px-4">◆</span>
        </Marquee>
      </div>

      {/* ===== SECTIONS ===== */}
      <About />

      <div className="rule max-w-7xl mx-auto px-6 w-full" />

      <Skills />

      <div className="rule max-w-7xl mx-auto px-6 w-full" />

      <Projects />

      <div className="rule max-w-7xl mx-auto px-6 w-full" />

      <Experience />

      <div className="rule max-w-7xl mx-auto px-6 w-full" />

      <Contact />

      {/* ===== EASTER EGGS ===== */}
      <EasterEggs />

      {/* ===== AI CHAT WIDGET ===== */}
      <ChatWidget />
    </div>
  );
}
