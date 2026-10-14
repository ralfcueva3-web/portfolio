// BUILT-BY: opus-4.6
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteConfig, contact } from '@/../../data/content';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Editorial Brutalist Navigation Bar.
 *
 * Features:
 * - Brand logo: "Ralph" in display bold + ".dev" in mono orange accent
 * - Monospace letter-spaced desktop navigation with orange accent underline indicator
 * - Minimal text/underlined link for contact (no gradient CTA button)
 * - Backdrop blur and hairline border on scroll
 * - Integrated theme toggle switch
 * - Accessible keyboard navigation and skip-to-content link
 * - Full-screen mobile overlay with large editorial type, index numbers, and staggered entrance
 * - Escape key dismissal and background body scroll lock
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const prefersReduced = useReducedMotion();

  // Track scroll position for backdrop blur and bottom border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile overlay is active
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
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

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Accessible skip link */}
      <a href="#main" className="skip-to-content font-mono text-xs">
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
          scrolled
            ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-primary'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo — Editorial brutalist typography without gradients */}
          <a
            href="#"
            className="flex items-baseline font-display text-xl md:text-2xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors"
            aria-label={siteConfig.name}
          >
            <span>Ralph</span>
            <span className="font-mono text-accent text-base md:text-lg">.dev</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-8" role="list">
              {navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(sectionId)}
                      className={cn(
                        'font-mono text-xs uppercase tracking-widest transition-colors duration-200 relative py-1 inline-block group',
                        isActive
                          ? 'text-text-primary font-medium'
                          : 'text-text-secondary hover:text-text-primary'
                      )}
                    >
                      {item.label}
                      {/* Active state orange accent underline */}
                      {isActive ? (
                        <motion.span
                          layoutId="navbar-active-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                          transition={
                            prefersReduced
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 380, damping: 30 }
                          }
                        />
                      ) : (
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-200 group-hover:w-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions: ThemeToggle + Minimal Contact CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />

            {/* Minimal contact link for desktop — no gradient pill */}
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 py-1 link-underline',
                activeSection === 'contact'
                  ? 'text-accent'
                  : 'text-text-primary hover:text-accent'
              )}
            >
              <span>Get in touch</span>
              <span className="text-accent text-sm leading-none" aria-hidden="true">
                ↗
              </span>
            </a>

            {/* Mobile hamburger toggle button */}
            <button
              type="button"
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
                className="w-6 h-[2px] bg-current block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.15 }}
                className="w-6 h-[2px] bg-current block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
                className="w-6 h-[2px] bg-current block origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-20 pb-8 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Navigation links with staggered animation and large editorial typography */}
            <nav className="mt-8">
              <ul className="flex flex-col divide-y divide-border-secondary border-y border-border-secondary">
                {navigation.map((item, index) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.li
                      key={item.href}
                      initial={prefersReduced ? {} : { opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? {} : { opacity: 0, x: -16 }}
                      transition={{
                        delay: prefersReduced ? 0 : index * 0.08,
                        duration: prefersReduced ? 0 : 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(sectionId)}
                        className={cn(
                          'flex items-baseline justify-between py-5 group transition-colors',
                          isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                        )}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-accent">
                            0{index + 1} //
                          </span>
                          <span className="font-display text-3xl font-bold tracking-tight">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-text-muted group-hover:text-accent transition-colors">
                          ↗
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile drawer footer metadata */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: 16 }}
              transition={{
                delay: prefersReduced ? 0 : navigation.length * 0.08,
                duration: prefersReduced ? 0 : 0.35,
              }}
              className="pt-6 border-t border-border-primary flex flex-col gap-3 font-mono text-xs text-text-muted"
            >
              <div className="flex items-center justify-between text-text-secondary">
                <span>INQUIRIES</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-text-primary hover:text-accent transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center justify-between text-text-muted text-[11px]">
                <span>STATUS</span>
                <span className="text-text-secondary">AVAILABLE FOR WORK</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
