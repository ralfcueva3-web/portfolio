// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import { experience } from '@/../../data/content';
import Badge from '@/components/ui/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Experience section — horizontal table/grid layout with stagger reveals.
 * Each entry slides in from the right as you scroll.
 */
export default function Experience() {
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };
  const dur = { duration: 0.6, ease };

  return (
    <section
      id="experience"
      className="section-padding relative"
      aria-label="Work Experience"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — slide from left */}
        <motion.div
          className="flex items-baseline gap-4 mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={dur}
        >
          <span className="section-index">04 / Experience</span>
          <div className="rule flex-1" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary mb-16"
            initial={prefersReduced ? false : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
          >
            Where I&apos;ve worked
          </motion.h2>
        </div>

        {/* Experience entries — stagger slide from right */}
        <div className="border-t border-border-primary">
          {experience.map((item, idx) => (
            <motion.div
              key={`${item.company}-${item.year}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-border-primary group hover:bg-surface-hover transition-colors -mx-4 px-4"
              initial={prefersReduced ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ ...dur, delay: idx * 0.1 }}
            >
              {/* Year */}
              <div className="md:col-span-2">
                <span className="font-mono text-xs text-text-muted tracking-wider">
                  {item.year}
                </span>
              </div>

              {/* Role + Company */}
              <div className="md:col-span-3">
                <h3 className="text-base md:text-lg font-display font-bold text-text-primary leading-tight">
                  {item.role}
                </h3>
                <span className="text-sm text-accent font-medium">
                  {item.company}
                </span>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="md:col-span-3 flex flex-wrap gap-1.5 content-start">
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
