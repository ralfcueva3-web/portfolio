'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll provider component synced with GSAP's ticker.
 * Gracefully disables smooth wheel interpolation when prefers-reduced-motion is detected.
 *
 * @param props - Component children to wrap with the smooth scroll context
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
