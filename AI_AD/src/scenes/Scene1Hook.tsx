import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { Marquee } from "../components/Marquee";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { LiquidGeometry } from "../components/LiquidGeometry";
import { FLUID_EASE } from "../utils/motion";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cinematic entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Gentle, fluid scene exit transition (frames 124 - 140)
  const exitProgress = interpolate(frame, [124, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.04]);
  const exitOpacity = interpolate(exitProgress, [0, 0.8, 1], [1, 0.9, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.obsidian,
        color: COLORS.titanium,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale * exitScale})`,
        opacity: enterOpacity * exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig zoomStart={1} zoomEnd={1.03} panXStart={0} panXEnd={-12}>
        <StudioHeader dark={false} tagline="PROLOGUE / 01 • THE NEW STANDARD" />

        {/* Ambient Soft Studio Glow */}
        <div style={{ position: "absolute", top: "20%", right: "15%", opacity: 0.6 }}>
          <LiquidGeometry size={650} color={COLORS.cobalt} delay={0} />
        </div>
        <div style={{ position: "absolute", bottom: "10%", left: "10%", opacity: 0.35 }}>
          <LiquidGeometry size={500} color={COLORS.amber} delay={15} />
        </div>

        {/* Subtle Architectural Grid */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.05,
            backgroundImage: `linear-gradient(${COLORS.titanium} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.titanium} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Refined Studio Seal in Bottom Left */}
        <div style={{ position: "absolute", bottom: 120, left: 100 }}>
          <BadgeSeal
            size={160}
            bg="rgba(255, 255, 255, 0.04)"
            color={COLORS.titanium}
            centerText="AI"
            subText="STUDIO"
            delay={10}
            rotationSpeed={0.3}
          />
        </div>

        {/* Main Fluid Typography Content */}
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
          {/* Eyebrow Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${COLORS.borderDark}`,
              padding: "8px 20px",
              borderRadius: 999,
              marginBottom: 30,
              backdropFilter: "blur(16px)",
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
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.titanium,
                letterSpacing: "0.18em",
                opacity: 0.9,
              }}
            >
              AUTONOMOUS CREATIVE SYSTEMS // 2026
            </span>
          </div>

          {/* Headline Lines with Silky Masked Emergence */}
          <div style={{ marginBottom: 16 }}>
            <ExpressiveText
              text="MOTION GRAPHICS"
              startDelay={6}
              wordStagger={3}
              fontSize={130}
              fontWeight={900}
              letterSpacing="-0.05em"
              color={COLORS.titanium}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <ExpressiveText
              text="REIMAGINED AT THE SPEED OF THOUGHT."
              startDelay={16}
              wordStagger={3}
              fontSize={78}
              fontWeight={800}
              letterSpacing="-0.04em"
              color={COLORS.mutedTextDark}
              highlightWords={[
                { word: "SPEED", color: COLORS.titanium },
                { word: "THOUGHT.", color: COLORS.titanium },
              ]}
            />
          </div>

          {/* Subtitle Description */}
          <div style={{ maxWidth: 880 }}>
            <p
              style={{
                fontFamily: FONTS.display,
                fontSize: 24,
                color: "rgba(248, 249, 250, 0.65)",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Replace weeks of render fatigue with instantaneous algorithmic craft.
              Every easing curve mathematical. Every frame deliberate.
            </p>
          </div>
        </div>

        {/* Elegant Horizontal Marquee Ticker */}
        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
          <Marquee
            items={[
              "AUTONOMOUS CHOREOGRAPHY",
              "MATHEMATICAL EASING",
              "INSTANT REVISIONS",
              "60 FPS UNCOMPROMISED",
              "TIMELESS EDITORIAL CRAFT",
            ]}
            speed={2.2}
            fontSize={18}
          />
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
