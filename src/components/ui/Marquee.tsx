// BUILT-BY: opus-4.6
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

/**
 * Infinite horizontal scrolling marquee.
 * Seamless looping with editorial brutalist styling and aria-hidden for screen readers.
 */
export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 'normal',
}: MarqueeProps) {
  const speedMap: Record<'slow' | 'normal' | 'fast', string> = {
    slow: '60s',
    normal: '30s',
    fast: '15s',
  };
  const duration = speedMap[speed];

  return (
    <div
      className={cn('w-full overflow-hidden select-none', pauseOnHover && 'group', className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          'flex gap-8 w-max items-center',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: duration }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
