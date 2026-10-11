import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { KineticWord, StaggeredText } from "../components/KineticText";
import { BadgeSeal } from "../components/BadgeSeal";
import { Marquee } from "../components/Marquee";
import { Asterisk } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Vermilion burst (0-40 frames) -> Phase 2: Inverted Obsidian (40-140 frames)
  const isPhase2 = frame >= 42;

  // Zoom punch at the transition
  const zoomSpring = spring({
    frame: frame - 40,
    fps,
    config: SPRINGS.snappy,
  });

  const bgScale = interpolate(zoomSpring, [0, 0.4, 1], [1, 1.05, 1]);

  // Outro transition (frames 120-140)
  const exitSlide = spring({
    frame: frame - 122,
    fps,
    config: SPRINGS.heavy,
  });
  const exitTranslateY = interpolate(exitSlide, [0, 1], [0, -100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isPhase2 ? COLORS.ink : COLORS.vermilion,
        color: isPhase2 ? COLORS.ivory : COLORS.white,
        fontFamily: FONTS.display,
        transform: `translateY(${exitTranslateY}%) scale(${bgScale})`,
        overflow: "hidden",
      }}
    >
      <StudioHeader dark={!isPhase2} tagline="HOOK / 01 • PROLOGUE" />

      {/* Background Graphic Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: isPhase2 ? 0.08 : 0.12,
          backgroundImage: `linear-gradient(${isPhase2 ? COLORS.ivory : COLORS.white} 1px, transparent 1px), linear-gradient(90deg, ${isPhase2 ? COLORS.ivory : COLORS.white} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating Accent Shapes */}
      <div style={{ position: "absolute", top: 180, right: 160 }}>
        <Asterisk
          size={90}
          color={isPhase2 ? COLORS.acidYellow : COLORS.ivory}
          rotationSpeed={1.8}
        />
      </div>

      <div style={{ position: "absolute", bottom: 180, left: 100 }}>
        <BadgeSeal
          size={160}
          bg={isPhase2 ? COLORS.vermilion : COLORS.white}
          color={isPhase2 ? COLORS.white : COLORS.ink}
          centerText="AI"
          subText="STUDIO"
          delay={10}
          rotationSpeed={1.2}
        />
      </div>

      {/* Main Kinetic Typography Layout */}
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
        {!isPhase2 ? (
          /* Beat 1: Initial Hook */
          <div>
            <div style={{ marginBottom: 16 }}>
              <KineticWord
                text="STILL WAITING"
                color={COLORS.white}
                fontSize={130}
                fontWeight={900}
                letterSpacing="-0.05em"
                delay={2}
                rotate={-4}
              />
            </div>
            <div>
              <KineticWord
                text="3 WEEKS"
                color={COLORS.ink}
                fontSize={150}
                fontWeight={900}
                letterSpacing="-0.06em"
                delay={8}
                rotate={6}
                style={{
                  backgroundColor: COLORS.acidYellow,
                  padding: "0 28px",
                  borderRadius: 12,
                  display: "inline-block",
                }}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <KineticWord
                text="FOR A 15-SECOND VIDEO?"
                color={COLORS.white}
                fontSize={80}
                fontWeight={800}
                letterSpacing="-0.03em"
                delay={15}
              />
            </div>
          </div>
        ) : (
          /* Beat 2: Punchline Inversion */
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: "rgba(255,59,20,0.15)",
                border: "1px solid rgba(255,59,20,0.4)",
                padding: "8px 20px",
                borderRadius: 999,
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.vermilion,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.vermilion,
                  letterSpacing: "0.15em",
                }}
              >
                THE CREATIVE BOTTLENECK IS OVER
              </span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <StaggeredText
                sentence="STOP BURNING BUDGET"
                startDelay={44}
                staggerFrames={3}
                color={COLORS.ivory}
                fontSize={110}
                fontWeight={900}
                letterSpacing="-0.05em"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 10 }}>
              <KineticWord
                text="ON SLOW"
                color={COLORS.gray}
                fontSize={110}
                fontWeight={800}
                delay={54}
              />
              <KineticWord
                text="KEYFRAMES."
                color={COLORS.acidYellow}
                fontSize={115}
                fontWeight={900}
                delay={60}
                rotate={-3}
              />
            </div>

            <div style={{ marginTop: 40, maxWidth: 880 }}>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 26,
                  color: "rgba(246, 244, 238, 0.7)",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                Agencies charge $20k. Freelancers ghost on revision 4.
                <br />
                <span style={{ color: COLORS.ivory, fontWeight: 700 }}>
                  There is a smarter way to move.
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Kinetic Marquee Ticker */}
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
        <Marquee
          items={[
            "HIRE AI MOTION",
            "ZERO RENDER CRASHES",
            "INFINITE VARIATIONS",
            "AUTONOMOUS CHOREOGRAPHY",
            "STUDIO GRADE EXCELLENCE",
          ]}
          speed={isPhase2 ? 7 : 5}
          fontSize={22}
          bg={isPhase2 ? COLORS.vermilion : COLORS.ink}
          color={COLORS.white}
          rotate={-1.5}
        />
      </div>
    </AbsoluteFill>
  );
};
