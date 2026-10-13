// BUILT-BY: gemini-flash
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
  download?: boolean | string;
}

/**
 * Styled button with gradient primary, outline secondary, and ghost variants.
 * Supports rendering as either a native button or an anchor link.
 */
export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  onClick,
  disabled,
  type = 'button',
  target,
  rel,
  download,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-accent-start to-accent-end text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent-start/25',
    secondary:
      'border border-glass-border text-text-primary hover:bg-bg-card hover:border-accent-start/30',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-card',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (as === 'a') {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        download={download}
        role={disabled ? 'link' : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
