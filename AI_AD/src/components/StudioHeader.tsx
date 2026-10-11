import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";
import { Crosshair } from "./GeometricShapes";

export const StudioHeader: React.FC<{
  dark?: boolean;
  tagline?: string;
  client?: string;
}> = ({ dark = false, tagline = "AUTONOMOUS MOTION GRAPHICS", client = "STUDIO AI // 2026" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textColor = dark ? COLORS.obsidian : COLORS.titanium;
  const borderColor = dark ? "rgba(9, 10, 14, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const accentColor = COLORS.cobalt;

  // Format timecode: 00:00:SS:FF
  const totalSeconds = Math.floor(frame / fps);
  const currentFrameOfSec = frame % fps;
  const tcSeconds = String(totalSeconds).padStart(2, "0");
  const tcFrames = String(currentFrameOfSec).padStart(2, "0");

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "38px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        fontFamily: FONTS.mono,
      }}
    >
      {/* Left: Studio Monogram & Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: dark ? "rgba(9, 10, 14, 0.05)" : "rgba(255, 255, 255, 0.06)",
            padding: "6px 14px",
            borderRadius: 8,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: textColor,
            }}
          >
            STUDIO.AI
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            color: textColor,
            opacity: 0.45,
            letterSpacing: "0.14em",
          }}
        >
          {tagline}
        </span>
      </div>

      {/* Center: Gentle Harmonic Audio Rhythm Wave */}
      <div style={{ display: "flex", alignItems: "center", gap: 3.5 }}>
        {Array.from({ length: 16 }).map((_, i) => {
          const h = 5 + Math.abs(Math.sin((frame + i * 6) * 0.07)) * 14;
          return (
            <div
              key={i}
              style={{
                width: 2,
                height: h,
                backgroundColor: i % 4 === 0 ? accentColor : textColor,
                opacity: i % 4 === 0 ? 0.8 : 0.25,
                borderRadius: 1,
              }}
            />
          );
        })}
      </div>

      {/* Right: Technical Spec & Timecode */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span
          style={{
            fontSize: 11,
            color: textColor,
            opacity: 0.4,
            letterSpacing: "0.12em",
          }}
        >
          {client}
        </span>
        <div
          style={{
            padding: "5px 12px",
            backgroundColor: dark ? "rgba(9, 10, 14, 0.05)" : "rgba(255, 255, 255, 0.06)",
            borderRadius: 6,
            border: `1px solid ${borderColor}`,
            fontSize: 11,
            fontWeight: 600,
            color: textColor,
            letterSpacing: "0.08em",
          }}
        >
          00:00:{tcSeconds}:{tcFrames}
        </div>
      </div>

      {/* Framing Crosshairs */}
      <div style={{ position: "absolute", top: 38, left: 64 }}>
        <Crosshair size={16} color={borderColor} />
      </div>
      <div style={{ position: "absolute", top: 38, right: 64 }}>
        <Crosshair size={16} color={borderColor} />
      </div>
    </div>
  );
};
