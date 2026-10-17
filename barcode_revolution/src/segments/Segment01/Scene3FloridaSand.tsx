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

export const Scene3FloridaSand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 210 frames total (0:13 to 0:20)
  // Phase 1: 0 - 50 frames: Miami Beach Topographic Vector Contours & Archival Stamp
  // Phase 2: 50 - 150 frames: Morse Code (• — • —) literally stretches downward into bars
  // Phase 3: 150 - 210 frames: Caliper measurements & "The Ancestor of Every Barcode"

  const transitionFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Stretch animation of the 4 Morse elements
  const stretchSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, mass: 1.0, stiffness: 60 },
  });

  const barHeight = interpolate(stretchSpring, [0, 1], [30, 640]);

  // Coordinates & stamp reveal
  const stampSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 110 },
  });

  // The 4 Morse elements:
  // Dot 1: Thin (width: 14px)
  // Dash 1: Thick (width: 48px)
  // Dot 2: Thin (width: 14px)
  // Dash 2: Thick (width: 48px)
  const morseElements = [
    { x: 740, w: 14, label: 'DOT', symbol: '•', ratio: '1X THIN' },
    { x: 860, w: 48, label: 'DASH', symbol: '—', ratio: '3X THICK' },
    { x: 1000, w: 14, label: 'DOT', symbol: '•', ratio: '1X THIN' },
    { x: 1120, w: 48, label: 'DASH', symbol: '—', ratio: '3X THICK' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0907',
        overflow: 'hidden',
        opacity: transitionFade,
      }}
    >
      <CameraRig
        durationInFrames={210}
        zoom={[1, 1.1]}
        panX={[0, -20]}
        panY={[0, 10]}
        driftIntensity={0.6}
      >
        <DustParticles count={35} color="rgba(255, 220, 160, 0.35)" />

        {/* ======================================================== */}
        {/* TOPOGRAPHIC MIAMI BEACH VECTOR CONTOUR WAVES             */}
        {/* ======================================================== */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
          <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none">
            {[180, 320, 460, 600, 740, 880].map((y, i) => (
              <path
                key={i}
                d={`M -100 ${y} Q 400 ${y + 50 * Math.sin(frame * 0.02 + i)} 960 ${y - 30} T 2020 ${y + 20}`}
                stroke={THEME.colors.sand}
                strokeWidth="1.5"
                strokeDasharray="6 6"
                fill="none"
              />
            ))}
          </svg>
        </div>

        {/* ======================================================== */}
        {/* ARCHIVAL VECTOR STAMP & GEOLOCATION                     */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: stampSpring,
            transform: `scale(${0.9 + stampSpring * 0.1})`,
            zIndex: 20,
          }}
        >
          {/* Postmark Seal */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: `2px dashed ${THEME.colors.sand}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: THEME.colors.sand,
              transform: 'rotate(-10deg)',
              backgroundColor: 'rgba(28, 18, 9, 0.75)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>
              POSTAL RECORD
            </div>
            <div style={{ fontFamily: THEME.fonts.story, fontSize: 18, fontWeight: 700, margin: '4px 0' }}>
              MIAMI BEACH
            </div>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, fontWeight: 700, color: THEME.colors.amber }}>
              WINTER 1949
            </div>
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 12,
              color: THEME.colors.sandLight,
              letterSpacing: '0.15em',
              lineHeight: 1.6,
            }}
          >
            LAT/LON: 25.7907° N, 80.1300° W
            <br />
            INVENTOR: NORMAN JOSEPH WOODLAND
          </div>
        </div>

        {/* Large Historical Year Display */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 100,
            textAlign: 'right',
            opacity: stampSpring,
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 120,
              fontWeight: 800,
              color: THEME.colors.boneWhite,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textShadow: '0 0 50px rgba(245, 184, 74, 0.4)',
            }}
          >
            1949
          </div>
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              letterSpacing: '0.35em',
              color: THEME.colors.amber,
              textTransform: 'uppercase',
              marginTop: 10,
              fontWeight: 700,
            }}
          >
            The Sand Revelation
          </div>
        </div>

        {/* ======================================================== */}
        {/* THE MORSE-TO-BARS STRETCH MORPH (Frames 40 - 210)        */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 30,
          }}
        >
          {morseElements.map((elem, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: elem.x,
                top: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Morse Symbol Header */}
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 22,
                  fontWeight: 900,
                  color: THEME.colors.amber,
                  marginBottom: 16,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {elem.symbol}
              </div>

              {/* The Stretched Vertical Vector Bar */}
              <div
                style={{
                  width: elem.w,
                  height: barHeight,
                  backgroundColor: elem.w > 20 ? THEME.colors.amber : THEME.colors.boneWhite,
                  borderRadius: 2,
                  boxShadow:
                    elem.w > 20
                      ? `0 0 30px ${THEME.colors.amberGlow}`
                      : '0 0 15px rgba(242, 239, 230, 0.3)',
                }}
              />

              {/* Measurement Caliper Label (Frame 130+) */}
              {frame >= 125 && (
                <div
                  style={{
                    marginTop: 20,
                    fontFamily: THEME.fonts.mono,
                    fontSize: 12,
                    fontWeight: 700,
                    color: THEME.colors.sandLight,
                    backgroundColor: 'rgba(15, 12, 8, 0.9)',
                    border: '1px solid rgba(245, 184, 74, 0.3)',
                    padding: '6px 12px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    opacity: interpolate(frame, [125, 145], [0, 1]),
                  }}
                >
                  {elem.ratio}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Narrative Contextual Caption */}
        {frame >= 150 && (
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: THEME.fonts.story,
              fontSize: 38,
              fontStyle: 'italic',
              color: THEME.colors.sandLight,
              opacity: interpolate(frame, [150, 170], [0, 1]),
              zIndex: 40,
            }}
          >
            “Dots become thin lines. Dashes become thick ones.”
          </div>
        )}
      </CameraRig>
    </div>
  );
};
