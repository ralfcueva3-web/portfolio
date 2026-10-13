'use client';

import { useState, useEffect } from 'react';

export type DeviceCapability = 'high' | 'medium' | 'low';

/**
 * Heuristic check for device performance capability.
 * Used to decide whether to render 3D scenes or show static fallbacks.
 * Evaluates CPU core count, device memory, mobile user-agent, and WebGL renderer.
 *
 * @returns 'high' | 'medium' | 'low' device performance classification.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>('high');

  useEffect(() => {
    let score = 0;

    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 2;
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;

    // Check device memory (Chrome-only)
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (memory) {
      if (memory >= 8) score += 3;
      else if (memory >= 4) score += 2;
      else score += 1;
    } else {
      score += 2; // Assume medium if unavailable
    }

    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) score -= 1;

    // Check WebGL renderer
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Low-end indicators
          if (/SwiftShader|llvmpipe|Software/i.test(renderer)) score -= 2;
        }
      } else {
        score -= 3; // No WebGL
      }
    } catch {
      score -= 1;
    }

    if (score >= 5) setCapability('high');
    else if (score >= 3) setCapability('medium');
    else setCapability('low');
  }, []);

  return capability;
}
