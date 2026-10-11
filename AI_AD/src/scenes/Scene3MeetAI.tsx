import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { StaggeredText } from "../components/KineticText";
import { BezierGraph } from "../components/BezierGraph";
import { BadgeSeal } from "../components/BadgeSeal";
import { Asterisk, PillTag } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";

export const Scene3MeetAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance wipe from right
  const enterSpring = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
  });
  const enterX = interpolate(enterSpring, [0, 1], [100, 0]);

  // Graph appearance spring
  const graphSpring = spring({
    frame: frame - 25,
    fps,
    config: SPRINGS.bouncy,
  });

  // Outro transition (frames 145-165)
  const exitSlide = spring({
    frame: frame - 148,
    fps,
    config: SPRINGS.snappy,
  });
  const exitScale = interpolate(exitSlide, [0, 1], [1, 1.15]);
  const exitOpacity = interpolate(exitSlide, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070E24", // Deep luxury Cobalt Night
        color: COLORS.white,
        fontFamily: FONTS.display,
        transform: `translateX(${enterX}%) scale(${exitScale})`,
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <StudioHeader tagline="INNOVATION / 03 • THE REVOLUTION" />

      {/* Background Graphic Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `linear-gradient(${COLORS.cobaltLight} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cobaltLight} 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Decorative Asterisk */}
      <div style={{ position: "absolute", top: 120, right: 100 }}>
        <Asterisk size={75} color={COLORS.acidYellow} rotationSpeed={1.5} />
      </div>

      {/* Left Column: Big Kinetic Typography & Value Props */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 950,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(228, 248, 53, 0.12)",
            border: `1px solid ${COLORS.acidYellow}`,
            padding: "8px 20px",
            borderRadius: 999,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: COLORS.acidYellow,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 800,
              color: COLORS.acidYellow,
              letterSpacing: "0.15em",
            }}
          >
            ENTER THE NEXT PARADIGM
          </span>
        </div>

        <div style={{ marginBottom: 12 }}>
          <StaggeredText
            sentence="MEET YOUR NEW LEAD"
            startDelay={8}
            staggerFrames={2}
            color={COLORS.white}
            fontSize={78}
            fontWeight={900}
            letterSpacing="-0.04em"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <StaggeredText
            sentence="MOTION DESIGNER."
            startDelay={16}
            staggerFrames={2}
            color={COLORS.acidYellow}
            fontSize={88}
            fontWeight={900}
            letterSpacing="-0.05em"
          />
        </div>

        <div style={{ marginTop: 24, maxWidth: 760 }}>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: 1.45,
              fontWeight: 400,
              margin: "0 0 32px 0",
            }}
          >
            Autonomous choreography. Millisecond iteration. Math-perfect easing curves.
            Ready to design 24 hours a day without burnout.
          </p>
        </div>

        {/* Metric Badges */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <PillTag
            label="⚡ 120× FASTER RENDERS"
            color={COLORS.white}
            bg="rgba(255, 59, 20, 0.25)"
            border="1px solid rgba(255, 59, 20, 0.5)"
            delay={35}
          />
          <PillTag
            label="🎯 ZERO KEYFRAME FATIGUE"
            color={COLORS.acidYellow}
            bg="rgba(228, 248, 53, 0.15)"
            border="1px solid rgba(228, 248, 53, 0.4)"
            delay={45}
          />
          <PillTag
            label="💎 STUDIO-GRADE FINISH"
            color={COLORS.white}
            bg="rgba(255, 255, 255, 0.12)"
            border="1px solid rgba(255, 255, 255, 0.25)"
            delay={55}
          />
        </div>
      </div>

      {/* Right Column: Speed Bezier Graph Editor Showcase */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "50%",
          transform: `translateY(-50%) scale(${graphSpring})`,
          transformOrigin: "center right",
          zIndex: 10,
        }}
      >
        <BezierGraph width={620} height={380} accentColor={COLORS.vermilion} />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BadgeSeal
              size={110}
              bg={COLORS.vermilion}
              color={COLORS.white}
              centerText="60"
              subText="FPS"
              delay={30}
              rotationSpeed={1.4}
            />
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              <div style={{ color: COLORS.white, fontWeight: 700 }}>AUTONOMOUS EASING</div>
              <div>Sub-pixel vector interpolation</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
