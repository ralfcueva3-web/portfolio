// BUILT-BY: gemini-flash
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteConfig } from '@/../../data/content';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';

/**
 * Global navigation header featuring blur-on-scroll background,
 * desktop navigation links with magnetic hover effect and animated active indicator,
 * and a full-screen mobile menu overlay with staggered animations.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-glass-border'
            : 'bg-transparent'
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-bold text-text-primary hover:text-accent-start transition-colors"
            aria-label={siteConfig.name}
          >
            {siteConfig.name.split(' ')[0]}
            <span className="gradient-text">.dev</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navigation.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200 relative group inline-block py-1',
                    activeSection === item.href.slice(1)
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-start to-accent-end transition-all duration-300',
                      activeSection === item.href.slice(1)
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    )}
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-accent-start to-accent-end text-white hover:opacity-90 transition-opacity"
            >
              Contact
            </a>
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-6 h-0.5 bg-text-primary block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-text-primary block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-6 h-0.5 bg-text-primary block origin-center"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-8">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      className="text-3xl font-display font-bold text-text-primary hover:text-accent-start transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: navigation.length * 0.1, duration: 0.4 }}
                >
                  <a
                    href="#contact"
                    className="mt-4 inline-flex px-8 py-3 rounded-full text-base font-medium bg-gradient-to-r from-accent-start to-accent-end text-white hover:opacity-90 transition-opacity"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
