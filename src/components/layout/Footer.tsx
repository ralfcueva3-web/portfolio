// BUILT-BY: opus-4.6
'use client';

import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { contact, siteConfig, navigation, hero } from '@/../../data/content';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Logo from '@/components/ui/Logo';

/**
 * Editorial Brutalist Site Footer.
 *
 * Features:
 * - Hairline rule top border with secondary dark/light background
 * - 3-column desktop layout (Brand + Tagline | Quick Links | Social & Contact) stacked on mobile
 * - Monospace metadata labels and timestamps
 * - Minimal circular back-to-top button
 * - Prerender-safe dynamic year calculation via useState & useEffect
 * - Fully accessible social links and navigation
 */
export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const prefersReduced = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  const socialLinks = [
    {
      icon: FiGithub,
      href: contact.socials.github,
      label: 'GitHub',
      handle: 'ralf',
    },
    {
      icon: FiLinkedin,
      href: contact.socials.linkedin,
      label: 'LinkedIn',
      handle: 'ayush-ralf',
    },
    {
      icon: FiTwitter,
      href: contact.socials.twitter,
      label: 'Twitter',
      handle: '@ralfdev',
    },
  ];

  return (
    <footer className="border-t border-border-primary bg-bg-secondary text-text-primary">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Three-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {/* Column 1: Brand + Tagline + Monospace Metadata */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand Logo with original monogram mark */}
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 text-text-primary hover:text-accent transition-colors"
                aria-label={siteConfig.name}
              >
                <Logo size={24} className="text-text-primary group-hover:text-accent transition-colors" />
                <span className="flex items-baseline font-display text-2xl font-bold tracking-tight">
                  <span>Ralf</span>
                  <span className="font-mono text-accent text-lg">.dev</span>
                </span>
              </a>

              <p className="text-text-secondary text-sm leading-relaxed mt-4 max-w-sm">
                {siteConfig.description}
              </p>
            </div>

            {/* Editorial Metadata Block */}
            <div className="mt-8 pt-6 border-t border-border-secondary flex flex-col gap-2 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">
                  {'//'}
                </span>
                <span>
                  ORIGIN: {hero.location} [{hero.coordinates}]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">
                  {'//'}
                </span>
                <span className="text-text-secondary">
                  AVAILABILITY: {hero.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">
                01 /
              </span>
              <span>INDEX</span>
            </h3>

            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider" role="list">
              {navigation.map((item, index) => {
                const sectionId = item.href.replace('#', '');
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setActiveSection(sectionId)}
                      className="text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-2.5 group py-1"
                    >
                      <span className="text-accent text-[11px] group-hover:translate-x-0.5 transition-transform">
                        0{index + 1}.
                      </span>
                      <span className="link-underline">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Social Links & Direct Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">
                02 /
              </span>
              <span>NETWORK</span>
            </h3>

            <ul className="space-y-3.5 font-mono text-xs tracking-wider" role="list">
              {socialLinks.map(({ icon: Icon, href, label, handle }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-3 group py-1"
                    aria-label={`${label} (${handle})`}
                  >
                    <Icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                    <span className="link-underline uppercase">{label}</span>
                    <span className="text-text-muted text-[11px]">/{handle}</span>
                    <span
                      className="text-text-muted text-[11px] group-hover:text-accent transition-colors"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border-secondary font-mono text-xs">
              <span className="text-text-muted block text-[11px] uppercase tracking-wider mb-1.5">
                INQUIRIES:
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-text-primary hover:text-accent transition-colors link-underline"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Hairline rule separating columns from bottom credits */}
        <div className="w-full h-px bg-border-secondary mt-12 mb-8" />

        {/* Bottom Bar: Copyright notice & Back-to-top button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-text-muted text-center sm:text-left">
            © {year} Ayush. Built with obsessive attention to detail.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={cn(
              'w-10 h-10 rounded-full border border-border-primary hover:border-accent',
              'text-text-secondary hover:text-accent bg-transparent',
              'transition-all duration-200 flex items-center justify-center group',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
            )}
            aria-label="Back to top"
          >
            <FiArrowUp
              className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
