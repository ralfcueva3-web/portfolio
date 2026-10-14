// BUILT-BY: opus-4.6
'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export type RalfMood = 'idle' | 'listening' | 'thinking' | 'talking' | 'waving';

interface RalfAvatarProps {
  mood?: RalfMood;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * RALF — cute but badass animated mascot.
 * A round-headed cyber-creature with cat ears, one normal eye + one
 * cyber-reticle eye, thick attitude brows, a fang smirk, and a scar.
 * Eyes track the mouse. Blinks. Mood-reactive expressions.
 */
export default function RalfAvatar({
  mood = 'idle',
  size = 48,
  onClick,
  className = '',
}: RalfAvatarProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(useTransform(mouseX, [-1, 1], [-1.8, 1.8]), { stiffness: 300, damping: 20 });
  const eyeY = useSpring(useTransform(mouseY, [-1, 1], [-1.2, 1.2]), { stiffness: 300, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  // Random blinks
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    };
    const id = setInterval(blink, 2500 + Math.random() * 2500);
    return () => clearInterval(id);
  }, []);

  const eyeH = isBlinking ? 1 : mood === 'thinking' ? 3.5 : 5;
  const eyeRy = isBlinking ? 0.5 : mood === 'thinking' ? 1.5 : 2.5;

  return (
    <motion.button
      onClick={onClick}
      className={`relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
      aria-label="RALF — AI assistant"
      animate={mood === 'waving' ? { rotate: [0, -8, 10, -6, 0] } : {}}
      transition={mood === 'waving' ? { duration: 0.5, repeat: 2 } : {}}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === GLOW PULSE === */}
        <motion.circle
          cx="32" cy="34" r="28"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.8"
          animate={{
            opacity: [0.15, 0.4, 0.15],
            r: mood === 'listening' ? [28, 30, 28] : 28,
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* === LEFT EAR — pointy cat ear === */}
        <path
          d="M14 22 L10 6 L22 18 Z"
          fill="var(--bg-tertiary)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner ear accent */}
        <path
          d="M14.5 19 L12 10 L19 17 Z"
          fill="var(--accent)"
          opacity="0.3"
        />

        {/* === RIGHT EAR === */}
        <path
          d="M50 22 L54 6 L42 18 Z"
          fill="var(--bg-tertiary)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M49.5 19 L52 10 L45 17 Z"
          fill="var(--accent)"
          opacity="0.3"
        />

        {/* Ear piercing — left ear, small ring */}
        <circle cx="13" cy="14" r="1" stroke="var(--accent)" strokeWidth="0.8" fill="none" />

        {/* === HEAD — rounded rectangle === */}
        <rect
          x="12" y="18" width="40" height="36" rx="14"
          fill="var(--bg-tertiary)"
          stroke="var(--border-primary)"
          strokeWidth="1"
        />

        {/* Face plate — darker inset */}
        <rect
          x="16" y="24" width="32" height="24" rx="10"
          fill="var(--bg-primary)"
          opacity="0.6"
        />

        {/* === SCAR — diagonal across right eye area === */}
        <line
          x1="38" y1="24" x2="44" y2="38"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
        />
        <line
          x1="39.5" y1="24" x2="45.5" y2="38"
          stroke="var(--bg-primary)"
          strokeWidth="0.5"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* === LEFT EYE — big round cute eye === */}
        <motion.g style={mounted ? { x: eyeX, y: eyeY } : {}}>
          {/* Eye white/bg */}
          <ellipse
            cx="25" cy="33"
            rx="5" ry="5"
            fill="var(--bg-elevated)"
            stroke="var(--border-primary)"
            strokeWidth="0.5"
          />
          {/* Iris */}
          <motion.ellipse
            cx="25" cy="33"
            rx="3"
            fill="var(--accent)"
            animate={{ ry: eyeRy }}
            transition={{ duration: 0.08 }}
          />
          {/* Pupil */}
          <motion.ellipse
            cx="25" cy="33"
            rx="1.5"
            fill="var(--bg-primary)"
            animate={{ ry: isBlinking ? 0.3 : 1.5 }}
            transition={{ duration: 0.08 }}
          />
          {/* Shine */}
          {!isBlinking && (
            <circle cx="23" cy="31.5" r="1" fill="white" opacity="0.7" />
          )}
        </motion.g>

        {/* === RIGHT EYE — cyber reticle (badass) === */}
        <motion.g style={mounted ? { x: eyeX, y: eyeY } : {}}>
          {/* Outer ring */}
          <motion.circle
            cx="39" cy="33" r="4.5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            animate={{
              opacity: isBlinking ? 0.2 : 0.9,
              rotate: mood === 'thinking' ? 360 : 0,
            }}
            transition={{
              opacity: { duration: 0.08 },
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
            style={{ transformOrigin: '39px 33px' }}
          />
          {/* Inner dot */}
          <motion.circle
            cx="39" cy="33"
            fill="var(--accent)"
            animate={{
              r: isBlinking ? 0.5 : mood === 'listening' ? [2, 2.5, 2] : 2,
              opacity: isBlinking ? 0.3 : 1,
            }}
            transition={{
              r: { duration: 1, repeat: Infinity },
              opacity: { duration: 0.08 },
            }}
          />
          {/* Crosshair lines */}
          {!isBlinking && (
            <>
              <line x1="39" y1="28" x2="39" y2="30.5" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <line x1="39" y1="35.5" x2="39" y2="38" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <line x1="34" y1="33" x2="36.5" y2="33" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <line x1="41.5" y1="33" x2="44" y2="33" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
            </>
          )}
        </motion.g>

        {/* === EYEBROWS — thick, angled = attitude === */}
        {/* Left brow — slight angry angle */}
        <motion.line
          x1="20" y1={mood === 'listening' ? 26 : 27}
          x2="29"  y2={mood === 'listening' ? 25 : 25.5}
          stroke="var(--text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            y1: mood === 'thinking' ? 25 : mood === 'listening' ? 26 : 27,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Right brow — more aggressive angle */}
        <motion.line
          x1="35" y1={mood === 'listening' ? 25 : 25.5}
          x2="44" y2={mood === 'listening' ? 26 : 27}
          stroke="var(--text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            y2: mood === 'thinking' ? 25 : mood === 'listening' ? 26 : 27,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* === NOSE — tiny triangle === */}
        <path
          d="M31 38 L33 38 L32 40 Z"
          fill="var(--text-muted)"
          opacity="0.5"
        />

        {/* === MOUTH — mood reactive === */}
        {mood === 'talking' ? (
          /* Talking: animated open mouth */
          <motion.ellipse
            cx="32" cy="43"
            rx="4"
            fill="var(--bg-primary)"
            stroke="var(--text-muted)"
            strokeWidth="0.5"
            animate={{ ry: [1, 3, 1.5, 2.5, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        ) : mood === 'thinking' ? (
          /* Thinking: wavy line */
          <motion.path
            d="M27 43 Q29 41 31 43 Q33 45 35 43 Q37 41 39 43"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ d: [
              'M27 43 Q29 41 31 43 Q33 45 35 43 Q37 41 39 43',
              'M27 43 Q29 45 31 43 Q33 41 35 43 Q37 45 39 43',
            ]}}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          /* Default: fang smirk — one corner up, tiny fang */
          <g>
            <path
              d="M26 42 Q32 46 38 42"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Fang */}
            <path
              d="M36 42.5 L37.5 45 L38.5 42"
              fill="var(--text-primary)"
              opacity="0.6"
            />
          </g>
        )}

        {/* === CHEEK MARKS — cute detail === */}
        <ellipse cx="18" cy="38" rx="2.5" ry="1.2" fill="var(--accent)" opacity="0.15" />
        <ellipse cx="46" cy="38" rx="2.5" ry="1.2" fill="var(--accent)" opacity="0.15" />
      </svg>

      {/* Status indicator */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
          mood === 'idle' ? 'bg-success animate-ping' : 'bg-accent animate-pulse'
        }`} />
        <span className={`relative inline-flex rounded-full h-3 w-3 ${
          mood === 'idle' ? 'bg-success' : 'bg-accent'
        }`} />
      </span>
    </motion.button>
  );
}
