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

export const Scene2Ubiquity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 150 frames total (0:08 to 0:13)
  // Phase 1: 0 - 80 frames: 10,000 counter roll-up & card fan
  // Phase 2: 80 - 150 frames: "You've never really looked" & macro zoom into ink line

  const counterProgress = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 85 },
  });

  const countValue = Math.floor(interpolate(counterProgress, [0, 1], [0, 10000]));

  // Micro zoom transition starting around frame 75
  const macroZoomSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const macroZoomScale = interpolate(macroZoomSpring, [0, 1], [1, 5.5]);
  const macroOpacity = interpolate(macroZoomSpring, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid gridSize={60} color="rgba(242, 239, 230, 0.05)" />

      <CameraRig
        durationInFrames={150}
        zoom={[1, 1.1]}
        panY={[0, -20]}
        driftIntensity={0.6}
      >
        {/* Phase 1: 10,000 Times Display */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1 - macroZoomSpring * 0.9,
          }}
        >
          {/* Fanning Barcode Cards in Background */}
          <div
            style={{
              position: 'absolute',
              width: 1200,
              height: 500,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              perspective: 1000,
            }}
          >
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((offset) => {
              const rotateZ = offset * 7;
              const translateX = offset * 110;
              const translateY = Math.abs(offset) * 25;
              const cardOpacity = 0.18 - Math.abs(offset) * 0.025;

              return (
                <div
                  key={offset}
                  style={{
                    position: 'absolute',
                    width: 220,
                    height: 320,
                    borderRadius: 12,
                    border: '1px solid rgba(242, 239, 230, 0.25)',
                    backgroundColor: 'rgba(18, 22, 30, 0.4)',
                    transform: `translate3d(${translateX}px, ${translateY}px, ${-Math.abs(offset) * 80}px) rotateZ(${rotateZ}deg)`,
                    opacity: cardOpacity,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 12,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 4,
                      height: 120,
                      alignItems: 'center',
                    }}
                  >
                    {[3, 1, 5, 2, 8, 2, 4, 1, 6, 3, 2, 5].map((w, i) => (
                      <div
                        key={i}
                        style={{
                          width: w,
                          height: '100%',
                          backgroundColor: THEME.colors.boneWhite,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Ticker */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 16,
              letterSpacing: '0.25em',
              color: THEME.colors.sand,
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            Subconscious Exposure Count
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 110,
              fontWeight: 700,
              color: THEME.colors.boneWhite,
              letterSpacing: '-0.04em',
              textShadow: `0 0 40px rgba(242, 239, 230, 0.25)`,
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
            }}
          >
            <span>{countValue.toLocaleString()}</span>
            <span
              style={{
                fontSize: 38,
                color: THEME.colors.amber,
                fontFamily: THEME.fonts.story,
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              times
            </span>
          </div>

          <div
            style={{
              marginTop: 20,
              fontFamily: THEME.fonts.story,
              fontSize: 28,
              color: THEME.colors.sandLight,
              fontStyle: 'italic',
              opacity: counterProgress,
            }}
          >
            “You’ve seen them everywhere.”
          </div>
        </div>

        {/* Phase 2: Macro Zoom into Ink & Paper (frame 75 to 150) */}
        {frame >= 70 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: macroOpacity,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${macroZoomScale})`,
            }}
          >
            {/* Extreme Close-up of Barcode Edge on Textured Paper */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
              <defs>
                <filter id="ink-bleed">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="14"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>

              {/* Fibrous Paper Canvas */}
              <rect width="1920" height="1080" fill="#131722" />

              {/* Microscopic Inky Black Bar */}
              <rect
                x="840"
                y="0"
                width="240"
                height="1080"
                fill="#000000"
                filter="url(#ink-bleed)"
              />

              {/* Laser Measurement Line */}
              <line
                x1="840"
                y1="540"
                x2="1080"
                y2="540"
                stroke={THEME.colors.signalRed}
                strokeWidth="3"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Micro HUD Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '55%',
                left: '52%',
                backgroundColor: 'rgba(11, 13, 18, 0.92)',
                border: `1px solid ${THEME.colors.sand}66`,
                padding: '12px 20px',
                borderRadius: 8,
                fontFamily: THEME.fonts.mono,
                fontSize: 13,
                color: THEME.colors.boneWhite,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ color: THEME.colors.amber, fontWeight: 700 }}>
                MICROSCOPIC INK BOUNDARY
              </div>
              <div style={{ color: THEME.colors.sand }}>
                MODULATION TOLERANCE: ±0.025 mm
              </div>
              <div>SURFACE: CORRUGATED CELLULOSE</div>
            </div>
          </div>
        )}

        {/* Phase 2 Punch Text: "You've never really looked." */}
        {frame >= 85 && (
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: THEME.fonts.story,
              fontSize: 48,
              fontWeight: 500,
              color: THEME.colors.boneWhite,
              letterSpacing: '-0.01em',
              textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            }}
          >
            You’ve never really looked.
          </div>
        )}
      </CameraRig>
    </div>
  );
};
