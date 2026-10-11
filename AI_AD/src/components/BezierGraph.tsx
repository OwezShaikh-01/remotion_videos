import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";

interface BezierGraphProps {
  width?: number;
  height?: number;
  color?: string;
  accentColor?: string;
}

export const BezierGraph: React.FC<BezierGraphProps> = ({
  width = 540,
  height = 320,
  color = COLORS.titanium,
  accentColor = COLORS.cobalt,
}) => {
  const frame = useCurrentFrame();

  // Gentle, fluid control points (smooth breathing, zero jitter)
  const p1x = 120 + Math.sin(frame * 0.03) * 25;
  const p1y = 250 - Math.cos(frame * 0.03) * 45;

  const p2x = 420 - Math.cos(frame * 0.035) * 30;
  const p2y = 70 + Math.sin(frame * 0.035) * 25;

  const startX = 60;
  const startY = 260;
  const endX = 480;
  const endY = 60;

  // Smooth, fluid traveling orb
  const t = (Math.sin(frame * 0.03) + 1) / 2; // 0 to 1
  const bx =
    Math.pow(1 - t, 3) * startX +
    3 * Math.pow(1 - t, 2) * t * p1x +
    3 * (1 - t) * Math.pow(t, 2) * p2x +
    Math.pow(t, 3) * endX;

  const by =
    Math.pow(1 - t, 3) * startY +
    3 * Math.pow(1 - t, 2) * t * p1y +
    3 * (1 - t) * Math.pow(t, 2) * p2y +
    Math.pow(t, 3) * endY;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "rgba(19, 21, 27, 0.75)",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(28px)",
        padding: "26px",
        boxSizing: "border-box",
        position: "relative",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
      }}
    >
      {/* Editor Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "0.12em",
            }}
          >
            VELOCITY CURVE / CUBIC-EASING
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {`t = ${t.toFixed(2)} [FLUID-DECELERATION]`}
        </span>
      </div>

      <svg
        width={width - 52}
        height={height - 84}
        viewBox={`0 0 ${width - 52} ${height - 84}`}
        style={{ overflow: "visible" }}
      >
        {/* Graph Grid Lines */}
        <line
          x1={40}
          y1={60}
          x2={width - 80}
          y2={60}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeDasharray="4 4"
        />
        <line
          x1={40}
          y1={160}
          x2={width - 80}
          y2={160}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeDasharray="4 4"
        />
        <line
          x1={40}
          y1={260}
          x2={width - 80}
          y2={260}
          stroke="rgba(255, 255, 255, 0.1)"
        />

        {/* Tangent Handle Lines */}
        <line
          x1={startX}
          y1={startY}
          x2={p1x}
          y2={p1y}
          stroke={accentColor}
          strokeWidth={1.5}
          opacity={0.5}
        />
        <line
          x1={endX}
          y1={endY}
          x2={p2x}
          y2={p2y}
          stroke={COLORS.cobalt}
          strokeWidth={1.5}
          opacity={0.5}
        />

        {/* Tangent Handle Circles */}
        <circle cx={p1x} cy={p1y} r={4.5} fill={accentColor} />
        <circle cx={p2x} cy={p2y} r={4.5} fill={COLORS.cobalt} />

        {/* Gradient fill under curve */}
        <defs>
          <linearGradient id="fluidCurveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} ${startY} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${endX} ${endY} L ${endX} 260 L ${startX} 260 Z`}
          fill="url(#fluidCurveFill)"
        />

        {/* Main Bezier Curve */}
        <path
          d={`M ${startX} ${startY} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${endX} ${endY}`}
          fill="none"
          stroke={color}
          strokeWidth={2.8}
          strokeLinecap="round"
        />

        {/* Traveling Ball on curve */}
        <circle cx={bx} cy={by} r={8} fill={accentColor} />
        <circle
          cx={bx}
          cy={by}
          r={16}
          fill="none"
          stroke={accentColor}
          strokeWidth={1.2}
          opacity={0.4}
        />

        {/* Keyframe Diamond Marks */}
        <polygon
          points={`${startX},${startY - 5} ${startX + 5},${startY} ${startX},${startY + 5} ${startX - 5},${startY}`}
          fill={COLORS.titanium}
        />
        <polygon
          points={`${endX},${endY - 5} ${endX + 5},${endY} ${endX},${endY + 5} ${endX - 5},${endY}`}
          fill={COLORS.titanium}
        />
      </svg>
    </div>
  );
};
