import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

interface ScanBeamProps {
  startFrame?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  color?: string;
  glowColor?: string;
}

export const ScanBeam: React.FC<ScanBeamProps> = ({
  startFrame = 0,
  duration = 60,
  direction = 'horizontal',
  color = THEME.colors.signalRed,
  glowColor = THEME.colors.signalRedGlow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, 100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = interpolate(
    frame - startFrame,
    [0, 8, duration - 8, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (frame < startFrame || frame > startFrame + duration) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity,
      }}
    >
      {direction === 'horizontal' ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${progress}%`,
            width: 3,
            backgroundColor: color,
            boxShadow: `0 0 15px 4px ${glowColor}, 0 0 35px 8px ${glowColor}`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Subtle horizontal light streak / flare */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 140,
              height: 4,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, ${color} 0%, transparent 80%)`,
              opacity: 0.8,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${progress}%`,
            height: 3,
            backgroundColor: color,
            boxShadow: `0 0 15px 4px ${glowColor}, 0 0 35px 8px ${glowColor}`,
            transform: 'translateY(-50%)',
          }}
        />
      )}
    </div>
  );
};
