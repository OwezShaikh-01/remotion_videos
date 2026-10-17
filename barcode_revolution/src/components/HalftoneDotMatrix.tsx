import React from 'react';

export const HalftoneDotMatrix: React.FC<{
  opacity?: number;
  spacing?: number;
  color?: string;
}> = ({ opacity = 0.08, spacing = 24, color = '#ffffff' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        opacity,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="halftone-pattern"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={spacing / 2} cy={spacing / 2} r="1.5" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#halftone-pattern)" />
      </svg>
    </div>
  );
};
