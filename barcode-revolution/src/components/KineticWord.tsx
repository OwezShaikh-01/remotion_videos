import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KineticWordProps {
  text: string;
  triggerFrame: number;
  fontSize?: number;
  color?: string;
  highlightColor?: string;
  rotation?: number;
  fontFamily?: string;
  style?: React.CSSProperties;
}

export const KineticWord: React.FC<KineticWordProps> = ({
  text,
  triggerFrame,
  fontSize = 96,
  color = "#FFFFFF",
  highlightColor,
  rotation = 0,
  fontFamily = "'Impact', 'Arial Black', sans-serif",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < triggerFrame) return null;

  const progress = spring({
    frame: frame - triggerFrame,
    fps,
    config: { damping: 11, stiffness: 160, mass: 0.8 },
  });

  const scale = progress;
  const opacity = Math.min(1, (frame - triggerFrame) * 0.25);

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        color,
        textTransform: "uppercase",
        letterSpacing: "-1px",
        lineHeight: 0.95,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        display: "inline-block",
        textShadow: "0 10px 40px rgba(0,0,0,0.8)",
        ...style,
      }}
    >
      {highlightColor ? (
        <span style={{ color: highlightColor }}>{text}</span>
      ) : (
        text
      )}
    </div>
  );
};
