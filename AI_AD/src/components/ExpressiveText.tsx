import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { getHarmonicDrift, getSquashStretch } from "../utils/motion";

interface ExpressiveTextProps {
  text: string;
  startDelay?: number;
  charStagger?: number; // frames per character
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: string;
  direction?: "bottom" | "top" | "scale" | "3d-flip";
  highlightWords?: { word: string; color: string; bg?: string }[];
  style?: React.CSSProperties;
  enableDrift?: boolean;
  driftPhase?: number;
}

export const ExpressiveText: React.FC<ExpressiveTextProps> = ({
  text,
  startDelay = 0,
  charStagger = 1.2,
  fontSize = 90,
  fontWeight = 900,
  color = COLORS.white,
  letterSpacing = "-0.04em",
  direction = "3d-flip",
  highlightWords = [],
  style = {},
  enableDrift = true,
  driftPhase = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words breakdown
  const words = text.split(" ");
  let globalCharIndex = 0;

  const drift = enableDrift
    ? getHarmonicDrift(frame, { speed: 0.04, ampX: 4, ampY: 6, rotAmp: 0.8, phase: driftPhase })
    : { x: 0, y: 0, rotate: 0 };

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: fontSize * 0.28,
        rowGap: fontSize * 0.1,
        fontFamily: FONTS.display,
        letterSpacing,
        lineHeight: 0.95,
        perspective: 1200,
        transform: `translate3d(${drift.x}px, ${drift.y}px, 0) rotate(${drift.rotate}deg)`,
        willChange: "transform",
        ...style,
      }}
    >
      {words.map((word, wordIdx) => {
        const highlight = highlightWords.find(
          (h) => h.word.toLowerCase() === word.replace(/[^\w]/g, "").toLowerCase()
        );
        const wordColor = highlight ? highlight.color : color;
        const wordBg = highlight?.bg;

        const chars = word.split("");

        return (
          <span
            key={`${word}-${wordIdx}`}
            style={{
              display: "inline-flex",
              backgroundColor: wordBg,
              padding: wordBg ? "2px 16px" : undefined,
              borderRadius: wordBg ? fontSize * 0.14 : undefined,
              boxDecorationBreak: "clone",
              whiteSpace: "nowrap",
            }}
          >
            {chars.map((char, charIdx) => {
              const charDelay = startDelay + globalCharIndex * charStagger;
              globalCharIndex++;

              const progressSpring = spring({
                frame: frame - charDelay,
                fps,
                config: SPRINGS.punchy,
              });

              // Anticipation pull-back
              const localFrame = frame - charDelay;
              const anticipation =
                localFrame > -4 && localFrame < 0
                  ? Math.sin((localFrame + 4) / 4 * Math.PI) * -0.15
                  : 0;

              // Squash & stretch on arrival
              const landingProgress = Math.max(0, Math.min(1, (localFrame - 8) / 8));
              const { scaleX, scaleY } = getSquashStretch(
                progressSpring,
                landingProgress,
                "vertical"
              );

              // 3D transforms based on direction
              let transform = "";
              let opacity = 1;

              switch (direction) {
                case "3d-flip": {
                  const rotateX = interpolate(progressSpring, [0, 1], [85, 0]);
                  const translateY = interpolate(progressSpring, [0, 1], [120, 0]);
                  const z = interpolate(progressSpring, [0, 1], [-180, 0]);
                  opacity = interpolate(progressSpring, [0, 0.35, 1], [0, 1, 1]);
                  transform = `translate3d(0, ${translateY + anticipation * 40}%, ${z}px) rotateX(${rotateX}deg) scale(${scaleX}, ${scaleY})`;
                  break;
                }
                case "bottom": {
                  const translateY = interpolate(progressSpring, [0, 1], [140, 0]);
                  opacity = interpolate(progressSpring, [0, 0.3, 1], [0, 1, 1]);
                  transform = `translate3d(0, ${translateY}%, 0) scale(${scaleX}, ${scaleY})`;
                  break;
                }
                case "scale": {
                  const scale = interpolate(progressSpring, [0, 1], [0.1, 1]);
                  const rotate = interpolate(progressSpring, [0, 1], [15, 0]);
                  opacity = interpolate(progressSpring, [0, 0.4, 1], [0, 1, 1]);
                  transform = `scale(${scale * scaleX}, ${scale * scaleY}) rotate(${rotate}deg)`;
                  break;
                }
                default: {
                  const translateY = interpolate(progressSpring, [0, 1], [100, 0]);
                  opacity = interpolate(progressSpring, [0, 0.5, 1], [0, 1, 1]);
                  transform = `translate3d(0, ${translateY}%, 0)`;
                }
              }

              return (
                <span
                  key={`${char}-${charIdx}`}
                  style={{
                    display: "inline-block",
                    overflow: "visible",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize,
                      fontWeight,
                      color: wordColor,
                      transform,
                      transformOrigin: "50% 85%",
                      opacity,
                      willChange: "transform, opacity",
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
