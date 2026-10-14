// BUILT-BY: opus-4.6
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import HeroSection from '@/components/sections/HeroSection';
import Marquee from '@/components/ui/Marquee';
import ChatWidget from '@/components/ai/ChatWidget';
import EasterEggs from '@/components/layout/EasterEggs';

/**
 * Home page — editorial brutalist layout.
 * Oversized typographic hero with integrated 3D, then distinct sections.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ===== HERO ===== */}
      <HeroSection />

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
