// BUILT-BY: opus-4.6
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Lost in the void',
};

/**
 * Custom 404 page — oversized type with personality.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Oversized 404 with glitch effect */}
      <div className="relative select-none">
        <h1 className="text-[10rem] md:text-[16rem] font-display font-bold tracking-tighter text-text-primary leading-none opacity-10">
          404
        </h1>
        <h1
          className="absolute inset-0 text-[10rem] md:text-[16rem] font-display font-bold tracking-tighter text-accent leading-none animate-glitch"
          aria-hidden="true"
        >
          404
        </h1>
      </div>

      <div className="space-y-4 -mt-8 relative z-10">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
          Page not found
        </p>
        <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
          You&apos;ve wandered into the void. There&apos;s nothing here except existential dread and a broken link.
          The page you&apos;re looking for has been moved, deleted, or never existed in the first place.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent transition-colors link-underline"
          >
            ← Return to base
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent transition-colors link-underline"
          >
            Report this
          </Link>
        </div>
      </div>

      {/* ASCII art easter egg */}
      <pre className="mt-16 font-mono text-[8px] md:text-[10px] text-text-muted opacity-30 leading-tight select-none hidden md:block">
{`
    ╔══════════════════════════╗
    ║   ERROR: REALITY NOT    ║
    ║      FOUND AT THIS      ║
    ║        LOCATION         ║
    ╠══════════════════════════╣
    ║  > cd /home             ║
    ║  > hope --restore       ║
    ╚══════════════════════════╝
`}
      </pre>
    </div>
  );
}
