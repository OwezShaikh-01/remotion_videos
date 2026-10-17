import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { THEME } from '../../theme';
import { CameraRig } from '../../components/CameraRig';

export const Scene3FloridaSand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 210 frames total (0:13 to 0:20)
  // Phase 1: 0 - 50: Transition to warm beach sand & coordinates
  // Phase 2: 50 - 160: Hand fingers carving furrows into the sand
  // Phase 3: 160 - 210: Full overhead view of the first pattern in the sand

  const transitionFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const carveProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 20, mass: 1.2, stiffness: 60 },
  });

  const furrowLength = interpolate(carveProgress, [0, 1], [0, 620]);

  // Coordinates fade-in
  const hudSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 100 },
  });

  // Four grooves carved by fingers in the sand
  const furrows = [
    { x: 760, width: 8, depth: 0.8 },
    { x: 840, width: 22, depth: 1.0 },
    { x: 940, width: 10, depth: 0.85 },
    { x: 1040, width: 28, depth: 1.1 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#1b1713',
        overflow: 'hidden',
        opacity: transitionFade,
      }}
    >
      <CameraRig
        durationInFrames={210}
        zoom={[1, 1.06]}
        panX={[0, 15]}
        driftIntensity={0.5}
      >
        {/* Sand Texture Canvas */}
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          <defs>
            {/* Sand Grain Turbulence */}
            <filter id="sand-texture">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.7"
                numOctaves="3"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="0.2 0 0 0 0.78
                        0 0.2 0 0 0.65
                        0 0 0.2 0 0.42
                        0 0 0 1 0"
              />
              <feBlend mode="multiply" in="SourceGraphic" result="blend" />
            </filter>

            {/* Furrow Shadow Gradient */}
            <linearGradient id="furrow-shadow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#432f17" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#21160a" stopOpacity="1" />
              <stop offset="100%" stopColor="#432f17" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Warm Beach Sand Base */}
          <rect
            width="1920"
            height="1080"
            fill={THEME.colors.sand}
            filter="url(#sand-texture)"
          />

          {/* Subtle wave ripple marks */}
          <path
            d="M-50 200 Q400 240 960 210 T1970 230"
            stroke="#b59057"
            strokeWidth="6"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M-50 480 Q500 520 1100 490 T1970 510"
            stroke="#b59057"
            strokeWidth="8"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M-50 780 Q450 820 1050 770 T1970 800"
            stroke="#b59057"
            strokeWidth="7"
            fill="none"
            opacity="0.4"
          />

          {/* Furrows carved by Woodland's fingers */}
          {furrows.map((f, i) => (
            <g key={i}>
              {/* Soft displaced sand ridge highlights */}
              <rect
                x={f.x - f.width / 2 - 4}
                y={220}
                width={f.width + 8}
                height={furrowLength}
                rx={f.width / 2}
                fill="#f0dcbe"
                opacity="0.55"
              />
              {/* Deep carved trench shadow */}
              <rect
                x={f.x - f.width / 2}
                y={220}
                width={f.width}
                height={furrowLength}
                rx={f.width / 2}
                fill="url(#furrow-shadow)"
              />
            </g>
          ))}
        </svg>

        {/* Archival Year Stamp & Technical Coordinates */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            left: 120,
            fontFamily: THEME.fonts.mono,
            fontSize: 14,
            color: '#362411',
            letterSpacing: '0.15em',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            opacity: hudSpring,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                backgroundColor: '#362411',
                color: THEME.colors.sandLight,
                padding: '4px 10px',
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              ORIGIN NOTE
            </span>
            <span style={{ fontWeight: 600 }}>MIAMI BEACH, FLORIDA</span>
          </div>
          <div>COORDINATES: 25.7907° N, 80.1300° W</div>
          <div>INVENTOR: NORMAN JOSEPH WOODLAND</div>
        </div>

        {/* Prominent Historical Year Counter */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 120,
            textAlign: 'right',
            opacity: hudSpring,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 104,
              fontWeight: 700,
              color: '#281a0b',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            1949
          </div>
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              letterSpacing: '0.2em',
              color: '#52381a',
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            The First Sand Sketch
          </div>
        </div>

        {/* Contextual Narrative Text */}
        {frame >= 70 && (
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: THEME.fonts.story,
              fontSize: 42,
              fontStyle: 'italic',
              color: '#21160a',
              textShadow: '0 1px 8px rgba(242, 239, 230, 0.4)',
            }}
          >
            Four fingers pulled through wet sand.
          </div>
        )}
      </CameraRig>
    </div>
  );
};
