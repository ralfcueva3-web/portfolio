// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import { about } from '@/../../data/content';
import Counter from '@/components/ui/Counter';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * About section — asymmetric 2-column layout with scroll-triggered reveals.
 * Left: large bio text. Right: stats in a 2×2 grid with hairline borders.
 */
export default function About() {
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };
  const dur = { duration: 0.6, ease };

  return (
    <section
      id="about"
      className="section-padding relative"
      aria-label="About Me"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header with index — slide from left */}
        <motion.div
          className="flex items-baseline gap-4 mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={dur}
        >
          <span className="section-index">01 / About</span>
          <div className="rule flex-1" />
        </motion.div>

        {/* Asymmetric 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — bio */}
          <div className="lg:col-span-7 space-y-6">
            {/* Heading — word reveal */}
            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary leading-[0.95]"
                initial={prefersReduced ? false : { y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={vp}
                transition={{ duration: 0.7, ease }}
              >
                {about.title}
              </motion.h2>
            </div>

            {/* Paragraphs — stagger fade up */}
            <motion.div
              className="space-y-5 text-base md:text-lg text-text-secondary leading-relaxed"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  transition={{ ...dur, delay: index * 0.08 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* CTAs — fade in */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-4"
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ ...dur, delay: 0.3 }}
            >
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
            </motion.div>
          </div>

          {/* Right column — stats with hairline grid */}
          <div className="lg:col-span-5">
            <motion.div
              className="grid grid-cols-2 border border-border-primary"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  transition={{ ...dur, delay: i * 0.1 }}
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
                </motion.div>
              ))}
            </motion.div>

            {/* Pull quote — slide from left */}
            <motion.div
              className="mt-6 pl-4 border-l-2 border-accent"
              initial={prefersReduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ ...dur, delay: 0.4 }}
            >
              <p className="text-sm italic text-text-secondary leading-relaxed">
                &ldquo;Ship, then iterate. Working software beats perfect plans.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
