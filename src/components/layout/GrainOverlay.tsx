/**
 * Film grain texture overlay — purely decorative, pointer-events disabled.
 * Renders an animated SVG fractal noise background overlay using the .grain-overlay CSS utility.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
