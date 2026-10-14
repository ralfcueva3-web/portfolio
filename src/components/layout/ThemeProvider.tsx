// BUILT-BY: opus-4.6
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Theme provider wrapper using next-themes.
 * Class-based theming (adds .light class to <html>), persisted in localStorage,
 * defaults to system preference, no flash on load.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="Kova-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
