import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";

interface MarqueeProps {
  items: string[];
  speed?: number; // pixels per frame
  fontSize?: number;
  bg?: string;
  color?: string;
  rotate?: number;
  reverse?: boolean;
  style?: React.CSSProperties;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 4,
  fontSize = 32,
  bg = COLORS.vermilion,
  color = COLORS.white,
  rotate = 0,
  reverse = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const direction = reverse ? -1 : 1;
  const offset = (frame * speed * direction) % 1200;

  // Repeat items enough to create seamless loop
  const repeated = [...items, ...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: bg,
        transform: `rotate(${rotate}deg)`,
        whiteSpace: "nowrap",
        userSelect: "none",
        padding: "12px 0",
        borderTop: `1px solid rgba(0,0,0,0.1)`,
        borderBottom: `1px solid rgba(0,0,0,0.1)`,
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-block",
          transform: `translateX(-${offset}px)`,
          willChange: "transform",
        }}
      >
        {repeated.map((item, idx) => (
          <span
            key={idx}
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize,
              color,
              letterSpacing: "0.08em",
              marginRight: "48px",
              display: "inline-flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <span>{item}</span>
            <span style={{ fontSize: fontSize * 0.6, opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
