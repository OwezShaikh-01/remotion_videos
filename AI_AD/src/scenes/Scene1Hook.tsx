import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { Marquee } from "../components/Marquee";
import { Asterisk } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";
import { LiquidGeometry } from "../components/LiquidGeometry";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: High-voltage Vermilion (0-42 frames) -> Phase 2: Obsidian Inversion (42-140 frames)
  const isPhase2 = frame >= 42;

  // Flash transition on inversion frame
  const flashOpacity =
    frame >= 40 && frame <= 46
      ? interpolate(frame, [40, 42, 46], [0, 1, 0])
      : 0;

  // Outro Match-Cut Snap Zoom (frames 124-140)
  const exitSpring = spring({
    frame: frame - 124,
    fps,
    config: SPRINGS.punchy,
  });
  const exitScale = interpolate(exitSpring, [0, 1], [1, 4.2]);
  const exitOpacity = interpolate(exitSpring, [0, 0.7, 1], [1, 0.8, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isPhase2 ? COLORS.ink : COLORS.vermilion,
        color: isPhase2 ? COLORS.ivory : COLORS.white,
        fontFamily: FONTS.display,
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig
        impactFrames={[4, 14, 42, 60]}
        zoomStart={1}
        zoomEnd={1.08}
        panXStart={0}
        panXEnd={-35}
      >
        <StudioHeader dark={!isPhase2} tagline="HOOK / 01 • PROLOGUE" />

        {/* Dynamic Architectural Grid with Perspective Parallax */}
        <div
          style={{
            position: "absolute",
            inset: -100,
            opacity: isPhase2 ? 0.09 : 0.14,
            backgroundImage: `linear-gradient(${isPhase2 ? COLORS.ivory : COLORS.white} 1.5px, transparent 1.5px), linear-gradient(90deg, ${isPhase2 ? COLORS.ivory : COLORS.white} 1.5px, transparent 1.5px)`,
            backgroundSize: "72px 72px",
            transform: `translate3d(${Math.sin(frame * 0.04) * 15}px, ${Math.cos(frame * 0.04) * 15}px, 0)`,
          }}
        />

        {/* Ambient Morphing Liquid Blobs in Background */}
        <div style={{ position: "absolute", top: -80, right: 100, opacity: 0.35 }}>
          <LiquidGeometry
            size={550}
            color={isPhase2 ? COLORS.cobalt : COLORS.acidYellow}
            delay={0}
          />
        </div>

        {/* Impact Bursts at key typographic hits */}
        <ImpactBurst hitFrame={4} x={500} y={420} color={COLORS.white} />
        <ImpactBurst hitFrame={14} x={520} y={560} color={COLORS.acidYellow} rayCount={12} maxRadius={220} />
        {isPhase2 && <ImpactBurst hitFrame={44} x={960} y={540} color={COLORS.vermilion} rayCount={16} maxRadius={300} />}

        {/* Floating Rotating Badges */}
        <div style={{ position: "absolute", top: 160, right: 140 }}>
          <Asterisk
            size={110}
            color={isPhase2 ? COLORS.acidYellow : COLORS.ivory}
            rotationSpeed={2.2}
          />
        </div>

        <div style={{ position: "absolute", bottom: 160, left: 100 }}>
          <BadgeSeal
            size={180}
            bg={isPhase2 ? COLORS.vermilion : COLORS.white}
            color={isPhase2 ? COLORS.white : COLORS.ink}
            centerText="AI"
            subText="STUDIO"
            delay={8}
            rotationSpeed={1.5}
          />
        </div>

        {/* Typography Content */}
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
            /* Beat 1: High Energy Hook */
            <div>
              <div style={{ marginBottom: 20 }}>
                <ExpressiveText
                  text="STILL WAITING"
                  startDelay={2}
                  charStagger={1.4}
                  fontSize={135}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  color={COLORS.white}
                  direction="3d-flip"
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <ExpressiveText
                  text="3 WEEKS"
                  startDelay={12}
                  charStagger={1.8}
                  fontSize={155}
                  fontWeight={900}
                  letterSpacing="-0.06em"
                  color={COLORS.ink}
                  highlightWords={[{ word: "3", color: COLORS.ink, bg: COLORS.acidYellow }, { word: "WEEKS", color: COLORS.ink, bg: COLORS.acidYellow }]}
                  direction="scale"
                />
              </div>

              <div>
                <ExpressiveText
                  text="FOR A 15-SECOND VIDEO?"
                  startDelay={22}
                  charStagger={1.1}
                  fontSize={82}
                  fontWeight={800}
                  letterSpacing="-0.03em"
                  color={COLORS.white}
                  direction="bottom"
                />
              </div>
            </div>
          ) : (
            /* Beat 2: Obsidian Inversion */
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: "rgba(255,59,20,0.18)",
                  border: "1.5px solid rgba(255,59,20,0.5)",
                  padding: "10px 24px",
                  borderRadius: 999,
                  marginBottom: 34,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: COLORS.vermilion,
                    boxShadow: `0 0 14px ${COLORS.vermilion}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    fontWeight: 800,
                    color: COLORS.vermilion,
                    letterSpacing: "0.18em",
                  }}
                >
                  THE CREATIVE BOTTLENECK IS OVER
                </span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <ExpressiveText
                  text="STOP BURNING BUDGET"
                  startDelay={44}
                  charStagger={1.2}
                  fontSize={115}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  color={COLORS.ivory}
                  direction="3d-flip"
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <ExpressiveText
                  text="ON SLOW KEYFRAMES."
                  startDelay={56}
                  charStagger={1.5}
                  fontSize={120}
                  fontWeight={900}
                  letterSpacing="-0.06em"
                  color={COLORS.acidYellow}
                  highlightWords={[{ word: "KEYFRAMES.", color: COLORS.acidYellow }]}
                  direction="3d-flip"
                />
              </div>

              <div style={{ maxWidth: 900 }}>
                <p
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 26,
                    color: "rgba(246, 244, 238, 0.75)",
                    fontWeight: 500,
                    lineHeight: 1.45,
                    letterSpacing: "-0.01em",
                    margin: 0,
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

        {/* Dual Opposing High-Speed Tickers */}
        <div style={{ position: "absolute", bottom: 44, left: -60, right: -60 }}>
          <Marquee
            items={[
              "AUTONOMOUS CHOREOGRAPHY",
              "ZERO KEYFRAME TEARS",
              "INSTANT REVISIONS",
              "60 FPS UNCOMPROMISED",
              "STUDIO EXCELLENCE",
            ]}
            speed={isPhase2 ? 7.5 : 5.5}
            fontSize={24}
            bg={isPhase2 ? COLORS.vermilion : COLORS.ink}
            color={COLORS.white}
            rotate={-2}
          />
        </div>
      </CameraRig>

      {/* Optical Transition Flash */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: COLORS.white,
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 900,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
