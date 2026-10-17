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

export const Scene2Ubiquity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 150 frames total (0:08 to 0:13)
  // Phase 1: 0 - 80 frames: Precision Optical Dial & 10,000 Counter
  // Phase 2: 80 - 150 frames: "You've never really looked" & Binary Code Vector Micro-Zoom

  // Counter roll
  const counterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 1.0, stiffness: 80 },
  });

  const countVal = Math.floor(interpolate(counterSpring, [0, 1], [0, 10000]));

  // Screen shake on 10,000 impact (frame 60 to 75)
  const shake =
    frame >= 58 && frame <= 74
      ? Math.sin(frame * 2.8) * interpolate(frame, [58, 64, 74], [0, 10, 0])
      : 0;

  // Macro Dive (starts frame 75)
  const diveSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  const diveScale = interpolate(diveSpring, [0, 1], [1, 8.5]);
  const phase1Opacity = interpolate(diveSpring, [0, 0.4, 1], [1, 0.2, 0]);
  const phase2Opacity = interpolate(diveSpring, [0, 0.2, 1], [0, 0.8, 1]);

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
        durationInFrames={150}
        zoom={[1, 1.15]}
        panX={[shake, 0]}
        panY={[shake * 0.5, 0]}
        driftIntensity={0.65}
      >
        <DustParticles count={35} color="rgba(242, 239, 230, 0.25)" />

        {/* ======================================================== */}
        {/* PHASE 1: KINETIC OPTICAL DIAL & 10,000 COUNTER (0 - 80)  */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: phase1Opacity,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Rotating Vector Calibration Rings */}
          <svg
            width="1000"
            height="1000"
            viewBox="0 0 1000 1000"
            style={{
              position: 'absolute',
              transform: `rotate(${frame * 0.4}deg)`,
            }}
          >
            <circle cx="500" cy="500" r="440" stroke="rgba(242, 239, 230, 0.12)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
            <circle cx="500" cy="500" r="380" stroke="rgba(245, 184, 74, 0.25)" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
            <circle cx="500" cy="500" r="300" stroke="rgba(91, 141, 239, 0.2)" strokeWidth="1" fill="none" />
            
            {/* 360-degree Radial Ticks */}
            {Array.from({ length: 72 }).map((_, i) => (
              <line
                key={i}
                x1="500"
                y1="70"
                x2="500"
                y2={i % 6 === 0 ? "95" : "82"}
                stroke={i % 6 === 0 ? THEME.colors.amber : "rgba(242, 239, 230, 0.25)"}
                strokeWidth={i % 6 === 0 ? "2" : "1"}
                transform={`rotate(${i * 5} 500 500)`}
              />
            ))}
          </svg>

          {/* Central Monumental Ticker Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: 14,
                letterSpacing: '0.4em',
                color: THEME.colors.sand,
                marginBottom: 16,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 8, height: 8, backgroundColor: THEME.colors.amber, borderRadius: '50%' }} />
              SUBCONSCIOUS LIFETIME EXPOSURE
            </div>

            {/* Giant Monospace Digits */}
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: 140,
                fontWeight: 800,
                color: THEME.colors.boneWhite,
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                display: 'flex',
                alignItems: 'baseline',
                gap: 24,
                textShadow: '0 0 60px rgba(242, 239, 230, 0.4)',
              }}
            >
              <span>{countVal.toLocaleString()}</span>
              <span
                style={{
                  fontSize: 50,
                  fontFamily: THEME.fonts.story,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: THEME.colors.amber,
                }}
              >
                times
              </span>
            </div>

            <div
              style={{
                marginTop: 28,
                fontFamily: THEME.fonts.story,
                fontSize: 32,
                color: THEME.colors.sandLight,
                fontStyle: 'italic',
                opacity: 0.85,
              }}
            >
              “Every store shelf, every pantry, every package.”
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PHASE 2: BINARY VECTOR ANATOMY MICRO-ZOOM (80 - 150)     */}
        {/* ======================================================== */}
        {frame >= 70 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: phase2Opacity,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${diveScale})`,
              transformOrigin: '50% 50%',
              zIndex: 40,
            }}
          >
            {/* Pure Mathematical Barcode Anatomy SVG */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
              {/* Massive Center Vector Bars */}
              <rect x="760" y="-200" width="160" height="1480" fill="#ffffff" />
              <rect x="1000" y="-200" width="160" height="1480" fill="#ffffff" />
              <rect x="620" y="-200" width="80" height="1480" fill="#ffffff" opacity="0.5" />
              <rect x="1220" y="-200" width="80" height="1480" fill="#ffffff" opacity="0.5" />

              {/* Binary Code Annotations */}
              <g transform="translate(960, 540)">
                {/* Center Caliper Measurement Arrow */}
                <line x1="-120" y1="0" x2="120" y2="0" stroke={THEME.colors.signalRed} strokeWidth="4" />
                <polygon points="-120,-8 -120,8 -135,0" fill={THEME.colors.signalRed} />
                <polygon points="120,-8 120,8 135,0" fill={THEME.colors.signalRed} />
              </g>
            </svg>

            {/* Binary Modulator HUD */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(7, 8, 12, 0.95)',
                border: `1px solid ${THEME.colors.signalRed}`,
                padding: '16px 28px',
                borderRadius: 8,
                boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 28,
                  fontWeight: 800,
                  color: THEME.colors.signalRed,
                  letterSpacing: '0.2em',
                }}
              >
                1 0 1 0 0 0 1 1
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 12,
                  color: THEME.colors.sand,
                  letterSpacing: '0.15em',
                }}
              >
                BINARY ENCODING // 1 MODULE = 0.330 mm
              </div>
            </div>
          </div>
        )}

        {/* Narrative Punch Line */}
        {frame >= 85 && (
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: THEME.fonts.story,
              fontSize: 56,
              fontWeight: 600,
              color: THEME.colors.boneWhite,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 30px rgba(0,0,0,0.95)',
              zIndex: 90,
            }}
          >
            You’ve never really looked.
          </div>
        )}
      </CameraRig>
    </div>
  );
};
