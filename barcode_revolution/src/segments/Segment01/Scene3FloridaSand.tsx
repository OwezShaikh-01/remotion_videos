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

export const Scene3FloridaSand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 210 frames total (0:13 to 0:20)
  // Phase 1: 0 - 50 frames: Transition to 1949 Florida Beach Kodachrome Photo
  // Phase 2: 50 - 150 frames: 2.5D Camera drift over the four finger-carved furrows in sand
  // Phase 3: 150 - 210 frames: Morse Code (• — • —) to Barcode transformation badges

  const transitionFade = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Stamp appearance
  const stampSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  // Morse code badges appearance (Frame 145+)
  const badgesSpring = spring({
    frame: frame - 145,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 95 },
  });

  const furrows = [
    { label: 'DOT (•)', code: '1X THIN', desc: '0.33mm' },
    { label: 'DASH (—)', code: '3X THICK', desc: '0.99mm' },
    { label: 'DOT (•)', code: '1X THIN', desc: '0.33mm' },
    { label: 'DASH (—)', code: '3X THICK', desc: '0.99mm' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#151009',
        overflow: 'hidden',
        opacity: transitionFade,
      }}
    >
      <CameraRig
        durationInFrames={210}
        zoom={[1, 1.12]}
        panX={[0, -25]}
        panY={[0, -15]}
        driftIntensity={0.65}
      >
        <DustParticles count={40} color="rgba(255, 230, 180, 0.45)" />

        {/* ======================================================== */}
        {/* ARCHIVAL KODACHROME PHOTOGRAPH OF 1949 MIAMI BEACH SAND  */}
        {/* ======================================================== */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Img
            src={staticFile('assets/florida_beach_1949.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'sepia(0.2) contrast(1.08) brightness(0.95)',
            }}
          />

          {/* Golden Hour Coastal Vignette & Sun Glint Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 70% 30%, rgba(255, 200, 100, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(20, 14, 7, 0.75) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* ARCHIVAL POSTAL RECORD & HISTORICAL GEOLOCATION STAMP   */}
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
          {/* Circular Postal Postmark Seal */}
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '3px dashed #fff2d9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff2d9',
              transform: 'rotate(-10deg)',
              backgroundColor: 'rgba(28, 18, 9, 0.65)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>
              POSTAL RECORD
            </div>
            <div style={{ fontFamily: THEME.fonts.story, fontSize: 19, fontWeight: 700, margin: '4px 0' }}>
              MIAMI BEACH
            </div>
            <div style={{ fontFamily: THEME.fonts.mono, fontSize: 13, fontWeight: 700, color: THEME.colors.amber }}>
              WINTER 1949
            </div>
          </div>

          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: 13,
              color: '#fff5e0',
              letterSpacing: '0.15em',
              fontWeight: 600,
              backgroundColor: 'rgba(15, 10, 5, 0.75)',
              padding: '8px 14px',
              borderRadius: 6,
              backdropFilter: 'blur(6px)',
              lineHeight: 1.6,
            }}
          >
            GEOLOCATION: 25.7907° N, 80.1300° W
            <br />
            INVENTOR: NORMAN JOSEPH WOODLAND
          </div>
        </div>

        {/* Large Archival Year Marker */}
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
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 40px rgba(245, 184, 74, 0.4)',
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
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            }}
          >
            The Sand Revelation
          </div>
        </div>

        {/* ======================================================== */}
        {/* MORSE CODE TO BARCODE TRANSFORMATION BADGES (Frame 145+) */}
        {/* ======================================================== */}
        {frame >= 140 && (
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 32,
              opacity: badgesSpring,
              transform: `translateY(${(1 - badgesSpring) * 30}px)`,
              zIndex: 30,
            }}
          >
            {furrows.map((f, i) => (
              <div
                key={i}
                style={{
                  width: 170,
                  backgroundColor: 'rgba(15, 11, 7, 0.92)',
                  border: `1px solid ${i % 2 === 1 ? THEME.colors.amber : 'rgba(255, 240, 215, 0.4)'}`,
                  padding: '14px 18px',
                  borderRadius: 8,
                  textAlign: 'center',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 18,
                    fontWeight: 800,
                    color: i % 2 === 1 ? THEME.colors.amber : THEME.colors.boneWhite,
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 12,
                    color: THEME.colors.sand,
                    marginTop: 6,
                    fontWeight: 700,
                  }}
                >
                  {f.code}
                </div>
                <div
                  style={{
                    fontFamily: THEME.fonts.mono,
                    fontSize: 10,
                    color: '#998f80',
                    marginTop: 2,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
