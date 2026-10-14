// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';

export interface LogoProps {
  /** Size in pixels (width and height) */
  size?: number;
  /** Optional additional class names */
  className?: string;
  /** Whether to enable hover micro-interaction animation */
  animated?: boolean;
}

/**
 * Custom Ralf.dev brand logo mark.
 * An original geometric monogram "R" paired with a signature developer accent dot (.).
 * Adapts to dark and light modes via `currentColor`, with the developer cue rendered in brand accent (#ff4d00).
 */
export default function Logo({ size = 28, className = '', animated = true }: LogoProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`inline-block shrink-0 select-none ${className}`}
      initial="rest"
      whileHover={animated ? 'hover' : undefined}
      aria-hidden="true"
    >
      {/* Monogram R: Stem & Bowl (unified geometric brutalist path) */}
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 4 4 H 18.5 C 22.8 4 25.5 6.7 25.5 10.5 C 25.5 14.3 22.8 17 18.5 17 H 9.5 V 28 H 4 V 4 Z M 9.5 8.5 V 12.5 H 18 C 19.5 12.5 20.5 11.7 20.5 10.5 C 20.5 9.3 19.5 8.5 18 8.5 H 9.5 Z"
        fill="currentColor"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02, transition: { duration: 0.2 } },
        }}
      />
      {/* Diagonal Slash Leg */}
      <motion.path
        d="M 11.5 16.5 L 19 28 H 24.5 L 17 16.5 H 11.5 Z"
        fill="currentColor"
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: 0.75, y: -0.5, transition: { type: 'spring', stiffness: 400, damping: 15 } },
        }}
      />
      {/* Developer Cue: Signature Accent Dot (the . in Ralf.dev) */}
      <motion.rect
        x="23.5"
        y="23.5"
        width="4.5"
        height="4.5"
        rx="0.75"
        fill="#ff4d00"
        variants={{
          rest: { scale: 1 },
          hover: {
            scale: [1, 1.4, 1],
            transition: { duration: 0.45, ease: 'easeInOut' },
          },
        }}
        style={{ transformOrigin: '25.75px 25.75px' }}
      />
    </motion.svg>
  );
}

