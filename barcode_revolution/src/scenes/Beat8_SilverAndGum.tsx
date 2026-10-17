import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';
import { LaserReticle } from '../components/LaserReticle';

export const Beat8_SilverAndGum: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 180 (6 seconds: 0:26 to 0:32)
  // Phase 1 (0 - 80): Bernard Silver In Memoriam
  // Phase 2 (75 - 180): 1974 Wrigley's Juicy Fruit Gum Hero Climax

  const silverSpring = spring({ frame, fps, config: { damping: 16, mass: 0.9, stiffness: 80 } });
  const gumSpring = spring({ frame: frame - 75, fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });

  const laserX = interpolate(frame - 90, [0, 80], [10, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <HalftoneDotMatrix opacity={0.07} />

      {/* ======================================================== */}
      {/* PHASE 1: BERNARD SILVER MEMORIAL (Frames 0 - 80)         */}
      {/* ======================================================== */}
      {frame < 85 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: interpolate(frame, [70, 84], [1, 0]),
            transform: `scale(${0.92 + silverSpring * 0.08})`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 720,
              backgroundColor: '#0c1017',
              border: '1px solid rgba(243, 239, 230, 0.2)',
              borderRadius: 12,
              padding: '48px 56px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 100px rgba(0,0,0,0.95)',
            }}
          >
            {/* Minimalist Vector Silhouette */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: `2px solid ${THEME.colors.amberGold}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                background: 'radial-gradient(circle, #1a2233 0%, #0d121c 80%)',
              }}
            >
              <svg width="50" height="50" viewBox="0 0 24 24" fill={THEME.colors.amberGold}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, letterSpacing: '0.3em', color: THEME.colors.amberGold, textTransform: 'uppercase' }}>
              In Memoriam // Co-Inventor
            </div>

            <h3 style={{ fontFamily: THEME.fonts.hero, fontSize: 56, fontWeight: 800, color: THEME.colors.boneWhite, margin: '8px 0' }}>
              Bernard Silver
            </h3>

            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 18, color: THEME.colors.electricCyan, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 20 }}>
              1924 — 1962 (Aged 38)
            </div>

            <div style={{ fontFamily: THEME.fonts.serif, fontSize: 24, fontStyle: 'italic', color: THEME.colors.paperCream, textAlign: 'center', lineHeight: 1.5, maxWidth: 540 }}>
              “He overheard the problem in a Drexel hallway in 1948. He died 12 years before his invention ever scanned a product.”
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 2: 1974 JUICY FRUIT GUM HERO CLIMAX (Frames 75-180) */}
      {/* ======================================================== */}
      {frame >= 75 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: interpolate(frame, [75, 90], [0, 1]),
            transform: `scale(${0.88 + gumSpring * 0.12})`,
            zIndex: 20,
          }}
        >
          {/* Ambient Amber Glow Spot */}
          <div
            style={{
              position: 'absolute',
              width: 800,
              height: 800,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 170, 0, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* 3D Isometric Wrigley's Juicy Fruit Pack */}
          <div
            style={{
              width: 680,
              height: 300,
              backgroundColor: '#ffc800',
              borderRadius: 8,
              boxShadow: '0 40px 120px rgba(0,0,0,0.95), 0 0 60px rgba(255, 170, 0, 0.4)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 40px',
              border: '3px solid #b85d00',
              transform: `rotate(${(1 - gumSpring) * -6}deg)`,
            }}
          >
            {/* Top Brand Stripe */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: THEME.fonts.hero, fontSize: 38, fontWeight: 900, color: '#663600', letterSpacing: '0.04em' }}>
                WRIGLEY&apos;S JUICY FRUIT
              </span>
              <span style={{ fontFamily: THEME.fonts.mono, fontSize: 13, fontWeight: 800, backgroundColor: '#663600', color: '#ffea75', padding: '4px 12px', borderRadius: 4 }}>
                10-PACK // 1974
              </span>
            </div>

            {/* Embedded UPC Barcode on Gum */}
            <div
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#ffffff',
                padding: '10px 22px',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', gap: 2.5, height: 48, alignItems: 'center' }}>
                {[2, 1, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 5, 2, 1, 3, 2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2].map((w, idx) => (
                  <div key={idx} style={{ width: w * 1.5, height: '100%', backgroundColor: '#000000' }} />
                ))}
              </div>
              <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: '#000', fontWeight: 800, letterSpacing: '0.12em', marginTop: 4 }}>
                0 11110 00025 8
              </div>
            </div>
          </div>

          {/* Telemetry Header Badge */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 14, color: THEME.colors.amberGold, letterSpacing: '0.25em', fontWeight: 700 }}>
              [ FIRST SCAN: JUNE 26, 1974 // 08:01 AM ]
            </div>
            <div style={{ fontFamily: THEME.fonts.hero, fontSize: 44, color: THEME.colors.boneWhite, fontWeight: 700, marginTop: 4 }}>
              The first product ever scanned: a pack of gum.
            </div>
          </div>

          {/* Active Red Laser Scan Beam */}
          {frame >= 90 && <LaserReticle xProgress={laserX} label="OPTICAL COMMERCE INITIALIZED" />}
        </div>
      )}
    </div>
  );
};
