import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { FLUID_EASE } from "../utils/motion";

interface ImpactBurstProps {
  hitFrame: number;
  x: number;
  y: number;
  color?: string;
  maxRadius?: number;
  rayCount?: number; // retained for compatibility
}

export const ImpactBurst: React.FC<ImpactBurstProps> = ({
  hitFrame,
  x,
  y,
  color = COLORS.cobalt,
  maxRadius = 140,
}) => {
  const frame = useCurrentFrame();

  const elapsed = frame - hitFrame;
  if (elapsed < 0 || elapsed > 30) return null;

  const progress = interpolate(elapsed, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  const radius = interpolate(progress, [0, 1], [15, maxRadius]);
  const opacity = interpolate(progress, [0, 0.25, 1], [0.55, 0.4, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <svg
        width={maxRadius * 2.5}
        height={maxRadius * 2.5}
        viewBox={`${-maxRadius * 1.25} ${-maxRadius * 1.25} ${maxRadius * 2.5} ${maxRadius * 2.5}`}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
      >
        {/* Soft, elegant expanding concentric ring */}
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity={opacity}
        />
        {/* Whisper-soft inner echo */}
        <circle
          cx="0"
          cy="0"
          r={radius * 0.72}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={opacity * 0.5}
        />
      </svg>
    </div>
  );
};
