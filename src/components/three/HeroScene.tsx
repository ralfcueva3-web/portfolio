// BUILT-BY: opus-4.6
'use client';

import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_CONFIG } from './SceneConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cfg = SCENE_CONFIG.hero;

/**
 * Neural network sphere: particles on a spherical surface with
 * animated connections and mouse reactivity.
 * Uses dark-friendly colors — no bright whites in dark mode.
 */
export function NeuralSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const prefersReducedMotion = useReducedMotion();

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

  // Gradient: signal orange → dark rust (no white)
  const particleColors = useMemo(() => {
    const colors = new Float32Array(cfg.particleCount * 3);
    const primary = new THREE.Color(cfg.color);
    const secondary = new THREE.Color(cfg.secondaryColor);
    for (let i = 0; i < cfg.particleCount; i++) {
      const t = Math.random();
      const color = primary.clone().lerp(secondary, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  const connectionGeometry = useMemo(() => {
    const maxConnections = 400;
    const linePos: number[] = [];
    const lineColors: number[] = [];
    const primary = new THREE.Color(cfg.color);
    const secondary = new THREE.Color(cfg.secondaryColor);

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
          const c = primary.clone().lerp(secondary, t);
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

    pointsRef.current.rotation.y += cfg.rotationSpeed * delta;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    const mx = state.pointer.x * cfg.mouseInfluence;
    const my = state.pointer.y * cfg.mouseInfluence;
    pointsRef.current.rotation.x += (my - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.z += (mx * 0.5 - pointsRef.current.rotation.z) * 0.02;

    for (let i = 0; i < cfg.particleCount; i++) {
      posArray[i * 3] = initialPositions[i * 3] + Math.sin(time + i) * 0.04;
      posArray[i * 3 + 1] = initialPositions[i * 3 + 1] + Math.cos(time + i * 0.5) * 0.04;
      posArray[i * 3 + 2] = initialPositions[i * 3 + 2] + Math.sin(time * 0.7 + i) * 0.03;
    }
    posAttr.needsUpdate = true;

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
        {/* Particles — normal blending, no additive glow */}
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
            opacity={0.4}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Connection lines */}
        <lineSegments ref={linesRef} geometry={connectionGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={cfg.connectionOpacity}
            depthWrite={false}
          />
        </lineSegments>

        {/* Subtle central glow — orange only, very dim */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial
            color={cfg.color}
            transparent
            opacity={0.02}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Ambient floating particles — sparse, dim, accent-colored.
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
        color={cfg.color}
        transparent
        opacity={pcfg.opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Main hero 3D scene canvas.
 * Dynamically imported with `{ ssr: false }` by HeroSceneWrapper.
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
        {/* Minimal lighting — no bright point lights */}
        <ambientLight intensity={0.08} />
        <pointLight position={[10, 10, 10]} intensity={0.15} color="#ff4d00" />
        <pointLight position={[-10, -10, -5]} intensity={0.08} color="#331200" />
        <NeuralSphere />
        <AmbientParticles />
      </Suspense>
    </Canvas>
  );
}
