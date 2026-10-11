import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { FLUID_EASE } from "../utils/motion";

export const Scene5ValueProp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Outro transition (frames 126 - 145)
  const exitProgress = interpolate(frame, [126, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const exitOpacity = interpolate(exitProgress, [0, 0.8, 1], [1, 0.9, 0]);

  // Smooth counter calculation
  const counterProgress = interpolate(frame, [8, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const counterConcepts = Math.min(100, Math.floor(interpolate(counterProgress, [0, 1], [1, 100])));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.galleryIvory,
        color: COLORS.obsidian,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale})`,
        opacity: enterOpacity * exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig zoomStart={1} zoomEnd={1.025} panXStart={0} panXEnd={10}>
        <StudioHeader dark={true} tagline="VALUE / 05 • SCALE UNLIMITED" />

        {/* Subtle Architectural Grid */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.05,
            backgroundImage: `linear-gradient(${COLORS.obsidian} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.obsidian} 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Rotating Accent Badge in Bottom Right */}
        <div style={{ position: "absolute", bottom: 120, right: 120 }}>
          <BadgeSeal
            size={180}
            bg={COLORS.obsidian}
            color={COLORS.titanium}
            centerText="100x"
            subText="LEVERAGE"
            delay={12}
            rotationSpeed={0.3}
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
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginBottom: 16,
              color: COLORS.cobalt,
            }}
          >
            FORCE MULTIPLIER FOR AMBITIOUS TEAMS
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 28, marginBottom: 18 }}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 160,
                fontWeight: 900,
                letterSpacing: "-0.07em",
                lineHeight: 0.85,
                color: COLORS.obsidian,
              }}
            >
              {counterConcepts}+
            </div>
            <div>
              <ExpressiveText
                text="CONCEPTS BEFORE"
                startDelay={6}
                wordStagger={3}
                color={COLORS.obsidian}
                fontSize={80}
                fontWeight={800}
                letterSpacing="-0.04em"
              />
              <div style={{ marginTop: 8 }}>
                <ExpressiveText
                  text="YOUR MORNING COFFEE."
                  startDelay={14}
                  wordStagger={3}
                  color={COLORS.cobalt}
                  fontSize={85}
                  fontWeight={800}
                  letterSpacing="-0.04em"
                />
              </div>
            </div>
          </div>

          {/* Clean Editorial Comparison Box */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 34,
              marginTop: 44,
              maxWidth: 1120,
            }}
          >
            {/* Legacy Approach */}
            <div
              style={{
                backgroundColor: COLORS.ivorySurface,
                borderRadius: 22,
                padding: "32px 34px",
                border: `1px solid ${COLORS.borderLight}`,
                boxShadow: "0 12px 30px rgba(9, 10, 14, 0.04)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS.mutedTextLight,
                  marginBottom: 12,
                }}
              >
                LEGACY DESIGN PIPELINE
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, opacity: 0.65 }}>
                3–4 Weeks per Asset
              </div>
              <div style={{ fontSize: 16, color: COLORS.mutedTextLight, lineHeight: 1.6 }}>
                • $5,000–$20,000 per video
                <br />
                • Strict limit of 2 revision rounds
                <br />
                • Fragmented cross-platform delivery
              </div>
            </div>

            {/* AI Motion Designer */}
            <div
              style={{
                backgroundColor: COLORS.obsidian,
                color: COLORS.titanium,
                borderRadius: 22,
                padding: "32px 34px",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS.cobalt,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: COLORS.cobalt,
                    boxShadow: `0 0 10px ${COLORS.cobalt}`,
                  }}
                />
                AUTONOMOUS MOTION
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  marginBottom: 10,
                  color: COLORS.titanium,
                }}
              >
                Minutes, Not Weeks.
              </div>
              <div style={{ fontSize: 16, color: "rgba(248, 249, 250, 0.75)", lineHeight: 1.6 }}>
                • Infinite scale across 16:9, 9:16, 1:1
                <br />
                • Real-time programmatic iteration
                <br />
                • High-touch craft at software speed
              </div>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
