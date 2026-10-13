'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  magneticStrength?: number;
}

/**
 * A button wrapper component that magnetically pulls toward the cursor within a radius.
 * Uses Framer Motion springs for physical feedback and updates the global cursor state.
 */
export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  onClick,
  magneticStrength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursorVariant('hover')}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {as === 'a' ? (
        <motion.a className={className} href={href} onClick={onClick}>
          {children}
        </motion.a>
      ) : (
        <motion.button className={className} onClick={onClick} type="button">
          {children}
        </motion.button>
      )}
    </motion.div>
  );
}
