import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../theme";

export const Asterisk: React.FC<{
  size?: number;
  color?: string;
  rotationSpeed?: number;
  style?: React.CSSProperties;
}> = ({ size = 60, color = COLORS.vermilion, rotationSpeed = 1, style = {} }) => {
  const frame = useCurrentFrame();
  const rotation = frame * rotationSpeed;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <g stroke={color} strokeWidth="12" strokeLinecap="round">
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="22" y1="78" x2="78" y2="22" />
        </g>
      </svg>
    </div>
  );
};

export const Crosshair: React.FC<{
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ size = 24, color = "rgba(255,255,255,0.3)", style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", ...style }}
    >
      <line x1="12" y1="0" x2="12" y2="24" stroke={color} strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
};

export const ConcentricRings: React.FC<{
  count?: number;
  color?: string;
  baseRadius?: number;
  delay?: number;
}> = ({ count = 4, color = COLORS.cobalt, baseRadius = 30, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
      {Array.from({ length: count }).map((_, i) => {
        const ringSpring = spring({
          frame: frame - delay - i * 4,
          fps,
          config: SPRINGS.smooth,
        });
        const pulse = 1 + Math.sin(frame * 0.05 + i * 0.8) * 0.08;
        const r = (baseRadius + i * 40) * ringSpring * pulse;
        const opacity = interpolate(i, [0, count - 1], [0.6, 0.15]);

        return (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={Math.max(0, r)}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
};

export const PillTag: React.FC<{
  label: string;
  color?: string;
  bg?: string;
  border?: string;
  delay?: number;
}> = ({
  label,
  color = COLORS.white,
  bg = "rgba(255,255,255,0.08)",
  border = "1px solid rgba(255,255,255,0.18)",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.bouncy,
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 20px",
        borderRadius: 999,
        backgroundColor: bg,
        border,
        color,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.08em",
        transform: `scale(${pop})`,
        transformOrigin: "center center",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
};
