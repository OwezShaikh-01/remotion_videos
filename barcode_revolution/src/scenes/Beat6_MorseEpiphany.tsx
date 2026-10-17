import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';

export const Beat6_MorseEpiphany: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 105 (3.5 seconds: 0:16.5 to 0:20)
  // Split Screen: Morse Code Audio Pulses vs Vertical Barcode Extension

  const stretchSpring = spring({ frame: frame - 15, fps, config: { damping: 15, mass: 0.8, stiffness: 70 } });
  const barH = interpolate(stretchSpring, [0, 1], [40, 480]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HalftoneDotMatrix opacity={0.07} />

      {/* Top Half: Horizontal Morse Code Symbols */}
      <div
        style={{
          flex: 1,
          borderBottom: '1px solid rgba(243, 239, 230, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.amberGold, letterSpacing: '0.3em' }}>
          INPUT SIGNAL: HORIZONTAL MORSE CODE
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'center', marginTop: 24 }}>
          {/* Dot 1 */}
          <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: THEME.colors.paperCream }} />
          {/* Dash 1 */}
          <div style={{ width: 84, height: 28, borderRadius: 6, backgroundColor: THEME.colors.amberGold }} />
          {/* Dot 2 */}
          <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: THEME.colors.paperCream }} />
          {/* Dash 2 */}
          <div style={{ width: 84, height: 28, borderRadius: 6, backgroundColor: THEME.colors.amberGold }} />
        </div>
      </div>

      {/* Bottom Half: Downward Vertical Extension */}
      <div
        style={{
          flex: 1.6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            fontFamily: THEME.fonts.mono,
            fontSize: 13,
            color: THEME.colors.electricCyan,
            letterSpacing: '0.3em',
          }}
        >
          TRANSFORMATION: VERTICAL PROJECTION (1X vs 3X)
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', marginTop: 40 }}>
          {/* Bar 1: Thin (1X) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 14, height: barH, backgroundColor: THEME.colors.paperCream, borderRadius: 2 }} />
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.paperCream, marginTop: 12, fontWeight: 700 }}>
              1X THIN
            </div>
          </div>

          {/* Bar 2: Thick (3X) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 48, height: barH, backgroundColor: THEME.colors.amberGold, borderRadius: 2, boxShadow: '0 0 30px rgba(255,170,0,0.4)' }} />
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.amberGold, marginTop: 12, fontWeight: 700 }}>
              3X THICK
            </div>
          </div>

          {/* Bar 3: Thin (1X) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 14, height: barH, backgroundColor: THEME.colors.paperCream, borderRadius: 2 }} />
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.paperCream, marginTop: 12, fontWeight: 700 }}>
              1X THIN
            </div>
          </div>

          {/* Bar 4: Thick (3X) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 48, height: barH, backgroundColor: THEME.colors.amberGold, borderRadius: 2, boxShadow: '0 0 30px rgba(255,170,0,0.4)' }} />
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.amberGold, marginTop: 12, fontWeight: 700 }}>
              3X THICK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
