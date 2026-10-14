// BUILT-BY: opus-4.6
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Animated theme toggle — editorial pill with sun/moon illustration.
 * Uses View Transitions API for circular reveal when available.
 * Keyboard accessible, aria-pressed, respects reduced motion.
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render placeholder to avoid layout shift
    return <div className="w-14 h-7" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = isDark ? 'light' : 'dark';

    // Try View Transitions API for circular reveal
    if (!prefersReduced && typeof document !== 'undefined' && 'startViewTransition' in document) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Set CSS custom properties for the clip-path animation
      document.documentElement.style.setProperty('--vt-x', `${x}px`);
      document.documentElement.style.setProperty('--vt-y', `${y}px`);
      document.documentElement.style.setProperty('--vt-r', `${endRadius}px`);

      const transition = (document as any).startViewTransition(() => {
        setTheme(newTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }).catch(() => {
        // Fallback: transition already applied
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-14 h-7 rounded-full border border-border-primary bg-bg-secondary overflow-hidden transition-colors duration-300 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={!isDark}
      role="switch"
    >
      {/* Track background */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="dark-bg"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-secondary"
            >
              {/* Stars */}
              {[
                { x: '20%', y: '25%', size: 2 },
                { x: '70%', y: '20%', size: 1.5 },
                { x: '45%', y: '65%', size: 1 },
                { x: '80%', y: '55%', size: 1.5 },
              ].map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-text-muted"
                  style={{
                    left: star.x,
                    top: star.y,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={prefersReduced ? {} : {
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="light-bg"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-secondary"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Sliding knob with sun/moon */}
      <motion.div
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center"
        animate={{
          left: isDark ? '3px' : 'calc(100% - 25px)',
          backgroundColor: isDark ? '#e8e4de' : '#ff4d00',
        }}
        transition={prefersReduced ? { duration: 0 } : {
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              initial={prefersReduced ? {} : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="#1a1a1a"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              initial={prefersReduced ? {} : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <circle cx="12" cy="12" r="5" fill="#fff" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.line
                  key={angle}
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="3.5"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 12 12)`}
                  animate={prefersReduced ? {} : { opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: angle / 360,
                  }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
