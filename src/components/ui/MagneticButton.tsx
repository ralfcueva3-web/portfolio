// BUILT-BY: opus-4.6
'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  magneticStrength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

/**
 * Editorial Brutalist Magnetic Button.
 * Attracts toward cursor with spring physics and integrates with global cursor state.
 * Respects prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  onClick,
  magneticStrength = 0.35,
  disabled = false,
  type = 'button',
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorVariant('default');
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setCursorVariant('hover');
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: prefersReduced ? 0 : springX, y: prefersReduced ? 0 : springY }}
      className="inline-block"
    >
      {as === 'a' ? (
        <a
          className={cn('inline-block', className)}
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-disabled={disabled}
        >
          {children}
        </a>
      ) : (
        <button
          className={cn('inline-block', className)}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
