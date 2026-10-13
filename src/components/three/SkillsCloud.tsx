'use client';

import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_CONFIG } from './SceneConfig';
import type { SkillCategory } from '@/../../data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cfg = SCENE_CONFIG.skills;

export interface SkillNodeData {
  name: string;
  position: [number, number, number];
  category: string;
}

export interface SkillNodesProps {
  categories: SkillCategory[];
}

/**
 * SkillNodes renders all skill names onto a Fibonacci sphere with dynamic
 * billboard orientation and category-based connection lines.
 *
 * @param props - Component props containing skill categories.
 * @returns Three.js group of orbiting billboard nodes and connection lines.
 */
export function SkillNodes({ categories }: SkillNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  const categoryColors: Record<string, string> = useMemo(
    () => ({
      Frontend: '#7c3aed',
      Backend: '#06b6d4',
      'AI / ML': '#f59e0b',
      DevOps: '#10b981',
    }),
    []
  );

  // Place all skills on a sphere using Fibonacci spiral distribution
  const nodes: SkillNodeData[] = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    const allSkills = categories.flatMap((cat) =>
      cat.items.map((skill) => ({ ...skill, category: cat.name }))
    );

    if (allSkills.length === 0) return [];

    return allSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkills.length);
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
      return {
        name: skill.name,
        category: skill.category,
        position: [
          cfg.radius * Math.cos(theta) * Math.sin(phi),
          cfg.radius * Math.sin(theta) * Math.sin(phi),
          cfg.radius * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, [categories]);

  // Connection lines between related skills within the same category
  const connectionGeometry = useMemo(() => {
    if (nodes.length === 0) return null;

    const linePos: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].category === nodes[j].category) {
          const [x1, y1, z1] = nodes[i].position;
          const [x2, y2, z2] = nodes[j].position;
          const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2);

          if (dist < cfg.radius * 1.5) {
            linePos.push(x1, y1, z1, x2, y2, z2);
            const hex = categoryColors[nodes[i].category] || '#7c3aed';
            const col = new THREE.Color(hex);
            lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
          }
        }
      }
    }

    if (linePos.length === 0) return null;

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    return geom;
  }, [nodes, categoryColors]);

  // Clean up line geometry on unmount
  useEffect(() => {
    return () => {
      connectionGeometry?.dispose();
    };
  }, [connectionGeometry]);

  useFrame((state, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;
    groupRef.current.rotation.y += cfg.speed * delta;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {connectionGeometry && (
        <lineSegments geometry={connectionGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={cfg.connectionOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {nodes.map((node) => {
        const color = categoryColors[node.category] || '#7c3aed';
        return (
          <Billboard
            key={`${node.category}-${node.name}`}
            position={node.position}
            follow
            lockX={false}
            lockY={false}
            lockZ={false}
          >
            <mesh>
              <circleGeometry args={[cfg.nodeSize, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.15}
              />
            </mesh>
            <Text
              fontSize={0.25}
              color={color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/SpaceGrotesk-Bold.woff"
            >
              {node.name}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
}

export interface SkillsCloudProps {
  categories: SkillCategory[];
}

/**
 * 3D floating cloud of skill nodes arranged on a sphere, slowly orbiting.
 * Each node is a Billboard with the skill name as Text and category glow.
 *
 * @param props - Component props containing skill categories.
 * @returns R3F Canvas rendering the interactive 3D skill cloud.
 */
export default function SkillsCloud({ categories }: SkillsCloudProps) {
  return (
    <Canvas
      dpr={SCENE_CONFIG.performance.dprClamp}
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.5} />
        <SkillNodes categories={categories} />
      </Suspense>
    </Canvas>
  );
}
