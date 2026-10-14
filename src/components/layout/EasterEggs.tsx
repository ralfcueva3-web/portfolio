// BUILT-BY: opus-4.6
'use client';

import { useEffect, useRef } from 'react';

/**
 * Easter eggs for the portfolio:
 * 1. Console message — prints a styled welcome when DevTools opens
 * 2. Konami code — triggers a visual effect when ↑↑↓↓←→←→BA is entered
 */
export default function EasterEggs() {
  const konamiBuffer = useRef<string[]>([]);
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];

  const triggerKonami = () => {
    // Create a burst of orange particles from center of screen
    const container = document.createElement('div');
    container.style.cssText =
      'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 8 + 4;
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = Math.random() * 300 + 150;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      particle.style.cssText = `
        position:absolute;
        left:50%;top:50%;
        width:${size}px;height:${size}px;
        background:#ff4d00;
        border-radius:50%;
        transform:translate(-50%,-50%);
        animation:konami-burst 1s ease-out forwards;
      `;

      // Inject keyframes if not already present
      if (!document.getElementById('konami-style')) {
        const style = document.createElement('style');
        style.id = 'konami-style';
        style.textContent = `
          @keyframes konami-burst {
            0% { opacity:1; transform:translate(-50%,-50%) translate(0,0) scale(1); }
            100% { opacity:0; transform:translate(-50%,-50%) translate(var(--kx),var(--ky)) scale(0); }
          }
        `;
        document.head.appendChild(style);
      }

      particle.style.setProperty('--kx', `${x}px`);
      particle.style.setProperty('--ky', `${y}px`);
      container.appendChild(particle);
    }

    // Flash message
    const msg = document.createElement('div');
    msg.textContent = '🎮 +30 lives';
    msg.style.cssText =
      'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;font-family:monospace;font-size:20px;color:#ff4d00;font-weight:bold;opacity:1;transition:opacity 1s;pointer-events:none;';
    container.appendChild(msg);

    setTimeout(() => {
      msg.style.opacity = '0';
    }, 800);

    setTimeout(() => {
      container.remove();
    }, 2000);
  };

  useEffect(() => {
    // Console welcome message
    console.log(
      '%c◆ Ralph.dev',
      'color: #ff4d00; font-size: 24px; font-weight: bold; font-family: monospace;'
    );
    console.log(
      '%cYou found the console. Respect.\nBuilt with Next.js, Three.js, and an unreasonable amount of CSS variables.\n\nLooking at the source? Hire me → hello@ralph.dev',
      'color: #9a9590; font-size: 12px; font-family: monospace; line-height: 1.6;'
    );

    // Konami code listener
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiBuffer.current.push(e.code);

      // Keep buffer at konami code length
      if (konamiBuffer.current.length > konamiCode.length) {
        konamiBuffer.current.shift();
      }

      // Check if buffer matches konami code
      if (
        konamiBuffer.current.length === konamiCode.length &&
        konamiBuffer.current.every((key, i) => key === konamiCode[i])
      ) {
        triggerKonami();
        konamiBuffer.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
