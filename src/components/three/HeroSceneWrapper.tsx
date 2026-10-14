// BUILT-BY: opus-4.6
'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side wrapper for HeroScene — dynamic import with ssr: false.
 * Next.js 16 requires ssr:false dynamic imports to be in client components.
 */
const HeroScene = dynamic(
  () => import('@/components/three/HeroScene'),
  { ssr: false }
);

export default function HeroSceneWrapper() {
  return <HeroScene />;
}
