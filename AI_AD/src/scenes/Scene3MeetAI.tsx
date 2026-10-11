import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BezierGraph } from "../components/BezierGraph";
import { BadgeSeal } from "../components/BadgeSeal";
import { PillTag } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { LiquidGeometry } from "../components/LiquidGeometry";
import { FLUID_EASE } from "../utils/motion";

export const Scene3MeetAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Graph appearance
  const graphProgress = interpolate(frame, [16, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  // Fluid scene exit transition (frames 150-170)
  const exitProgress = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const exitOpacity = interpolate(exitProgress, [0, 0.8, 1], [1, 0.9, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070B18", // Deep luxury Midnight Navy
        color: COLORS.titanium,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale})`,
        opacity: enterOpacity * exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig zoomStart={1} zoomEnd={1.03} panXStart={0} panXEnd={-15}>
        <StudioHeader tagline="INNOVATION / 03 • THE AUTONOMOUS ENGINE" />

        {/* Ambient Soft Studio Glows */}
        <div style={{ position: "absolute", top: "25%", right: "20%", opacity: 0.5 }}>
          <LiquidGeometry size={650} color={COLORS.cobalt} delay={0} />
        </div>
        <div style={{ position: "absolute", bottom: "15%", left: "15%", opacity: 0.3 }}>
          <LiquidGeometry size={500} color={COLORS.amber} delay={12} />
        </div>

        {/* Subtle Architectural Grid */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.05,
            backgroundImage: `linear-gradient(${COLORS.titanium} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.titanium} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Left Column: Big Fluid Typography */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: 960,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(13, 37, 244, 0.12)",
              border: "1px solid rgba(13, 37, 244, 0.35)",
              padding: "8px 22px",
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
                fontWeight: 700,
                color: COLORS.titanium,
                letterSpacing: "0.18em",
              }}
            >
              NEXT-GENERATION CREATIVE INSTRUMENT
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <ExpressiveText
              text="MEET YOUR NEW LEAD"
              startDelay={6}
              wordStagger={3}
              color={COLORS.titanium}
              fontSize={82}
              fontWeight={900}
              letterSpacing="-0.04em"
            />
          </div>

          <div style={{ marginBottom: 26 }}>
            <ExpressiveText
              text="MOTION DESIGNER."
              startDelay={16}
              wordStagger={3}
              color={COLORS.titanium}
              fontSize={92}
              fontWeight={900}
              letterSpacing="-0.05em"
              highlightWords={[{ word: "DESIGNER.", color: COLORS.cobalt }]}
            />
          </div>

          <div style={{ maxWidth: 780, marginBottom: 38 }}>
            <p
              style={{
                fontSize: 24,
                color: "rgba(248, 249, 250, 0.65)",
                lineHeight: 1.5,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Algorithmic choreography. Sub-millisecond timing. Timeless graphic taste.
              Ready to design, animate, and scale 24 hours a day without friction.
            </p>
          </div>

          {/* Metric Badges with Silky Fluid Stagger */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PillTag
              label="⚡ INSTANTANEOUS ITERATION"
              color={COLORS.titanium}
              bg="rgba(13, 37, 244, 0.15)"
              border="1px solid rgba(13, 37, 244, 0.4)"
              delay={24}
            />
            <PillTag
              label="🎯 MATHEMATICAL EASING"
              color={COLORS.titanium}
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.15)"
              delay={32}
            />
            <PillTag
              label="💎 STUDIO-GRADE FINISH"
              color={COLORS.titanium}
              bg="rgba(255, 152, 0, 0.12)"
              border="1px solid rgba(255, 152, 0, 0.35)"
              delay={40}
            />
          </div>
        </div>

        {/* Right Column: Refined Bezier Velocity Curve Editor */}
        <div
          style={{
            position: "absolute",
            right: 120,
            top: "50%",
            transform: `translateY(-50%) translate3d(0, ${interpolate(graphProgress, [0, 1], [40, 0])}px, 0)`,
            opacity: graphProgress,
            transformOrigin: "center right",
            zIndex: 10,
          }}
        >
          <BezierGraph width={640} height={390} accentColor={COLORS.cobalt} />

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <BadgeSeal
                size={110}
                bg="rgba(255, 255, 255, 0.04)"
                color={COLORS.titanium}
                centerText="60"
                subText="FPS"
                delay={20}
                rotationSpeed={0.3}
              />
              <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: "rgba(255, 255, 255, 0.6)" }}>
                <div style={{ color: COLORS.titanium, fontWeight: 700 }}>CONTINUOUS EASING INTERPOLATION</div>
                <div style={{ opacity: 0.6 }}>Sub-pixel vector calculation across every frame</div>
              </div>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
