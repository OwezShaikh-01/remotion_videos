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
  color = COLORS.white,
  accentColor = COLORS.vermilion,
}) => {
  const frame = useCurrentFrame();

  // Oscillating control points to simulate dynamic easing manipulation
  const p1x = 120 + Math.sin(frame * 0.08) * 40;
  const p1y = 260 - Math.cos(frame * 0.08) * 80;

  const p2x = 420 - Math.cos(frame * 0.09) * 50;
  const p2y = 60 + Math.sin(frame * 0.09) * 40;

  const startX = 60;
  const startY = 270;
  const endX = 480;
  const endY = 50;

  // Ball traveling along the curve
  const t = (Math.sin(frame * 0.06) + 1) / 2; // 0 to 1
  // Cubic Bezier formula: B(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
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
        backgroundColor: "rgba(24, 26, 31, 0.85)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        padding: "24px",
        boxSizing: "border-box",
        position: "relative",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
      }}
    >
      {/* Editor Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.1em",
            }}
          >
            VELOCITY GRAPH / CUBIC-EASING
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: COLORS.acidYellow,
          }}
        >
          {`t = ${t.toFixed(2)} [EASE-OUT-EXPO]`}
        </span>
      </div>

      <svg
        width={width - 48}
        height={height - 80}
        viewBox={`0 0 ${width - 48} ${height - 80}`}
        style={{ overflow: "visible" }}
      >
        {/* Graph Grid Lines */}
        <line
          x1={40}
          y1={50}
          x2={width - 80}
          y2={50}
          stroke="rgba(255,255,255,0.07)"
          strokeDasharray="4 4"
        />
        <line
          x1={40}
          y1={160}
          x2={width - 80}
          y2={160}
          stroke="rgba(255,255,255,0.07)"
          strokeDasharray="4 4"
        />
        <line
          x1={40}
          y1={270}
          x2={width - 80}
          y2={270}
          stroke="rgba(255,255,255,0.12)"
        />

        {/* Tangent Handle Lines */}
        <line
          x1={startX}
          y1={startY}
          x2={p1x}
          y2={p1y}
          stroke={accentColor}
          strokeWidth={1.5}
          opacity={0.6}
        />
        <line
          x1={endX}
          y1={endY}
          x2={p2x}
          y2={p2y}
          stroke={COLORS.cobalt}
          strokeWidth={1.5}
          opacity={0.6}
        />

        {/* Tangent Handle Circles */}
        <circle cx={p1x} cy={p1y} r={5} fill={accentColor} />
        <circle cx={p2x} cy={p2y} r={5} fill={COLORS.cobalt} />

        {/* Main Bezier Curve */}
        <path
          d={`M ${startX} ${startY} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${endX} ${endY}`}
          fill="none"
          stroke={color}
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* Gradient fill under curve */}
        <defs>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity={0.25} />
            <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} ${startY} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${endX} ${endY} L ${endX} 270 L ${startX} 270 Z`}
          fill="url(#curveFill)"
        />

        {/* Traveling Ball on curve */}
        <circle cx={bx} cy={by} r={10} fill={accentColor} />
        <circle
          cx={bx}
          cy={by}
          r={18}
          fill="none"
          stroke={accentColor}
          strokeWidth={1.5}
          opacity={0.5}
        />

        {/* Keyframe Diamond Marks */}
        <polygon
          points={`${startX},${startY - 6} ${startX + 6},${startY} ${startX},${startY + 6} ${startX - 6},${startY}`}
          fill={COLORS.white}
        />
        <polygon
          points={`${endX},${endY - 6} ${endX + 6},${endY} ${endX},${endY + 6} ${endX - 6},${endY}`}
          fill={COLORS.white}
        />
      </svg>
    </div>
  );
};
