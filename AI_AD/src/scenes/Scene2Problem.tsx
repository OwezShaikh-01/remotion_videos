import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { StaggeredText } from "../components/KineticText";
import { Crosshair } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance slide from bottom
  const enterSpring = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
  });
  const enterY = interpolate(enterSpring, [0, 1], [100, 0]);

  // Card staggered springs
  const card1Spring = spring({ frame: frame - 15, fps, config: SPRINGS.bouncy });
  const card2Spring = spring({ frame: frame - 30, fps, config: SPRINGS.bouncy });
  const card3Spring = spring({ frame: frame - 45, fps, config: SPRINGS.bouncy });

  // Progress bar in Card 1 that gets stuck at 99%
  const progressPercent = Math.min(99, interpolate(frame, [15, 60], [10, 99]));

  // File version stepper in Card 3
  const fileNames = [
    "motion_v1.mp4",
    "motion_v2_client_edit.mp4",
    "motion_v6_final.mp4",
    "motion_v14_FINAL_FINAL_v3.mp4",
  ];
  const fileIndex = Math.min(3, Math.floor(interpolate(frame, [45, 95], [0, 3.99])));

  // The giant OBSOLETE stamp slams down at frame 85
  const stampSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 7, mass: 0.5, stiffness: 300 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3.5, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);

  // Camera shake when stamp slams
  const shake =
    frame >= 85 && frame <= 100
      ? Math.sin(frame * 1.5) * interpolate(frame, [85, 100], [12, 0])
      : 0;

  // Outro transition (frames 125-145)
  const exitSlide = spring({
    frame: frame - 128,
    fps,
    config: SPRINGS.snappy,
  });
  const exitX = interpolate(exitSlide, [0, 1], [0, -100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ivory,
        color: COLORS.ink,
        fontFamily: FONTS.display,
        transform: `translate(${exitX}%, ${enterY + shake}px)`,
        overflow: "hidden",
      }}
    >
      <StudioHeader dark={true} tagline="PROBLEM / 02 • THE REALITY" />

      {/* Background Graphic Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `linear-gradient(${COLORS.ink} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.ink} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
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
          borderBottom: `2px solid ${COLORS.ink}`,
          paddingBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 800,
              color: COLORS.vermilion,
              letterSpacing: "0.2em",
              marginBottom: 8,
            }}
          >
            EXHIBIT A // TRADITIONAL WORKFLOW
          </div>
          <StaggeredText
            sentence="THE CREATIVE CYCLE OF TEARS."
            startDelay={5}
            staggerFrames={2}
            color={COLORS.ink}
            fontSize={64}
            fontWeight={900}
            letterSpacing="-0.04em"
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.gray,
            }}
          >
            AVG TIMELINE: 21 DAYS
            <br />
            AVG SATISFACTION: 34%
          </span>
        </div>
      </div>

      {/* Three Pain-Point Cards */}
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
        {/* Card 1: Render Hell */}
        <div
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: "36px 32px",
            border: "1px solid rgba(14, 16, 19, 0.12)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
            transform: `scale(${card1Spring}) translateY(${interpolate(card1Spring, [0, 1], [40, 0])}px)`,
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
                  fontSize: 12,
                  fontWeight: 800,
                  backgroundColor: "rgba(255, 59, 20, 0.12)",
                  color: COLORS.vermilion,
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                01 / RENDER HELL
              </span>
              <Crosshair size={18} color="rgba(0,0,0,0.2)" />
            </div>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
              }}
            >
              Crashed at 99.8%.
            </h3>
            <p
              style={{
                fontSize: 16,
                color: COLORS.gray,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Fans screaming like jet engines. Out of memory error. Start all over.
            </p>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              <span>EXPORT PROGRESS</span>
              <span style={{ color: COLORS.vermilion }}>{progressPercent.toFixed(0)}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 12,
                backgroundColor: "rgba(0,0,0,0.06)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  backgroundColor: COLORS.vermilion,
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Feedback Loop */}
        <div
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: "36px 32px",
            border: "1px solid rgba(14, 16, 19, 0.12)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
            transform: `scale(${card2Spring}) translateY(${interpolate(card2Spring, [0, 1], [40, 0])}px)`,
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
                  fontSize: 12,
                  fontWeight: 800,
                  backgroundColor: "rgba(22, 52, 254, 0.12)",
                  color: COLORS.cobalt,
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                02 / VAGUE FEEDBACK
              </span>
              <Crosshair size={18} color="rgba(0,0,0,0.2)" />
            </div>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
              }}
            >
              “Can you make it pop?”
            </h3>
            <p
              style={{
                fontSize: 16,
                color: COLORS.gray,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Subjective notes. Endless Slack threads. Nobody knows what “pop” means.
            </p>
          </div>

          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "rgba(22, 52, 254, 0.05)",
              borderRadius: 14,
              border: "1px dashed rgba(22, 52, 254, 0.25)",
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLORS.cobalt,
            }}
          >
            💬 “Also we changed the brand palette. Can we redo all 40 assets?”
          </div>
        </div>

        {/* Card 3: Version Hell */}
        <div
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: "36px 32px",
            border: "1px solid rgba(14, 16, 19, 0.12)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
            transform: `scale(${card3Spring}) translateY(${interpolate(card3Spring, [0, 1], [40, 0])}px)`,
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
                  fontSize: 12,
                  fontWeight: 800,
                  backgroundColor: "rgba(14, 16, 19, 0.08)",
                  color: COLORS.ink,
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                03 / VERSION PURGATORY
              </span>
              <Crosshair size={18} color="rgba(0,0,0,0.2)" />
            </div>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
              }}
            >
              14 Revisions Deep.
            </h3>
            <p
              style={{
                fontSize: 16,
                color: COLORS.gray,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Which file was the client-approved cut again? Nobody knows.
            </p>
          </div>

          <div
            style={{
              padding: "14px 16px",
              backgroundColor: COLORS.ink,
              borderRadius: 12,
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: COLORS.acidYellow,
              fontWeight: 700,
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

      {/* The Giant Red OBSOLETE Stamp */}
      {frame >= 85 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampScale})`,
            zIndex: 100,
            opacity: stampOpacity,
            border: `10px solid ${COLORS.vermilion}`,
            borderRadius: 24,
            padding: "20px 60px",
            backgroundColor: "rgba(255, 59, 20, 0.92)",
            boxShadow: "0 30px 80px rgba(255, 59, 20, 0.4)",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: 110,
              color: COLORS.white,
              letterSpacing: "0.08em",
              display: "block",
              textTransform: "uppercase",
            }}
          >
            OBSOLETE
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
