// BUILT-BY: opus-4.6
/**
 * 3D Scene Configuration — Editorial Brutalist palette
 * Edit these values to customize the 3D visuals.
 * Colors adapt to theme via CSS variables read at runtime.
 */
export const SCENE_CONFIG = {
  hero: {
    particleCount: 600,
    particleSize: 2,
    sphereRadius: 3,
    connectionDistance: 1.2,
    connectionOpacity: 0.1,
    rotationSpeed: 0.12,
    mouseInfluence: 0.25,
    // Signal orange + warm paper tones
    color: '#ff4d00',
    secondaryColor: '#e8e4de',
    // Alternate palette for light theme
    lightColor: '#e64500',
    lightSecondaryColor: '#1a1a1a',
    glowIntensity: 0.8,
  },
  skills: {
    radius: 5,
    speed: 0.08,
    connectionOpacity: 0.08,
    nodeSize: 0.35,
  },
  particles: {
    count: 200,
    size: 1.2,
    speed: 0.03,
    opacity: 0.25,
    spread: 25,
  },
  performance: {
    dprClamp: [1, 1.5] as [number, number],
    enablePostprocessing: false,
  },
} as const;

export type SceneConfig = typeof SCENE_CONFIG;
