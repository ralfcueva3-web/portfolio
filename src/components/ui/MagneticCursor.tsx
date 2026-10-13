'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';

/**
 * Custom magnetic cursor with an outer trailing ring and inner dot.
 * Follows mouse movement with spring physics via Framer Motion.
 * Dynamically scales up and displays contextual labels according to `cursorVariant`.
 * Automatically hidden on touch devices and during server-side rendering.
 */
export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorVariant = useAppStore((s) => s.cursorVariant);
  const cursorText = useAppStore((s) => s.cursorText);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Hide on touch devices
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

  // Hide during SSR and before client-side hydration
  if (!mounted) return null;

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants = {
    default: { width: 32, height: 32, opacity: 1 },
    hover: { width: 56, height: 56, opacity: 0.8 },
    text: { width: 80, height: 80, opacity: 0.9 },
    hidden: { width: 0, height: 0, opacity: 0 },
  };

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <div className="w-full h-full rounded-full border border-white/80 flex items-center justify-center">
          {cursorVariant === 'text' && (
            <span className="text-white text-[10px] font-medium tracking-wide">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: cursorVariant === 'hidden' ? 0 : 1 }}
      />
    </>
  );
}
