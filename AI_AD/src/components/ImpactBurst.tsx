import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../theme";

interface ImpactBurstProps {
  hitFrame: number;
  x: number;
  y: number;
  color?: string;
  rayCount?: number;
  maxRadius?: number;
}

export const ImpactBurst: React.FC<ImpactBurstProps> = ({
  hitFrame,
  x,
  y,
  color = COLORS.acidYellow,
  rayCount = 8,
  maxRadius = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = frame - hitFrame;
  if (elapsed < 0 || elapsed > 24) return null;

  const burstSpring = spring({
    frame: elapsed,
    fps,
    config: SPRINGS.punchy,
  });

  const radius = interpolate(burstSpring, [0, 1], [10, maxRadius]);
  const opacity = interpolate(elapsed, [0, 6, 22], [1, 1, 0]);
  const shockwaveRadius = interpolate(burstSpring, [0, 1], [5, maxRadius * 1.3]);
  const shockwaveOpacity = interpolate(elapsed, [0, 4, 18], [0.8, 0.6, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 80,
      }}
    >
      <svg
        width={maxRadius * 3}
        height={maxRadius * 3}
        viewBox={`${-maxRadius * 1.5} ${-maxRadius * 1.5} ${maxRadius * 3} ${maxRadius * 3}`}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
      >
        {/* Expanding shockwave ring */}
        <circle
          cx="0"
          cy="0"
          r={shockwaveRadius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity={shockwaveOpacity}
        />

        {/* Outer dotted echo ring */}
        <circle
          cx="0"
          cy="0"
          r={shockwaveRadius * 0.75}
          fill="none"
          stroke={COLORS.white}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity={shockwaveOpacity * 0.8}
        />

        {/* Radial burst rays */}
        {Array.from({ length: rayCount }).map((_, i) => {
          const angle = (i * 360) / rayCount;
          const rad = (angle * Math.PI) / 180;
          const innerR = radius * 0.45;
          const outerR = radius;

          const x1 = Math.cos(rad) * innerR;
          const y1 = Math.sin(rad) * innerR;
          const x2 = Math.cos(rad) * outerR;
          const y2 = Math.sin(rad) * outerR;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              opacity={opacity}
            />
          );
        })}

        {/* Center spark diamond */}
        <polygon
          points={`0,${-12 * (1 - elapsed / 20)} ${12 * (1 - elapsed / 20)},0 0,${12 * (1 - elapsed / 20)} ${-12 * (1 - elapsed / 20)},0`}
          fill={COLORS.white}
          opacity={opacity}
        />
      </svg>
    </div>
  );
};
