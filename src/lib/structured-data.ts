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
    name: 'Raman',
    alternateName: 'Kova',
    url: siteConfig.url,
    image: `${siteConfig.url}/og-image.png`,
    jobTitle: 'Full-Stack Developer & AI Engineer',
    description: siteConfig.description,
    email: 'hello@kova.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://github.com/kova',
      'https://linkedin.com/in/raman-kova',
      'https://twitter.com/kovadev',
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
      name: 'Raman',
    },
  };
}
