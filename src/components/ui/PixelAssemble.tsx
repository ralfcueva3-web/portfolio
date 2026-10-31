'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PixelAssembleProps {
  /** Path of the image, e.g. "/images/hero-banner.jpg" */
  src: string;
  alt: string;
  /** Pixel block size in CSS px. Smaller = sharper but heavier. */
  cell?: number;
  /** Length of the gather animation in ms. */
  duration?: number;
  /** Wait this long (ms) after the image is ready before the gather starts. */
  startDelay?: number;
  className?: string;
}

interface Particle {
  tx: number; // target x
  ty: number; // target y
  sx: number; // start x (scattered)
  sy: number; // start y (scattered)
  delay: number; // 0..MAX_DELAY, fraction of the total duration
  bucket: number; // index into the colour table
}

type Phase = 'idle' | 'animating' | 'done';

const MAX_DELAY = 0.5;
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Soft left/right/top/bottom fade so the picture has no visible edge.
const EDGE_MASK =
  'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), ' +
  'linear-gradient(to bottom, transparent, #000 9%, #000 91%, transparent)';

/**
 * Draws the image "cover"-fitted into a W×H canvas and turns black into
 * transparency (brightness becomes opacity), so the page background shows
 * through exactly like a screen/lighten blend — but it works inside any
 * parent, including ones with transforms or opacity.
 */
function buildCutout(
  img: HTMLImageElement,
  W: number,
  H: number,
  dpr: number,
): HTMLCanvasElement | null {
  const c = document.createElement('canvas');
  c.width = Math.round(W * dpr);
  c.height = Math.round(H * dpr);
  const cx = c.getContext('2d', { willReadFrequently: true });
  if (!cx) return null;

  const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  cx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);

  const frame = cx.getImageData(0, 0, c.width, c.height);
  const d = frame.data;
  for (let i = 0; i < d.length; i += 4) {
    const m = Math.max(d[i], d[i + 1], d[i + 2]);
    if (m < 6) {
      d[i + 3] = 0;
      continue;
    }
    const k = 255 / m;
    d[i] = Math.min(255, d[i] * k);
    d[i + 1] = Math.min(255, d[i + 1] * k);
    d[i + 2] = Math.min(255, d[i + 2] * k);
    d[i + 3] = m;
  }
  cx.putImageData(frame, 0, 0);
  return c;
}

/**
 * Image that builds itself out of scattered pixel blocks when the site opens.
 * The picture's black background is transparent, so it blends into the page.
 * With reduced motion enabled, it just shows the finished image.
 */
