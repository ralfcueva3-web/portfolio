// BUILT-BY: opus-4.6
/**
 * 3D Scene Configuration — Editorial Brutalist palette
 * Edit these values to customize the 3D visuals.
 * Colors adapt to theme via CSS variables read at runtime.
 */
export const SCENE_CONFIG = {
  hero: {
    particleCount: 200,
    particleSize: 1.2,
    sphereRadius: 5,
    connectionDistance: 1.4,
    connectionOpacity: 0.04,
    rotationSpeed: 0.08,
    mouseInfluence: 0.3,
    // Dark theme: dim orange + very dark tones
    color: '#ff4d00',
    secondaryColor: '#331200',
    // Light theme: deeper orange + charcoal
    lightColor: '#cc3d00',
    lightSecondaryColor: '#3a3a3a',
    glowIntensity: 0.2,
  },
  skills: {
    radius: 5,
    speed: 0.08,
    connectionOpacity: 0.08,
    nodeSize: 0.35,
  },
  particles: {
    count: 150,
    size: 1,
    speed: 0.02,
    opacity: 0.12,
    spread: 30,
  },
  performance: {
    dprClamp: [1, 1.5] as [number, number],
    enablePostprocessing: false,
  },
} as const;

export type SceneConfig = typeof SCENE_CONFIG;
