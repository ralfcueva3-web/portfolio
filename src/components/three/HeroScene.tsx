'use client';

import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_CONFIG } from './SceneConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cfg = SCENE_CONFIG.hero;

/**
 * Neural network sphere: particles arranged on a spherical surface with animated connections
 * and interactive mouse reactivity.
 *
 * @returns Three.js group representing the interactive neural sphere.
 */
export function NeuralSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const prefersReducedMotion = useReducedMotion();

  // Generate particle positions on sphere surface
  const { positions, initialPositions } = useMemo(() => {
    const pos = new Float32Array(cfg.particleCount * 3);
    const init = new Float32Array(cfg.particleCount * 3);
    for (let i = 0; i < cfg.particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = cfg.sphereRadius * (0.8 + Math.random() * 0.4);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }
    return { positions: pos, initialPositions: init };
  }, []);

  // Generate gradient colors for individual particles (violet to cyan)
  const particleColors = useMemo(() => {
    const colors = new Float32Array(cfg.particleCount * 3);
    const violet = new THREE.Color(cfg.color);
    const cyan = new THREE.Color(cfg.secondaryColor);
    for (let i = 0; i < cfg.particleCount; i++) {
      const t = Math.random();
      const color = violet.clone().lerp(cyan, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  // Build connection lines between nearby particles
  const connectionGeometry = useMemo(() => {
    const maxConnections = 600;
    const linePos: number[] = [];
    const lineColors: number[] = [];
    const violet = new THREE.Color(cfg.color);
    const cyan = new THREE.Color(cfg.secondaryColor);

    let count = 0;
    for (let i = 0; i < cfg.particleCount && count < maxConnections; i++) {
      for (let j = i + 1; j < cfg.particleCount && count < maxConnections; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < cfg.connectionDistance) {
          linePos.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
          const t = Math.random();
          const c = violet.clone().lerp(cyan, t);
          lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
          count++;
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    return geometry;
  }, [positions]);

  // Clean up geometry on unmount
  useEffect(() => {
    return () => {
      connectionGeometry.dispose();
    };
  }, [connectionGeometry]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    if (prefersReducedMotion) {
      if (linesRef.current) {
        linesRef.current.rotation.copy(pointsRef.current.rotation);
      }
      return;
    }

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;

    const posArray = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    // Rotate entire sphere
    pointsRef.current.rotation.y += cfg.rotationSpeed * delta;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Mouse influence
    const mx = state.pointer.x * cfg.mouseInfluence;
    const my = state.pointer.y * cfg.mouseInfluence;
    pointsRef.current.rotation.x += (my - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.z += (mx * 0.5 - pointsRef.current.rotation.z) * 0.02;

    // Subtle particle wobble anchored to initial positions to prevent coordinate drift
    for (let i = 0; i < cfg.particleCount; i++) {
      posArray[i * 3] = initialPositions[i * 3] + Math.sin(time + i) * 0.04;
      posArray[i * 3 + 1] = initialPositions[i * 3 + 1] + Math.cos(time + i * 0.5) * 0.04;
      posArray[i * 3 + 2] = initialPositions[i * 3 + 2] + Math.sin(time * 0.7 + i) * 0.03;
    }
    posAttr.needsUpdate = true;

    // Update connection lines rotation to match points
    if (linesRef.current) {
      linesRef.current.rotation.copy(pointsRef.current.rotation);
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.5}
      rotationIntensity={prefersReducedMotion ? 0 : 0.2}
      floatIntensity={prefersReducedMotion ? 0 : 0.5}
    >
      <group>
        {/* Particles */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
              count={cfg.particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
              count={cfg.particleCount}
              array={particleColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={cfg.particleSize}
            vertexColors
            transparent
            opacity={0.8}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Connection lines */}
        <lineSegments ref={linesRef} geometry={connectionGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={cfg.connectionOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* Central glow sphere */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial
            color={cfg.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Ambient floating particles in the background scene.
 *
 * @returns Three.js points element with drifting starfield particles.
 */
export function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const pcfg = SCENE_CONFIG.particles;
  const prefersReducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const pos = new Float32Array(pcfg.count * 3);
    for (let i = 0; i < pcfg.count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * pcfg.spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * pcfg.spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * pcfg.spread;
    }
    return pos;
  }, [pcfg.count, pcfg.spread]);

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * pcfg.speed * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={pcfg.count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pcfg.size}
        color="#ffffff"
        transparent
        opacity={pcfg.opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Main hero 3D scene canvas component.
 * Must be dynamically imported with `{ ssr: false }` by the Hero section component.
 *
 * @returns R3F Canvas rendering the neural sphere and ambient particles.
 */
export default function HeroScene() {
  return (
    <Canvas
      dpr={SCENE_CONFIG.performance.dprClamp}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c3aed" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#06b6d4" />
        <NeuralSphere />
        <AmbientParticles />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
