// BUILT-BY: gemini-flash
'use client';

import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { contact, siteConfig } from '@/../../data/content';

/**
 * Global site footer featuring copyright information, social links,
 * and a smooth back-to-top scroll trigger button.
 */
export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: FiGithub, href: contact.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: contact.socials.linkedin, label: 'LinkedIn' },
    { icon: FiTwitter, href: contact.socials.twitter, label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-glass-border bg-bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-muted text-sm">
          © {year} {siteConfig.name}. Crafted with passion.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start rounded-sm p-1"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-start transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start"
          aria-label="Back to top"
        >
          <FiArrowUp className="group-hover:-translate-y-0.5 transition-transform" size={18} />
        </button>
      </div>
    </footer>
  );
}
