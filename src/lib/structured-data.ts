// BUILT-BY: opus-4.6
import { siteConfig, skills, experience } from '@/../../data/content';

/**
 * JSON-LD structured data — Person schema for SEO.
 * Rendered as a <script type="application/ld+json"> in the page head.
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush',
    alternateName: 'Ralf',
    url: siteConfig.url,
    image: `${siteConfig.url}/og-image.png`,
    jobTitle: 'Full-Stack Developer & AI Engineer',
    description: siteConfig.description,
    email: 'hello@ralf.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://github.com/ralf',
      'https://linkedin.com/in/ayush-ralf',
      'https://twitter.com/ralfdev',
    ],
    knowsAbout: skills.categories.flatMap((c) =>
      c.items.map((s) => s.name)
    ),
    worksFor: {
      '@type': 'Organization',
      name: experience[0]?.company || '',
    },
  };
}

/**
 * Website schema for site-level SEO.
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: 'Ayush',
    },
  };
}
