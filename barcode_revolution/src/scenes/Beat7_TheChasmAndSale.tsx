import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { HalftoneDotMatrix } from '../components/HalftoneDotMatrix';

export const Beat7_TheChasmAndSale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frames 0 - 180 (6 seconds: 0:20 to 0:26)
  // Phase 1 (0 - 90): 25-Year Timeline Chasm
  // Phase 2 (90 - 180): Patent #2,612,994 & Red $15,000 Stamp

  const yearCounter = Math.floor(
    interpolate(frame, [10, 80], [1949, 1974], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const phase2Transition = spring({ frame: frame - 85, fps, config: { damping: 14, mass: 0.8, stiffness: 100 } });

  const stampSpring = spring({ frame: frame - 110, fps, config: { damping: 10, mass: 0.4, stiffness: 190 } });

  const stampShake =
    frame >= 110 && frame <= 125
      ? Math.sin(frame * 3) * interpolate(frame, [110, 115, 125], [0, 8, 0])
      : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
        transform: `translate(${stampShake}px, ${stampShake * 0.5}px)`,
      }}
    >
      <HalftoneDotMatrix opacity={0.06} />

      {/* ======================================================== */}
      {/* PHASE 1: 25-YEAR CHASM TIMELINE (Frames 0 - 90)          */}
      {/* ======================================================== */}
      {frame < 95 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
            opacity: interpolate(frame, [80, 94], [1, 0]),
          }}
        >
          <div style={{ fontFamily: THEME.fonts.mono, fontSize: 14, color: THEME.colors.electricCyan, letterSpacing: '0.4em' }}>
            TECHNOLOGICAL INERTIA // 1949 — 1974
          </div>

          <h2
            style={{
              fontFamily: THEME.fonts.hero,
              fontSize: 88,
              fontWeight: 900,
              color: THEME.colors.boneWhite,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '12px 0 32px 0',
            }}
          >
            25 Years of Nothing.
          </h2>

          {/* Monumental Timeline Rail */}
          <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: THEME.fonts.mono, fontSize: 28, fontWeight: 800 }}>
              <span style={{ color: THEME.colors.amberGold }}>1949 [CONCEPTION]</span>
              <span style={{ color: THEME.colors.boneWhite, fontSize: 36 }}>{yearCounter}</span>
              <span style={{ color: THEME.colors.electricCyan }}>1974 [REALIZATION]</span>
            </div>
            <div style={{ width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${interpolate(frame, [10, 80], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
                  height: '100%',
                  backgroundColor: THEME.colors.electricCyan,
                  boxShadow: '0 0 25px #00d2ff',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 2: PATENT BLUEPRINT & $15,000 STAMP (Frames 90-180) */}
      {/* ======================================================== */}
      {frame >= 85 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: phase2Transition,
            transform: `scale(${0.9 + phase2Transition * 0.1})`,
          }}
        >
          <div
            style={{
              width: 980,
              height: 600,
              backgroundColor: '#0c121e',
              border: '2px solid rgba(0, 210, 255, 0.4)',
              borderRadius: 8,
              padding: '40px 50px',
              position: 'relative',
              boxShadow: '0 30px 100px rgba(0,0,0,0.9), inset 0 0 80px rgba(0, 71, 255, 0.15)',
            }}
          >
            {/* Blueprint Header */}
            <div style={{ borderBottom: '1px solid rgba(0, 210, 255, 0.3)', paddingBottom: 16 }}>
              <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: THEME.colors.electricCyan, letterSpacing: '0.25em' }}>
                UNITED STATES PATENT OFFICE // SERIAL NO. 2,612,994
              </div>
              <div style={{ fontFamily: THEME.fonts.hero, fontSize: 36, fontWeight: 800, color: THEME.colors.boneWhite, marginTop: 4 }}>
                Classifying Apparatus and Method
              </div>
            </div>

            {/* Technical Diagram Vectors */}
            <div style={{ display: 'flex', gap: 60, marginTop: 36, alignItems: 'center' }}>
              {/* Bullseye Rings */}
              <svg width="200" height="200" viewBox="0 0 200 200">
                {[15, 35, 55, 75, 95].map((r, i) => (
                  <circle key={i} cx="100" cy="100" r={r} stroke={THEME.colors.electricCyan} strokeWidth={i % 2 === 0 ? "4" : "1.5"} fill="none" />
                ))}
              </svg>

              <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.paperCream, lineHeight: 2 }}>
                INVENTORS:
                <br />
                <span style={{ color: THEME.colors.boneWhite, fontWeight: 700 }}>• NORMAN J. WOODLAND</span>
                <br />
                <span style={{ color: THEME.colors.boneWhite, fontWeight: 700 }}>• BERNARD SILVER</span>
                <br />
                FILED: OCT 20, 1949 // GRANTED: OCT 7, 1952
              </div>
            </div>

            {/* Red Rubber Stamp Slam: SOLD $15,000 */}
            {frame >= 110 && (
              <div
                style={{
                  position: 'absolute',
                  right: 80,
                  bottom: 60,
                  border: `5px solid ${THEME.colors.laserRed}`,
                  padding: '18px 40px',
                  borderRadius: 8,
                  transform: `scale(${2.5 - stampSpring * 1.5}) rotate(-14deg)`,
                  opacity: stampSpring,
                  backgroundColor: 'rgba(255, 40, 40, 0.1)',
                  boxShadow: `0 0 40px ${THEME.colors.laserGlow}`,
                }}
              >
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 44, fontWeight: 900, color: THEME.colors.laserRed, letterSpacing: '0.08em', textAlign: 'center' }}>
                  SOLD: $15,000
                </div>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, fontWeight: 700, color: THEME.colors.laserRed, letterSpacing: '0.25em', textAlign: 'center', marginTop: 4 }}>
                  ASSIGNED TO PHILCO CORP.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
