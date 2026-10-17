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
import { ScanBeam } from '../../components/ScanBeam';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 240 frames total (0:00 to 0:08)
  // Beat 1: 0 - 65 frames (0:00 - 0:02) "Look around you."
  // Beat 2: 60 - 205 frames (0:02 - 0:07) "Somewhere within arm's reach..."
  // Beat 3: 205 - 240 frames (0:07 - 0:08) "Probably several."

  // Camera Motion
  const cameraZoom = interpolate(frame, [0, 60, 140, 240], [1, 1.05, 1.15, 1.28], {
    extrapolateRight: 'clamp',
  });

  // Beat 1 Title Animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 85 },
  });

  const titleTracking = interpolate(frame, [0, 65], [6, 26], {
    extrapolateRight: 'clamp',
  });

  const titleFade = interpolate(frame, [48, 65], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2 Desk & Objects Reveal
  const deskSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 18, mass: 1.1, stiffness: 80 },
  });

  // Laser Sweep
  const laserStart = 70;
  const laserDuration = 120;
  const laserX = interpolate(
    frame - laserStart,
    [0, laserDuration],
    [100, 1820],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Barcode Glow Responses based on laser intersection
  const cupGlow = interpolate(
    frame,
    [85, 105, 130],
    [0, 1, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const bookGlow = interpolate(
    frame,
    [120, 145, 170],
    [0, 1, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const bottleGlow = interpolate(
    frame,
    [155, 180, 205],
    [0, 1, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Beat 3 Multiplication (205 - 240 frames)
  const multiplySpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 12, mass: 0.4, stiffness: 140 },
  });

  // Procedural barcode bar widths for the final explosion of bars
  const fullBars = [
    5, 2, 9, 3, 2, 7, 14, 3, 2, 8, 4, 11, 2, 6, 9, 3, 16, 2, 7, 3, 10, 4, 2, 12,
    3, 7, 2, 9, 4, 14, 3, 6, 2, 8, 11, 3, 5, 9, 2, 7, 16, 3, 6, 2, 10, 4, 8, 2,
    13, 3, 6, 2, 9, 4, 12, 3, 5, 2, 7, 10, 3, 4, 8, 2, 6, 14, 3, 5, 2, 9,
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07090d',
        overflow: 'hidden',
      }}
    >
      <CameraRig durationInFrames={240} zoom={[1, 1.12]} driftIntensity={0.7}>
        {/* Cinematic Atmospheric Dust Particles */}
        <DustParticles count={50} color="rgba(242, 239, 230, 0.35)" />

        {/* Ambient Top Spotlight Cone */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1400,
            height: 1200,
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(91, 141, 239, 0.08) 0%, rgba(245, 184, 74, 0.03) 40%, transparent 75%)',
            pointerEvents: 'none',
          }}
        />

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
            zIndex: 10,
          }}
        >
          {/* Subtle Technical Framing Reticle */}
          <div
            style={{
              position: 'absolute',
              width: 900,
              height: 280,
              border: '1px solid rgba(242, 239, 230, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: 12,
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 10, color: THEME.colors.sand }}>
              SYS // 00.00
            </span>
            <span style={{ fontFamily: THEME.fonts.mono, fontSize: 10, color: THEME.colors.sand }}>
              OPTICAL PROXIMITY SENSOR
            </span>
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 13,
              letterSpacing: '0.4em',
              color: THEME.colors.amber,
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            INITIATE SCAN
          </div>

          <h1
            style={{
              fontFamily: THEME.fonts.story,
              fontSize: 94,
              fontWeight: 500,
              color: THEME.colors.boneWhite,
              letterSpacing: `${titleTracking}px`,
              textTransform: 'uppercase',
              textShadow: '0 0 50px rgba(245, 184, 74, 0.3), 0 10px 40px rgba(0,0,0,0.8)',
              margin: 0,
            }}
          >
            Look Around You
          </h1>

          <div
            style={{
              marginTop: 28,
              width: 80,
              height: 3,
              backgroundColor: THEME.colors.amber,
              boxShadow: `0 0 20px ${THEME.colors.amberGlow}`,
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* BEAT 2: THE PHYSICAL WORKBENCH & OBJECTS (Frames 60 - 205) */}
        {/* ======================================================== */}
        {frame >= 50 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: interpolate(deskSpring, [0, 1], [0, 1]),
              transform: `translateY(${(1 - deskSpring) * 80}px)`,
            }}
          >
            {/* The Wooden Tabletop Perspective Plane */}
            <div
              style={{
                position: 'absolute',
                left: -100,
                right: -100,
                bottom: -150,
                height: 720,
                background:
                  'radial-gradient(ellipse at 50% 30%, #151821 0%, #0d0f15 50%, #06070a 100%)',
                boxShadow: 'inset 0 100px 100px rgba(0,0,0,0.8)',
                transform: 'perspective(1000px) rotateX(25deg)',
                borderTop: '1px solid rgba(242, 239, 230, 0.1)',
              }}
            >
              {/* Tabletop Perspective Grid Lines */}
              <svg width="100%" height="100%">
                {[-600, -300, 0, 300, 600, 900, 1200, 1500, 1800, 2100].map((x, i) => (
                  <line
                    key={i}
                    x1="50%"
                    y1="0"
                    x2={x}
                    y2="100%"
                    stroke="rgba(242, 239, 230, 0.03)"
                    strokeWidth="1"
                  />
                ))}
                {[80, 200, 340, 500, 680].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="100%"
                    y2={y}
                    stroke="rgba(242, 239, 230, 0.03)"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>

            {/* --- OBJECT 1: CERAMIC COFFEE MUG (Left) --- */}
            <div
              style={{
                position: 'absolute',
                left: 320,
                bottom: 240,
                width: 260,
                height: 360,
              }}
            >
              {/* Realistic Mug Shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 20,
                  width: 220,
                  height: 50,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 75%)',
                  transform: 'rotate(-5deg)',
                }}
              />

              <svg width="260" height="360" viewBox="0 0 260 360" fill="none">
                {/* Ceramic Mug Body with 3D cylindrical shading */}
                <defs>
                  <linearGradient id="mug-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e222d" />
                    <stop offset="35%" stopColor="#353b4d" />
                    <stop offset="70%" stopColor="#252b39" />
                    <stop offset="100%" stopColor="#11141b" />
                  </linearGradient>
                  <linearGradient id="handle-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#353b4d" />
                    <stop offset="100%" stopColor="#11141b" />
                  </linearGradient>
                </defs>

                {/* Mug Handle */}
                <path
                  d="M210 130 C260 130 260 250 210 250"
                  stroke="url(#handle-grad)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Cylinder Body */}
                <path
                  d="M40 80 L210 80 L195 300 L55 300 Z"
                  fill="url(#mug-gradient)"
                  stroke="rgba(242, 239, 230, 0.15)"
                  strokeWidth="1.5"
                />

                {/* Top Rim Oval */}
                <ellipse cx="125" cy="80" rx="85" ry="24" fill="#2d3342" stroke="rgba(242, 239, 230, 0.25)" strokeWidth="2" />
                <ellipse cx="125" cy="80" rx="75" ry="18" fill="#13161c" />

                {/* Bottom Base Curve */}
                <path d="M55 300 Q125 330 195 300" stroke="rgba(242, 239, 230, 0.2)" strokeWidth="1.5" fill="none" />

                {/* Printed Barcode Label on Mug Flank */}
                <g transform="translate(85, 170) skewY(4)">
                  {/* Sticker Base */}
                  <rect
                    x="-6"
                    y="-6"
                    width="86"
                    height="72"
                    fill="#f7f5ee"
                    rx="3"
                    style={{
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      filter: cupGlow > 0.5 ? `drop-shadow(0 0 15px ${THEME.colors.signalRed})` : undefined,
                    }}
                  />
                  {/* Real UPC-A style Barcode Lines */}
                  {[
                    { x: 0, w: 2 }, { x: 4, w: 2 }, // Guard
                    { x: 8, w: 4 }, { x: 14, w: 1 }, { x: 17, w: 5 }, { x: 24, w: 2 },
                    { x: 28, w: 6 }, { x: 36, w: 2 }, // Center
                    { x: 40, w: 2 }, { x: 44, w: 2 },
                    { x: 48, w: 3 }, { x: 53, w: 5 }, { x: 60, w: 2 }, { x: 64, w: 6 },
                    { x: 72, w: 2 }, { x: 76, w: 2 }, // Guard
                  ].map((b, idx) => (
                    <rect
                      key={idx}
                      x={b.x}
                      y="0"
                      width={b.w}
                      height="50"
                      fill={cupGlow > 0.6 ? THEME.colors.signalRed : '#0a0d12'}
                    />
                  ))}
                  <text
                    x="37"
                    y="60"
                    fill="#0a0d12"
                    fontSize="7"
                    fontFamily={THEME.fonts.mono}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    0 41196 01012 4
                  </text>
                </g>
              </svg>

              {/* Optical Laser Volumetric Beam Projection */}
              {cupGlow > 0.2 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 110,
                    top: 170,
                    width: 35,
                    height: 240,
                    background:
                      'linear-gradient(to top, rgba(255, 77, 61, 0.45) 0%, rgba(255, 77, 61, 0) 100%)',
                    filter: 'blur(8px)',
                    transform: 'translateY(-100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* --- OBJECT 2: VINTAGE HARDCOVER BOOK (Center) --- */}
            <div
              style={{
                position: 'absolute',
                left: 780,
                bottom: 230,
                width: 380,
                height: 380,
              }}
            >
              {/* Book Shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 30,
                  width: 340,
                  height: 60,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 75%)',
                }}
              />

              <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
                <defs>
                  <linearGradient id="book-cover" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2c1a16" />
                    <stop offset="60%" stopColor="#1a0f0d" />
                    <stop offset="100%" stopColor="#0e0706" />
                  </linearGradient>
                </defs>

                {/* Perspective Book Cover */}
                <path
                  d="M40 220 L300 130 L360 260 L90 350 Z"
                  fill="url(#book-cover)"
                  stroke="#5a382e"
                  strokeWidth="2"
                />

                {/* Book Spine Corner */}
                <path
                  d="M40 220 L40 240 L90 370 L90 350 Z"
                  fill="#150b09"
                  stroke="#3a221b"
                  strokeWidth="1"
                />

                {/* Paper Pages Layer */}
                <path
                  d="M90 350 L360 260 L360 275 L90 365 Z"
                  fill="#d9d2be"
                  stroke="#a89f89"
                  strokeWidth="1"
                />

                {/* Golden Embossed Title Spine */}
                <text
                  x="150"
                  y="245"
                  transform="rotate(-18 150 245)"
                  fill="#c9a66b"
                  fontSize="13"
                  fontFamily={THEME.fonts.story}
                  letterSpacing="3"
                  fontWeight="600"
                >
                  THE AUTOMATED WORLD // VOL. IV
                </text>

                {/* Barcode on Back Cover */}
                <g transform="translate(230, 195) rotate(-18)">
                  <rect
                    x="-6"
                    y="-6"
                    width="95"
                    height="68"
                    fill="#fbfaf6"
                    rx="3"
                    style={{
                      boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                      filter: bookGlow > 0.5 ? `drop-shadow(0 0 20px ${THEME.colors.signalRed})` : undefined,
                    }}
                  />
                  {[
                    { x: 0, w: 2 }, { x: 4, w: 2 },
                    { x: 8, w: 5 }, { x: 15, w: 2 }, { x: 19, w: 6 }, { x: 27, w: 3 },
                    { x: 32, w: 4 }, { x: 38, w: 2 }, { x: 42, w: 2 },
                    { x: 46, w: 5 }, { x: 53, w: 2 }, { x: 57, w: 6 }, { x: 65, w: 3 },
                    { x: 70, w: 5 }, { x: 77, w: 2 }, { x: 81, w: 2 },
                  ].map((b, idx) => (
                    <rect
                      key={idx}
                      x={b.x}
                      y="0"
                      width={b.w}
                      height="46"
                      fill={bookGlow > 0.6 ? THEME.colors.signalRed : '#0a0d12'}
                    />
                  ))}
                  <text
                    x="42"
                    y="56"
                    fill="#0a0d12"
                    fontSize="7"
                    fontFamily={THEME.fonts.mono}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    978-0-262-51087-5
                  </text>
                </g>
              </svg>

              {bookGlow > 0.2 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 260,
                    top: 180,
                    width: 45,
                    height: 260,
                    background:
                      'linear-gradient(to top, rgba(255, 77, 61, 0.5) 0%, rgba(255, 77, 61, 0) 100%)',
                    filter: 'blur(10px)',
                    transform: 'translateY(-100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* --- OBJECT 3: AMBER GLASS PHARMACY BOTTLE (Right) --- */}
            <div
              style={{
                position: 'absolute',
                right: 320,
                bottom: 240,
                width: 240,
                height: 380,
              }}
            >
              {/* Shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 15,
                  left: 30,
                  width: 180,
                  height: 45,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 75%)',
                }}
              />

              <svg width="240" height="380" viewBox="0 0 240 380" fill="none">
                <defs>
                  <linearGradient id="amber-glass" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3d1e06" />
                    <stop offset="30%" stopColor="#7a3e0f" />
                    <stop offset="70%" stopColor="#995014" />
                    <stop offset="100%" stopColor="#2e1402" />
                  </linearGradient>
                </defs>

                {/* White ribbed Cap */}
                <rect x="90" y="40" width="60" height="35" rx="4" fill="#e8e8e8" stroke="#bbb" strokeWidth="1" />
                {[96, 104, 112, 120, 128, 136, 144].map((x, i) => (
                  <line key={i} x1={x} y1="42" x2={x} y2="73" stroke="#999" strokeWidth="1.5" />
                ))}

                {/* Glass Neck */}
                <path d="M96 75 L96 110 L144 110 L144 75 Z" fill="url(#amber-glass)" opacity="0.9" />

                {/* Bottle Shoulder & Body */}
                <path
                  d="M96 110 C60 125 50 150 50 180 L50 320 Q50 335 65 335 L175 335 Q190 335 190 320 L190 180 C190 150 180 125 144 110 Z"
                  fill="url(#amber-glass)"
                  stroke="rgba(245, 184, 74, 0.3)"
                  strokeWidth="1.5"
                />

                {/* Specular Glass Highlight Reflection */}
                <path
                  d="M62 180 L62 315"
                  stroke="rgba(255, 235, 190, 0.45)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Prescription Label with Barcode */}
                <rect x="68" y="180" width="104" height="110" rx="3" fill="#faf8f2" />
                <rect x="74" y="190" width="92" height="4" fill="#0b0d12" />
                <rect x="74" y="198" width="60" height="3" fill="#777" />

                <g transform="translate(76, 215)">
                  {[
                    { x: 0, w: 2 }, { x: 4, w: 2 },
                    { x: 8, w: 4 }, { x: 14, w: 2 }, { x: 18, w: 5 }, { x: 25, w: 3 },
                    { x: 30, w: 4 }, { x: 36, w: 2 }, { x: 40, w: 2 },
                    { x: 44, w: 4 }, { x: 50, w: 2 }, { x: 54, w: 6 }, { x: 62, w: 2 },
                    { x: 66, w: 4 }, { x: 72, w: 2 }, { x: 76, w: 2 },
                  ].map((b, idx) => (
                    <rect
                      key={idx}
                      x={b.x}
                      y="0"
                      width={b.w}
                      height="45"
                      fill={bottleGlow > 0.6 ? THEME.colors.signalRed : '#0a0d12'}
                    />
                  ))}
                  <text
                    x="44"
                    y="55"
                    fill="#0a0d12"
                    fontSize="7"
                    fontFamily={THEME.fonts.mono}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    NDC 50580-496-01
                  </text>
                </g>
              </svg>

              {bottleGlow > 0.2 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 110,
                    top: 215,
                    width: 40,
                    height: 250,
                    background:
                      'linear-gradient(to top, rgba(255, 77, 61, 0.45) 0%, rgba(255, 77, 61, 0) 100%)',
                    filter: 'blur(8px)',
                    transform: 'translateY(-100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* Piercing Red Laser Scanning Beam (Frame 70 to 190) */}
            {frame >= laserStart && frame <= laserStart + laserDuration && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: laserX,
                  width: 3,
                  backgroundColor: THEME.colors.signalRed,
                  boxShadow: `0 0 20px 4px ${THEME.colors.signalRedGlow}, 0 0 50px 10px rgba(255,77,61,0.6)`,
                  transform: 'translateX(-50%)',
                  zIndex: 60,
                }}
              >
                {/* Vertical Laser Flare Streak */}
                <div
                  style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 6,
                    height: 220,
                    background: `linear-gradient(to bottom, transparent, #ffffff 50%, transparent)`,
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            )}
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
              transform: `scale(${1 + (1 - multiplySpring) * 0.3})`,
              zIndex: 80,
            }}
          >
            {fullBars.map((width, idx) => {
              const isAccent = idx % 9 === 0;
              const barHeight = 850 + Math.sin(idx * 0.5) * 60;
              return (
                <div
                  key={idx}
                  style={{
                    width: width * 2,
                    height: barHeight,
                    backgroundColor: isAccent ? THEME.colors.amber : THEME.colors.boneWhite,
                    boxShadow: isAccent
                      ? `0 0 35px ${THEME.colors.amberGlow}`
                      : '0 0 15px rgba(242, 239, 230, 0.25)',
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
