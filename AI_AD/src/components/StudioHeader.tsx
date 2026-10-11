import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";
import { Crosshair } from "./GeometricShapes";

export const StudioHeader: React.FC<{
  dark?: boolean;
  tagline?: string;
  client?: string;
}> = ({ dark = false, tagline = "AUTONOMOUS MOTION GRAPHICS", client = "PULSE LABS // 2026" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textColor = dark ? COLORS.ink : COLORS.ivory;
  const borderColor = dark ? "rgba(14, 16, 19, 0.12)" : "rgba(246, 244, 238, 0.15)";
  const accentColor = COLORS.vermilion;

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
        padding: "40px 60px",
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
            backgroundColor: dark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
            padding: "6px 14px",
            borderRadius: 6,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
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
            opacity: 0.5,
            letterSpacing: "0.15em",
          }}
        >
          {tagline}
        </span>
      </div>

      {/* Center: Audio Wave Rhythm Visualizer Bars */}
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 6 + Math.abs(Math.sin((frame + i * 8) * 0.15)) * 18;
          return (
            <div
              key={i}
              style={{
                width: 2.5,
                height: h,
                backgroundColor: i % 4 === 0 ? accentColor : textColor,
                opacity: i % 4 === 0 ? 0.9 : 0.4,
                borderRadius: 1,
              }}
            />
          );
        })}
      </div>

      {/* Right: Technical Timecode and Spec */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span
          style={{
            fontSize: 11,
            color: textColor,
            opacity: 0.45,
            letterSpacing: "0.12em",
          }}
        >
          {client}
        </span>
        <div
          style={{
            padding: "6px 12px",
            backgroundColor: dark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
            borderRadius: 4,
            border: `1px solid ${borderColor}`,
            fontSize: 12,
            fontWeight: 700,
            color: textColor,
            letterSpacing: "0.08em",
          }}
        >
          00:00:{tcSeconds}:{tcFrames}
        </div>
      </div>

      {/* Framing Crosshairs */}
      <div style={{ position: "absolute", top: 40, left: 60 }}>
        <Crosshair size={18} color={borderColor} />
      </div>
      <div style={{ position: "absolute", top: 40, right: 60 }}>
        <Crosshair size={18} color={borderColor} />
      </div>
    </div>
  );
};
