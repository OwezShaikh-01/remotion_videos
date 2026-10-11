import React from "react";
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
  color = COLORS.obsidian,
  bg = COLORS.galleryIvory,
  delay = 0,
  rotationSpeed = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.silky,
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
          border: `1px solid rgba(255, 255, 255, 0.12)`,
          boxShadow: "0 14px 40px rgba(0, 0, 0, 0.2)",
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
          fontSize={size * 0.08}
          fontWeight="700"
          fontFamily={FONTS.display}
          letterSpacing="2.2"
          opacity={0.8}
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
            fontWeight: 800,
            fontSize: size * 0.22,
            lineHeight: 0.9,
            color,
            letterSpacing: "-0.04em",
          }}
        >
          {centerText}
        </span>
        {subText && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontWeight: 600,
              fontSize: size * 0.075,
              color,
              letterSpacing: "0.15em",
              marginTop: 3,
              opacity: 0.7,
            }}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
};
