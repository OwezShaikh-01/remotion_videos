import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

export const BackgroundGrid: React.FC<{
  color?: string;
  gridSize?: number;
  highlightColor?: string;
}> = ({
  color = THEME.colors.gridLine,
  gridSize = 60,
  highlightColor = 'rgba(242, 239, 230, 0.12)',
}) => {
  const frame = useCurrentFrame();
  const offsetY = interpolate(frame, [0, 900], [0, 30], { extrapolateRight: 'clamp' });
  const offsetX = interpolate(frame, [0, 900], [0, 15], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: -60,
        pointerEvents: 'none',
        zIndex: 1,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="blueprint-grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
            {/* Small corner cross at intersections */}
            <path
              d={`M -4 0 L 4 0 M 0 -4 L 0 4`}
              fill="none"
              stroke={highlightColor}
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
    </div>
  );
};
