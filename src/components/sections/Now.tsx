// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import { now } from '@/../../data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * "Now" section — what I'm currently building and learning.
 * Simple list with emoji + text, separated by hairline rules.
 */
export default function Now() {
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };

  return (
    <section id="now" className="section-padding relative" aria-label="What I'm doing now">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-baseline gap-4 mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-index">06 / Now</span>
          <div className="rule flex-1" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-text-primary mb-4"
                initial={prefersReduced ? false : { y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={vp}
                transition={{ duration: 0.7, ease }}
              >
                {now.title}
              </motion.h2>
            </div>
            <motion.p
              className="font-mono text-xs text-text-muted uppercase tracking-wider"
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              {now.subtitle}
            </motion.p>
          </div>

          <div className="lg:col-span-7 border-t border-border-primary">
            {now.items.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4 py-5 border-b border-border-secondary"
                initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: idx * 0.08, ease }}
              >
                <span className="text-lg shrink-0 mt-0.5">{item.emoji}</span>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
