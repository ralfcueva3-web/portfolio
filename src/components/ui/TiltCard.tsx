// BUILT-BY: opus-4.6
'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
}

/**
 * 3D perspective tilt card component.
 * Follows mouse position with physics springs while respecting user motion preferences.
 * Styled with editorial brutalist design tokens.
 */
export default function TiltCard({
  children,
  className = '',
  maxRotation = 10,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 300, damping: 30 };

  const rawRotateX = useTransform(mouseY, [0, 1], [maxRotation, -maxRotation]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-maxRotation, maxRotation]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: perspective,
      }}
      className={cn('will-change-transform relative', className)}
    >
      {children}
    </motion.div>
  );
}
