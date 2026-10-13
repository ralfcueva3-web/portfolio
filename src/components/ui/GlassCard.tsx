import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

/**
 * Glassmorphism card container with backdrop blur, soft glow border,
 * and optional hover scale effect.
 */
export default function GlassCard({
  children,
  className,
  glow = true,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6 md:p-8',
        hover && 'transition-transform duration-300 hover:scale-[1.02]',
        glow && 'animate-pulse-glow',
        className,
      )}
    >
      {children}
    </div>
  );
}
