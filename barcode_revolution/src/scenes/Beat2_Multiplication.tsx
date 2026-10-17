import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';

export const Beat2_Multiplication: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 120 (4 seconds: 0:04 to 0:08)
  // Perspective forest of barcode monoliths erupting from the floor

  const eruptSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5, stiffness: 120 } });
  const cameraZ = interpolate(frame, [0, 120], [0, 400], { extrapolateRight: 'clamp' });

  // 36 dynamic bars pattern
  const bars = [
    { w: 4, h: 620, x: -550, accent: false },
    { w: 12, h: 780, x: -480, accent: true },
    { w: 2, h: 540, x: -420, accent: false },
    { w: 8, h: 690, x: -360, accent: false },
    { w: 16, h: 840, x: -280, accent: true },
    { w: 3, h: 510, x: -220, accent: false },
    { w: 6, h: 650, x: -160, accent: false },
    { w: 2, h: 480, x: -110, accent: false },
    { w: 14, h: 800, x: -40, accent: true },
    { w: 5, h: 600, x: 30, accent: false },
    { w: 2, h: 520, x: 80, accent: false },
    { w: 9, h: 710, x: 140, accent: false },
    { w: 18, h: 860, x: 230, accent: true },
    { w: 3, h: 550, x: 300, accent: false },
    { w: 7, h: 670, x: 360, accent: false },
    { w: 2, h: 490, x: 410, accent: false },
    { w: 11, h: 740, x: 480, accent: false },
    { w: 15, h: 820, x: 560, accent: true },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
        perspective: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <HalftoneDotMatrix opacity={0.06} />

      {/* Hero Bold Typography Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          zIndex: 40,
        }}
      >
        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.amberGold, letterSpacing: '0.25em' }}>
          SURROUNDING FREQUENCY
        </div>
        <h2
          style={{
            fontFamily: THEME.fonts.hero,
            fontSize: 72,
            fontWeight: 800,
            color: THEME.colors.boneWhite,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '8px 0 0 0',
          }}
        >
          Probably Several.
        </h2>
      </div>

      {/* 3D Perspective Forest of Monolith Barcodes */}
      <div
        style={{
          position: 'absolute',
          width: 1400,
          height: 900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateZ(${cameraZ}px) rotateX(${15 * (1 - eruptSpring)}deg)`,
        }}
      >
        {bars.map((bar, i) => {
          const currentH = bar.h * eruptSpring;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${bar.x}px)`,
                bottom: 120,
                width: bar.w * 2,
                height: currentH,
                backgroundColor: bar.accent ? THEME.colors.amberGold : THEME.colors.paperCream,
                borderRadius: 2,
                boxShadow: bar.accent
                  ? `0 0 40px rgba(255, 170, 0, 0.5)`
                  : '0 0 20px rgba(243, 239, 230, 0.2)',
                transform: 'translateX(-50%)',
              }}
            />
          );
        })}
      </div>

      {/* Perspective Ground Grid */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -200,
          right: -200,
          height: 350,
          background: 'linear-gradient(to top, rgba(16, 68, 255, 0.15) 0%, transparent 100%)',
          borderTop: '1px solid rgba(243, 239, 230, 0.2)',
          transform: 'perspective(600px) rotateX(60deg)',
        }}
      />
    </div>
  );
};
