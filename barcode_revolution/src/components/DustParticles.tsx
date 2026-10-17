import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

export const DustParticles: React.FC<{ count?: number; color?: string }> = ({
  count = 45,
  color = 'rgba(242, 239, 230, 0.45)',
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const seed1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const seed2 = Math.cos(i * 43.123 + 23.456) * 12345.6789;
      const seed3 = Math.sin(i * 91.345 + 12.678) * 98765.4321;
      
      list.push({
        x: (seed1 - Math.floor(seed1)) * 1920,
        y: (seed2 - Math.floor(seed2)) * 1080,
        size: 1.5 + (seed3 - Math.floor(seed3)) * 3.5,
        speed: 0.3 + ((seed1 + seed2) % 1) * 0.7,
        opacity: 0.15 + ((seed2 + seed3) % 1) * 0.45,
        drift: (((seed3 * 10) % 2) - 1) * 0.4,
      });
    }
    return list;
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      {particles.map((p, i) => {
        const currentY = (p.y - frame * p.speed + 1080 * 10) % 1080;
        const currentX = (p.x + Math.sin(frame * 0.02 + i) * 30 + p.drift * frame) % 1920;
        const pulse = 0.7 + Math.sin(frame * 0.05 + i * 2) * 0.3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: p.opacity * pulse,
              filter: `blur(${p.size > 3 ? 1.5 : 0.5}px)`,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
