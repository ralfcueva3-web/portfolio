// BUILT-BY: opus-4.6
'use client';

import { about } from '@/../../data/content';
import Counter from '@/components/ui/Counter';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

/**
 * About section — asymmetric 2-column layout.
 * Left: large bio text. Right: stats in a 2×2 grid with hairline borders.
 * No glassmorphism cards. Editorial feel with monospace labels.
 */
export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative"
      aria-label="About Me"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header with index */}
        <div className="flex items-baseline gap-4 mb-12 md:mb-16">
          <span className="section-index">01 / About</span>
          <div className="rule flex-1" />
        </div>

        {/* Asymmetric 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — bio */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary leading-[0.95]">
              {about.title}
            </h2>

            <div className="space-y-5 text-base md:text-lg text-text-secondary leading-relaxed">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTAs — text links, not gradient buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent transition-colors link-underline"
              >
                <FiDownload size={14} />
                <span>Download résumé</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors link-underline"
              >
                <span>Get in touch</span>
                <FiArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right column — stats with hairline grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 border border-border-primary">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-6 md:p-8 ${
                    i % 2 === 0 ? 'border-r border-border-primary' : ''
                  } ${i < 2 ? 'border-b border-border-primary' : ''}`}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-text-primary tabular-nums">
                    <Counter
                      target={stat.value}
                      suffix="+"
                    />
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="mt-6 pl-4 border-l-2 border-accent">
              <p className="text-sm italic text-text-secondary leading-relaxed">
                &ldquo;Ship, then iterate. Working software beats perfect plans.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
