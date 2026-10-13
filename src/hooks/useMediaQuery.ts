'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true when the media query matches.
 *
 * @param query - Media query string, e.g. '(min-width: 768px)'
 * @returns Boolean indicating whether the media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
