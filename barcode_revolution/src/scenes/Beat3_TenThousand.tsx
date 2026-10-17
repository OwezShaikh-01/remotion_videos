import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';

export const Beat3_TenThousand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 90 (3 seconds: 0:08 to 0:11)
  // Bold Graphic Poster: 10,000 TIMES

  const rollSpring = spring({ frame, fps, config: { damping: 14, mass: 0.9, stiffness: 85 } });
  const count = Math.floor(interpolate(rollSpring, [0, 1], [0, 10000]));

  const impactShake =
    frame >= 50 && frame <= 68
      ? Math.sin(frame * 3) * interpolate(frame, [50, 56, 68], [0, 12, 0])
      : 0;

  // Background conveyor belt scroll offset
  const conveyorOffset = (frame * 18) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0c0e14',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(${impactShake}px, ${impactShake * 0.5}px)`,
      }}
    >
      <HalftoneDotMatrix opacity={0.08} />

      {/* Kinetic Background Conveyor Belts of Barcodes */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: -400,
          right: -400,
          display: 'flex',
          gap: 12,
          opacity: 0.15,
          transform: `translateX(-${conveyorOffset}px)`,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{ width: (i % 5) * 8 + 6, height: 180, backgroundColor: THEME.colors.paperCream }} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: -400,
          right: -400,
          display: 'flex',
          gap: 12,
          opacity: 0.15,
          transform: `translateX(${conveyorOffset}px)`,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{ width: (i % 4) * 10 + 6, height: 180, backgroundColor: THEME.colors.amberGold }} />
        ))}
      </div>

      {/* Monumental Hero Ticker Poster */}
      <div
        style={{
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.mono,
            fontSize: 15,
            letterSpacing: '0.4em',
            color: THEME.colors.amberGold,
            marginBottom: 12,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          LIFETIME SUBCONSCIOUS ENCOUNTERS
        </div>

        <div
          style={{
            fontFamily: THEME.fonts.hero,
            fontSize: 190,
            fontWeight: 900,
            color: THEME.colors.boneWhite,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            textShadow: '0 0 80px rgba(243, 239, 230, 0.4)',
          }}
        >
          {count.toLocaleString()}
        </div>

        <div
          style={{
            fontFamily: THEME.fonts.serif,
            fontSize: 64,
            fontStyle: 'italic',
            fontWeight: 400,
            color: THEME.colors.amberGold,
            marginTop: 10,
          }}
        >
          times.
        </div>
      </div>
    </div>
  );
};
