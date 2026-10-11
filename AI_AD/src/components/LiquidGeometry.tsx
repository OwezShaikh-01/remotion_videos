import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { subtleDrift } from "../utils/motion";

interface LiquidGeometryProps {
  size?: number;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
  type?: string; // for compatibility
}

export const LiquidGeometry: React.FC<LiquidGeometryProps> = ({
  size = 480,
  color = COLORS.cobalt,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const drift = subtleDrift(frame, { speed: 0.015, ampX: 20, ampY: 15, phase: delay });
  const pulse = 1 + Math.sin((frame + delay * 4) * 0.03) * 0.06;

  const opacity = interpolate(frame - delay, [0, 24], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translate3d(${drift.x}px, ${drift.y}px, 0) scale(${pulse})`,
        filter: "blur(60px)",
        pointerEvents: "none",
        opacity,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};
