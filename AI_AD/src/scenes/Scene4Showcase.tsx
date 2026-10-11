import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { Marquee } from "../components/Marquee";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";
import { LiquidGeometry } from "../components/LiquidGeometry";

export const Scene4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Micro-beats within the Showcase Reel
  // Beat A: Kinetic Typography (0 - 68 frames)
  // Beat B: Brand Identity Choreography (68 - 138 frames)
  // Beat C: UI / Product Motion Graphics (138 - 210 frames)
  const isBeatA = frame < 68;
  const isBeatB = frame >= 68 && frame < 138;
  const isBeatC = frame >= 138;

  // Scene Entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Outro transition whip (frames 192 - 210)
  const exitSpring = spring({ frame: frame - 192, fps, config: SPRINGS.punchy });
  const exitY = interpolate(exitSpring, [0, 1], [0, -100]);
  const exitScale = interpolate(exitSpring, [0, 1], [1, 1.15]);

  return (
    <AbsoluteFill
      style={{
        transform: `translate3d(0, ${exitY}%, 0) scale(${enterScale * exitScale})`,
        overflow: "hidden",
        fontFamily: FONTS.display,
      }}
    >
      <CameraRig
        impactFrames={[4, 68, 138, 175]}
        zoomStart={1}
        zoomEnd={1.08}
        panXStart={0}
        panXEnd={-20}
      >
        {/* BEAT A: KINETIC TYPOGRAPHY */}
        {isBeatA && (
          <AbsoluteFill
            style={{
              backgroundColor: "#7B5EE3", // Editorial rich iris/violet
              color: COLORS.white,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 01 // KINETIC TYPOGRAPHY" />

            {/* Background 3D Perspective Grid */}
            <div
              style={{
                position: "absolute",
                inset: -60,
                opacity: 0.16,
                backgroundImage: `linear-gradient(${COLORS.white} 1.5px, transparent 1.5px), linear-gradient(90deg, ${COLORS.white} 1.5px, transparent 1.5px)`,
                backgroundSize: "68px 68px",
              }}
            />

            {/* Ambient Liquid Geometry Blob */}
            <div style={{ position: "absolute", top: -80, left: 100, opacity: 0.3 }}>
              <LiquidGeometry size={500} color={COLORS.acidYellow} delay={0} />
            </div>

            <ImpactBurst hitFrame={4} x={960} y={440} color={COLORS.acidYellow} rayCount={12} />
            <ImpactBurst hitFrame={20} x={960} y={580} color={COLORS.white} rayCount={14} />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                width: "100%",
                perspective: 1200,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  transform: `rotateX(${Math.sin(frame * 0.08) * 12}deg) rotateY(${Math.cos(frame * 0.08) * 10}deg)`,
                  transformStyle: "preserve-3d",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: 14 }}>
                  <ExpressiveText
                    text="EXPRESSIVE"
                    startDelay={2}
                    charStagger={1.2}
                    fontSize={145}
                    fontWeight={900}
                    letterSpacing="-0.05em"
                    color={COLORS.acidYellow}
                    direction="3d-flip"
                    style={{ justifyContent: "center" }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <ExpressiveText
                    text="TYPOGRAPHY"
                    startDelay={10}
                    charStagger={1.4}
                    fontSize={160}
                    fontWeight={900}
                    letterSpacing="-0.06em"
                    color={COLORS.white}
                    direction="3d-flip"
                    style={{ justifyContent: "center" }}
                  />
                </div>
                <div>
                  <ExpressiveText
                    text="IN HIGH GEAR."
                    startDelay={18}
                    charStagger={1.2}
                    fontSize={88}
                    fontWeight={900}
                    letterSpacing="-0.04em"
                    color={COLORS.ink}
                    highlightWords={[{ word: "IN", color: COLORS.ink, bg: COLORS.white }, { word: "HIGH", color: COLORS.ink, bg: COLORS.white }, { word: "GEAR.", color: COLORS.ink, bg: COLORS.white }]}
                    direction="scale"
                    style={{ justifyContent: "center" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: 44, left: -40, right: -40 }}>
              <Marquee
                items={["TITLES", "STINGERS", "TRAILERS", "CAMPAIGNS", "HERO HEADLINES"]}
                bg={COLORS.ink}
                color={COLORS.white}
                speed={6.5}
                fontSize={24}
                rotate={1.5}
              />
            </div>
          </AbsoluteFill>
        )}

        {/* BEAT B: BRAND IDENTITY CHOREOGRAPHY */}
        {isBeatB && (
          <AbsoluteFill
            style={{
              backgroundColor: COLORS.vermilion,
              color: COLORS.white,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 02 // BRAND CHOREOGRAPHY" />

            {/* Impact Burst at beat entry */}
            <ImpactBurst hitFrame={69} x={1400} y={540} color={COLORS.acidYellow} rayCount={16} maxRadius={280} />

            {/* Morphing Bauhaus Geometric Core */}
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
              <svg width="480" height="480" viewBox="0 0 480 480">
                {/* Concentric rotating arcs */}
                <circle
                  cx="240"
                  cy="240"
                  r="190"
                  fill="none"
                  stroke={COLORS.white}
                  strokeWidth="6"
                  strokeDasharray="45 25"
                  transform={`rotate(${frame * 2.2} 240 240)`}
                />
                <circle
                  cx="240"
                  cy="240"
                  r="140"
                  fill="none"
                  stroke={COLORS.acidYellow}
                  strokeWidth="14"
                  strokeDasharray="85 35"
                  transform={`rotate(${-frame * 3.2} 240 240)`}
                />
                <rect
                  x="165"
                  y="165"
                  width="150"
                  height="150"
                  fill={COLORS.ink}
                  rx="32"
                  transform={`rotate(${frame * 4} 240 240)`}
                />
                <polygon
                  points="240,185 285,260 195,260"
                  fill={COLORS.acidYellow}
                  transform={`rotate(${-frame * 2.4} 240 240)`}
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
                  fontSize: 14,
                  fontWeight: 800,
                  color: COLORS.acidYellow,
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                }}
              >
                DYNAMIC DESIGN SYSTEMS
              </div>
              <div style={{ marginBottom: 14 }}>
                <ExpressiveText
                  text="LOGOS THAT"
                  startDelay={69}
                  charStagger={1.3}
                  color={COLORS.white}
                  fontSize={100}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  direction="3d-flip"
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <ExpressiveText
                  text="NEVER SIT STILL."
                  startDelay={77}
                  charStagger={1.3}
                  color={COLORS.acidYellow}
                  fontSize={110}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  highlightWords={[{ word: "NEVER", color: COLORS.acidYellow }]}
                  direction="3d-flip"
                />
              </div>
              <p
                style={{
                  fontSize: 24,
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                Transform static guidelines into living, breathing brand anthems across all digital surfaces.
              </p>
            </div>
          </AbsoluteFill>
        )}

        {/* BEAT C: PRODUCT & UI MOTION */}
        {isBeatC && (
          <AbsoluteFill
            style={{
              backgroundColor: COLORS.ink,
              color: COLORS.white,
            }}
          >
            <StudioHeader dark={false} tagline="CAPABILITY 03 // UI & PRODUCT MOTION" />

            <ImpactBurst hitFrame={139} x={1450} y={540} color={COLORS.emerald} rayCount={14} />

            {/* Interactive UI Mockup Card */}
            <div
              style={{
                position: "absolute",
                right: 120,
                top: "50%",
                transform: "translateY(-50%)",
                width: 600,
                backgroundColor: "rgba(255,255,255,0.07)",
                borderRadius: 26,
                border: "1.5px solid rgba(255,255,255,0.18)",
                padding: "38px",
                backdropFilter: "blur(24px)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <div style={{ display: "flex", gap: 9 }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: COLORS.vermilion }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: COLORS.acidYellow }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: COLORS.emerald }} />
                </div>
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.gray, fontWeight: 700 }}>
                  LIVE PREVIEW // 60FPS LOSSLESS
                </span>
              </div>

              {/* Animated Interactive Bar Chart */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontFamily: FONTS.mono, color: COLORS.gray, marginBottom: 14 }}>
                  ENGAGEMENT SURGE (+480%)
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 130 }}>
                  {[40, 65, 30, 85, 55, 95, 75, 100].map((val, idx) => {
                    const barSpring = spring({
                      frame: frame - 142 - idx * 2,
                      fps,
                      config: SPRINGS.bouncy,
                    });
                    const pulse = 1 + Math.sin(frame * 0.1 + idx) * 0.05;
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${val * barSpring * pulse}%`,
                          backgroundColor: idx === 7 ? COLORS.acidYellow : COLORS.cobaltLight,
                          borderRadius: "6px 6px 0 0",
                          boxShadow: idx === 7 ? `0 0 20px ${COLORS.acidYellow}` : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Interactive Toggle Pill */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>Micro-interactions</div>
                  <div style={{ fontSize: 13, color: COLORS.gray }}>Elastic spring physics applied</div>
                </div>
                <div
                  style={{
                    width: 54,
                    height: 30,
                    borderRadius: 99,
                    backgroundColor: COLORS.emerald,
                    padding: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    boxShadow: `0 0 16px ${COLORS.emerald}`,
                  }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: COLORS.white }} />
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
                  fontSize: 14,
                  fontWeight: 800,
                  color: COLORS.emerald,
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
                  charStagger={1.2}
                  color={COLORS.white}
                  fontSize={95}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  direction="3d-flip"
                />
              </div>
              <div style={{ marginBottom: 22 }}>
                <ExpressiveText
                  text="THAT SELLS."
                  startDelay={148}
                  charStagger={1.4}
                  color={COLORS.emerald}
                  fontSize={100}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  direction="3d-flip"
                />
              </div>
              <p
                style={{
                  fontSize: 24,
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 620,
                  margin: 0,
                }}
              >
                Transform SaaS features and mobile flows into seductive, tactile video assets for product launches.
              </p>
            </div>
          </AbsoluteFill>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
