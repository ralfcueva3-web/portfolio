// BUILT-BY: opus-4.6
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/../../data/content';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '72px 80px',
          color: '#f5f0ea',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle background grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 77, 0, 0.08) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Top Header: Logo Mark + Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
          }}
        >
          {/* Custom Original Monogram R Logo with Developer Cue */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 32 32"
            style={{ display: 'flex' }}
          >
            {/* Monogram R: Stem & Bowl */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 4 4 H 18.5 C 22.8 4 25.5 6.7 25.5 10.5 C 25.5 14.3 22.8 17 18.5 17 H 9.5 V 28 H 4 V 4 Z M 9.5 8.5 V 12.5 H 18 C 19.5 12.5 20.5 11.7 20.5 10.5 C 20.5 9.3 19.5 8.5 18 8.5 H 9.5 Z"
              fill="#f5f0ea"
            />
            {/* Diagonal Slash Leg */}
            <path
              d="M 11.5 16.5 L 19 28 H 24.5 L 17 16.5 H 11.5 Z"
              fill="#f5f0ea"
            />
            {/* Developer Cue: Accent Dot */}
            <rect
              x="23.5"
              y="23.5"
              width="4.5"
              height="4.5"
              rx="0.75"
              fill="#ff4d00"
            />
          </svg>

          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{
                fontSize: '44px',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                color: '#f5f0ea',
              }}
            >
              Ralf
            </span>
            <span
              style={{
                fontSize: '44px',
                fontWeight: 600,
                fontFamily: 'monospace',
                color: '#ff4d00',
              }}
            >
              .dev
            </span>
          </div>

          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#ff4d00',
              border: '1px solid #262626',
              padding: '8px 16px',
              backgroundColor: '#121212',
            }}
          >
            <span style={{ color: '#ff4d00' }}>●</span>
            <span>AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Center: Role & One-line Description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '18px',
              letterSpacing: '2px',
              color: '#ff4d00',
              textTransform: 'uppercase',
            }}
          >
            {'// Portfolio & Systems'}
          </div>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 800,
              letterSpacing: '-2.5px',
              lineHeight: 1.05,
              color: '#f5f0ea',
              margin: 0,
            }}
          >
            {siteConfig.role}
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.45,
              color: '#9a9590',
              maxWidth: '920px',
              margin: 0,
            }}
          >
            {siteConfig.description}
          </p>
        </div>

        {/* Bottom Bar: Hairline Accent Line + Metadata */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '2px',
              backgroundColor: '#ff4d00',
              width: '100%',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#737373',
            }}
          >
            <div>Next.js 16 • TypeScript • React Three Fiber • AI Native</div>
            <div style={{ color: '#f5f0ea', fontWeight: 600 }}>ralf.dev</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
