import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { Crosshair } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { FLUID_EASE } from "../utils/motion";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Three cards glide in with silky staggered timing
  const card1Progress = interpolate(frame, [10, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const card2Progress = interpolate(frame, [18, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const card3Progress = interpolate(frame, [26, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  // Smooth progress bar in Card 1
  const progressPercent = interpolate(frame, [15, 65], [10, 99.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  // File version stepper in Card 3
  const fileNames = [
    "motion_v1.mp4",
    "motion_v2_client_edit.mp4",
    "motion_v6_final.mp4",
    "motion_v14_FINAL_REAL_v3.mp4",
  ];
  const fileIndex = Math.min(3, Math.floor(interpolate(frame, [35, 80], [0, 3.99], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  // Authoritative Solution Pill Badge (glides in at frame 70 with silky elegance)
  const badgeProgress = interpolate(frame, [70, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  // Fluid exit transition (frames 132-150)
  const exitProgress = interpolate(frame, [132, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const exitOpacity = interpolate(exitProgress, [0, 0.8, 1], [1, 0.9, 0]);

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
      <CameraRig zoomStart={1} zoomEnd={1.025} panXStart={0} panXEnd={12}>
        <StudioHeader dark={true} tagline="PROBLEM / 02 • THE FRICTION OF THE PAST" />

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

        {/* Title Section */}
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 120,
            right: 120,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: `1px solid ${COLORS.borderLight}`,
            paddingBottom: 24,
            zIndex: 10,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.cobalt,
                letterSpacing: "0.18em",
                marginBottom: 8,
              }}
            >
              LEGACY WORKFLOW FRICTION
            </div>
            <ExpressiveText
              text="THE CREATIVE BOTTLENECK IS REAL."
              startDelay={4}
              wordStagger={3}
              color={COLORS.obsidian}
              fontSize={60}
              fontWeight={800}
              letterSpacing="-0.04em"
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.mutedTextLight,
                lineHeight: 1.5,
              }}
            >
              AVERAGE TIMELINE: 3–4 WEEKS
              <br />
              ITERATION LATENCY: HIGH
            </span>
          </div>
        </div>

        {/* Three Silky Elevated Glass Cards */}
        <div
          style={{
            position: "absolute",
            top: 310,
            left: 120,
            right: 120,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 36,
          }}
        >
          {/* Card 1: Render Delay */}
          <div
            style={{
              backgroundColor: COLORS.ivorySurface,
              borderRadius: 24,
              padding: "36px 32px",
              border: `1px solid ${COLORS.borderLight}`,
              boxShadow: "0 18px 45px rgba(9, 10, 14, 0.05)",
              transform: `translate3d(0, ${interpolate(card1Progress, [0, 1], [30, 0])}px, 0)`,
              opacity: card1Progress,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: "rgba(13, 37, 244, 0.08)",
                    color: COLORS.cobalt,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  01 / RENDER FATIGUE
                </span>
                <Crosshair size={16} color="rgba(0,0,0,0.15)" />
              </div>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  margin: "0 0 16px 0",
                }}
              >
                Stalled Exports.
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: COLORS.mutedTextLight,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Heavy timelines crawling on local hardware. Lost momentum between concepts.
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                <span>PIPELINE VELOCITY</span>
                <span style={{ color: COLORS.cobalt }}>{progressPercent.toFixed(1)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 8,
                  backgroundColor: "rgba(9, 10, 14, 0.06)",
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    backgroundColor: COLORS.cobalt,
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Subjective Feedback */}
          <div
            style={{
              backgroundColor: COLORS.ivorySurface,
              borderRadius: 24,
              padding: "36px 32px",
              border: `1px solid ${COLORS.borderLight}`,
              boxShadow: "0 18px 45px rgba(9, 10, 14, 0.05)",
              transform: `translate3d(0, ${interpolate(card2Progress, [0, 1], [30, 0])}px, 0)`,
              opacity: card2Progress,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: "rgba(9, 10, 14, 0.06)",
                    color: COLORS.obsidian,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  02 / ITERATION FRICTION
                </span>
                <Crosshair size={16} color="rgba(0,0,0,0.15)" />
              </div>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  margin: "0 0 16px 0",
                }}
              >
                Subjective Revisions.
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: COLORS.mutedTextLight,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Endless rounds of vague notes. Days wasted adjusting single keyframe handles.
              </p>
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(9, 10, 14, 0.03)",
                borderRadius: 14,
                border: "1px solid rgba(9, 10, 14, 0.08)",
                fontFamily: FONTS.mono,
                fontSize: 13,
                color: COLORS.obsidian,
              }}
            >
              💬 “Can we tweak the easing across all 30 cuts?”
            </div>
          </div>

          {/* Card 3: Version Hell */}
          <div
            style={{
              backgroundColor: COLORS.ivorySurface,
              borderRadius: 24,
              padding: "36px 32px",
              border: `1px solid ${COLORS.borderLight}`,
              boxShadow: "0 18px 45px rgba(9, 10, 14, 0.05)",
              transform: `translate3d(0, ${interpolate(card3Progress, [0, 1], [30, 0])}px, 0)`,
              opacity: card3Progress,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                    color: COLORS.amber,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  03 / VERSION PURGATORY
                </span>
                <Crosshair size={16} color="rgba(0,0,0,0.15)" />
              </div>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  margin: "0 0 16px 0",
                }}
              >
                Fragmented Assets.
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: COLORS.mutedTextLight,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Multiple formats, aspect ratios, and languages impossible to maintain manually.
              </p>
            </div>

            <div
              style={{
                padding: "14px 18px",
                backgroundColor: COLORS.obsidian,
                borderRadius: 12,
                fontFamily: FONTS.mono,
                fontSize: 12,
                color: COLORS.titanium,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>📁</span>
              <span>{fileNames[fileIndex]}</span>
            </div>
          </div>
        </div>

        {/* Sophisticated Editorial Resolution Banner */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: `translate(-50%, ${interpolate(badgeProgress, [0, 1], [30, 0])}px)`,
            opacity: badgeProgress,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            backgroundColor: COLORS.obsidian,
            color: COLORS.titanium,
            padding: "12px 30px",
            borderRadius: 999,
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: COLORS.cobalt,
              boxShadow: `0 0 10px ${COLORS.cobalt}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            THE RESOLUTION: PROGRAMMATIC MOTION BY DESIGN
          </span>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
