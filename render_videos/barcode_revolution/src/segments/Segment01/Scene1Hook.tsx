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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 60 frames (0:00 - 0:02) "Look around you"
  // Phase 2: 60 - 210 frames (0:02 - 0:07) "Somewhere within arm's reach..."
  // Phase 3: 210 - 240 frames (0:07 - 0:08) "Probably several."

  // Camera drift
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 90 },
  });

  const headlineTracking = interpolate(frame, [0, 60], [2, 12], {
    extrapolateRight: 'clamp',
  });

  const headlineFadeOut = interpolate(frame, [50, 65], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Object reveals around frame 65
  const objectsSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 100 },
  });

  // Multiple barcode lines multiply at frame 200
  const multiplyProgress = spring({
    frame: frame - 200,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });

  // Barcode bar widths pattern
  const barPattern = [
    4, 2, 8, 3, 2, 6, 12, 3, 2, 7, 4, 10, 2, 5, 8, 3, 14, 2, 6, 3, 9, 4, 2, 11,
    3, 6, 2, 8, 4, 12, 3, 5, 2, 7, 10, 3, 4, 8, 2, 6, 14, 3, 5, 2, 9,
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid gridSize={80} color="rgba(242, 239, 230, 0.04)" />

      <CameraRig durationInFrames={240} zoom={[1, 1.08]} driftIntensity={0.8}>
        {/* Phase 1: Center typography "LOOK AROUND YOU." */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: headlineFadeOut,
            transform: `scale(${0.92 + headlineSpring * 0.08})`,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              letterSpacing: '0.3em',
              color: THEME.colors.sand,
              marginBottom: 16,
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            [ Observation Sequence 01 ]
          </div>
          <h1
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 82,
              fontWeight: 400,
              color: THEME.colors.boneWhite,
              letterSpacing: `${headlineTracking}px`,
              textTransform: 'uppercase',
            }}
          >
            Look Around You
          </h1>
          <div
            style={{
              marginTop: 20,
              width: 60,
              height: 2,
              backgroundColor: THEME.colors.amber,
              opacity: headlineSpring,
            }}
          />
        </div>

        {/* Phase 2: Everyday Objects with Barcodes (frames 60 - 210) */}
        {frame >= 55 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: Math.min(objectsSpring, 1 - multiplyProgress * 0.9),
            }}
          >
            {/* Tech Radar Hud */}
            <div
              style={{
                position: 'absolute',
                top: 80,
                left: 120,
                fontFamily: THEME.fonts.mono,
                fontSize: 13,
                color: THEME.colors.sand,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                letterSpacing: '0.15em',
              }}
            >
              <span>PROXIMITY_SCAN: ACTIVE</span>
              <span style={{ color: THEME.colors.boneWhite }}>RADIUS: ARM_LENGTH (0.75m)</span>
              <span>PATTERNS_DETECTED: &gt; 3</span>
            </div>

            {/* Object 1: Coffee Cup (Left) */}
            <div
              style={{
                position: 'absolute',
                left: 260,
                top: 340,
                width: 320,
                height: 420,
                borderRadius: 16,
                border: '1px solid rgba(242, 239, 230, 0.1)',
                backgroundColor: 'rgba(18, 22, 30, 0.65)',
                backdropFilter: 'blur(12px)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                transform: `translateY(${(1 - objectsSpring) * 60}px)`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.sand,
                  letterSpacing: '0.1em',
                }}
              >
                <span>ITEM #01</span>
                <span>BEVERAGE</span>
              </div>

              {/* Geometric Minimal Cup SVG */}
              <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
                <path
                  d="M25 35 L115 35 L100 155 L40 155 Z"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <ellipse
                  cx="70"
                  cy="35"
                  rx="45"
                  ry="10"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                <ellipse
                  cx="70"
                  cy="155"
                  rx="30"
                  ry="6"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                {/* Embedded Barcode on Cup */}
                <g transform="translate(45, 80)">
                  <rect x="0" y="0" width="2" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="4" y="0" width="4" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="11" y="0" width="1" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="14" y="0" width="6" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="23" y="0" width="3" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="28" y="0" width="5" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="36" y="0" width="2" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="41" y="0" width="6" height="40" fill={THEME.colors.boneWhite} />
                  <rect x="50" y="0" width="2" height="40" fill={THEME.colors.boneWhite} />
                </g>
              </svg>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 12,
                  color: THEME.colors.amber,
                  letterSpacing: '0.1em',
                }}
              >
                0 41196 01012 4
              </div>
            </div>

            {/* Object 2: Book / Publication (Center) */}
            <div
              style={{
                position: 'absolute',
                left: 800,
                top: 280,
                width: 340,
                height: 480,
                borderRadius: 16,
                border: `1px solid ${THEME.colors.amber}44`,
                backgroundColor: 'rgba(22, 26, 36, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 30px ${THEME.colors.amber}11`,
                transform: `translateY(${(1 - objectsSpring) * 80}px) scale(1.04)`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.amber,
                  letterSpacing: '0.1em',
                }}
              >
                <span>ITEM #02</span>
                <span>PUBLICATION</span>
              </div>

              {/* Book Spine Wireframe */}
              <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
                <rect
                  x="20"
                  y="20"
                  width="140"
                  height="180"
                  rx="6"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <line
                  x1="35"
                  y1="20"
                  x2="35"
                  y2="200"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                {/* Barcode Box */}
                <rect
                  x="50"
                  y="120"
                  width="95"
                  height="65"
                  fill="#ffffff"
                  rx="3"
                />
                {/* Crisp Barcode Lines */}
                <g transform="translate(56, 128)">
                  <rect x="0" y="0" width="2" height="40" fill="#000" />
                  <rect x="4" y="0" width="3" height="40" fill="#000" />
                  <rect x="9" y="0" width="1" height="40" fill="#000" />
                  <rect x="12" y="0" width="5" height="40" fill="#000" />
                  <rect x="20" y="0" width="2" height="40" fill="#000" />
                  <rect x="24" y="0" width="6" height="40" fill="#000" />
                  <rect x="33" y="0" width="2" height="40" fill="#000" />
                  <rect x="37" y="0" width="4" height="40" fill="#000" />
                  <rect x="44" y="0" width="1" height="40" fill="#000" />
                  <rect x="48" y="0" width="7" height="40" fill="#000" />
                  <rect x="58" y="0" width="3" height="40" fill="#000" />
                  <rect x="64" y="0" width="5" height="40" fill="#000" />
                  <rect x="72" y="0" width="2" height="40" fill="#000" />
                  <rect x="76" y="0" width="6" height="40" fill="#000" />
                </g>
              </svg>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 13,
                  color: THEME.colors.boneWhite,
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                }}
              >
                ISBN 978-0-262-51087-5
              </div>
            </div>

            {/* Object 3: Medicine / Pharma Bottle (Right) */}
            <div
              style={{
                position: 'absolute',
                right: 260,
                top: 340,
                width: 320,
                height: 420,
                borderRadius: 16,
                border: '1px solid rgba(242, 239, 230, 0.1)',
                backgroundColor: 'rgba(18, 22, 30, 0.65)',
                backdropFilter: 'blur(12px)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                transform: `translateY(${(1 - objectsSpring) * 60}px)`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: THEME.fonts.mono,
                  fontSize: 11,
                  color: THEME.colors.sand,
                  letterSpacing: '0.1em',
                }}
              >
                <span>ITEM #03</span>
                <span>PACKAGING</span>
              </div>

              {/* Cylindrical Bottle Outline */}
              <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                <rect
                  x="40"
                  y="20"
                  width="40"
                  height="25"
                  rx="4"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <rect
                  x="20"
                  y="45"
                  width="80"
                  height="120"
                  rx="10"
                  stroke={THEME.colors.boneWhite}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                {/* Vertical Barcode */}
                <g transform="translate(35, 75)">
                  <rect x="0" y="0" width="3" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="5" y="0" width="1" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="8" y="0" width="6" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="17" y="0" width="2" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="22" y="0" width="5" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="30" y="0" width="2" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="35" y="0" width="7" height="45" fill={THEME.colors.boneWhite} />
                  <rect x="45" y="0" width="3" height="45" fill={THEME.colors.boneWhite} />
                </g>
              </svg>

              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: 12,
                  color: THEME.colors.sand,
                  letterSpacing: '0.1em',
                }}
              >
                NDC 50580-496-01
              </div>
            </div>
          </div>
        )}

        {/* Laser Sweep across screen (frame 70 to 180) */}
        <ScanBeam startFrame={70} duration={110} direction="horizontal" />

        {/* Phase 3: Multiplication into a Forest of Lines (frame 200 - 240) */}
        {frame >= 195 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 14,
              opacity: multiplyProgress,
              transform: `scale(${1 + (1 - multiplyProgress) * 0.2})`,
            }}
          >
            {barPattern.map((width, idx) => (
              <div
                key={idx}
                style={{
                  width: width * 2,
                  height: 700,
                  backgroundColor:
                    idx % 7 === 0 ? THEME.colors.amber : THEME.colors.boneWhite,
                  opacity: 0.9,
                  boxShadow:
                    idx % 7 === 0
                      ? `0 0 20px ${THEME.colors.amberGlow}`
                      : '0 0 10px rgba(242, 239, 230, 0.2)',
                }}
              />
            ))}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
