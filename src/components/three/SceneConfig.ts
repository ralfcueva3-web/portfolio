/**
 * 3D Scene Configuration
 * Edit these values to customize the 3D visuals without touching component code.
 *
 * @module SceneConfig
 */

export const SCENE_CONFIG = {
  hero: {
    particleCount: 800,
    particleSize: 2.5,
    sphereRadius: 3,
    connectionDistance: 1.2,
    connectionOpacity: 0.15,
    rotationSpeed: 0.15,
    mouseInfluence: 0.3,
    color: '#7c3aed',
    secondaryColor: '#06b6d4',
    glowIntensity: 1.5,
  },
  skills: {
    radius: 5,
    speed: 0.1,
    connectionOpacity: 0.12,
    nodeSize: 0.4,
  },
  particles: {
    count: 300,
    size: 1.5,
    speed: 0.05,
    opacity: 0.4,
    spread: 30,
  },
  performance: {
    dprClamp: [1, 1.5] as [number, number],
    enablePostprocessing: true,
  },
} as const;

export type SceneConfig = typeof SCENE_CONFIG;
