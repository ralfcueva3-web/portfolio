// BUILT-BY: opus-4.6
import type { Metadata } from 'next';
import ResumeContent from './ResumeContent';

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Ayush\'s professional résumé — full-stack developer and AI engineer.',
};

/**
 * /resume page — matches the site's editorial style.
 * Server component wrapper for metadata; client component for animations.
 */
export default function ResumePage() {
  return <ResumeContent />;
}
