// BUILT-BY: opus-4.6
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-3 md:p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
};

/**
 * Editorial Brutalist Surface Card.
 * Replaces glassmorphism GlassCard with a clean, hairline-bordered container.
 * No backdrop-blur, no gradients, no glows.
 */
export default function SurfaceCard({
  children,
  className,
  hover = true,
  padding = 'md',
  ...rest
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        'surface-card relative',
        paddingMap[padding],
        !hover && 'hover:border-border-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
