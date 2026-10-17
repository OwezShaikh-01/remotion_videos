import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

interface LaserReticleProps {
  xProgress: number; // 0 to 100%
  label?: string;
  showBrackets?: boolean;
}

export const LaserReticle: React.FC<LaserReticleProps> = ({
  xProgress,
  label = 'OPTICAL SCAN // 632.8nm',
  showBrackets = true,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${xProgress}%`,
        width: 2,
        backgroundColor: THEME.colors.laserRed,
        boxShadow: `0 0 15px 3px ${THEME.colors.laserGlow}, 0 0 45px 8px ${THEME.colors.laserGlow}`,
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {/* Central High-Intensity Flare */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 8,
          height: 180,
          background: 'linear-gradient(to bottom, transparent, #ffffff 50%, transparent)',
          filter: 'blur(1px)',
        }}
      />

      {/* Dynamic Telemetry HUD Follower */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 14,
          backgroundColor: 'rgba(8, 10, 15, 0.9)',
          border: `1px solid ${THEME.colors.laserRed}`,
          padding: '4px 10px',
          borderRadius: 4,
          fontFamily: THEME.fonts.mono,
          fontSize: 10,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          letterSpacing: '0.15em',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ color: THEME.colors.laserRed, fontWeight: 700 }}>{label}</div>
        <div style={{ opacity: 0.8 }}>POS: {Math.round(xProgress)}% // SYNC</div>
      </div>
    </div>
  );
};
