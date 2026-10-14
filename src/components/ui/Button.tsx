// BUILT-BY: opus-4.6
'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  download?: boolean | string;
}

/**
 * Editorial Brutalist Button component.
 * Variants:
 * - primary: solid signal orange, no gradient
 * - secondary: hairline border, transparent background, subtle hover
 * - ghost: unbordered text-only, underline on hover
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
    'inline-flex items-center justify-center font-mono font-medium uppercase tracking-wider transition-colors duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover',
    secondary:
      'border border-border-primary bg-transparent text-text-primary hover:bg-surface-hover hover:border-accent active:bg-surface-hover',
    ghost:
      'bg-transparent text-text-primary hover:text-accent hover:underline underline-offset-4 decoration-accent',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-xs md:text-sm gap-2',
    lg: 'px-6 py-3.5 text-sm md:text-base gap-2.5',
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
