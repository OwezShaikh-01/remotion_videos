import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";

interface BadgeSealProps {
  size?: number;
  text?: string;
  centerText?: string;
  subText?: string;
  color?: string;
  bg?: string;
  delay?: number;
  rotationSpeed?: number;
}

export const BadgeSeal: React.FC<BadgeSealProps> = ({
  size = 140,
  text = "• AUTONOMOUS MOTION DESIGN • STUDIO AI • PREMIUM • 2026 ",
  centerText = "AI",
  subText = "MOTION",
  color = COLORS.ink,
  bg = COLORS.acidYellow,
  delay = 0,
  rotationSpeed = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.bouncy,
  });

  const rotation = (frame * rotationSpeed) % 360;
  const radius = size * 0.38;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${scaleSpring})`,
        transformOrigin: "center center",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Background Disc */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: bg,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      />

      {/* Rotating SVG with curved circular text */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          position: "absolute",
          inset: 0,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        <defs>
          <path
            id={`circlePath-${size}`}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill={color}
          fontSize={size * 0.082}
          fontWeight="800"
          fontFamily={FONTS.display}
          letterSpacing="2.2"
        >
          <textPath href={`#circlePath-${size}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Mark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: size * 0.22,
            lineHeight: 0.9,
            color,
            letterSpacing: "-0.05em",
          }}
        >
          {centerText}
        </span>
        {subText && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: size * 0.075,
              color,
              letterSpacing: "0.15em",
              marginTop: 2,
            }}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};
