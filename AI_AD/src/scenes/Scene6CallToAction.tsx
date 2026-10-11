import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { StaggeredText } from "../components/KineticText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";

export const Scene6CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Button spring
  const btnSpring = spring({ frame: frame - 25, fps, config: SPRINGS.bouncy });

  // Cursor gliding into button
  const cursorProgress = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [1400, 1140]);
  const cursorY = interpolate(cursorProgress, [0, 1], [850, 580]);

  // Click pulse at frame 60
  const isClicked = frame >= 60;
  const clickSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 8, mass: 0.4, stiffness: 350 },
  });
  const btnPressScale = isClicked ? interpolate(clickSpring, [0, 0.3, 1], [1, 0.94, 1]) : 1;

  // Final lockup fadeout/settle
  const settleSpring = spring({
    frame: frame - 105,
    fps,
    config: SPRINGS.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale * (1 + settleSpring * 0.03)})`,
        opacity: enterOpacity,
        overflow: "hidden",
      }}
    >
      <StudioHeader dark={false} tagline="FINALE / 06 • INITIATE" />

      {/* Atmospheric Radial Spotlight */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          height: 800,
          background: "radial-gradient(circle, rgba(255,59,20,0.12) 0%, rgba(22,52,254,0.06) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Rotating Studio Stamp in Top Right */}
      <div style={{ position: "absolute", top: 120, right: 120 }}>
        <BadgeSeal
          size={160}
          bg={COLORS.vermilion}
          color={COLORS.white}
          centerText="HIRE"
          subText="NOW"
          delay={10}
          rotationSpeed={1.2}
        />
      </div>

      {/* Centered Grand Typography */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "46%",
          transform: "translateY(-50%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "8px 22px",
            borderRadius: 999,
            marginBottom: 28,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.emerald }} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: "0.2em",
            }}
          >
            AVAILABLE FOR IMMEDIATE PRODUCTION
          </span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <StaggeredText
            sentence="READY TO OUT-MOVE"
            startDelay={8}
            staggerFrames={2}
            color={COLORS.ivory}
            fontSize={92}
            fontWeight={900}
            letterSpacing="-0.05em"
            style={{ justifyContent: "center" }}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <StaggeredText
            sentence="YOUR COMPETITION?"
            startDelay={16}
            staggerFrames={2}
            color={COLORS.vermilion}
            fontSize={105}
            fontWeight={900}
            letterSpacing="-0.06em"
            style={{ justifyContent: "center" }}
          />
        </div>

        {/* Interactive CTA Magnetic Button */}
        <div
          style={{
            transform: `scale(${btnSpring * btnPressScale})`,
            display: "inline-block",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
              backgroundColor: isClicked ? COLORS.acidYellow : COLORS.white,
              color: COLORS.ink,
              padding: "24px 54px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              boxShadow: isClicked
                ? `0 0 50px ${COLORS.acidYellow}`
                : "0 20px 60px rgba(255,255,255,0.25)",
              transition: "background-color 0.2s ease",
            }}
          >
            <span>HIRE YOUR AI MOTION DESIGNER</span>
            <span style={{ fontSize: 32, transform: "translateY(-2px)" }}>→</span>
          </div>

          {/* Ripple shockwave when clicked */}
          {isClicked && (
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: 999,
                border: `3px solid ${COLORS.acidYellow}`,
                opacity: interpolate(clickSpring, [0, 1], [1, 0]),
                transform: `scale(${interpolate(clickSpring, [0, 1], [1, 1.4])})`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Website & Direct Contact info */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            hire-ai-motion.design
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLORS.gray,
              marginTop: 10,
              letterSpacing: "0.1em",
            }}
          >
            FULL COMMISSIONS • DESIGN SYSTEMS • HIGH VELOCITY SOCIAL
          </div>
        </div>
      </div>

      {/* Animated Mouse Cursor Vector */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          pointerEvents: "none",
          zIndex: 99,
          transform: `scale(${isClicked ? 0.9 : 1})`,
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
        }}
      >
        <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
          <path
            d="M2 2L13.5 37.5L18.5 24.5L31.5 20.5L2 2Z"
            fill={COLORS.white}
            stroke={COLORS.ink}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
