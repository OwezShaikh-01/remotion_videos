import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPRINGS } from "../theme";
import { ExpressiveText } from "../components/ExpressiveText";
import { BadgeSeal } from "../components/BadgeSeal";
import { StudioHeader } from "../components/StudioHeader";
import { CameraRig } from "../components/CameraRig";
import { ImpactBurst } from "../components/ImpactBurst";
import { LiquidGeometry } from "../components/LiquidGeometry";

export const Scene6CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({ frame, fps, config: SPRINGS.smooth });
  const enterScale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 0.4, 1], [0, 1, 1]);

  // Button entrance spring
  const btnSpring = spring({ frame: frame - 22, fps, config: SPRINGS.bouncy });

  // Cursor gliding into button with bezier-like curve
  const cursorProgress = interpolate(frame, [22, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [1480, 1140]);
  const cursorY = interpolate(cursorProgress, [0, 1], [860, 580]);

  // Click pulse at frame 58
  const isClicked = frame >= 58;
  const clickSpring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 7, mass: 0.35, stiffness: 360 },
  });
  const btnPressScale = isClicked ? interpolate(clickSpring, [0, 0.25, 1], [1, 0.92, 1]) : 1;

  // Final lockup settle
  const settleSpring = spring({
    frame: frame - 95,
    fps,
    config: SPRINGS.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONTS.display,
        transform: `scale(${enterScale * (1 + settleSpring * 0.04)})`,
        opacity: enterOpacity,
        overflow: "hidden",
      }}
    >
      <CameraRig
        impactFrames={[10, 58]}
        zoomStart={1}
        zoomEnd={1.06}
        panXStart={0}
        panXEnd={-10}
      >
        <StudioHeader dark={false} tagline="FINALE / 06 • INITIATE" />

        {/* Ambient Morphing Liquid Blobs */}
        <div style={{ position: "absolute", top: -100, left: -50, opacity: 0.25 }}>
          <LiquidGeometry size={600} color={COLORS.vermilion} delay={0} />
        </div>
        <div style={{ position: "absolute", bottom: -120, right: 80, opacity: 0.2 }}>
          <LiquidGeometry size={500} color={COLORS.cobalt} delay={15} />
        </div>

        {/* Atmospheric Radial Spotlight */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1300,
            height: 850,
            background: "radial-gradient(circle, rgba(255,59,20,0.14) 0%, rgba(22,52,254,0.08) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Rotating Studio Stamp in Top Right */}
        <div style={{ position: "absolute", top: 120, right: 120 }}>
          <BadgeSeal
            size={170}
            bg={COLORS.vermilion}
            color={COLORS.white}
            centerText="HIRE"
            subText="NOW"
            delay={10}
            rotationSpeed={1.4}
          />
        </div>

        {/* Impact Burst when the cursor clicks */}
        {isClicked && (
          <ImpactBurst
            hitFrame={58}
            x={1140}
            y={580}
            color={COLORS.acidYellow}
            rayCount={16}
            maxRadius={300}
          />
        )}

        {/* Centered Grand Typography & Magnetic Button */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "46%",
            transform: "translateY(-50%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(255, 255, 255, 0.22)",
              padding: "10px 24px",
              borderRadius: 999,
              marginBottom: 30,
            }}
          >
            <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: COLORS.emerald, boxShadow: `0 0 12px ${COLORS.emerald}` }} />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 800,
                color: COLORS.white,
                letterSpacing: "0.2em",
              }}
            >
              AVAILABLE FOR IMMEDIATE COMMISSIONS
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <ExpressiveText
              text="READY TO OUT-MOVE"
              startDelay={6}
              charStagger={1.2}
              color={COLORS.ivory}
              fontSize={94}
              fontWeight={900}
              letterSpacing="-0.05em"
              direction="3d-flip"
              style={{ justifyContent: "center" }}
            />
          </div>

          <div style={{ marginBottom: 38 }}>
            <ExpressiveText
              text="YOUR COMPETITION?"
              startDelay={16}
              charStagger={1.4}
              color={COLORS.vermilion}
              fontSize={108}
              fontWeight={900}
              letterSpacing="-0.06em"
              direction="3d-flip"
              style={{ justifyContent: "center" }}
            />
          </div>

          {/* Interactive CTA Magnetic Button */}
          <div
            style={{
              transform: `scale(${btnSpring * btnPressScale})`,
              display: "inline-block",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 22,
                backgroundColor: isClicked ? COLORS.acidYellow : COLORS.white,
                color: COLORS.ink,
                padding: "24px 56px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                boxShadow: isClicked
                  ? `0 0 60px ${COLORS.acidYellow}`
                  : "0 25px 70px rgba(255,255,255,0.28)",
                transition: "background-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span>HIRE YOUR AI MOTION DESIGNER</span>
              <span style={{ fontSize: 32, transform: "translateY(-2px)" }}>→</span>
            </div>

            {/* Expanding shockwave ring on click */}
            {isClicked && (
              <div
                style={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: 999,
                  border: `3px solid ${COLORS.acidYellow}`,
                  opacity: interpolate(clickSpring, [0, 1], [1, 0]),
                  transform: `scale(${interpolate(clickSpring, [0, 1], [1, 1.45])})`,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Website & Direct Contact info */}
          <div style={{ marginTop: 50 }}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              hire-ai-motion.design
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                color: COLORS.gray,
                marginTop: 10,
                letterSpacing: "0.12em",
              }}
            >
              FULL COMMISSIONS • DESIGN SYSTEMS • HIGH VELOCITY SOCIAL
            </div>
          </div>
        </div>

        {/* Animated Mouse Cursor Vector */}
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            pointerEvents: "none",
            zIndex: 99,
            transform: `scale(${isClicked ? 0.9 : 1})`,
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.6))",
          }}
        >
          <svg width="36" height="44" viewBox="0 0 34 42" fill="none">
            <path
              d="M2 2L13.5 37.5L18.5 24.5L31.5 20.5L2 2Z"
              fill={COLORS.white}
              stroke={COLORS.ink}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
