import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

export const Beat5_MiamiBeach1949: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 105 (3.5 seconds: 0:13 to 0:16.5)
  // Archival Field Note & 1949 Sand Furrow Drawing

  const rakeSpring = spring({ frame: frame - 20, fps, config: { damping: 18, mass: 1.2, stiffness: 60 } });
  const furrowH = interpolate(rakeSpring, [0, 1], [0, 520]);

  const stampSpring = spring({ frame: frame - 5, fps, config: { damping: 14, mass: 0.6, stiffness: 120 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#16120b',
        overflow: 'hidden',
        display: 'flex',
        padding: 50,
      }}
    >
      {/* Archival Parchment Layer */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#eae3d2',
          borderRadius: 8,
          boxShadow: '0 30px 100px rgba(0,0,0,0.9)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 48,
          border: '1px solid #d4c8b2',
        }}
      >
        {/* Topographic Coastal Wave Vector Lines */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}>
          <svg width="100%" height="100%">
            {[100, 220, 340, 460, 580, 700].map((y, i) => (
              <path
                key={i}
                d={`M -50 ${y} Q 400 ${y + 40} 960 ${y - 20} T 2000 ${y + 30}`}
                stroke="#6d5432"
                strokeWidth="1.5"
                fill="none"
              />
            ))}
          </svg>
        </div>

        {/* Top Archival Header & Circular Postal Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
          <div>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: '#684d28', letterSpacing: '0.25em', fontWeight: 700 }}>
              HISTORICAL FIELD DISPATCH // DEC 1949
            </div>
            <div style={{ fontFamily: THEME.fonts.serif, fontSize: 38, fontWeight: 700, color: '#241a0d', marginTop: 4 }}>
              Miami Beach, Florida
            </div>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: '#543f25', marginTop: 4 }}>
              GEOLOCATION: 25.7907° N, 80.1300° W // INVENTOR: N. J. WOODLAND
            </div>
          </div>

          {/* Postal Record Stamp */}
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              border: '3px dashed #523b1e',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#523b1e',
              transform: `scale(${0.9 + stampSpring * 0.1}) rotate(-12deg)`,
              opacity: stampSpring,
            }}
          >
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 10, fontWeight: 700 }}>POSTAL SEAL</span>
            <span style={{ fontFamily: THEME.fonts.serif, fontSize: 18, fontWeight: 700, margin: '2px 0' }}>MIAMI</span>
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 12, fontWeight: 700 }}>1949</span>
          </div>
        </div>

        {/* The 4 Furrows Carved into Sand Canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 50,
            zIndex: 15,
          }}
        >
          {[
            { w: 12, code: 'DOT (•)', ratio: '1X' },
            { w: 42, code: 'DASH (—)', ratio: '3X' },
            { w: 12, code: 'DOT (•)', ratio: '1X' },
            { w: 42, code: 'DASH (—)', ratio: '3X' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: f.w,
                  height: furrowH,
                  backgroundColor: '#382511',
                  borderRadius: 4,
                  boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.6), 0 2px 8px rgba(255,255,255,0.4)',
                }}
              />
              <div
                style={{
                  marginTop: 14,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#422c15',
                }}
              >
                {f.code}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Archival Footnote */}
        <div style={{ zIndex: 10, borderTop: '1px solid #c2b59b', paddingTop: 14 }}>
          <span style={{ fontFamily: THEME.fonts.serif, fontSize: 22, fontStyle: 'italic', color: '#3d2b15' }}>
            “He sat on the sand, thinking about Morse code, and pulled four fingers downward.”
          </span>
        </div>
      </div>
    </div>
  );
};
