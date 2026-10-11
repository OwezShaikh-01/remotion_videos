import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS } from "../theme";

interface KineticWordProps {
  text: string;
  delay?: number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: string;
  fontFamily?: string;
  direction?: "up" | "down" | "left" | "right";
  rotate?: number;
  skew?: number;
  scaleInitial?: number;
  springConfig?: typeof SPRINGS.snappy;
  style?: React.CSSProperties;
}

export const KineticWord: React.FC<KineticWordProps> = ({
  text,
  delay = 0,
  color = "#FFFFFF",
  fontSize = 90,
  fontWeight = 900,
  letterSpacing = "-0.04em",
  fontFamily,
  direction = "up",
  rotate = 0,
  skew = 0,
  scaleInitial = 0.9,
  springConfig = SPRINGS.punchy,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  const getTranslate = () => {
    switch (direction) {
      case "up":
        return `translateY(${interpolate(anim, [0, 1], [110, 0])}%)`;
      case "down":
        return `translateY(${interpolate(anim, [0, 1], [-110, 0])}%)`;
      case "left":
        return `translateX(${interpolate(anim, [0, 1], [110, 0])}%)`;
      case "right":
        return `translateX(${interpolate(anim, [0, 1], [-110, 0])}%)`;
    }
  };

  const scale = interpolate(anim, [0, 1], [scaleInitial, 1]);
  const currentRotate = interpolate(anim, [0, 1], [rotate, 0]);
  const currentSkew = interpolate(anim, [0, 1], [skew, 0]);
  const opacity = interpolate(anim, [0, 0.4, 1], [0, 1, 1]);

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        lineHeight: 0.95,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: `${getTranslate()} scale(${scale}) rotate(${currentRotate}deg) skewX(${currentSkew}deg)`,
          transformOrigin: "bottom left",
          color,
          fontSize,
          fontWeight,
          letterSpacing,
          fontFamily,
          opacity,
          whiteSpace: "pre",
          ...style,
        }}
      >
        {text}
      </span>
    </span>
  );
};

interface StaggeredTextProps {
  sentence: string;
  startDelay?: number;
  staggerFrames?: number;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: string;
  fontFamily?: string;
  direction?: "up" | "down" | "left" | "right";
  rotate?: number;
  skew?: number;
  springConfig?: typeof SPRINGS.snappy;
  style?: React.CSSProperties;
  wordGap?: number;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  sentence,
  startDelay = 0,
  staggerFrames = 2,
  color,
  fontSize = 80,
  fontWeight = 900,
  letterSpacing = "-0.04em",
  fontFamily,
  direction = "up",
  rotate = 6,
  skew = 3,
  springConfig = SPRINGS.punchy,
  style = {},
  wordGap = 16,
}) => {
  const words = sentence.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `${wordGap}px`,
        alignItems: "baseline",
        ...style,
      }}
    >
      {words.map((word, i) => (
        <KineticWord
          key={`${word}-${i}`}
          text={word}
          delay={startDelay + i * staggerFrames}
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fontFamily={fontFamily}
          direction={direction}
          rotate={rotate * (i % 2 === 0 ? 1 : -1)}
          skew={skew}
          springConfig={springConfig}
        />
      ))}
    </div>
  );
};