export default function PixelAssemble({
  src,
  alt,
  cell = 8,
  duration = 2800,
  startDelay = 500,
  className = '',
}: PixelAssembleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cutoutRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef({ W: 0, H: 0, dpr: 1 });
  const phaseRef = useRef<Phase>('idle');
  const rafRef = useRef(0);

  const prefersReduced = useReducedMotion();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  // 1. Load and decode the image.
  useEffect(() => {
    let cancelled = false;
    const el = new Image();
    el.src = src;
    el.decode()
      .then(() => {
        if (!cancelled) setImg(el);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  // 2. Build the transparent version at the current size, and rebuild on resize.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!img || !wrap || !canvas) return;

    const drawStatic = () => {
      const ctx = canvas.getContext('2d');
      const cut = cutoutRef.current;
      if (!ctx || !cut) return;
      const { W, H, dpr } = sizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(cut, 0, 0, W, H);
    };

    const layout = () => {
      if (phaseRef.current === 'animating') return;
      const { width: W, height: H } = wrap.getBoundingClientRect();
      if (!W || !H) return; // hidden on small screens
      const prev = sizeRef.current;
      if (cutoutRef.current && Math.abs(prev.W - W) < 2 && Math.abs(prev.H - H) < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cut = buildCutout(img, W, H, dpr);
      if (!cut) return;
      cutoutRef.current = cut;
      sizeRef.current = { W, H, dpr };
      canvas.width = cut.width;
      canvas.height = cut.height;

      if (phaseRef.current === 'done') drawStatic();
      setReady(true);
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [img]);

  // 3. Play the animation shortly after the page opens.
  useEffect(() => {
    if (!ready || phaseRef.current !== 'idle') return;

    const play = () => {
      const canvas = canvasRef.current;
      const cut = cutoutRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !cut || !ctx) return;

      const { W, H, dpr } = sizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const finish = () => {
        phaseRef.current = 'done';
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(cut, 0, 0, W, H);
      };

      if (prefersReduced) {
        finish();
        return;
      }
      phaseRef.current = 'animating';

      // One block per `cell` px: average colour (weighted by opacity) of that area.
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      const px = cell * dpr;
      const data = cut
        .getContext('2d', { willReadFrequently: true })!
        .getImageData(0, 0, cut.width, cut.height).data;

      const colors: string[] = [];
      const colorIndex = new Map<string, number>();
      const particles: Particle[] = [];

      for (let by = 0; by < rows; by++) {
        for (let bx = 0; bx < cols; bx++) {
          const x0 = Math.floor(bx * px);
          const y0 = Math.floor(by * px);
          const x1 = Math.min(Math.floor((bx + 1) * px), cut.width);
          const y1 = Math.min(Math.floor((by + 1) * px), cut.height);

          let sr = 0;
          let sg = 0;
          let sb = 0;
          let sa = 0;
          let n = 0;
          for (let y = y0; y < y1; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              const i = (y * cut.width + x) * 4;
              const a = data[i + 3];
              sr += data[i] * a;
              sg += data[i + 1] * a;
              sb += data[i + 2] * a;
              sa += a;
              n++;
            }
          }
          if (n === 0 || sa === 0) continue;
          const alpha = sa / n; // 0..255
          if (alpha < 14) continue;

          const r = sr / sa;
          const g = sg / sa;
          const b = sb / sa;
          const key = `rgba(${(r & 0xf0) | 8},${(g & 0xf0) | 8},${(b & 0xf0) | 8},${(Math.ceil(alpha / 32) / 8).toFixed(3)})`;
          let bucket = colorIndex.get(key);
          if (bucket === undefined) {
            bucket = colors.length;
            colors.push(key);
            colorIndex.set(key, bucket);
          }

          particles.push({
            tx: bx * cell,
            ty: by * cell,
            sx: Math.random() * W * 1.7 - W * 0.35,
            sy: Math.random() * H * 1.7 - H * 0.35,
            delay: Math.random() * MAX_DELAY,
            bucket,
          });
        }
      }
      particles.sort((a, b) => a.bucket - b.bucket);

      const start = performance.now();
      const frame = (now: number) => {
        const p = clamp01((now - start) / duration);
        ctx.clearRect(0, 0, W, H);

        // Real image fades in underneath at the end so the result is sharp.
        const fade = smoothstep(0.72, 1, p);
        if (fade > 0) {
          ctx.globalAlpha = fade;
          ctx.drawImage(cut, 0, 0, W, H);
        }

        let lastBucket = -1;
        for (const q of particles) {
          const t = clamp01((p - q.delay) / (1 - MAX_DELAY));
          if (t === 0) continue;
          if (q.bucket !== lastBucket) {
            ctx.fillStyle = colors[q.bucket];
            lastBucket = q.bucket;
          }
          const e = easeOutQuart(t);
          ctx.globalAlpha = Math.min(1, t * 4) * (1 - fade);
          ctx.fillRect(q.sx + (q.tx - q.sx) * e, q.sy + (q.ty - q.sy) * e, cell + 0.5, cell + 0.5);
        }
        ctx.globalAlpha = 1;

        if (p < 1) rafRef.current = requestAnimationFrame(frame);
        else finish();
      };
      rafRef.current = requestAnimationFrame(frame);
    };

    const timer = window.setTimeout(play, prefersReduced ? 0 : startDelay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      // If React re-runs this effect mid-flight (dev StrictMode), start over.
      if (phaseRef.current === 'animating') phaseRef.current = 'idle';
    };
  }, [ready, prefersReduced, cell, duration, startDelay]);

  return (
    <div ref={wrapRef} className={`relative aspect-video ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: EDGE_MASK,
          WebkitMaskImage: EDGE_MASK,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
    </div>
  );
}