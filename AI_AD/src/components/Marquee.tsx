import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";

interface MarqueeProps {
  items: string[];
  speed?: number;
  fontSize?: number;
  bg?: string;
  color?: string;
  rotate?: number;
  reverse?: boolean;
  style?: React.CSSProperties;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 2.2,
  fontSize = 20,
  bg = "rgba(255, 255, 255, 0.04)",
  color = COLORS.titanium,
  rotate = 0,
  reverse = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const direction = reverse ? -1 : 1;
  const offset = (frame * speed * direction) % 1400;

  const repeated = [...items, ...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: bg,
        transform: `rotate(${rotate}deg)`,
        whiteSpace: "nowrap",
        userSelect: "none",
        padding: "14px 0",
        borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-block",
          transform: `translate3d(-${offset}px, 0, 0)`,
          willChange: "transform",
        }}
      >
        {repeated.map((item, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize,
              color,
              letterSpacing: "0.12em",
              marginRight: "60px",
              display: "inline-flex",
              alignItems: "center",
              gap: "28px",
              opacity: 0.9,
            }}
          >
            <span>{item}</span>
            <span style={{ fontSize: fontSize * 0.5, opacity: 0.4, color: COLORS.cobalt }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
