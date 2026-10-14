// BUILT-BY: opus-4.6
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { hero } from '@/../../data/content';
import HeroSceneWrapper from '@/components/three/HeroSceneWrapper';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Animated hero section — editorial oversized type with parallax 3D.
 * Text elements stagger-reveal on load; 3D fades in separately;
 * bottom metadata parallaxes out on scroll.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Parallax: push content up and fade as you scroll away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const noMotion = prefersReduced;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-16 pt-24 overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D Background — fades in, scales on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={noMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        style={noMotion ? {} : { scale: sceneScale }}
      >
        <HeroSceneWrapper />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={noMotion ? {} : { y: heroY, opacity: heroOpacity }}
      >
        {/* Top metadata bar */}
        <motion.div
          className="flex items-center justify-between mb-8 md:mb-12"
          initial={noMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
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
        </motion.div>

        {/* Main hero typography — stagger reveal */}
        <div className="space-y-4">
          {/* Name line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(3rem,12vw,10rem)] font-display font-bold leading-[0.9] tracking-tighter text-text-primary"
              initial={noMotion ? {} : { y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              {hero.nameTop}
            </motion.h1>
          </div>

          {/* Name line 2 — italic accent, slightly delayed */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-[clamp(3rem,12vw,10rem)] font-display font-light italic leading-[0.9] tracking-tighter text-accent"
              initial={noMotion ? {} : { y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
            >
              {hero.nameBottom}
            </motion.span>
          </div>

          <motion.div
            className="max-w-xl space-y-4 pt-4"
            initial={noMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
          >
            <p className="font-mono text-xs text-accent uppercase tracking-widest">
              {hero.descriptor}
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              {hero.tagline}
            </p>
          </motion.div>

          {/* Hero CTAs — fade in after text */}
          <motion.div
            className="flex items-center gap-8 pt-6"
            initial={noMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease }}
          >
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
          </motion.div>
        </div>

        {/* Bottom metadata — with a subtle bouncing scroll indicator */}
        <motion.div
          className="mt-12 md:mt-16 flex items-end justify-between"
          initial={noMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4, ease }}
        >
          <span className="font-mono text-[11px] text-text-muted tracking-wider">
            {hero.location}
          </span>
          <motion.span
            className="font-mono text-[11px] text-text-muted tracking-wider"
            animate={noMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            SCROLL ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
