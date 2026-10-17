import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from 'remotion';
import { THEME } from '../../theme';
import { CameraRig } from '../../components/CameraRig';
import { DustParticles } from '../../components/DustParticles';
import { ScanBeam } from '../../components/ScanBeam';

export const Scene4TheChasm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 360 frames total (0:20 to 0:32)
  // Beat 1: 0 - 130 frames: 25 Years of Silence monumental timeline
  // Beat 2: 125 - 235 frames: Archival 1952 Patent Document ($15,000 Stamp)
  // Beat 3: 230 - 305 frames: Bernard Silver Archival 1950s Photographic Portrait
  // Beat 4: 300 - 360 frames: 1974 Wrigley's Juicy Fruit Pack Hero Shot & Laser

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

  // Beat 2: 1952 Patent Document Slam
  const patentSpring = spring({
    frame: frame - 125,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 105 },
  });

  const patentShake =
    frame >= 145 && frame <= 160
      ? Math.sin(frame * 3) * interpolate(frame, [145, 150, 160], [0, 8, 0])
      : 0;

  // Beat 3: Bernard Silver Memorial Portrait
  const portraitSpring = spring({
    frame: frame - 230,
    fps,
    config: { damping: 18, mass: 1.0, stiffness: 75 },
  });

  // Beat 4: Juicy Fruit Gum Pack Climax
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
        backgroundColor: '#05070a',
        overflow: 'hidden',
      }}
    >
      <CameraRig
        durationInFrames={360}
        zoom={[1, 1.12]}
        panX={[patentShake, 0]}
        panY={[patentShake * 0.5, -12]}
        driftIntensity={0.65}
      >
        <DustParticles count={45} color="rgba(242, 239, 230, 0.35)" />

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
                letterSpacing: '0.4em',
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
                fontSize: 92,
                fontWeight: 600,
                color: THEME.colors.boneWhite,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                transform: `scale(${0.92 + timelineSpring * 0.08})`,
                margin: 0,
                textShadow: '0 0 60px rgba(91, 141, 239, 0.3)',
              }}
            >
              25 Years of Nothing
            </h2>

            {/* Monumental Timeline Bar */}
            <div
              style={{
                width: 1040,
                marginTop: 48,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
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
                <span style={{ color: THEME.colors.boneWhite, fontSize: 36 }}>
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
                “The patent sat in drawers while the world waited for the laser.”
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 2: THE 1952 PATENT DOSSIER PHOTOGRAPH (Frames 125-235) */}
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
              transform: `scale(${0.88 + patentSpring * 0.12}) rotate(${
                -3 + patentSpring * 3
              }deg)`,
            }}
          >
            {/* Archival Photograph of the 1952 Patent Document */}
            <div
              style={{
                width: 1000,
                height: 680,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow:
                  '0 40px 120px rgba(0,0,0,0.95), 0 0 50px rgba(255, 77, 61, 0.25)',
                border: '1px solid rgba(242, 239, 230, 0.2)',
                position: 'relative',
              }}
            >
              <Img
                src={staticFile('assets/patent_1952.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.08) brightness(0.96)',
                }}
              />

              {/* Documentary Caption Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  backgroundColor: 'rgba(11, 13, 18, 0.92)',
                  border: `1px solid ${THEME.colors.signalRed}`,
                  padding: '10px 20px',
                  borderRadius: 6,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 13,
                  color: THEME.colors.boneWhite,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <div style={{ color: THEME.colors.signalRed, fontWeight: 800 }}>
                  US PATENT NO. 2,612,994 // OCT 7, 1952
                </div>
                <div>ASSIGNMENT CONSIDERATION: $15,000 USD (PHILCO CORP.)</div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 3: BERNARD SILVER ARCHIVAL PORTRAIT (Frames 230-305) */}
        {/* ======================================================== */}
        {frame >= 228 && frame < 310 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                frame > 298
                  ? interpolate(frame, [298, 308], [1, 0])
                  : interpolate(frame, [228, 240], [0, 1]),
              transform: `scale(${0.92 + portraitSpring * 0.08})`,
            }}
          >
            {/* Archival Memorial Framed Tribute */}
            <div
              style={{
                display: 'flex',
                gap: 50,
                alignItems: 'center',
                backgroundColor: 'rgba(12, 16, 24, 0.94)',
                border: '1px solid rgba(242, 239, 230, 0.2)',
                borderRadius: 16,
                padding: '48px 60px',
                boxShadow: '0 40px 120px rgba(0,0,0,0.95)',
                maxWidth: 1100,
              }}
            >
              {/* Archival Photograph of Bernard Silver */}
              <div
                style={{
                  width: 300,
                  height: 340,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: `3px solid ${THEME.colors.sand}`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(201, 166, 107, 0.25)',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile('assets/bernard_silver_portrait.jpg')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Memorial Typography */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 13,
                    letterSpacing: '0.3em',
                    color: THEME.colors.sand,
                    textTransform: 'uppercase',
                  }}
                >
                  In Memoriam // Co-Inventor
                </div>

                <h3
                  style={{
                    fontFamily: THEME.fonts.story,
                    fontSize: 56,
                    fontWeight: 700,
                    color: THEME.colors.boneWhite,
                    margin: 0,
                  }}
                >
                  Bernard Silver
                </h3>

                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 22,
                    color: THEME.colors.coldBlue,
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    marginBottom: 12,
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
                    lineHeight: 1.5,
                    maxWidth: 520,
                  }}
                >
                  “He overheard the question in a Drexel hallway in 1948. He died 12
                  years before the first product was ever scanned.”
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 4: 1974 WRIGLEY'S JUICY FRUIT GUM CLIMAX (300-360)  */}
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
            {/* Photorealistic Commercial Product Hero Shot */}
            <div
              style={{
                width: 1040,
                height: 580,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow:
                  '0 40px 120px rgba(0,0,0,0.95), 0 0 60px rgba(245, 184, 74, 0.4)',
                border: '1px solid rgba(245, 184, 74, 0.4)',
                position: 'relative',
                transform: `scale(${0.88 + gumSpring * 0.12})`,
              }}
            >
              <Img
                src={staticFile('assets/juicy_fruit_1974.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Telemetry Target Header Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  backgroundColor: 'rgba(11, 13, 18, 0.92)',
                  border: `1px solid ${THEME.colors.amber}`,
                  padding: '10px 20px',
                  borderRadius: 6,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 13,
                  color: THEME.colors.amber,
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
                }}
              >
                [ HISTORIC FIRST SCAN: JUNE 26, 1974 // 08:01 AM ]
              </div>

              {/* Lower Annotation Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(11, 13, 18, 0.9)',
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: '1px solid rgba(242, 239, 230, 0.15)',
                }}
              >
                <div style={{ fontFamily: THEME.fonts.story, fontSize: 24, color: THEME.colors.boneWhite, fontWeight: 600 }}>
                  10-Pack Wrigley&apos;s Juicy Fruit Chewing Gum
                </div>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.sand }}>
                  LOCATION: MARSH SUPERMARKET, TROY, OHIO
                </div>
              </div>
            </div>

            {/* Red Laser Sweep Across the Gum */}
            <ScanBeam startFrame={315} duration={42} direction="horizontal" />
          </div>
        )}
      </CameraRig>
    </div>
  );
};
