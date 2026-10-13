'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
}

/**
 * Card with 3D perspective tilt effect following mouse position.
 * Smoothly interpolates angles with Framer Motion springs and respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  maxRotation = 10,
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
        transformPerspective: 1000,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
