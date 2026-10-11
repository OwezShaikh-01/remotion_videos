import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";
import { getHarmonicDrift } from "../utils/motion";

export const Scene5ValueProp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance slide from left
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterX = interpolate(enterSpring, [0, 1], [-100, 0]);

  // Outro transition (frames 126 - 145)
  const exitSpring = spring({ frame: frame - 128, fps, config: SPRINGS.snappy });
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0.88]);
  const exitOpacity = interpolate(exitSpring, [0, 1], [1, 0]);

  const counterConcepts = Math.min(
    100,
    Math.floor(interpolate(frame, [10, 48], [1, 100]))
  );

  const isHundred = counterConcepts >= 100;
  const hundredPop = isHundred
    ? spring({ frame: frame - 48, fps, config: SPRINGS.bouncy })
    : 1;

  const driftLeft = getHarmonicDrift(frame, { speed: 0.04, ampX: 4, ampY: 4, rotAmp: 0.5 });
  const driftRight = getHarmonicDrift(frame, { speed: 0.05, ampX: 5, ampY: 5, rotAmp: 0.7, phase: 1.5 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.acidYellow,
        color: COLORS.ink,
        fontFamily: FONTS.display,
        transform: `translate3d(${enterX}%, 0, 0) scale(${exitScale})`,
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig
        impactFrames={[12, 48]}
        zoomStart={1}
        zoomEnd={1.05}
        panXStart={0}
        panXEnd={15}
      >
        <StudioHeader dark={true} tagline="VALUE / 05 • SCALE UNLIMITED" />

        {/* Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.1,
            backgroundImage: `linear-gradient(${COLORS.ink} 1.5px, transparent 1.5px), linear-gradient(90deg, ${COLORS.ink} 1.5px, transparent 1.5px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Impact burst when the counter hits 100+ */}
        {isHundred && (
          <ImpactBurst hitFrame={48} x={280} y={400} color={COLORS.vermilion} rayCount={16} maxRadius={260} />
        )}

        {/* Rotating Accent Badge */}
        <div style={{ position: "absolute", bottom: 120, right: 120 }}>
          <BadgeSeal
            size={190}
            bg={COLORS.ink}
            color={COLORS.acidYellow}
            centerText="100x"
            subText="LEVERAGE"
            delay={15}
            rotationSpeed={1.6}
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
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginBottom: 16,
              color: COLORS.ink,
              opacity: 0.75,
            }}
          >
            FORCE MULTIPLIER FOR AMBITIOUS TEAMS
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 30, marginBottom: 18 }}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 165,
                fontWeight: 900,
                letterSpacing: "-0.07em",
                lineHeight: 0.85,
                transform: `scale(${hundredPop})`,
                transformOrigin: "bottom left",
                color: isHundred ? COLORS.vermilion : COLORS.ink,
                transition: "color 0.2s ease",
              }}
            >
              {counterConcepts}+
            </div>
            <div>
              <ExpressiveText
                text="CONCEPTS BEFORE"
                startDelay={6}
                charStagger={1.2}
                color={COLORS.ink}
                fontSize={82}
                fontWeight={900}
                letterSpacing="-0.04em"
                direction="3d-flip"
              />
              <div style={{ marginTop: 8 }}>
                <ExpressiveText
                  text="YOUR MORNING COFFEE."
                  startDelay={16}
                  charStagger={1.4}
                  color={COLORS.vermilion}
                  fontSize={88}
                  fontWeight={900}
                  letterSpacing="-0.04em"
                  direction="3d-flip"
                />
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Box with continuous floating drift */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 34,
              marginTop: 46,
              maxWidth: 1150,
            }}
          >
            {/* Legacy Agency */}
            <div
              style={{
                backgroundColor: "rgba(14, 16, 19, 0.08)",
                borderRadius: 22,
                padding: "30px 34px",
                border: "1.5px solid rgba(14, 16, 19, 0.15)",
                transform: `translate3d(${driftLeft.x}px, ${driftLeft.y}px, 0)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  fontWeight: 800,
                  color: COLORS.gray,
                  marginBottom: 12,
                }}
              >
                LEGACY FREELANCER / AGENCY
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, opacity: 0.65 }}>
                3–4 Weeks per Asset
              </div>
              <div style={{ fontSize: 16, color: COLORS.ink, opacity: 0.7, lineHeight: 1.55 }}>
                • $5,000–$20,000 per video
                <br />
                • Strict limit of 2 revision rounds
                <br />
                • Painfully slow timeline
              </div>
            </div>

            {/* AI Motion Designer */}
            <div
              style={{
                backgroundColor: COLORS.ink,
                color: COLORS.white,
                borderRadius: 22,
                padding: "30px 34px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                transform: `translate3d(${driftRight.x}px, ${driftRight.y}px, 0)`,
                border: "1.5px solid rgba(228, 248, 53, 0.3)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  fontWeight: 800,
                  color: COLORS.acidYellow,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.acidYellow, boxShadow: `0 0 10px ${COLORS.acidYellow}` }} />
                AI MOTION DESIGNER
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  marginBottom: 10,
                  color: COLORS.acidYellow,
                }}
              >
                Minutes, Not Weeks.
              </div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.55 }}>
                • Infinite scale across 16:9, 9:16, 1:1
                <br />
                • Real-time programmatic tweaks
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
