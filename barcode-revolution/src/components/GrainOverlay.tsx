import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle organic flicker
  const flicker = interpolate(
    Math.sin(frame * 0.7) * Math.cos(frame * 0.3),
    [-1, 1],
    [0.05, 0.09]
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {/* 35mm Procedural SVG Grain */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: flicker,
          mixBlendMode: "overlay",
        }}
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Cinematic Deep Edge Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(4, 5, 8, 0.75) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
