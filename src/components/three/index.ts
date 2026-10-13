/**
 * 3D Three.js components and configurations.
 * Note: R3F Canvas components (HeroScene, SkillsCloud) should be dynamically imported
 * with ssr: false by consumers:
 *
 * @example
 * ```tsx
 * const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });
 * const SkillsCloud = dynamic(() => import('@/components/three/SkillsCloud'), { ssr: false });
 * ```
 */

export { SCENE_CONFIG } from './SceneConfig';
export type { SceneConfig } from './SceneConfig';
export { default as HeroScene, NeuralSphere, AmbientParticles } from './HeroScene';
export { default as SkillsCloud, SkillNodes } from './SkillsCloud';
export type { SkillNodeData, SkillNodesProps, SkillsCloudProps } from './SkillsCloud';
