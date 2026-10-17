import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { THEME } from '../../theme';
import { CameraRig } from '../../components/CameraRig';
import { BackgroundGrid } from '../../components/BackgroundGrid';
import { ScanBeam } from '../../components/ScanBeam';

export const Scene4TheChasm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 360 frames total (0:20 to 0:32)
  // Beat 1: 0 - 110 frames (0:20 - 0:24): 25 Years of Nothing timeline
  // Beat 2: 110 - 220 frames (0:24 - 0:27): Sold for $15,000 patent contract
  // Beat 3: 220 - 300 frames (0:27 - 0:30): Memorial tribute to Bernard Silver
  // Beat 4: 300 - 360 frames (0:30 - 0:32): The pack of gum tease

  // Beat 1: 25-Year Timeline
  const timelineSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 90 },
  });

  const yearCounter = Math.floor(
    interpolate(frame, [10, 80], [1949, 1974], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Beat 2: $15,000 Contract Stamp (frame 110+)
  const contractSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  const stampSlam = spring({
    frame: frame - 135,
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 180 },
  });

  // Beat 3: Bernard Silver Memorial (frame 220+)
  const memorialSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 80 },
  });

  // Beat 4: Juicy Fruit Gum Tease (frame 300+)
  const gumSpring = spring({
    frame: frame - 300,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid gridSize={70} color="rgba(242, 239, 230, 0.04)" />

      <CameraRig
        durationInFrames={360}
        zoom={[1, 1.08]}
        panY={[0, -15]}
        driftIntensity={0.7}
      >
        {/* BEAT 1: 25 Years of Nothing (frames 0 - 110) */}
        {frame < 120 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: interpolate(frame, [100, 118], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: 14,
                letterSpacing: '0.3em',
                color: THEME.colors.coldBlue,
                marginBottom: 16,
                textTransform: 'uppercase',
              }}
            >
              Chronological Dormancy
            </div>

            <h2
              style={{
                fontFamily: THEME.fonts.story,
                fontSize: 78,
                fontWeight: 600,
                color: THEME.colors.boneWhite,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                transform: `scale(${0.9 + timelineSpring * 0.1})`,
              }}
            >
              25 Years of Nothing
            </h2>

            {/* Timeline Bar */}
            <div
              style={{
                width: 900,
                marginTop: 40,
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
                  fontSize: 22,
                  fontWeight: 700,
                  color: THEME.colors.amber,
                }}
              >
                <span>1949 [Sand Sketch]</span>
                <span style={{ color: THEME.colors.boneWhite }}>
                  Current: {yearCounter}
                </span>
                <span>1974 [First Scan]</span>
              </div>

              {/* Progress Rail */}
              <div
                style={{
                  width: '100%',
                  height: 6,
                  backgroundColor: 'rgba(242, 239, 230, 0.15)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${interpolate(frame, [10, 80], [0, 100], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })}%`,
                    backgroundColor: THEME.colors.coldBlue,
                    boxShadow: `0 0 15px ${THEME.colors.coldBlueGlow}`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* BEAT 2: Patent Contract Sold for $15,000 (frames 110 - 220) */}
        {frame >= 105 && frame < 225 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                frame > 210
                  ? interpolate(frame, [210, 224], [1, 0])
                  : interpolate(frame, [105, 118], [0, 1]),
            }}
          >
            {/* Archival Legal Document */}
            <div
              style={{
                width: 740,
                height: 520,
                backgroundColor: '#eae6d8',
                borderRadius: 8,
                padding: '40px 50px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.85)',
                color: '#1a1a1a',
                position: 'relative',
                transform: `scale(${0.9 + contractSpring * 0.1}) rotate(${
                  -2 + contractSpring * 2
                }deg)`,
                border: '1px solid #c8c0a8',
              }}
            >
              {/* Document Header */}
              <div
                style={{
                  borderBottom: '2px solid #222',
                  paddingBottom: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: THEME.fonts.story,
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Patent Rights Assignment
                  </div>
                  <div
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: 11,
                      color: '#555',
                      marginTop: 4,
                    }}
                  >
                    UNITED STATES PATENT OFFICE // SERIAL NO. 2,612,994
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  OCTOBER 1952
                </div>
              </div>

              {/* Faux Legal Body Lines */}
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: '#333',
                  }}
                >
                  ASSIGNORS: N. J. WOODLAND &amp; B. SILVER
                  <br />
                  ASSIGNEE: PHILCO CORPORATION (LATER ACQUIRED BY RCA)
                  <br />
                  INVENTION: CLASSIFYING APPARATUS AND METHOD
                </div>
                <div
                  style={{
                    height: 2,
                    backgroundColor: '#ddd',
                    margin: '8px 0',
                  }}
                />
                <div
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 18,
                    fontStyle: 'italic',
                    color: '#444',
                    lineHeight: 1.5,
                  }}
                >
                  “The inventors, having received little commercial traction, hereby
                  relinquish all domestic and foreign patent privileges...”
                </div>
              </div>

              {/* Red Ink Rubber Stamp Slam */}
              {frame >= 135 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 60,
                    bottom: 60,
                    border: `4px solid ${THEME.colors.signalRed}`,
                    padding: '12px 28px',
                    borderRadius: 8,
                    transform: `scale(${
                      2.2 - stampSlam * 1.2
                    }) rotate(-14deg)`,
                    opacity: stampSlam,
                    boxShadow: `0 0 20px ${THEME.colors.signalRedGlow}`,
                    backgroundColor: 'rgba(255, 77, 61, 0.08)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: 32,
                      fontWeight: 800,
                      color: THEME.colors.signalRed,
                      letterSpacing: '0.08em',
                      textAlign: 'center',
                    }}
                  >
                    SOLD: $15,000
                  </div>
                  <div
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: 11,
                      color: THEME.colors.signalRed,
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    RIGHTS TRANSFERRED
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BEAT 3: Bernard Silver Memorial (frames 220 - 300) */}
        {frame >= 218 && frame < 305 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                frame > 295
                  ? interpolate(frame, [295, 304], [1, 0])
                  : interpolate(frame, [218, 230], [0, 1]),
            }}
          >
            <div
              style={{
                width: 620,
                backgroundColor: 'rgba(18, 22, 32, 0.9)',
                border: '1px solid rgba(242, 239, 230, 0.15)',
                borderRadius: 16,
                padding: '40px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                transform: `scale(${0.94 + memorialSpring * 0.06})`,
              }}
            >
              {/* Silhouette Memorial Icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: `2px solid ${THEME.colors.sand}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: THEME.colors.sand,
                    opacity: 0.8,
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 13,
                  letterSpacing: '0.25em',
                  color: THEME.colors.sand,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Co-Inventor In Memoriam
              </div>

              <h3
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 48,
                  fontWeight: 600,
                  color: THEME.colors.boneWhite,
                  marginBottom: 8,
                }}
              >
                Bernard Silver
              </h3>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 18,
                  color: THEME.colors.coldBlue,
                  marginBottom: 24,
                  letterSpacing: '0.1em',
                }}
              >
                1924 — 1962 (Aged 38)
              </div>

              <div
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 22,
                  fontStyle: 'italic',
                  color: THEME.colors.sandLight,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                “He died 12 years before his invention ever scanned a single
                product.”
              </div>
            </div>
          </div>
        )}

        {/* BEAT 4: Pack of Gum Tease (frames 300 - 360) */}
        {frame >= 298 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: interpolate(frame, [298, 312], [0, 1]),
            }}
          >
            {/* Ambient warm amber glow */}
            <div
              style={{
                position: 'absolute',
                width: 700,
                height: 700,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${THEME.colors.amberGlow} 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />

            {/* Stylized Pack of Juicy Fruit Gum */}
            <div
              style={{
                width: 480,
                height: 220,
                backgroundColor: '#fcd34d',
                borderRadius: 12,
                boxShadow:
                  '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(245, 184, 74, 0.4)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 32px',
                transform: `scale(${0.85 + gumSpring * 0.15}) rotate(${
                  (1 - gumSpring) * -8
                }deg)`,
                border: '3px solid #d97706',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#78350f',
                    letterSpacing: '0.04em',
                  }}
                >
                  WRIGLEY&apos;S JUICY FRUIT
                </span>
                <span
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: '#78350f',
                    color: '#fef3c7',
                    padding: '3px 8px',
                    borderRadius: 4,
                  }}
                >
                  10-PACK
                </span>
              </div>

              {/* Barcode on the Gum Pack */}
              <div
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <div style={{ display: 'flex', gap: 2, height: 35, alignItems: 'center' }}>
                  {[2, 1, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 5, 2, 1, 3].map((w, idx) => (
                    <div
                      key={idx}
                      style={{ width: w, height: '100%', backgroundColor: '#000000' }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 9,
                    color: '#000',
                    fontWeight: 700,
                  }}
                >
                  0 11110 00025 8
                </div>
              </div>
            </div>

            {/* Target Crosshairs & Tease Text */}
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
                  fontSize: 13,
                  color: THEME.colors.amber,
                  letterSpacing: '0.2em',
                }}
              >
                [ TARGET IDENTIFIED: JUNE 26, 1974 ]
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.story,
                  fontSize: 36,
                  color: THEME.colors.boneWhite,
                  fontWeight: 500,
                }}
              >
                The first product ever scanned: a pack of gum.
              </div>
            </div>

            {/* Scan Beam sweep over the gum */}
            <ScanBeam startFrame={315} duration={40} direction="horizontal" />
          </div>
        )}
      </CameraRig>
    </div>
  );
};
