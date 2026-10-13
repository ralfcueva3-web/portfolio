// BUILT-BY: gemini-flash
'use client';

import { about } from '@/../../data/content';
import GlassCard from '@/components/ui/GlassCard';
import Counter from '@/components/ui/Counter';
import Button from '@/components/ui/Button';
import { FiDownload, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

/**
 * About section presenting the developer bio, career highlights,
 * animated metric counters, and a resume download CTA.
 */
export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden" aria-label="About Me">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent-start uppercase mb-3">
            <span className="w-6 h-[1px] bg-accent-start inline-block" />
            <span>01 // BACKGROUND</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            {about.title}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Bio text column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-5 text-base md:text-lg text-text-secondary leading-relaxed font-body">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="transition-opacity">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Competencies highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-glass-border">
              {[
                'Full-Stack System Architecture',
                'Production AI & RAG Pipelines',
                'Performance & Web Vitals Obsessed',
                'Creative 3D & Modern Interactions',
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-text-primary">
                  <FiCheckCircle className="text-accent-end shrink-0" size={16} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Button
                as="a"
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                <FiDownload size={16} />
                <span>Download Resume</span>
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="md"
              >
                <span>Get in Touch</span>
                <FiArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Stats and Achievements column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-5">
            {about.stats.map((stat, i) => (
              <GlassCard
                key={stat.label}
                glow={false}
                hover={true}
                className="p-6 md:p-8 flex flex-col justify-between border-glass-border/80 hover:border-accent-start/40 bg-bg-card/70"
              >
                <div className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-2 flex items-baseline">
                  <Counter
                    target={stat.value}
                    suffix={stat.label.includes('Stars') || stat.label.includes('Projects') ? '+' : '+'}
                  />
                </div>
                <div className="text-xs md:text-sm font-medium text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </GlassCard>
            ))}

            {/* Philosophy quote badge */}
            <div className="col-span-2 mt-2 p-5 rounded-2xl border border-glass-border bg-bg-tertiary/40 backdrop-blur-md">
              <p className="text-sm italic text-text-secondary leading-snug">
                &ldquo;Great digital craft is the convergence of robust engineering, intuitive ergonomics, and aesthetic intentionality.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
