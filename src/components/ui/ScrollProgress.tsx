// BUILT-BY: opus-4.6
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll progress indicator — thin orange bar at the top of the viewport.
 * Width represents scroll progress. Fades in after scrolling past 5%.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.06], [0, 0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
      style={{ scaleX, opacity }}
    />
  );
}
