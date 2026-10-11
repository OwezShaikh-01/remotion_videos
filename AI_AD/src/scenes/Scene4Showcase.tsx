import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { KineticWord, StaggeredText } from "../components/KineticText";
import { Marquee } from "../components/Marquee";
import { StudioHeader } from "../components/StudioHeader";

export const Scene4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Micro-beats within the Showcase Reel
  // Beat A: Kinetic Typography (0 - 68 frames)
  // Beat B: Brand Identity Choreography (68 - 138 frames)
  // Beat C: UI / Product Motion Graphics (138 - 205 frames)
  const isBeatA = frame < 68;
  const isBeatB = frame >= 68 && frame < 138;
  const isBeatC = frame >= 138;

  // Scene Entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Outro transition (frames 188 - 205)
  const exitSpring = spring({ frame: frame - 188, fps, config: SPRINGS.snappy });
  const exitY = interpolate(exitSpring, [0, 1], [0, -100]);

  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${exitY}%) scale(${enterScale})`,
        overflow: "hidden",
        fontFamily: FONTS.display,
      }}
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

          {/* 3D Perspective Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              backgroundImage: `linear-gradient(${COLORS.white} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "100%",
              perspective: 1000,
            }}
          >
            {/* 3D Kinetic rotating word cascade */}
            <div
              style={{
                transform: `rotateX(${Math.sin(frame * 0.08) * 15}deg) rotateY(${Math.cos(frame * 0.08) * 12}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <KineticWord
                  text="EXPRESSIVE"
                  color={COLORS.acidYellow}
                  fontSize={140}
                  fontWeight={900}
                  letterSpacing="-0.05em"
                  rotate={-5}
                  delay={4}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <KineticWord
                  text="TYPOGRAPHY"
                  color={COLORS.white}
                  fontSize={155}
                  fontWeight={900}
                  letterSpacing="-0.06em"
                  rotate={4}
                  delay={12}
                />
              </div>
              <div>
                <KineticWord
                  text="IN HIGH GEAR."
                  color={COLORS.ink}
                  fontSize={85}
                  fontWeight={900}
                  letterSpacing="-0.04em"
                  delay={20}
                  style={{
                    backgroundColor: COLORS.white,
                    padding: "4px 30px",
                    borderRadius: 12,
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
            <Marquee
              items={["TITLES", "STINGERS", "TRAILERS", "CAMPAIGNS", "HERO HEADLINES"]}
              bg={COLORS.ink}
              color={COLORS.white}
              speed={6}
              fontSize={24}
              rotate={1}
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
            <svg width="460" height="460" viewBox="0 0 460 460">
              {/* Spinning geometric arcs */}
              <circle
                cx="230"
                cy="230"
                r="180"
                fill="none"
                stroke={COLORS.white}
                strokeWidth="6"
                strokeDasharray="40 25"
                transform={`rotate(${frame * 2} 230 230)`}
              />
              <circle
                cx="230"
                cy="230"
                r="130"
                fill="none"
                stroke={COLORS.acidYellow}
                strokeWidth="12"
                strokeDasharray="80 30"
                transform={`rotate(${-frame * 3} 230 230)`}
              />
              <rect
                x="160"
                y="160"
                width="140"
                height="140"
                fill={COLORS.ink}
                rx="30"
                transform={`rotate(${frame * 4} 230 230)`}
              />
              <polygon
                points="230,180 270,250 190,250"
                fill={COLORS.acidYellow}
                transform={`rotate(${-frame * 2} 230 230)`}
              />
            </svg>
          </div>

          <div
            style={{
              position: "absolute",
              left: 120,
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: 820,
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
            <div style={{ marginBottom: 12 }}>
              <StaggeredText
                sentence="LOGOS THAT"
                startDelay={70}
                staggerFrames={2}
                color={COLORS.white}
                fontSize={95}
                fontWeight={900}
                letterSpacing="-0.05em"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <StaggeredText
                sentence="NEVER SIT STILL."
                startDelay={76}
                staggerFrames={2}
                color={COLORS.acidYellow}
                fontSize={105}
                fontWeight={900}
                letterSpacing="-0.05em"
              />
            </div>
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 620,
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

          {/* Interactive UI Mockup Card with spring animations */}
          <div
            style={{
              position: "absolute",
              right: 120,
              top: "50%",
              transform: "translateY(-50%)",
              width: 580,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "36px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
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
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.vermilion }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.acidYellow }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.emerald }} />
              </div>
              <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.gray }}>
                LIVE PREVIEW // 60FPS
              </span>
            </div>

            {/* Simulated Animated Bar Chart */}
            <div style={{ marginBottom: 30 }}>
              <div style={{ fontSize: 13, fontFamily: FONTS.mono, color: COLORS.gray, marginBottom: 12 }}>
                ENGAGEMENT SURGE (+480%)
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
                {[40, 65, 30, 85, 55, 95, 75, 100].map((val, idx) => {
                  const barSpring = spring({
                    frame: frame - 145 - idx * 2,
                    fps,
                    config: SPRINGS.bouncy,
                  });
                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: `${val * barSpring}%`,
                        backgroundColor: idx === 7 ? COLORS.acidYellow : COLORS.cobaltLight,
                        borderRadius: "6px 6px 0 0",
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
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Micro-interactions</div>
                <div style={{ fontSize: 13, color: COLORS.gray }}>Elastic spring physics applied</div>
              </div>
              <div
                style={{
                  width: 52,
                  height: 28,
                  borderRadius: 99,
                  backgroundColor: COLORS.emerald,
                  padding: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: COLORS.white }} />
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 120,
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: 780,
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
            <div style={{ marginBottom: 12 }}>
              <StaggeredText
                sentence="PRODUCT MOTION"
                startDelay={140}
                staggerFrames={2}
                color={COLORS.white}
                fontSize={90}
                fontWeight={900}
                letterSpacing="-0.05em"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <StaggeredText
                sentence="THAT SELLS."
                startDelay={146}
                staggerFrames={2}
                color={COLORS.emerald}
                fontSize={95}
                fontWeight={900}
                letterSpacing="-0.05em"
              />
            </div>
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 600,
              }}
            >
              Transform SaaS features and mobile flows into seductive, tactile video assets for product launches.
            </p>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
