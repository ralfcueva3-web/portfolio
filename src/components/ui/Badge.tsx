// BUILT-BY: opus-4.6
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent';
}

/**
 * Editorial Brutalist Badge component.
 * Minimal tag with monospace typography and hairline border.
 * Variants:
 * - default: transparent background with hairline border
 * - accent: muted accent surface with signal orange text
 */
export default function Badge({
  children,
  className,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase transition-colors',
        variant === 'default'
          ? 'border border-border-primary bg-transparent text-text-secondary hover:text-text-primary hover:border-border-accent'
          : 'border border-border-accent bg-accent-muted text-accent',
        className,
      )}
    >
      {children}
    </span>
  );
}
