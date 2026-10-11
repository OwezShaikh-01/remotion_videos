import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { KineticWord, StaggeredText } from "../components/KineticText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";

export const Scene5ValueProp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance slide from left
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterX = interpolate(enterSpring, [0, 1], [-100, 0]);

  // Outro transition (frames 125 - 140)
  const exitSpring = spring({ frame: frame - 126, fps, config: SPRINGS.snappy });
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0.9]);
  const exitOpacity = interpolate(exitSpring, [0, 1], [1, 0]);

  const counterConcepts = Math.min(
    100,
    Math.floor(interpolate(frame, [15, 60], [1, 100]))
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.acidYellow,
        color: COLORS.ink,
        fontFamily: FONTS.display,
        transform: `translateX(${enterX}%) scale(${exitScale})`,
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <StudioHeader dark={true} tagline="VALUE / 05 • SCALE UNLIMITED" />

      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `linear-gradient(${COLORS.ink} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.ink} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Rotating Accent Asterisk */}
      <div style={{ position: "absolute", bottom: 120, right: 120 }}>
        <BadgeSeal
          size={180}
          bg={COLORS.ink}
          color={COLORS.acidYellow}
          centerText="100x"
          subText="LEVERAGE"
          delay={20}
          rotationSpeed={1.5}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 1600,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.2em",
            marginBottom: 16,
            color: COLORS.ink,
            opacity: 0.7,
          }}
        >
          FORCE MULTIPLIER FOR AMBITIOUS TEAMS
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 28, marginBottom: 16 }}>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 160,
              fontWeight: 900,
              letterSpacing: "-0.07em",
              lineHeight: 0.85,
            }}
          >
            {counterConcepts}+
          </div>
          <div>
            <StaggeredText
              sentence="CONCEPTS BEFORE"
              startDelay={10}
              staggerFrames={2}
              color={COLORS.ink}
              fontSize={80}
              fontWeight={900}
              letterSpacing="-0.04em"
            />
            <div style={{ marginTop: 8 }}>
              <KineticWord
                text="YOUR MORNING COFFEE."
                color={COLORS.vermilion}
                fontSize={85}
                fontWeight={900}
                letterSpacing="-0.04em"
                delay={20}
              />
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Box */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginTop: 44,
            maxWidth: 1100,
          }}
        >
          {/* Legacy Agency */}
          <div
            style={{
              backgroundColor: "rgba(14, 16, 19, 0.08)",
              borderRadius: 20,
              padding: "28px 32px",
              border: "1px solid rgba(14, 16, 19, 0.15)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 800,
                color: COLORS.gray,
                marginBottom: 12,
              }}
            >
              LEGACY FREELANCER / AGENCY
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, opacity: 0.6 }}>
              3–4 Weeks per Asset
            </div>
            <div style={{ fontSize: 16, color: COLORS.ink, opacity: 0.6, lineHeight: 1.5 }}>
              • $5,000–$20,000 per video
              <br />
              • Limit 2 round revisions
              <br />
              • Painfully slow turnaround
            </div>
          </div>

          {/* AI Motion Designer */}
          <div
            style={{
              backgroundColor: COLORS.ink,
              color: COLORS.white,
              borderRadius: 20,
              padding: "28px 32px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 800,
                color: COLORS.acidYellow,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.acidYellow }} />
              AI MOTION DESIGNER
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 8,
                color: COLORS.acidYellow,
              }}
            >
              Minutes, Not Weeks.
            </div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              • Infinite scale across 16:9, 9:16, 1:1
              <br />
              • Real-time programmatic tweaks
              <br />
              • High-touch craft at software speed
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
