import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SPRINGS } from "../theme";

interface LiquidGeometryProps {
  size?: number;
  color?: string;
  delay?: number;
  type?: "blob" | "sunburst" | "iris";
  style?: React.CSSProperties;
}

export const LiquidGeometry: React.FC<LiquidGeometryProps> = ({
  size = 380,
  color = COLORS.cobalt,
  delay = 0,
  type = "blob",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.bouncy,
  });

  const t = (frame + delay * 2) * 0.05;

  // Generate an organic morphing SVG path
  const points: [number, number][] = [];
  const count = 8;
  const center = size / 2;
  const baseR = size * 0.38;

  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    // Harmonic oscillation at each control point
    const wave =
      Math.sin(t + i * 1.3) * (size * 0.08) +
      Math.cos(t * 0.7 + i * 2.1) * (size * 0.05);
    const r = (baseR + wave) * enterSpring;
    points.push([center + Math.cos(angle) * r, center + Math.sin(angle) * r]);
  }

  // Smooth bezier curve connecting points
  const d = points.reduce((acc, curr, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    const prev = arr[(i - 1 + arr.length) % arr.length];
    const cp1x = curr[0] + (next[0] - prev[0]) * 0.2;
    const cp1y = curr[1] + (next[1] - prev[1]) * 0.2;
    const cp2x = next[0] - (arr[(i + 2) % arr.length][0] - curr[0]) * 0.2;
    const cp2y = next[1] - (arr[(i + 2) % arr.length][1] - curr[1]) * 0.2;
    if (i === 0) {
      return `M ${curr[0]} ${curr[1]} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next[0]} ${next[1]}`;
    }
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next[0]} ${next[1]}`;
  }, "");

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`liquidGrad-${size}`} cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={color} stopOpacity="0.45" />
          </radialGradient>
        </defs>
        <path d={d} fill={`url(#liquidGrad-${size})`} />
      </svg>
    </div>
  );
};
