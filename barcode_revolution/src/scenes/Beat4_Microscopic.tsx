import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

export const Beat4_Microscopic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 60 (2 seconds: 0:11 to 0:13)
  // Contrast Inversion & Binary Code Slit Zoom

  const zoomSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6, stiffness: 120 } });
  const zoomScale = interpolate(zoomSpring, [0, 1], [1, 5.5]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05070a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Zooming Vector Barcode Slits */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          transform: `scale(${zoomScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <div style={{ width: 18, height: 1200, backgroundColor: '#ffffff' }} />
        <div style={{ width: 8, height: 1200, backgroundColor: '#ffffff' }} />
        <div style={{ width: 36, height: 1200, backgroundColor: '#ffffff' }} />
        <div style={{ width: 12, height: 1200, backgroundColor: '#ffffff' }} />
        <div style={{ width: 44, height: 1200, backgroundColor: '#ffffff' }} />
        <div style={{ width: 8, height: 1200, backgroundColor: '#ffffff' }} />
      </div>

      {/* Binary Logic Callout Box */}
      <div
        style={{
          zIndex: 30,
          backgroundColor: 'rgba(5, 7, 10, 0.95)',
          border: `2px solid ${THEME.colors.laserRed}`,
          padding: '24px 44px',
          borderRadius: 8,
          boxShadow: '0 20px 80px rgba(0,0,0,0.95)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, letterSpacing: '0.3em', color: THEME.colors.amberGold }}>
          THE HIDDEN ARCHITECTURE
        </div>
        <div
          style={{
            fontFamily: THEME.fonts.mono,
            fontSize: 48,
            fontWeight: 800,
            color: THEME.colors.laserRed,
            letterSpacing: '0.25em',
          }}
        >
          1 0 1 0 0 0 1 1
        </div>
        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.paperCream, opacity: 0.8 }}>
          GUARD BARS [101] // OPTICAL ABSORPTION CODE
        </div>
      </div>

      {/* Dramatic Typography Line */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          fontFamily: THEME.fonts.serif,
          fontSize: 48,
          fontStyle: 'italic',
          color: THEME.colors.boneWhite,
          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          zIndex: 40,
        }}
      >
        You’ve never really looked.
      </div>
    </div>
  );
};
