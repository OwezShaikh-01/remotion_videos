import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { LiquidGeometry } from "../components/LiquidGeometry";
import { FLUID_EASE } from "../utils/motion";

export const Scene6CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance
  const enterSpring = spring({ frame, fps, config: SPRINGS.silky });
  const enterScale = interpolate(enterSpring, [0, 1], [0.98, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Button entrance
  const btnProgress = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  // Natural, fluid cursor glide into the button
  const cursorProgress = interpolate(frame, [24, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [1400, 1140]);
  const cursorY = interpolate(cursorProgress, [0, 1], [820, 580]);

  // Soft button activation at frame 62 (gentle ambient luminescence, zero harsh flash)
  const isHovered = frame >= 60;
  const hoverGlow = isHovered
    ? interpolate(frame, [60, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: FLUID_EASE,
      })
    : 0;

  // Final lockup gentle settle
  const settleSpring = spring({
    frame: frame - 90,
    fps,
    config: SPRINGS.floating,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.obsidian,
        color: COLORS.titanium,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale * (1 + settleSpring * 0.02)})`,
        opacity: enterOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig zoomStart={1} zoomEnd={1.03} panXStart={0} panXEnd={-8}>
        <StudioHeader dark={false} tagline="FINALE / 06 • INITIATE" />

        {/* Ambient Studio Halos */}
        <div style={{ position: "absolute", top: "25%", left: "20%", opacity: 0.45 }}>
          <LiquidGeometry size={700} color={COLORS.cobalt} delay={0} />
        </div>
        <div style={{ position: "absolute", bottom: "15%", right: "15%", opacity: 0.3 }}>
          <LiquidGeometry size={550} color={COLORS.amber} delay={10} />
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

        {/* Rotating Studio Stamp in Top Right */}
        <div style={{ position: "absolute", top: 120, right: 120 }}>
          <BadgeSeal
            size={160}
            bg="rgba(255, 255, 255, 0.04)"
            color={COLORS.titanium}
            centerText="HIRE"
            subText="NOW"
            delay={10}
            rotationSpeed={0.3}
          />
        </div>

        {/* Centered Grand Typography & Call To Action */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "47%",
            transform: "translateY(-50%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Eyebrow Status */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${COLORS.borderDark}`,
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
                backgroundColor: COLORS.emerald,
                boxShadow: `0 0 10px ${COLORS.emerald}`,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.titanium,
                letterSpacing: "0.18em",
              }}
            >
              AVAILABLE FOR PRODUCTION COMMISSIONS
            </span>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 16 }}>
            <ExpressiveText
              text="READY TO ELEVATE"
              startDelay={6}
              wordStagger={3}
              color={COLORS.titanium}
              fontSize={90}
              fontWeight={900}
              letterSpacing="-0.05em"
              style={{ justifyContent: "center" }}
            />
          </div>

          <div style={{ marginBottom: 38 }}>
            <ExpressiveText
              text="YOUR BRAND'S MOTION?"
              startDelay={14}
              wordStagger={3}
              color={COLORS.cobalt}
              fontSize={100}
              fontWeight={900}
              letterSpacing="-0.06em"
              style={{ justifyContent: "center" }}
            />
          </div>

          {/* Refined Magnetic Pill CTA Button */}
          <div
            style={{
              transform: `translate3d(0, ${interpolate(btnProgress, [0, 1], [30, 0])}px, 0)`,
              opacity: btnProgress,
              display: "inline-block",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 20,
                backgroundColor: COLORS.titanium,
                color: COLORS.obsidian,
                padding: "22px 52px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                boxShadow: isHovered
                  ? `0 20px 60px ${COLORS.cobaltGlow}, 0 0 30px rgba(255, 255, 255, 0.4)`
                  : "0 18px 50px rgba(0, 0, 0, 0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <span>COMMISSION AI MOTION</span>
              <span
                style={{
                  fontSize: 28,
                  transform: `translateX(${hoverGlow * 4}px)`,
                  transition: "transform 0.2s ease",
                }}
              >
                →
              </span>
            </div>
          </div>

          {/* Website & Direct Information */}
          <div style={{ marginTop: 46 }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "rgba(248, 249, 250, 0.8)",
              }}
            >
              hire-ai-motion.design
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                color: COLORS.mutedTextDark,
                marginTop: 10,
                letterSpacing: "0.12em",
                opacity: 0.7,
              }}
            >
              DESIGN SYSTEMS • CAMPAIGN IDENTITIES • HIGH-VELOCITY PRODUCTION
            </div>
          </div>
        </div>

        {/* Minimalist Vector Mouse Cursor */}
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            pointerEvents: "none",
            zIndex: 99,
            filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.45))",
          }}
        >
          <svg width="32" height="40" viewBox="0 0 34 42" fill="none">
            <path
              d="M2 2L13.5 37.5L18.5 24.5L31.5 20.5L2 2Z"
              fill={COLORS.titanium}
              stroke={COLORS.obsidian}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
