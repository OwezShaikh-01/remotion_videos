import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';
import { LaserReticle } from '../components/LaserReticle';

export const Beat1_Observation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 120 (4 seconds: 0:00 to 0:04)
  // 3-Column Editorial Split Screen

  const col1Spring = spring({ frame, fps, config: { damping: 14, mass: 0.6, stiffness: 100 } });
  const col2Spring = spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.7, stiffness: 90 } });
  const col3Spring = spring({ frame: frame - 20, fps, config: { damping: 14, mass: 0.8, stiffness: 85 } });

  const laserX = interpolate(frame, [15, 115], [5, 95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        display: 'flex',
        padding: 40,
        gap: 24,
      }}
    >
      <HalftoneDotMatrix opacity={0.06} />

      {/* ======================================================== */}
      {/* COLUMN 1: KINETIC EDITORIAL TYPOGRAPHY BLOCK             */}
      {/* ======================================================== */}
      <div
        style={{
          flex: 1.2,
          backgroundColor: '#0d111a',
          border: '1px solid rgba(243, 239, 230, 0.12)',
          borderRadius: 8,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateY(${(1 - col1Spring) * 60}px)`,
          opacity: col1Spring,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.amberGold, letterSpacing: '0.2em' }}>
            ACT 01 // HOOK
          </span>
          <span style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.paperCream, opacity: 0.6 }}>
            FIG. 1.0
          </span>
        </div>

        <div>
          <h1
            style={{
              fontFamily: THEME.fonts.hero,
              fontSize: 68,
              fontWeight: 800,
              color: THEME.colors.boneWhite,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            LOOK
            <br />
            <span style={{ color: THEME.colors.amberGold }}>AROUND</span>
            <br />
            YOU.
          </h1>
          <div
            style={{
              marginTop: 20,
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              color: THEME.colors.paperCream,
              opacity: 0.8,
              letterSpacing: '0.1em',
            }}
          >
            WITHIN ARM&apos;S REACH // PROXIMITY RADIUS &lt; 1.0m
          </div>
        </div>

        {/* Small Barcode Accent */}
        <div style={{ display: 'flex', gap: 3, height: 40, alignItems: 'center' }}>
          {[3, 1, 6, 2, 8, 2, 4, 1, 7, 3, 2, 5, 1, 8, 3, 2, 6, 4, 2].map((w, i) => (
            <div key={i} style={{ width: w * 2, height: '100%', backgroundColor: THEME.colors.paperCream, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* COLUMN 2: EVERYDAY VECTOR ITEMS WITH EMBEDDED BARCODES   */}
      {/* ======================================================== */}
      <div
        style={{
          flex: 1.5,
          backgroundColor: '#0d111a',
          border: '1px solid rgba(243, 239, 230, 0.12)',
          borderRadius: 8,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateY(${(1 - col2Spring) * 60}px)`,
          opacity: col2Spring,
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.electricCyan, letterSpacing: '0.2em' }}>
          EVERYDAY PACKAGING RECOGNITION
        </div>

        {/* 3 Everyday Items Vector Diagram */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* Item A: Coffee Cup */}
          <svg width="120" height="200" viewBox="0 0 120 200">
            <path d="M20 40 L100 40 L90 170 L30 170 Z" fill="#161c28" stroke={THEME.colors.boneWhite} strokeWidth="2" strokeOpacity="0.4" />
            <ellipse cx="60" cy="40" rx="40" ry="12" fill="#252d3d" stroke={THEME.colors.boneWhite} strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Barcode */}
            <g transform="translate(38, 90)">
              <rect x="-4" y="-4" width="52" height="42" fill="#fff" rx="2" />
              {[0, 3, 7, 10, 14, 18, 22, 26, 30, 34, 38, 42].map((x, i) => (
                <rect key={i} x={x} y="0" width={i % 3 === 0 ? 2 : 1} height="30" fill={frame > 40 && frame < 70 ? THEME.colors.laserRed : '#000'} />
              ))}
            </g>
            <text x="60" y="190" fill={THEME.colors.paperCream} fontSize="10" fontFamily={THEME.fonts.mono} textAnchor="middle">
              CUP // 041196
            </text>
          </svg>

          {/* Item B: Book Spine */}
          <svg width="120" height="200" viewBox="0 0 120 200">
            <rect x="25" y="20" width="70" height="150" rx="4" fill="#1e1814" stroke="#5a3d32" strokeWidth="2" />
            <line x1="38" y1="20" x2="38" y2="170" stroke="#8a5e4d" strokeWidth="2" />
            <g transform="translate(45, 75)">
              <rect x="-4" y="-4" width="46" height="42" fill="#fff" rx="2" />
              {[0, 3, 6, 10, 14, 18, 22, 26, 30, 34, 38].map((x, i) => (
                <rect key={i} x={x} y="0" width={i % 2 === 0 ? 2 : 1} height="30" fill={frame > 65 && frame < 95 ? THEME.colors.laserRed : '#000'} />
              ))}
            </g>
            <text x="60" y="190" fill={THEME.colors.paperCream} fontSize="10" fontFamily={THEME.fonts.mono} textAnchor="middle">
              BOOK // ISBN
            </text>
          </svg>

          {/* Item C: Pill Tube */}
          <svg width="120" height="200" viewBox="0 0 120 200">
            <rect x="40" y="25" width="40" height="20" rx="3" fill="#ccc" stroke="#888" strokeWidth="1" />
            <path d="M42 45 L42 165 Q42 170 50 170 L70 170 Q78 170 78 165 L78 45 Z" fill="#542c0a" stroke="rgba(255,170,0,0.4)" strokeWidth="1.5" />
            <g transform="translate(48, 85)">
              <rect x="-3" y="-3" width="30" height="36" fill="#fff" rx="2" />
              {[0, 3, 6, 9, 12, 15, 18, 21].map((x, i) => (
                <rect key={i} x={x} y="0" width={1.5} height="26" fill={frame > 85 && frame < 115 ? THEME.colors.laserRed : '#000'} />
              ))}
            </g>
            <text x="60" y="190" fill={THEME.colors.paperCream} fontSize="10" fontFamily={THEME.fonts.mono} textAnchor="middle">
              PHARMA // NDC
            </text>
          </svg>
        </div>

        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.paperCream, opacity: 0.6 }}>
          STATUS: CONTINUOUS PASSIVE CONTACT
        </div>
      </div>

      {/* ======================================================== */}
      {/* COLUMN 3: RAW BINARY TERMINAL STREAM                     */}
      {/* ======================================================== */}
      <div
        style={{
          flex: 0.9,
          backgroundColor: '#090d14',
          border: '1px solid rgba(243, 239, 230, 0.12)',
          borderRadius: 8,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateY(${(1 - col3Spring) * 60}px)`,
          opacity: col3Spring,
          fontFamily: THEME.fonts.mono,
          fontSize: 12,
          color: THEME.colors.electricCyan,
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: THEME.colors.paperCream, fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>
          RAW DATA BUFFER
        </div>

        <div>
          <div>10100110100101</div>
          <div style={{ color: THEME.colors.amberGold }}>00011010011001</div>
          <div>11001100101010</div>
          <div>01010111001001</div>
          <div style={{ color: THEME.colors.laserRed }}>10101000110101</div>
          <div>00101101001100</div>
          <div>11010010101101</div>
        </div>

        <div style={{ fontSize: 10, color: THEME.colors.paperCream, opacity: 0.5 }}>
          FPS: 30 // BUFFER: SYNC
        </div>
      </div>

      {/* Sweeping Laser Line across all 3 columns */}
      <LaserReticle xProgress={laserX} label="OPTICAL SENSOR ACQUISITION" />
    </div>
  );
};
