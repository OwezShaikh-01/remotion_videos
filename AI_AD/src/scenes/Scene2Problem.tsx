import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { Crosshair } from "../components/GeometricShapes";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";
import { getHarmonicDrift } from "../utils/motion";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance whip
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.88, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Three cards with 3D tumble entry
  const card1Spring = spring({ frame: frame - 12, fps, config: SPRINGS.bouncy });
  const card2Spring = spring({ frame: frame - 22, fps, config: SPRINGS.bouncy });
  const card3Spring = spring({ frame: frame - 32, fps, config: SPRINGS.bouncy });

  // Floating drift on cards
  const drift1 = getHarmonicDrift(frame, { speed: 0.05, ampX: 4, ampY: 5, rotAmp: 0.8, phase: 0 });
  const drift2 = getHarmonicDrift(frame, { speed: 0.04, ampX: 5, ampY: 6, rotAmp: 0.6, phase: 1.2 });
  const drift3 = getHarmonicDrift(frame, { speed: 0.06, ampX: 4, ampY: 5, rotAmp: 0.9, phase: 2.4 });

  // Progress bar in Card 1 that stutters at 99.8%
  const progressPercent = Math.min(99.8, interpolate(frame, [15, 60], [10, 99.8]));
  const progressJitter = frame >= 50 && frame < 85 ? Math.sin(frame * 2) * 3 : 0;

  // File version stepper
  const fileNames = [
    "motion_v1.mp4",
    "motion_v2_client_edit.mp4",
    "motion_v6_final.mp4",
    "motion_v14_FINAL_REAL_v3.mp4",
  ];
  const fileIndex = Math.min(3, Math.floor(interpolate(frame, [35, 80], [0, 3.99])));

  // The giant OBSOLETE stamp slams down at frame 80
  const isStamped = frame >= 80;
  const stampSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 7, mass: 0.4, stiffness: 320 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3.2, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2, 1], [0, 1, 1]);

  // Physical knockback reaction of the cards when the stamp slams
  const knockbackProgress = isStamped
    ? spring({ frame: frame - 80, fps, config: SPRINGS.bouncy })
    : 0;
  const card1ReactionY = interpolate(knockbackProgress, [0, 1], [0, 35]);
  const card2ReactionY = interpolate(knockbackProgress, [0, 1], [0, 48]);
  const card3ReactionY = interpolate(knockbackProgress, [0, 1], [0, 32]);
  const card1ReactionRot = interpolate(knockbackProgress, [0, 1], [0, -3.5]);
  const card3ReactionRot = interpolate(knockbackProgress, [0, 1], [0, 4.0]);

  // Outro transition whip (frames 132-150)
  const exitSpring = spring({
    frame: frame - 132,
    fps,
    config: SPRINGS.snappy,
  });
  const exitX = interpolate(exitSpring, [0, 1], [0, -100]);
  const exitRotate = interpolate(exitSpring, [0, 1], [0, -4]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ivory,
        color: COLORS.ink,
        fontFamily: FONTS.display,
        transform: `translate3d(${exitX}%, 0, 0) scale(${enterScale}) rotate(${exitRotate}deg)`,
        opacity: enterOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig
        impactFrames={[15, 30, 80]}
        zoomStart={1}
        zoomEnd={1.05}
        panXStart={0}
        panXEnd={15}
      >
        <StudioHeader dark={true} tagline="PROBLEM / 02 • THE REALITY" />

        {/* Crisp Architectural Grid */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            opacity: 0.08,
            backgroundImage: `linear-gradient(${COLORS.ink} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.ink} 1px, transparent 1px)`,
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
            borderBottom: `2px solid ${COLORS.ink}`,
            paddingBottom: 24,
            zIndex: 10,
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
            <ExpressiveText
              text="THE CREATIVE CYCLE OF TEARS."
              startDelay={4}
              charStagger={1.1}
              color={COLORS.ink}
              fontSize={64}
              fontWeight={900}
              letterSpacing="-0.04em"
              direction="3d-flip"
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.gray,
                lineHeight: 1.4,
              }}
            >
              AVG TIMELINE: 21 DAYS
              <br />
              AVG SATISFACTION: 34%
            </span>
          </div>
        </div>

        {/* Three Physics-Reactive Cards */}
        <div
          style={{
            position: "absolute",
            top: 310,
            left: 120,
            right: 120,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 36,
            perspective: 1000,
          }}
        >
          {/* Card 1: Render Hell */}
          <div
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid rgba(14, 16, 19, 0.12)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
              transform: `
                scale(${card1Spring})
                translate3d(${drift1.x}px, ${drift1.y + card1ReactionY}px, 0)
                rotate(${drift1.rotate + card1ReactionRot}deg)
              `,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
              willChange: "transform",
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
                <span style={{ color: COLORS.vermilion }}>{progressPercent.toFixed(1)}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 14,
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
                    transform: `translateX(${progressJitter}px)`,
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
              boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
              transform: `
                scale(${card2Spring})
                translate3d(${drift2.x}px, ${drift2.y + card2ReactionY}px, 0)
                rotate(${drift2.rotate}deg)
              `,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
              willChange: "transform",
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
                border: "1.5px dashed rgba(22, 52, 254, 0.3)",
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
              boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
              transform: `
                scale(${card3Spring})
                translate3d(${drift3.x}px, ${drift3.y + card3ReactionY}px, 0)
                rotate(${drift3.rotate + card3ReactionRot}deg)
              `,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 400,
              willChange: "transform",
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
                padding: "14px 18px",
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

        {/* Impact Burst when Stamp lands */}
        {isStamped && (
          <ImpactBurst
            hitFrame={80}
            x={960}
            y={540}
            color={COLORS.vermilion}
            rayCount={16}
            maxRadius={320}
          />
        )}

        {/* The Giant Red OBSOLETE Stamp */}
        {isStamped && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampScale})`,
              zIndex: 100,
              opacity: stampOpacity,
              border: `12px solid ${COLORS.vermilion}`,
              borderRadius: 24,
              padding: "22px 68px",
              backgroundColor: "rgba(255, 59, 20, 0.95)",
              boxShadow: "0 35px 90px rgba(255, 59, 20, 0.5)",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 120,
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
      </CameraRig>
    </AbsoluteFill>
  );
};
