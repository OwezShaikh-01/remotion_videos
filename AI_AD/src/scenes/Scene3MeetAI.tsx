import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BezierGraph } from "../components/BezierGraph";
import { BadgeSeal } from "../components/BadgeSeal";
import { Asterisk, PillTag, ConcentricRings } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";

export const Scene3MeetAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance whip
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.9, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Graph appearance spring with juicy bounce
  const graphSpring = spring({
    frame: frame - 20,
    fps,
    config: SPRINGS.bouncy,
  });

  // Outro transition (frames 148-170)
  const exitSlide = spring({
    frame: frame - 150,
    fps,
    config: SPRINGS.punchy,
  });
  const exitScale = interpolate(exitSlide, [0, 1], [1, 1.25]);
  const exitOpacity = interpolate(exitSlide, [0, 0.8, 1], [1, 0.9, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070E24", // Deep luxury Cobalt Night
        color: COLORS.white,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale * exitScale})`,
        opacity: enterOpacity * exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig
        impactFrames={[10, 24, 70]}
        zoomStart={1}
        zoomEnd={1.06}
        panXStart={0}
        panXEnd={-25}
      >
        <StudioHeader tagline="INNOVATION / 03 • THE REVOLUTION" />

        {/* Dynamic Concentric Rings in background */}
        <div style={{ position: "absolute", right: -50, top: "45%", transform: "translateY(-50%)", opacity: 0.35 }}>
          <ConcentricRings count={5} color={COLORS.cobaltLight} baseRadius={60} delay={10} />
        </div>

        {/* Ambient Grid */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.1,
            backgroundImage: `linear-gradient(${COLORS.cobaltLight} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cobaltLight} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Decorative Asterisk */}
        <div style={{ position: "absolute", top: 120, right: 100 }}>
          <Asterisk size={85} color={COLORS.acidYellow} rotationSpeed={1.8} />
        </div>

        {/* Impact Bursts */}
        <ImpactBurst hitFrame={10} x={420} y={420} color={COLORS.acidYellow} />
        <ImpactBurst hitFrame={24} x={480} y={540} color={COLORS.white} rayCount={10} />

        {/* Left Column: Big Kinetic Typography & Value Props */}
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
              backgroundColor: "rgba(228, 248, 53, 0.14)",
              border: `1.5px solid ${COLORS.acidYellow}`,
              padding: "10px 24px",
              borderRadius: 999,
              marginBottom: 30,
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: COLORS.acidYellow,
                boxShadow: `0 0 12px ${COLORS.acidYellow}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 800,
                color: COLORS.acidYellow,
                letterSpacing: "0.18em",
              }}
            >
              ENTER THE NEXT PARADIGM
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <ExpressiveText
              text="MEET YOUR NEW LEAD"
              startDelay={6}
              charStagger={1.2}
              color={COLORS.white}
              fontSize={82}
              fontWeight={900}
              letterSpacing="-0.04em"
              direction="3d-flip"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <ExpressiveText
              text="MOTION DESIGNER."
              startDelay={16}
              charStagger={1.4}
              color={COLORS.acidYellow}
              fontSize={92}
              fontWeight={900}
              letterSpacing="-0.05em"
              highlightWords={[{ word: "DESIGNER.", color: COLORS.acidYellow }]}
              direction="3d-flip"
            />
          </div>

          <div style={{ maxWidth: 780, marginBottom: 36 }}>
            <p
              style={{
                fontSize: 24,
                color: "rgba(255, 255, 255, 0.78)",
                lineHeight: 1.45,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Autonomous choreography. Millisecond iteration. Math-perfect easing curves.
              Ready to design 24 hours a day without burnout.
            </p>
          </div>

          {/* Metric Badges with staggered bouncy spring */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PillTag
              label="⚡ 120× FASTER RENDERS"
              color={COLORS.white}
              bg="rgba(255, 59, 20, 0.28)"
              border="1.5px solid rgba(255, 59, 20, 0.6)"
              delay={30}
            />
            <PillTag
              label="🎯 ZERO KEYFRAME FATIGUE"
              color={COLORS.acidYellow}
              bg="rgba(228, 248, 53, 0.18)"
              border="1.5px solid rgba(228, 248, 53, 0.5)"
              delay={38}
            />
            <PillTag
              label="💎 STUDIO-GRADE CRAFT"
              color={COLORS.white}
              bg="rgba(255, 255, 255, 0.15)"
              border="1.5px solid rgba(255, 255, 255, 0.3)"
              delay={46}
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
          <BezierGraph width={640} height={390} accentColor={COLORS.vermilion} />

          <div
            style={{
              marginTop: 22,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <BadgeSeal
                size={120}
                bg={COLORS.vermilion}
                color={COLORS.white}
                centerText="60"
                subText="FPS"
                delay={25}
                rotationSpeed={1.5}
              />
              <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <div style={{ color: COLORS.white, fontWeight: 800 }}>AUTONOMOUS EASING</div>
                <div>Sub-pixel vector interpolation</div>
              </div>
            </div>
          </div>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
