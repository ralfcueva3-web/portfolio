// BUILT-BY: opus-4.6
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Editorial Brutalist Animated Counter.
 * Counts up from 0 to target value on viewport entry with monospace tabular numerals.
 * Respects prefers-reduced-motion.
 */
export default function Counter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}: CounterProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Immediately jump to target value if reduced motion is preferred
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let start: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span
      ref={ref}
      className={cn('font-mono tabular-nums text-text-primary', className)}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
