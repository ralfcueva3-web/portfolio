'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/../../data/content';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Animated full-screen loading overlay with staggered letter reveal,
 * smooth progress bar interpolation, and circular clip-path exit transition.
 */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const isLoading = useAppStore((s) => s.isLoading);
  const setIsLoading = useAppStore((s) => s.setIsLoading);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setIsLoading, prefersReduced]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-center pointer-events-auto"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: prefersReduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex overflow-hidden" aria-label={siteConfig.name}>
            {siteConfig.name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: prefersReduced ? 0 : 100, opacity: prefersReduced ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: prefersReduced ? 0 : i * 0.05,
                  duration: prefersReduced ? 0 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-6xl font-display font-bold text-text-primary"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 w-48 h-0.5 bg-bg-tertiary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-start to-accent-end rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <p className="mt-4 text-text-muted text-sm font-body">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
