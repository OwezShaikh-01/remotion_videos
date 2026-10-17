import React from 'react';

export const Vignette: React.FC<{
  intensity?: number;
  color?: string;
}> = ({ intensity = 0.65, color = '#000000' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 990,
        background: `radial-gradient(ellipse at center, transparent 45%, ${color} 100%)`,
        opacity: intensity,
      }}
    />
  );
};
