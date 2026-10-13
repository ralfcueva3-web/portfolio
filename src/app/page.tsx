// BUILT-BY: gemini-flash
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Button from '@/components/ui/Button';
import { hero } from '@/../../data/content';
import { FiArrowDown, FiMail } from 'react-icons/fi';

/**
 * Home page assembling the core sections:
 * Hero introduction, About, Skills, Experience, and Contact.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Introduction Section */}
      <section
        id="hero"
        className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative pt-24 md:pt-32 pb-16"
        aria-label="Introduction"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glass-border bg-bg-card/80 text-xs font-mono text-accent-end">
            <span className="w-2 h-2 rounded-full bg-accent-start animate-pulse" />
            <span>{hero.greeting}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-text-primary">
            {hero.name}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium gradient-text">
            {hero.roles.join(' • ')}
          </p>

          <p className="max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed font-body">
            {hero.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button as="a" href="#about" variant="primary" size="lg">
              <span>{hero.cta.primary}</span>
              <FiArrowDown size={16} />
            </Button>
            <Button as="a" href="#contact" variant="secondary" size="lg">
              <FiMail size={16} />
              <span>{hero.cta.secondary}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <About />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
