import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { FLUID_EASE, subtleDrift } from "../utils/motion";

interface ExpressiveTextProps {
  text: string;
  startDelay?: number;
  wordStagger?: number; // frames per word
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: string;
  highlightWords?: { word: string; color: string; bg?: string }[];
  style?: React.CSSProperties;
  enableDrift?: boolean;
  driftPhase?: number;
  direction?: string; // for compatibility
  charStagger?: number; // for compatibility
}

export const ExpressiveText: React.FC<ExpressiveTextProps> = ({
  text,
  startDelay = 0,
  wordStagger = 3,
  fontSize = 80,
  fontWeight = 800,
  color = COLORS.titanium,
  letterSpacing = "-0.04em",
  highlightWords = [],
  style = {},
  enableDrift = false,
  driftPhase = 0,
}) => {
  const frame = useCurrentFrame();

  const words = text.split(" ");
  const drift = enableDrift
    ? subtleDrift(frame, { speed: 0.02, ampX: 2, ampY: 3, phase: driftPhase })
    : { x: 0, y: 0 };

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: fontSize * 0.28,
        rowGap: fontSize * 0.12,
        fontFamily: FONTS.display,
        letterSpacing,
        lineHeight: 1.02,
        transform: `translate3d(${drift.x}px, ${drift.y}px, 0)`,
        willChange: "transform",
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const delay = startDelay + idx * wordStagger;
        const progress = interpolate(frame, [delay, delay + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: FLUID_EASE,
        });

        const translateY = interpolate(progress, [0, 1], [115, 0]);
        const opacity = interpolate(progress, [0, 0.35, 1], [0, 1, 1]);
        const scale = interpolate(progress, [0, 1], [0.97, 1]);

        const highlight = highlightWords.find(
          (h) => h.word.toLowerCase() === word.replace(/[^\w]/g, "").toLowerCase()
        );
        const wordColor = highlight ? highlight.color : color;
        const wordBg = highlight?.bg;

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              lineHeight: 1.05,
              padding: wordBg ? "2px 14px" : "1px 0",
              borderRadius: wordBg ? fontSize * 0.14 : undefined,
              backgroundColor: wordBg,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                opacity,
                color: wordColor,
                fontSize,
                fontWeight,
                whiteSpace: "pre",
                willChange: "transform, opacity",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};
