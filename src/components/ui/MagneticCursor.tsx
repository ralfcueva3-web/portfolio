// BUILT-BY: opus-4.6
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

export interface MagneticCursorProps {
  className?: string;
}

/**
 * Editorial Brutalist Custom Cursor.
 * Thin 1px outer hairline ring with mix-blend-difference and crisp monospace text support.
 * Smooth spring physics with full SSR hydration safety and touch-device detection.
 */
export default function MagneticCursor({ className }: MagneticCursorProps = {}) {
  const [mounted, setMounted] = useState(false);
  const cursorVariant = useAppStore((s) => s.cursorVariant);
  const cursorText = useAppStore((s) => s.cursorText);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 320, damping: 28, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Hide custom cursor on touch/pointer-coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', move);
      document.body.style.cursor = '';
    };
  }, [mouseX, mouseY]);

  // Prevent SSR hydration mismatch
  if (!mounted) return null;

  // Touch devices use system cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const ringVariants = {
    default: { width: 32, height: 32, opacity: 1 },
    hover: { width: 56, height: 56, opacity: 0.8 },
    text: { width: 84, height: 84, opacity: 0.9 },
    hidden: { width: 0, height: 0, opacity: 0 },
  };

  return (
    <>
      {/* Outer trailing hairline ring */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference',
          className,
        )}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={cursorVariant}
        variants={ringVariants}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <div className="w-full h-full rounded-full border border-text-primary flex items-center justify-center p-1">
          {cursorVariant === 'text' && (
            <span className="text-text-primary text-[10px] font-mono font-medium tracking-widest uppercase select-none text-center">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-text-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: cursorVariant === 'hidden' ? 0 : 1 }}
      />
    </>
  );
}
