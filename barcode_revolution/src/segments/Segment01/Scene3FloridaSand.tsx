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
  // Phase 1: 0 - 45 frames: Warm beach transition & archival GPS postmark
  // Phase 2: 45 - 165 frames: Hand drags four fingers through sand carving trenches
  // Phase 3: 165 - 210 frames: Morse code bars alignment & ancestor revelation

  const transitionFade = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Furrow carving motion
  const carveSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 22, mass: 1.4, stiffness: 55 },
  });

  const furrowLength = interpolate(carveSpring, [0, 1], [0, 680]);

  // Hand position tracking the head of the furrows
  const handY = 180 + furrowLength;

  // Stamp appearance
  const stampSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  // Four furrows representing Morse Code dots and dashes:
  // Dot (thin: 10px), Dash (thick: 36px), Dot (thin: 12px), Dash (thick: 42px)
  const furrows = [
    { x: 740, width: 12, label: 'DOT (•)', code: '1X' },
    { x: 840, width: 38, label: 'DASH (—)', code: '3X' },
    { x: 960, width: 14, label: 'DOT (•)', code: '1X' },
    { x: 1080, width: 44, label: 'DASH (—)', code: '3X' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#1c150c',
        overflow: 'hidden',
        opacity: transitionFade,
      }}
    >
      <CameraRig
        durationInFrames={210}
        zoom={[1, 1.08]}
        panX={[0, -20]}
        panY={[0, 15]}
        driftIntensity={0.6}
      >
        <DustParticles count={35} color="rgba(255, 230, 180, 0.4)" />

        {/* Ambient Warm Golden Hour Sun Flare */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 900,
            height: 900,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255, 200, 110, 0.28) 0%, rgba(201, 166, 107, 0.1) 50%, transparent 75%)',
            pointerEvents: 'none',
          }}
        />

        {/* ======================================================== */}
        {/* TACTILE BEACH SAND CANVAS                                */}
        {/* ======================================================== */}
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          <defs>
            {/* Granular wet sand texture */}
            <filter id="beach-sand">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="4"
                result="sandNoise"
              />
              <feColorMatrix
                type="matrix"
                values="0.25 0 0 0 0.82
                        0 0.22 0 0 0.68
                        0 0 0.16 0 0.44
                        0 0 0 1 0"
              />
              <feBlend mode="multiply" in="SourceGraphic" result="sandBlend" />
            </filter>

            {/* Trench deep shadow gradient */}
            <linearGradient id="trench-depth" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b250d" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#1e1104" stopOpacity="1" />
              <stop offset="70%" stopColor="#1e1104" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b250d" stopOpacity="0.9" />
            </linearGradient>

            {/* Specular damp wet sand reflection inside trenches */}
            <linearGradient id="wet-reflect" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Wet Sand Base */}
          <rect
            width="1920"
            height="1080"
            fill={THEME.colors.sand}
            filter="url(#beach-sand)"
          />

          {/* Ocean Wave Wash Foam in Upper Left Corner */}
          <g opacity="0.45">
            <path
              d="M-50 140 Q400 180 960 130 T1980 160"
              stroke="#ffffff"
              strokeWidth="12"
              fill="none"
              filter="blur(3px)"
            />
            <path
              d="M-50 145 Q400 185 960 135 T1980 165"
              stroke="#e8f4f8"
              strokeWidth="4"
              fill="none"
            />
          </g>

          {/* The Four Furrows Carved by Woodland's Fingers */}
          {furrows.map((f, i) => (
            <g key={i}>
              {/* Outer raised displaced sand ridge highlight */}
              <rect
                x={f.x - f.width / 2 - 8}
                y={180}
                width={f.width + 16}
                height={furrowLength}
                rx={f.width / 2 + 4}
                fill="#fcedd7"
                opacity="0.65"
                filter="blur(2px)"
              />
              {/* Deep carved dark trench shadow */}
              <rect
                x={f.x - f.width / 2}
                y={180}
                width={f.width}
                height={furrowLength}
                rx={f.width / 2}
                fill="url(#trench-depth)"
              />
              {/* Wet glistening specular highlight inside trench */}
              <line
                x1={f.x - f.width / 4}
                y1={180}
                x2={f.x - f.width / 4}
                y2={180 + furrowLength}
                stroke="url(#wet-reflect)"
                strokeWidth={Math.max(2, f.width / 6)}
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Hand Silhouette Drawing in Sand (Visible during carving) */}
          {frame >= 35 && frame <= 170 && (
            <g transform={`translate(910, ${handY})`}>
              {/* Soft hand shadow on sand */}
              <ellipse cx="0" cy="40" rx="220" ry="60" fill="rgba(30, 17, 4, 0.45)" filter="blur(14px)" />
              {/* Stylized Four Fingers Tip Silhouette */}
              {[-170, -70, 50, 170].map((fingerX, fi) => (
                <circle
                  key={fi}
                  cx={fingerX}
                  cy="0"
                  r="14"
                  fill="#452a12"
                  opacity="0.85"
                />
              ))}
            </g>
          )}
        </svg>

        {/* ======================================================== */}
        {/* ARCHIVAL VINTAGE POSTMARK & HISTORICAL CONTEXT           */}
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
          }}
        >
          {/* Postmark Circular Stamp */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: '3px dashed #402812',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#402812',
              transform: 'rotate(-12deg)',
            }}
          >
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 10, letterSpacing: '0.15em', fontWeight: 700 }}>
              POSTAL RECORD
            </div>
            <div style={{ fontFamily: THEME.fonts.story, fontSize: 18, fontWeight: 700, margin: '4px 0' }}>
              MIAMI BEACH
            </div>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 12, fontWeight: 700 }}>
              DEC 1949
            </div>
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 13,
              color: '#38220f',
              letterSpacing: '0.15em',
              fontWeight: 600,
            }}
          >
            COORDINATES: 25.7907° N, 80.1300° W
            <br />
            INVENTOR: NORMAN JOSEPH WOODLAND
          </div>
        </div>

        {/* Large Archival Year Marker */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 110,
            textAlign: 'right',
            opacity: stampSpring,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 115,
              fontWeight: 800,
              color: '#261608',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            1949
          </div>
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 14,
              letterSpacing: '0.3em',
              color: '#4a2d12',
              textTransform: 'uppercase',
              marginTop: 10,
              fontWeight: 700,
            }}
          >
            The Sand Revelation
          </div>
        </div>

        {/* ======================================================== */}
        {/* MORSE CODE TO BARS ANNOTATION (Frame 160+)                */}
        {/* ======================================================== */}
        {frame >= 155 && (
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 40,
              opacity: interpolate(frame, [155, 175], [0, 1]),
            }}
          >
            {furrows.map((f, i) => (
              <div
                key={i}
                style={{
                  width: 140,
                  backgroundColor: 'rgba(28, 18, 9, 0.85)',
                  border: '1px solid rgba(252, 237, 215, 0.4)',
                  padding: '10px 16px',
                  borderRadius: 6,
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: THEME.colors.amber,
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 11,
                    color: THEME.colors.boneWhite,
                    marginTop: 4,
                  }}
                >
                  WIDTH: {f.code}
                </div>
              </div>
            ))}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
