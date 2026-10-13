import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent';
}

/**
 * Small tech or skill badge with glassmorphism styling and subtle hover highlights.
 */
export default function Badge({
  children,
  className,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors',
        variant === 'default'
          ? 'bg-bg-card text-text-secondary border-glass-border hover:text-text-primary'
          : 'bg-accent-start/10 text-accent-start border-accent-start/20',
        className,
      )}
    >
      {children}
    </span>
  );
}
