import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { Marquee } from "../components/Marquee";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { LiquidGeometry } from "../components/LiquidGeometry";
import { FLUID_EASE } from "../utils/motion";

export const Scene4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Harmonious Showcase Disciplines
  const isBeatA = frame < 68;
  const isBeatB = frame >= 68 && frame < 138;
  const isBeatC = frame >= 138;

  // Scene Entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);

  // Outro transition (frames 192 - 210)
  const exitProgress = interpolate(frame, [192, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const exitOpacity = interpolate(exitProgress, [0, 0.8, 1], [1, 0.9, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${enterScale})`,
        opacity: exitOpacity,
        overflow: "hidden",
        fontFamily: FONTS.display,
      }}
    >
      <CameraRig zoomStart={1} zoomEnd={1.03} panXStart={0} panXEnd={-12}>
        {/* BEAT A: KINETIC EDITORIAL TYPOGRAPHY */}
        {isBeatA && (
          <AbsoluteFill
            style={{
              backgroundColor: "#0F172A", // Deep refined slate navy
              color: COLORS.titanium,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 01 // EDITORIAL TYPOGRAPHY" />

            {/* Ambient Soft Studio Light */}
            <div style={{ position: "absolute", top: "20%", left: "30%", opacity: 0.45 }}>
              <LiquidGeometry size={650} color={COLORS.cobalt} delay={0} />
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                width: "100%",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ marginBottom: 14 }}>
                  <ExpressiveText
                    text="EXPRESSIVE"
                    startDelay={4}
                    wordStagger={3}
                    fontSize={140}
                    fontWeight={900}
                    letterSpacing="-0.05em"
                    color={COLORS.titanium}
                    style={{ justifyContent: "center" }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <ExpressiveText
                    text="TYPOGRAPHY"
                    startDelay={12}
                    wordStagger={3}
                    fontSize={155}
                    fontWeight={900}
                    letterSpacing="-0.06em"
                    color={COLORS.cobalt}
                    style={{ justifyContent: "center" }}
                  />
                </div>
                <div>
                  <ExpressiveText
                    text="IN CONTINUOUS HARMONY."
                    startDelay={20}
                    wordStagger={3}
                    fontSize={82}
                    fontWeight={800}
                    letterSpacing="-0.04em"
                    color={COLORS.mutedTextDark}
                    style={{ justifyContent: "center" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
              <Marquee
                items={["EDITORIAL HEADLINES", "STINGERS", "CAMPAIGN IDENTITIES", "TITLE SEQUENCES"]}
                speed={2.2}
                fontSize={18}
              />
            </div>
          </AbsoluteFill>
        )}

        {/* BEAT B: LIVING BRAND IDENTITIES */}
        {isBeatB && (
          <AbsoluteFill
            style={{
              backgroundColor: "#18181B", // Dark zinc luxury
              color: COLORS.titanium,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 02 // LIVING BRAND SYSTEMS" />

            {/* Morphing Concentric Bauhaus Rings (Smooth and stately) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 180,
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="440" height="440" viewBox="0 0 440 440">
                <circle
                  cx="220"
                  cy="220"
                  r="180"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="40 25"
                  transform={`rotate(${frame * 0.4} 220 220)`}
                />
                <circle
                  cx="220"
                  cy="220"
                  r="130"
                  fill="none"
                  stroke={COLORS.amber}
                  strokeWidth="3"
                  strokeDasharray="80 30"
                  transform={`rotate(${-frame * 0.6} 220 220)`}
                />
                <rect
                  x="155"
                  y="155"
                  width="130"
                  height="130"
                  fill="rgba(255, 255, 255, 0.04)"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1.5"
                  rx="28"
                  transform={`rotate(${frame * 0.8} 220 220)`}
                />
                <circle
                  cx="220"
                  cy="220"
                  r="30"
                  fill={COLORS.cobalt}
                />
              </svg>
            </div>

            <div
              style={{
                position: "absolute",
                left: 120,
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: 840,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.amber,
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                }}
              >
                DYNAMIC DESIGN SYSTEMS
              </div>
              <div style={{ marginBottom: 14 }}>
                <ExpressiveText
                  text="BRAND IDENTITIES"
                  startDelay={70}
                  wordStagger={3}
                  color={COLORS.titanium}
                  fontSize={94}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <ExpressiveText
                  text="THAT NEVER SLEEP."
                  startDelay={78}
                  wordStagger={3}
                  color={COLORS.amber}
                  fontSize={104}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                />
              </div>
              <p
                style={{
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: "rgba(248, 249, 250, 0.65)",
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                Transform static brand guidelines into living, breathing design anthems across every digital touchpoint.
              </p>
            </div>
          </AbsoluteFill>
        )}

        {/* BEAT C: PRODUCT & INTERFACE MOTION */}
        {isBeatC && (
          <AbsoluteFill
            style={{
              backgroundColor: COLORS.obsidian,
              color: COLORS.titanium,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 03 // INTERFACE & PRODUCT MOTION" />

            {/* Interactive Frosted Glass UI Card */}
            <div
              style={{
                position: "absolute",
                right: 120,
                top: "50%",
                transform: "translateY(-50%)",
                width: 580,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: 24,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "36px",
                backdropFilter: "blur(24px)",
                boxShadow: "0 28px 60px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 28,
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.cobalt }} />
                </div>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "rgba(255, 255, 255, 0.5)", fontWeight: 600 }}>
                  REAL-TIME PREVIEW // LOSSLESS
                </span>
              </div>

              {/* Smooth Animated Bar Chart */}
              <div style={{ marginBottom: 30 }}>
                <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: "rgba(255, 255, 255, 0.5)", marginBottom: 14 }}>
                  ENGAGEMENT TRAJECTORY (+480%)
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
                  {[40, 65, 30, 85, 55, 95, 75, 100].map((val, idx) => {
                    const barProgress = interpolate(frame, [140 + idx * 2, 160 + idx * 2], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: FLUID_EASE,
                    });
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${val * barProgress}%`,
                          backgroundColor: idx === 7 ? COLORS.cobalt : "rgba(255, 255, 255, 0.12)",
                          borderRadius: "4px 4px 0 0",
                          boxShadow: idx === 7 ? `0 0 20px ${COLORS.cobalt}` : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Minimalist Switch Toggle */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Micro-interactions</div>
                  <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.45)" }}>Harmonic fluid physics</div>
                </div>
                <div
                  style={{
                    width: 50,
                    height: 28,
                    borderRadius: 99,
                    backgroundColor: COLORS.cobalt,
                    padding: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: COLORS.titanium }} />
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: 120,
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: 800,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.cobalt,
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                }}
              >
                HIGH-CONVERTING INTERFACES
              </div>
              <div style={{ marginBottom: 14 }}>
                <ExpressiveText
                  text="PRODUCT MOTION"
                  startDelay={140}
                  wordStagger={3}
                  color={COLORS.titanium}
                  fontSize={95}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <ExpressiveText
                  text="THAT CONVERTS."
                  startDelay={148}
                  wordStagger={3}
                  color={COLORS.cobalt}
                  fontSize={100}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                />
              </div>
              <p
                style={{
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: "rgba(255, 255, 255, 0.65)",
                  maxWidth: 620,
                  margin: 0,
                }}
              >
                Transform product features and mobile flows into seductive, tactile video assets for launches and campaigns.
              </p>
            </div>
          </AbsoluteFill>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
