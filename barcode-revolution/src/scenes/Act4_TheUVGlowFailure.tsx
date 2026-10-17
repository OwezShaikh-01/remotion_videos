import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../components/CameraRig";

export const Act4_TheUVGlowFailure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Silver eavesdropping (Frames 0 -> 240)
  const silverEavesdropSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Phase 2: Woodland "Can't let it go" (Frames 240 -> 450)
  const woodlandObsessionSpring = spring({
    frame: frame - 240,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  // Phase 3: UV ink glow experiment (Frames 450 -> 690)
  const uvGlowIntensity = interpolate(
    frame,
    [450, 510, 600, 690],
    [0, 1, 0.9, 0.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: Miami Beach Flight (Frames 690 -> 930)
  const miamiTransitSpring = spring({
    frame: frame - 690,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <CameraRig durationInFrames={930} zoom={[1, 1.06]} panX={[0, 20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#090611",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Ambient UV Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(168, 85, 247, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ultraviolet Glow Bubble */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)",
            opacity: uvGlowIntensity,
            pointerEvents: "none",
          }}
        />

        {/* TOP HUD METADATA */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            zIndex: 20,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#C084FC",
                background: "rgba(192, 132, 252, 0.12)",
                border: "1px solid rgba(192, 132, 252, 0.35)",
                padding: "6px 14px",
                borderRadius: 4,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              ACT 04 // THE FIRST EXPERIMENT
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 54,
                lineHeight: 1,
                color: "#FFF",
                letterSpacing: 1,
              }}
            >
              THE ULTRAVIOLET DEAD END
            </div>
          </div>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#6B7280",
              textAlign: "right",
              lineHeight: 1.6,
            }}
          >
            EXPERIMENT: GLOWING UV INK<br />
            TEST: BLACKLIGHT READING<br />
            RESULT: CATASTROPHIC BLEED
          </div>
        </div>

        {/* SECTION 1: BERNARD SILVER OVERHEARS (Frames 0 -> 240) */}
        {frame < 240 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, silverEavesdropSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#00E5FF",
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              GRADUATE STUDENT // DREXEL TECH
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 90,
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              BERNARD SILVER IS<br />
              <span style={{ color: "#00E5FF" }}>STANDING CLOSE ENOUGH</span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                color: "#9CA3AF",
                marginTop: 15,
              }}
            >
              He hears the conversation the Dean dismissed.
            </div>
          </div>
        )}

        {/* SECTION 2: WOODLAND CAN'T LET IT GO (Frames 240 -> 450) */}
        {frame >= 240 && frame < 450 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, woodlandObsessionSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#E2B17A",
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              PARTNER // NORMAN JOSEPH WOODLAND
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 100,
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              WOODLAND CAN'T<br />
              <span style={{ color: "#FF453A" }}>LET IT GO</span>
            </div>
          </div>
        )}

        {/* SECTION 3: ULTRAVIOLET INK EXPERIMENT FAILS (Frames 450 -> 690) */}
        {frame >= 450 && frame < 690 && (
          <div style={{ textAlign: "center", zIndex: 15 }}>
            <div
              style={{
                padding: "30px 60px",
                background: "#120B1E",
                border: "2px solid #C084FC",
                borderRadius: 12,
                display: "inline-block",
                boxShadow:
                  "0 0 50px rgba(192, 132, 252, 0.3), inset 0 0 30px rgba(192, 132, 252, 0.1)",
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 38,
                  fontWeight: "bold",
                  color: "#C084FC",
                  letterSpacing: 6,
                  textShadow: "0 0 20px #C084FC, 0 0 40px #A855F7",
                }}
              >
                [ ULTRAVIOLET INK ]
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 78,
                color: "#EF4444",
                textTransform: "uppercase",
              }}
            >
              IT DOESN'T WORK.
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24,
                color: "#D1D5DB",
                marginTop: 10,
              }}
            >
              Instability, smearing, and chemical decay under retail lights.
            </div>
          </div>
        )}

        {/* SECTION 4: WOODLAND LEAVES FOR MIAMI BEACH (Frames 690 -> 930) */}
        {frame >= 690 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, miamiTransitSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#E2B17A",
                marginBottom: 10,
              }}
            >
              THE EXODUS // 1949
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 84,
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 1.05,
              }}
            >
              LEAVES FOR HIS GRANDFATHER'S<br />
              <span style={{ color: "#E2B17A" }}>APARTMENT IN MIAMI BEACH</span>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#9CA3AF",
                marginTop: 15,
                letterSpacing: 2,
              }}
            >
              TO THINK IN SILENCE.
            </div>
          </div>
        )}

        {/* SUBTITLE BAR */}
        <div
          style={{
            position: "absolute",
            bottom: 45,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(12, 14, 20, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "14px 24px",
            borderRadius: 6,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              color: "#E5E7EB",
              fontWeight: 500,
            }}
          >
            {frame < 240 && "But a graduate student named Bernard Silver is standing close enough to hear."}
            {frame >= 240 && frame < 450 && "He tells his friend Norman Joseph Woodland, and Woodland can't let it go."}
            {frame >= 450 && frame < 690 && "Their first idea is ink that glows under ultraviolet light. It doesn't work."}
            {frame >= 690 && "So Woodland leaves for his grandfather's apartment in Miami Beach to think."}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            FRAME {frame} / 930
          </div>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
