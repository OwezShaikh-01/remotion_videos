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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 240 frames total (0:00 to 0:08)
  // Beat 1: 0 - 65 frames (0:00 - 0:02): "Look around you."
  // Beat 2: 60 - 205 frames (0:02 - 0:07): "Somewhere within arm's reach..."
  // Beat 3: 205 - 240 frames (0:07 - 0:08): "Probably several."

  // Beat 1: Stencil Title Reveal
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 85 },
  });

  const titleTracking = interpolate(frame, [0, 65], [8, 30], {
    extrapolateRight: 'clamp',
  });

  const titleFade = interpolate(frame, [45, 62], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2: Workbench Still Reveal & 2.5D Parallax
  const workbenchSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 20, mass: 1.2, stiffness: 70 },
  });

  // Laser Sweep (frames 65 - 195)
  const laserStart = 68;
  const laserDuration = 125;
  const laserProgress = interpolate(
    frame - laserStart,
    [0, laserDuration],
    [5, 95],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Targets telemetry pulse
  const target1Glow = interpolate(frame, [85, 110, 140], [0, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const target2Glow = interpolate(frame, [120, 145, 175], [0, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const target3Glow = interpolate(frame, [155, 180, 205], [0, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 3 Multiplication into Architectural Barcode Grid (frames 205 - 240)
  const multiplySpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 11, mass: 0.4, stiffness: 150 },
  });

  const fullBars = [
    6, 2, 9, 3, 2, 7, 14, 3, 2, 8, 4, 11, 2, 6, 9, 3, 16, 2, 7, 3, 10, 4, 2, 12,
    3, 7, 2, 9, 4, 14, 3, 6, 2, 8, 11, 3, 5, 9, 2, 7, 16, 3, 6, 2, 10, 4, 8, 2,
    13, 3, 6, 2, 9, 4, 12, 3, 5, 2, 7, 10, 3, 4, 8, 2, 6, 14, 3, 5, 2, 9,
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05070a',
        overflow: 'hidden',
      }}
    >
      <CameraRig durationInFrames={240} zoom={[1, 1.15]} driftIntensity={0.75}>
        <DustParticles count={50} color="rgba(242, 239, 230, 0.4)" />

        {/* ======================================================== */}
        {/* BEAT 1: "LOOK AROUND YOU." (Frames 0 - 65)               */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: titleFade,
            transform: `scale(${0.92 + titleSpring * 0.08})`,
            zIndex: 30,
          }}
        >
          {/* Subtle Technical Reticle Box */}
          <div
            style={{
              position: 'absolute',
              width: 960,
              height: 320,
              border: '1px solid rgba(242, 239, 230, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: 16,
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.sand }}>
              OPTICAL ACQUISITION // FIELD 01
            </span>
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 11, color: THEME.colors.sand }}>
              LATENCY: 0.00ms
            </span>
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              letterSpacing: '0.45em',
              color: THEME.colors.amber,
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            DOCUMENTARY ESSAY // ACT 01
          </div>

          <h1
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 98,
              fontWeight: 500,
              color: THEME.colors.boneWhite,
              letterSpacing: `${titleTracking}px`,
              textTransform: 'uppercase',
              textShadow: '0 0 60px rgba(245, 184, 74, 0.35), 0 10px 40px rgba(0,0,0,0.9)',
              margin: 0,
            }}
          >
            Look Around You
          </h1>

          <div
            style={{
              marginTop: 32,
              width: 100,
              height: 3,
              backgroundColor: THEME.colors.amber,
              boxShadow: `0 0 25px ${THEME.colors.amberGlow}`,
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* BEAT 2: PHOTOREALISTIC DOCUMENTARY WORKBENCH (Frames 60 - 205) */}
        {/* ======================================================== */}
        {frame >= 50 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(workbenchSpring, [0, 1], [0, 1]),
              transform: `scale(${1.08 - workbenchSpring * 0.08})`,
            }}
          >
            {/* Photorealistic Archival Still of Everyday Items on Workbench */}
            <Img
              src={staticFile('assets/workbench_still.jpg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.1) brightness(0.95)',
              }}
            />

            {/* Cinematic Chiaroscuro Shadow Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 7, 10, 0.8) 85%, #05070a 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Dynamic Laser Scanning Beam Slicing Across Table */}
            {frame >= laserStart && frame <= laserStart + laserDuration && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${laserProgress}%`,
                  width: 3,
                  backgroundColor: THEME.colors.signalRed,
                  boxShadow: `0 0 25px 5px ${THEME.colors.signalRedGlow}, 0 0 60px 12px rgba(255,77,61,0.7)`,
                  transform: 'translateX(-50%)',
                  zIndex: 25,
                }}
              >
                {/* Vertical Laser Flare Streak */}
                <div
                  style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 8,
                    height: 260,
                    background: `linear-gradient(to bottom, transparent, #ffffff 50%, transparent)`,
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            )}

            {/* Targeted Object HUD Telemetry Overlays */}
            {/* Target 1: Left Item (Coffee Mug / Beverage) */}
            <div
              style={{
                position: 'absolute',
                left: 380,
                top: 480,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: target1Glow,
                transform: `scale(${0.9 + target1Glow * 0.1})`,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(11, 13, 18, 0.88)',
                  border: `1px solid ${THEME.colors.signalRed}`,
                  padding: '6px 14px',
                  borderRadius: 4,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.boneWhite,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: THEME.colors.signalRed }} />
                <span>UPC: 0 41196 01012 4</span>
              </div>
            </div>

            {/* Target 2: Center Item (Book / Print) */}
            <div
              style={{
                position: 'absolute',
                left: 900,
                top: 440,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: target2Glow,
                transform: `scale(${0.9 + target2Glow * 0.1})`,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(11, 13, 18, 0.88)',
                  border: `1px solid ${THEME.colors.amber}`,
                  padding: '6px 14px',
                  borderRadius: 4,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.boneWhite,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: THEME.colors.amber }} />
                <span>ISBN: 978-0-262-51087-5</span>
              </div>
            </div>

            {/* Target 3: Right Item (Medicine / Packaging) */}
            <div
              style={{
                position: 'absolute',
                right: 380,
                top: 490,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                opacity: target3Glow,
                transform: `scale(${0.9 + target3Glow * 0.1})`,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(11, 13, 18, 0.88)',
                  border: `1px solid ${THEME.colors.coldBlue}`,
                  padding: '6px 14px',
                  borderRadius: 4,
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.boneWhite,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: THEME.colors.coldBlue }} />
                <span>NDC: 50580-496-01</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 3: "PROBABLY SEVERAL." (Frames 205 - 240)             */}
        {/* ======================================================== */}
        {frame >= 200 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              opacity: multiplySpring,
              transform: `scale(${1 + (1 - multiplySpring) * 0.25})`,
              zIndex: 80,
              backgroundColor: 'rgba(5, 7, 10, 0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {fullBars.map((width, idx) => {
              const isAccent = idx % 9 === 0;
              const barHeight = 880 + Math.sin(idx * 0.4) * 80;
              return (
                <div
                  key={idx}
                  style={{
                    width: width * 2,
                    height: barHeight,
                    backgroundColor: isAccent ? THEME.colors.amber : THEME.colors.boneWhite,
                    boxShadow: isAccent
                      ? `0 0 40px ${THEME.colors.amberGlow}`
                      : '0 0 15px rgba(242, 239, 230, 0.3)',
                    opacity: 0.95,
                  }}
                />
              );
            })}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
