import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { THEME } from '../../theme';
import { CameraRig } from '../../components/CameraRig';
import { DustParticles } from '../../components/DustParticles';
import { ScanBeam } from '../../components/ScanBeam';

export const Scene4TheChasm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 360 frames total (0:20 to 0:32)
  // Beat 1: 0 - 130 frames: 25 Years of Silence architectural timeline
  // Beat 2: 125 - 235 frames: $15,000 Patent Assignment & Stamp Slam
  // Beat 3: 230 - 305 frames: Bernard Silver Memorial Halftone Tribute
  // Beat 4: 300 - 360 frames: The 1974 Juicy Fruit Gum Pack Laser Climax

  // Beat 1: Timeline Motion
  const timelineSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 80 },
  });

  const yearCounter = Math.floor(
    interpolate(frame, [15, 95], [1949, 1974], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Beat 2: Patent Dossier Slam
  const dossierSpring = spring({
    frame: frame - 125,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 100 },
  });

  const stampSlam = spring({
    frame: frame - 150,
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 190 },
  });

  const stampShake =
    frame >= 150 && frame <= 165
      ? Math.sin(frame * 3) * interpolate(frame, [150, 155, 165], [0, 6, 0])
      : 0;

  // Beat 3: Bernard Silver Memorial
  const silverSpring = spring({
    frame: frame - 230,
    fps,
    config: { damping: 18, mass: 1.0, stiffness: 75 },
  });

  // Beat 4: Juicy Fruit Gum Pack
  const gumSpring = spring({
    frame: frame - 300,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07080c',
        overflow: 'hidden',
      }}
    >
      <CameraRig
        durationInFrames={360}
        zoom={[1, 1.1]}
        panX={[stampShake, 0]}
        panY={[stampShake * 0.5, -10]}
        driftIntensity={0.65}
      >
        <DustParticles count={45} color="rgba(242, 239, 230, 0.3)" />

        {/* ======================================================== */}
        {/* BEAT 1: 25 YEARS OF SILENCE (Frames 0 - 130)             */}
        {/* ======================================================== */}
        {frame < 135 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: interpolate(frame, [115, 134], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Header Stamp */}
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: 13,
                letterSpacing: '0.35em',
                color: THEME.colors.coldBlue,
                marginBottom: 16,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 8, height: 8, backgroundColor: THEME.colors.coldBlue, borderRadius: '50%' }} />
              ERA OF TECHNOLOGICAL DYSCHRONIA
            </div>

            <h2
              style={{
                fontFamily: THEME.fonts.story,
                fontSize: 88,
                fontWeight: 600,
                color: THEME.colors.boneWhite,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                transform: `scale(${0.92 + timelineSpring * 0.08})`,
                margin: 0,
                textShadow: '0 0 60px rgba(91, 141, 239, 0.25)',
              }}
            >
              25 Years of Nothing
            </h2>

            {/* Monumental Timeline Bar with Architectural Ticks */}
            <div
              style={{
                width: 1000,
                marginTop: 48,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: THEME.fonts.mono,
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.amber,
                }}
              >
                <span>1949 [SAND SKETCH]</span>
                <span style={{ color: THEME.colors.boneWhite, fontSize: 32 }}>
                  {yearCounter}
                </span>
                <span style={{ color: THEME.colors.coldBlue }}>1974 [FIRST SCAN]</span>
              </div>

              {/* High-Tech Progress Rail */}
              <div
                style={{
                  width: '100%',
                  height: 8,
                  backgroundColor: 'rgba(242, 239, 230, 0.1)',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(242, 239, 230, 0.15)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${interpolate(frame, [15, 95], [0, 100], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })}%`,
                    backgroundColor: THEME.colors.coldBlue,
                    boxShadow: `0 0 25px ${THEME.colors.coldBlueGlow}`,
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 24,
                  fontStyle: 'italic',
                  color: THEME.colors.sandLight,
                  textAlign: 'center',
                  marginTop: 16,
                }}
              >
                “The patent sat in drawers while the world invented the laser.”
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 2: THE $15,000 PATENT ASSIGNMENT (Frames 125 - 235)  */}
        {/* ======================================================== */}
        {frame >= 120 && frame < 240 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                frame > 225
                  ? interpolate(frame, [225, 238], [1, 0])
                  : interpolate(frame, [120, 132], [0, 1]),
              transform: `scale(${0.9 + dossierSpring * 0.1}) rotate(${
                -3 + dossierSpring * 3
              }deg)`,
            }}
          >
            {/* Archival Legal Patent Document */}
            <div
              style={{
                width: 820,
                height: 580,
                backgroundColor: '#f2edd9',
                borderRadius: 6,
                padding: '48px 60px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.9), inset 0 0 60px rgba(180, 160, 120, 0.3)',
                color: '#1a1815',
                position: 'relative',
                border: '1px solid #d4c8aa',
              }}
            >
              {/* Official Seal Watermark */}
              <div
                style={{
                  position: 'absolute',
                  right: 80,
                  top: 90,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '3px double #bdae8e',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: THEME.fonts.mono,
                  fontSize: 10,
                  color: '#bdae8e',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  transform: 'rotate(-15deg)',
                }}
              >
                OFFICIAL SEAL<br />U.S. PATENT<br />OFFICE
              </div>

              {/* Document Header */}
              <div style={{ borderBottom: '2px solid #2d2822', paddingBottom: 16 }}>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, color: '#6d6255', letterSpacing: '0.2em' }}>
                  UNITED STATES PATENT OFFICE // SERIAL NO. 2,612,994
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 30,
                    fontWeight: 700,
                    color: '#241f19',
                    marginTop: 6,
                    letterSpacing: '0.02em',
                  }}
                >
                  CLASSIFYING APPARATUS AND METHOD
                </div>
              </div>

              {/* Archival Text */}
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: '#3d362d', lineHeight: 1.6 }}>
                  <strong>INVENTORS:</strong> NORMAN J. WOODLAND &amp; BERNARD SILVER
                  <br />
                  <strong>PATENT GRANTED:</strong> OCTOBER 7, 1952
                  <br />
                  <strong>ASSIGNEE:</strong> PHILCO CORPORATION (LATER RCA)
                </div>

                <div style={{ height: 1, backgroundColor: '#c8bfa6', margin: '8px 0' }} />

                <div
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 19,
                    fontStyle: 'italic',
                    color: '#4d4438',
                    lineHeight: 1.6,
                  }}
                >
                  “...Unable to interest commercial retailers or fund hardware development,
                  the patentees hereby transfer and assign all rights, title, and interest...”
                </div>
              </div>

              {/* Red Ink Rubber Stamp Slam */}
              {frame >= 150 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 80,
                    bottom: 60,
                    border: `5px solid ${THEME.colors.signalRed}`,
                    padding: '16px 36px',
                    borderRadius: 8,
                    transform: `scale(${
                      2.5 - stampSlam * 1.5
                    }) rotate(-13deg)`,
                    opacity: stampSlam,
                    boxShadow: `0 0 35px ${THEME.colors.signalRedGlow}`,
                    backgroundColor: 'rgba(255, 77, 61, 0.08)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: 42,
                      fontWeight: 900,
                      color: THEME.colors.signalRed,
                      letterSpacing: '0.08em',
                      textAlign: 'center',
                      lineHeight: 1,
                    }}
                  >
                    SOLD: $15,000
                  </div>
                  <div
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: THEME.colors.signalRed,
                      letterSpacing: '0.25em',
                      textAlign: 'center',
                      marginTop: 6,
                    }}
                  >
                    FULL ASSIGNMENT // RIGHTS CONCLUDED
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 3: BERNARD SILVER MEMORIAL (Frames 230 - 305)       */}
        {/* ======================================================== */}
        {frame >= 228 && frame < 310 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                frame > 298
                  ? interpolate(frame, [298, 308], [1, 0])
                  : interpolate(frame, [228, 240], [0, 1]),
              transform: `scale(${0.94 + silverSpring * 0.06})`,
            }}
          >
            {/* Archival Halftone Portrait Frame */}
            <div
              style={{
                width: 680,
                backgroundColor: '#10141d',
                border: '1px solid rgba(242, 239, 230, 0.2)',
                borderRadius: 16,
                padding: '48px 56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95)',
                position: 'relative',
              }}
            >
              {/* Halftone Silhouette Frame */}
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: '50%',
                  border: `3px solid ${THEME.colors.sand}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                  background: 'radial-gradient(circle, #252e3f 0%, #10141d 80%)',
                  boxShadow: '0 0 30px rgba(201, 166, 107, 0.25)',
                }}
              >
                <svg width="70" height="70" viewBox="0 0 24 24" fill={THEME.colors.sand}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 13,
                  letterSpacing: '0.3em',
                  color: THEME.colors.sand,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                In Memoriam // Co-Inventor
              </div>

              <h3
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 54,
                  fontWeight: 600,
                  color: THEME.colors.boneWhite,
                  margin: 0,
                }}
              >
                Bernard Silver
              </h3>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 20,
                  color: THEME.colors.coldBlue,
                  marginTop: 8,
                  marginBottom: 24,
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                1924 — 1962 (Aged 38)
              </div>

              <div
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 24,
                  fontStyle: 'italic',
                  color: THEME.colors.sandLight,
                  textAlign: 'center',
                  lineHeight: 1.5,
                  maxWidth: 520,
                }}
              >
                “He overheard the question in a Drexel hallway in 1948. He died 12
                years before the first product was ever scanned.”
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 4: THE 1974 PACK OF GUM CLIMAX (Frames 300 - 360)    */}
        {/* ======================================================== */}
        {frame >= 295 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: interpolate(frame, [295, 310], [0, 1]),
            }}
          >
            {/* Dramatic Overhead Spotlight */}
            <div
              style={{
                position: 'absolute',
                top: -150,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 900,
                height: 900,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${THEME.colors.amberGlow} 0%, rgba(245, 184, 74, 0.08) 50%, transparent 75%)`,
                filter: 'blur(30px)',
              }}
            />

            {/* Photorealistic Reproduction: 1974 Juicy Fruit 10-Pack */}
            <div
              style={{
                width: 620,
                height: 270,
                backgroundColor: '#ffdf00',
                borderRadius: 8,
                boxShadow:
                  '0 35px 90px rgba(0,0,0,0.95), 0 0 50px rgba(245, 184, 74, 0.4)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px 36px',
                transform: `scale(${0.88 + gumSpring * 0.12}) rotate(${
                  (1 - gumSpring) * -6
                }deg)`,
                border: '3px solid #b45309',
              }}
            >
              {/* Foil Ends Accent */}
              <div
                style={{
                  position: 'absolute',
                  left: -12,
                  top: 15,
                  bottom: 15,
                  width: 12,
                  background: 'linear-gradient(to right, #999, #eee, #aaa)',
                  borderRadius: '3px 0 0 3px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: -12,
                  top: 15,
                  bottom: 15,
                  width: 12,
                  background: 'linear-gradient(to right, #aaa, #eee, #999)',
                  borderRadius: '0 3px 3px 0',
                }}
              />

              {/* Brand Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 34,
                    fontWeight: 900,
                    color: '#713f12',
                    letterSpacing: '0.04em',
                  }}
                >
                  WRIGLEY&apos;S JUICY FRUIT
                </span>
                <span
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    backgroundColor: '#713f12',
                    color: '#fef08a',
                    padding: '4px 10px',
                    borderRadius: 4,
                  }}
                >
                  10-PACK // 1974
                </span>
              </div>

              {/* Authentic 1974 UPC-A Barcode on the Gum Pack */}
              <div
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#ffffff',
                  padding: '8px 18px',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', gap: 2, height: 44, alignItems: 'center' }}>
                  {[
                    2, 1, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 5, 2, 1, 3,
                    2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2,
                  ].map((w, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: w,
                        height: '100%',
                        backgroundColor: '#000000',
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 11,
                    color: '#000',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    marginTop: 3,
                  }}
                >
                  0 11110 00025 8
                </div>
              </div>
            </div>

            {/* Historical Scan Tease Telemetry */}
            <div
              style={{
                marginTop: 36,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 14,
                  color: THEME.colors.amber,
                  letterSpacing: '0.25em',
                  fontWeight: 700,
                }}
              >
                [ TARGET IDENTIFIED: JUNE 26, 1974 // 08:01 AM ]
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 42,
                  color: THEME.colors.boneWhite,
                  fontWeight: 500,
                }}
              >
                The first product ever scanned: a pack of gum.
              </div>
            </div>

            {/* Active Red Laser Scan Beam slicing across the gum */}
            <ScanBeam startFrame={315} duration={42} direction="horizontal" />
          </div>
        )}
      </CameraRig>
    </div>
  );
};
