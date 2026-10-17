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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 240 frames total (0:00 to 0:08)
  // Beat 1: 0 - 65 frames (0:00 - 0:02): Single vibrating line & "LOOK AROUND YOU."
  // Beat 2: 60 - 205 frames (0:02 - 0:07): Line bifurcates into isometric wireframe objects with barcodes & laser sweep
  // Beat 3: 205 - 240 frames (0:07 - 0:08): "Probably several." Kinetic soundwave barcode explosion

  // Beat 1 Line Draw & Vibration
  const lineDraw = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 90 },
  });

  const titleTracking = interpolate(frame, [10, 65], [6, 28], {
    extrapolateRight: 'clamp',
  });

  const titleFade = interpolate(frame, [48, 64], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2 Objects Entrance & Line Bifurcation
  const objectsSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 18, mass: 1.0, stiffness: 85 },
  });

  // Laser Sweep (frames 70 - 195)
  const laserProgress = interpolate(frame - 70, [0, 120], [0, 1920], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Barcode Highlights upon laser contact
  const laserActive = frame >= 70 && frame <= 195;

  // Beat 3 Multiplication (205 - 240 frames)
  const multiplySpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 12, mass: 0.4, stiffness: 160 },
  });

  // Barcode rhythm pattern
  const bars = [
    { w: 3, h: 520, accent: false },
    { w: 1, h: 480, accent: false },
    { w: 7, h: 560, accent: false },
    { w: 2, h: 490, accent: false },
    { w: 12, h: 620, accent: true },
    { w: 3, h: 510, accent: false },
    { w: 6, h: 540, accent: false },
    { w: 2, h: 470, accent: false },
    { w: 14, h: 650, accent: true },
    { w: 4, h: 530, accent: false },
    { w: 2, h: 490, accent: false },
    { w: 9, h: 580, accent: false },
    { w: 3, h: 500, accent: false },
    { w: 16, h: 670, accent: true },
    { w: 2, h: 460, accent: false },
    { w: 8, h: 550, accent: false },
    { w: 4, h: 520, accent: false },
    { w: 11, h: 610, accent: false },
    { w: 2, h: 480, accent: false },
    { w: 6, h: 540, accent: false },
    { w: 14, h: 660, accent: true },
    { w: 3, h: 500, accent: false },
    { w: 7, h: 560, accent: false },
    { w: 2, h: 470, accent: false },
    { w: 10, h: 590, accent: false },
    { w: 5, h: 530, accent: false },
    { w: 2, h: 480, accent: false },
    { w: 13, h: 640, accent: true },
    { w: 3, h: 510, accent: false },
    { w: 8, h: 570, accent: false },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07080c',
        overflow: 'hidden',
      }}
    >
      <CameraRig durationInFrames={240} zoom={[1, 1.14]} driftIntensity={0.7}>
        <DustParticles count={35} color="rgba(242, 239, 230, 0.3)" />

        {/* Dynamic Vector Coordinate Grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid-dots" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.5" fill={THEME.colors.boneWhite} />
                <path d="M 0 40 L 80 40 M 40 0 L 40 80" stroke="rgba(242, 239, 230, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-dots)" />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* BEAT 1: THE INITIAL VIBRATING LINE & TITLE (Frames 0-65) */}
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
            zIndex: 30,
          }}
        >
          {/* Elastic Drawing Horizontal Line with Sound Wave Ripples */}
          <div
            style={{
              position: 'absolute',
              width: `${lineDraw * 1200}px`,
              height: 2,
              backgroundColor: THEME.colors.amber,
              boxShadow: `0 0 25px ${THEME.colors.amberGlow}`,
            }}
          />

          <div
            style={{
              transform: `scale(${0.9 + titleSpring * 0.1})`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: 13,
                letterSpacing: '0.45em',
                color: THEME.colors.amber,
                marginBottom: 20,
                textTransform: 'uppercase',
              }}
            >
              [ INITIAL OBSERVATION ]
            </div>

            <h1
              style={{
                fontFamily: THEME.fonts.story,
                fontSize: 100,
                fontWeight: 600,
                color: THEME.colors.boneWhite,
                letterSpacing: `${titleTracking}px`,
                textTransform: 'uppercase',
                textShadow: '0 0 50px rgba(245, 184, 74, 0.35)',
                margin: 0,
              }}
            >
              Look Around You
            </h1>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BEAT 2: BIFURCATION INTO VECTOR OBJECTS (Frames 60-205)  */}
        {/* ======================================================== */}
        {frame >= 55 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(objectsSpring, [0, 1], [0, 1]),
              transform: `scale(${0.92 + objectsSpring * 0.08})`,
            }}
          >
            {/* Top Telemetry Header */}
            <div
              style={{
                position: 'absolute',
                top: 70,
                left: 100,
                right: 100,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: THEME.fonts.mono,
                fontSize: 12,
                color: THEME.colors.sand,
                letterSpacing: '0.2em',
                borderBottom: '1px solid rgba(242, 239, 230, 0.1)',
                paddingBottom: 14,
              }}
            >
              <span>SYS // PROXIMITY_FIELD_SCAN</span>
              <span style={{ color: THEME.colors.boneWhite }}>RADIUS: ARM&apos;S REACH (0.8m)</span>
              <span>PATTERNS IDENTIFIED: [03]</span>
            </div>

            {/* THREE BESPOKE ISOMETRIC VECTOR OBJECTS WITH EMBEDDED BARCODES */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 140,
              }}
            >
              {/* OBJECT 1: BEVERAGE CANISTER / CUP */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  transform: 'translateY(20px)',
                }}
              >
                <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
                  <defs>
                    <linearGradient id="cup-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1e2430" />
                      <stop offset="50%" stopColor="#2b3345" />
                      <stop offset="100%" stopColor="#151922" />
                    </linearGradient>
                  </defs>
                  {/* Cylinder Body */}
                  <path d="M40 70 L180 70 L165 290 L55 290 Z" fill="url(#cup-grad)" stroke={THEME.colors.boneWhite} strokeWidth="2" strokeOpacity="0.4" />
                  <ellipse cx="110" cy="70" rx="70" ry="18" fill="#353f54" stroke={THEME.colors.boneWhite} strokeWidth="2" strokeOpacity="0.6" />
                  <ellipse cx="110" cy="290" rx="55" ry="12" stroke={THEME.colors.boneWhite} strokeWidth="2" strokeOpacity="0.3" fill="none" />
                  
                  {/* Embedded Kinetic Barcode on Canister */}
                  <g transform="translate(68, 140)">
                    <rect x="-8" y="-6" width="100" height="74" fill="#ffffff" rx="2" />
                    {[0, 4, 9, 13, 18, 24, 29, 34, 39, 44, 49, 55, 60, 65, 71, 76, 81].map((bx, i) => (
                      <rect
                        key={i}
                        x={bx}
                        y="0"
                        width={i % 3 === 0 ? 3 : 1.5}
                        height="52"
                        fill={frame > 95 && frame < 140 ? THEME.colors.signalRed : '#0a0d12'}
                      />
                    ))}
                    <text x="42" y="62" fill="#000" fontSize="8" fontFamily={THEME.fonts.mono} textAnchor="middle" fontWeight="700">
                      0 41196 01012 4
                    </text>
                  </g>
                </svg>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.sand }}>
                  ITEM 01 // BEVERAGE
                </div>
              </div>

              {/* OBJECT 2: HARDCOVER BOOK WITH ISBN BARCODE */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  transform: 'translateY(-20px)',
                }}
              >
                <svg width="260" height="340" viewBox="0 0 260 340" fill="none">
                  {/* Isometric Book Shell */}
                  <path d="M30 180 L190 90 L240 210 L80 300 Z" fill="#201511" stroke="#5a3d32" strokeWidth="2" />
                  <path d="M30 180 L30 195 L80 315 L80 300 Z" fill="#120c0a" stroke="#5a3d32" strokeWidth="1" />
                  <path d="M80 300 L240 210 L240 225 L80 315 Z" fill="#ded7c3" stroke="#a69e8b" strokeWidth="1" />
                  
                  {/* Embedded ISBN Barcode on Book */}
                  <g transform="translate(130, 165) rotate(-22)">
                    <rect x="-8" y="-6" width="105" height="74" fill="#ffffff" rx="2" />
                    {[0, 5, 10, 14, 19, 25, 30, 36, 42, 47, 52, 58, 64, 70, 75, 80, 86].map((bx, i) => (
                      <rect
                        key={i}
                        x={bx}
                        y="0"
                        width={i % 4 === 0 ? 4 : 2}
                        height="52"
                        fill={frame > 120 && frame < 165 ? THEME.colors.signalRed : '#0a0d12'}
                      />
                    ))}
                    <text x="44" y="62" fill="#000" fontSize="8" fontFamily={THEME.fonts.mono} textAnchor="middle" fontWeight="700">
                      978-0-262-51087-5
                    </text>
                  </g>
                </svg>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.amber }}>
                  ITEM 02 // PUBLICATION
                </div>
              </div>

              {/* OBJECT 3: MEDICINE BOTTLE */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  transform: 'translateY(20px)',
                }}
              >
                <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
                  {/* Prescription Bottle */}
                  <rect x="75" y="40" width="70" height="32" rx="4" fill="#e0e0e0" stroke="#999" strokeWidth="1.5" />
                  <path d="M80 72 L80 110 C50 125 45 150 45 180 L45 285 Q45 295 55 295 L165 295 Q175 295 175 285 L175 180 C175 150 170 125 140 110 L140 72 Z" fill="#6b370d" stroke="rgba(245, 184, 74, 0.4)" strokeWidth="2" />
                  
                  {/* Embedded Barcode Label */}
                  <g transform="translate(68, 170)">
                    <rect x="-6" y="-6" width="96" height="74" fill="#ffffff" rx="2" />
                    {[0, 4, 9, 14, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68, 73, 78].map((bx, i) => (
                      <rect
                        key={i}
                        x={bx}
                        y="0"
                        width={i % 2 === 0 ? 3 : 1.5}
                        height="52"
                        fill={frame > 145 && frame < 190 ? THEME.colors.signalRed : '#0a0d12'}
                      />
                    ))}
                    <text x="42" y="62" fill="#000" fontSize="8" fontFamily={THEME.fonts.mono} textAnchor="middle" fontWeight="700">
                      NDC 50580-496-01
                    </text>
                  </g>
                </svg>
                <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, color: THEME.colors.coldBlue }}>
                  ITEM 03 // PHARMA
                </div>
              </div>
            </div>

            {/* Piercing Horizontal Red Laser Sweep */}
            {laserActive && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: laserProgress,
                  width: 3,
                  backgroundColor: THEME.colors.signalRed,
                  boxShadow: `0 0 25px 6px ${THEME.colors.signalRedGlow}, 0 0 70px 14px rgba(255,77,61,0.8)`,
                  transform: 'translateX(-50%)',
                  zIndex: 40,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 10,
                    height: 320,
                    background: 'linear-gradient(to bottom, transparent, #ffffff 50%, transparent)',
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* BEAT 3: "PROBABLY SEVERAL." (Frames 205-240)             */}
        {/* ======================================================== */}
        {frame >= 200 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              opacity: multiplySpring,
              transform: `scale(${1 + (1 - multiplySpring) * 0.2})`,
              zIndex: 90,
              backgroundColor: '#07080c',
            }}
          >
            {bars.map((bar, i) => (
              <div
                key={i}
                style={{
                  width: bar.w * 2.2,
                  height: bar.h,
                  backgroundColor: bar.accent ? THEME.colors.amber : THEME.colors.boneWhite,
                  boxShadow: bar.accent
                    ? `0 0 40px ${THEME.colors.amberGlow}`
                    : '0 0 15px rgba(242, 239, 230, 0.25)',
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
