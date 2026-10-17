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
  // Phase 1: 0 - 75 frames: 3D Barcode Tunnel & Mechanical 10,000 Ticker
  // Phase 2: 75 - 150 frames: "You've never really looked" & Microscopic Cellular Ink Zoom

  // Counter spin
  const counterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 1.0, stiffness: 75 },
  });

  const countVal = Math.floor(interpolate(counterSpring, [0, 1], [0, 10000]));

  // Screen shake on 10,000 impact (frame 60 to 75)
  const shake =
    frame >= 58 && frame <= 75
      ? Math.sin(frame * 2.5) * interpolate(frame, [58, 65, 75], [0, 8, 0])
      : 0;

  // Violent Macro Zoom transition (starts frame 75)
  const macroSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 110 },
  });

  const macroScale = interpolate(macroSpring, [0, 1], [1, 9.5]);
  const tunnelOpacity = interpolate(macroSpring, [0, 0.4, 1], [1, 0.2, 0]);
  const macroOpacity = interpolate(macroSpring, [0, 0.2, 1], [0, 0.8, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#06070a',
        overflow: 'hidden',
      }}
    >
      <CameraRig
        durationInFrames={150}
        zoom={[1, 1.15]}
        panX={[shake, 0]}
        panY={[shake * 0.5, 0]}
        driftIntensity={0.8}
      >
        <DustParticles count={40} color="rgba(242, 239, 230, 0.3)" />

        {/* ======================================================== */}
        {/* PHASE 1: 3D BARCODE TUNNEL & MECHANICAL ODOMETER         */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: tunnelOpacity,
            perspective: 1200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Infinite 3D Barcode Panels Rushing Past */}
          {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((idx) => {
            const zOffset = ((idx * 280 + frame * 32) % 3000) - 1500;
            const xPos = Math.sin(idx * 0.9) * 750;
            const yPos = Math.cos(idx * 0.7) * 420;
            const cardOpacity = interpolate(zOffset, [-1200, -200, 800, 1400], [0, 0.4, 0.8, 0]);

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: 280,
                  height: 380,
                  transform: `translate3d(${xPos}px, ${yPos}px, ${zOffset}px) rotateY(${idx * 15}deg)`,
                  opacity: cardOpacity,
                  pointerEvents: 'none',
                  border: '1px solid rgba(242, 239, 230, 0.12)',
                  backgroundColor: 'rgba(15, 18, 26, 0.65)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 24,
                  filter: `blur(${Math.max(0, Math.abs(zOffset) * 0.003)}px)`,
                }}
              >
                {/* Barcode graphic on rushing panels */}
                <div style={{ display: 'flex', gap: 3, height: 160, alignItems: 'center' }}>
                  {[3, 1, 6, 2, 8, 2, 4, 1, 7, 3, 2, 5, 1, 8, 3, 2, 6, 4, 2].map((w, bi) => (
                    <div
                      key={bi}
                      style={{
                        width: w,
                        height: '100%',
                        backgroundColor: bi % 5 === 0 ? THEME.colors.amber : THEME.colors.boneWhite,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 10,
                    color: THEME.colors.sand,
                    marginTop: 16,
                    letterSpacing: '0.2em',
                  }}
                >
                  UPC-A RECOGNITION
                </div>
              </div>
            );
          })}

          {/* Central Mechanical Odometer Frame */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 30,
            }}
          >
            {/* HUD Upper Stamp */}
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
              <div style={{ width: 10, height: 10, backgroundColor: THEME.colors.amber, borderRadius: '50%' }} />
              SUBCONSCIOUS LIFETIME EXPOSURE
            </div>

            {/* Industrial Gunmetal Chassis */}
            <div
              style={{
                backgroundColor: '#11141c',
                border: '2px solid rgba(242, 239, 230, 0.25)',
                borderRadius: 16,
                padding: '24px 60px',
                boxShadow:
                  '0 30px 100px rgba(0,0,0,0.95), inset 0 2px 10px rgba(255,255,255,0.1), inset 0 -4px 15px rgba(0,0,0,0.8)',
                position: 'relative',
              }}
            >
              {/* Corner Screws */}
              <div style={{ position: 'absolute', top: 10, left: 12, width: 8, height: 8, borderRadius: '50%', background: '#444' }} />
              <div style={{ position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#444' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 12, width: 8, height: 8, borderRadius: '50%', background: '#444' }} />
              <div style={{ position: 'absolute', bottom: 10, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#444' }} />

              {/* Number Display */}
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 130,
                  fontWeight: 800,
                  color: THEME.colors.boneWhite,
                  letterSpacing: '0.04em',
                  textShadow: '0 0 50px rgba(242, 239, 230, 0.4)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 20,
                  lineHeight: 1,
                }}
              >
                <span>{countVal.toLocaleString()}</span>
                <span
                  style={{
                    fontSize: 44,
                    color: THEME.colors.amber,
                    fontFamily: THEME.fonts.story,
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  times
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                fontFamily: THEME.fonts.story,
                fontSize: 32,
                color: THEME.colors.sandLight,
                fontStyle: 'italic',
                opacity: 0.85,
              }}
            >
              “Every checkout, every pantry, every package.”
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PHASE 2: EXTREME MICROSCOPIC INK BOUNDARY ZOOM           */}
        {/* ======================================================== */}
        {frame >= 70 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: macroOpacity,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${macroScale})`,
              transformOrigin: '50% 50%',
              zIndex: 50,
            }}
          >
            {/* Microscopic Surface Texture SVG */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
              <defs>
                {/* Ragged microscopic ink absorption filter */}
                <filter id="ragged-ink">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.08"
                    numOctaves="5"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="32"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {/* Cardboard fiber texture */}
                <filter id="wood-pulp">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.35"
                    numOctaves="3"
                    result="grain"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0.3 0 0 0 0.85
                            0 0.28 0 0 0.80
                            0 0 0.24 0 0.70
                            0 0 0 1 0"
                  />
                  <feBlend mode="multiply" in="SourceGraphic" result="blend" />
                </filter>
              </defs>

              {/* Fibrous Cardboard Ground */}
              <rect width="1920" height="1080" fill="#e8dfce" filter="url(#wood-pulp)" />

              {/* Microscopic Ragged Ink Bar */}
              <rect
                x="800"
                y="-100"
                width="320"
                height="1280"
                fill="#000000"
                filter="url(#ragged-ink)"
              />

              {/* Laser Micrometer Measurement Line */}
              <line
                x1="800"
                y1="540"
                x2="1120"
                y2="540"
                stroke={THEME.colors.signalRed}
                strokeWidth="4"
                strokeDasharray="8 8"
              />
              <circle cx="800" cy="540" r="8" fill={THEME.colors.signalRed} />
              <circle cx="1120" cy="540" r="8" fill={THEME.colors.signalRed} />
            </svg>

            {/* Scientific Microscope Crosshair Reticle Overlay */}
            <div
              style={{
                position: 'absolute',
                width: 700,
                height: 700,
                borderRadius: '50%',
                border: '2px solid rgba(255, 77, 61, 0.4)',
                boxShadow: '0 0 0 9999px rgba(5, 7, 10, 0.85)',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(255, 77, 61, 0.3)' }} />
              <div style={{ position: 'absolute', height: '100%', width: 1, backgroundColor: 'rgba(255, 77, 61, 0.3)' }} />

              {/* Telemetry Annotations */}
              <div
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 40,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.amber,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  backgroundColor: 'rgba(11, 13, 18, 0.95)',
                  padding: '8px 14px',
                  borderRadius: 6,
                  border: '1px solid rgba(245, 184, 74, 0.3)',
                }}
              >
                <span>MAGNIFICATION: 450X</span>
                <span>BAR WIDTH: 0.330 mm (±0.012 mm)</span>
                <span>SUBSTRATE: UNBLEACHED KRAFT PAPER</span>
              </div>
            </div>
          </div>
        )}

        {/* Narrative Punch Line */}
        {frame >= 85 && (
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: THEME.fonts.story,
              fontSize: 54,
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
