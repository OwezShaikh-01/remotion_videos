import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../components/CameraRig";

export const Act3_PhiladelphiaCrisis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Drexel Entrance Blueprint (Frames 0 -> 270)
  const drexelSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Phase 2: Cashier Manual Punching Chaos (Frames 270 -> 540)
  const registerSpring = spring({
    frame: frame - 270,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 3: Inventory Error Mismatch (Frames 540 -> 810)
  const errorSpring = spring({
    frame: frame - 540,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Phase 4: The Hallway Question (Frames 810 -> 1050)
  const questionSpring = spring({
    frame: frame - 810,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Phase 5: The Dean's "NO" Stamp (Frames 1050 -> 1170)
  const noStampSpring = spring({
    frame: frame - 1050,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  return (
    <CameraRig durationInFrames={1170} zoom={[1, 1.07]} panX={[0, -20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#0A0B10",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 184, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 184, 0, 0.03) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
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
                color: "#FFB800",
                background: "rgba(255, 184, 0, 0.12)",
                border: "1px solid rgba(255, 184, 0, 0.35)",
                padding: "6px 14px",
                borderRadius: 4,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              ACT 03 // THE 1948 CRISIS
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
              THE RETAIL BOTTLENECK
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
            LOCATION: DREXEL TECH, PHILADELPHIA<br />
            DATE: OCTOBER 1948<br />
            STATUS: 100% MANUAL DELAY
          </div>
        </div>

        {/* SECTION 1: DREXEL INSTITUTE ENTRANCE (Frames 0 -> 270) */}
        {frame < 270 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, drexelSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: 18,
                letterSpacing: 4,
                color: "#E2B17A",
                marginBottom: 10,
              }}
            >
              PHILADELPHIA, PENNSYLVANIA // 1948
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 90,
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              DREXEL INSTITUTE<br />
              <span style={{ color: "#FFB800" }}>OF TECHNOLOGY</span>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: "#9CA3AF",
                marginTop: 20,
                letterSpacing: 2,
              }}
            >
              A FOOD CHAIN PRESIDENT WALKS IN WITH AN IMPOSSIBLE PROBLEM.
            </div>
          </div>
        )}

        {/* SECTION 2: MANUAL CASHIER PUNCHING CHAOS (Frames 270 -> 540) */}
        {frame >= 270 && frame < 540 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, registerSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              {["$0.29", "$1.45", "$0.89", "$2.15", "$0.49"].map((price, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#181A26",
                    border: "2px solid #FF453A",
                    padding: "20px 28px",
                    borderRadius: 8,
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 44,
                    color: "#FFF",
                    boxShadow: "0 15px 35px rgba(255, 69, 58, 0.2)",
                  }}
                >
                  {price}
                </div>
              ))}
            </div>

            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 78,
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              CHECKOUT IS SLOW.<br />
              <span style={{ color: "#FF453A" }}>EVERY PRICE KEYED BY HAND.</span>
            </div>
          </div>
        )}

        {/* SECTION 3: MISTAKES EVERYWHERE & SHELF BLINDNESS (Frames 540 -> 810) */}
        {frame >= 540 && frame < 810 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, errorSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 30,
                width: 800,
                margin: "0 auto 30px",
              }}
            >
              <div
                style={{
                  background: "#161219",
                  border: "1px solid #3B1E28",
                  padding: "28px",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 64,
                    color: "#FF453A",
                  }}
                >
                  ERRORS
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    color: "#9CA3AF",
                  }}
                >
                  TYPOS ON EVERY RECEIPT
                </div>
              </div>

              <div
                style={{
                  background: "#131620",
                  border: "1px solid #1E283E",
                  padding: "28px",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 64,
                    color: "#00E5FF",
                  }}
                >
                  UNKNOWN
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    color: "#9CA3AF",
                  }}
                >
                  WHAT'S SITTING ON SHELVES
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              NOBODY KNOWS WHAT'S REALLY SITTING ON THE SHELVES.
            </div>
          </div>
        )}

        {/* SECTION 4: THE HALLWAY QUESTION (Frames 810 -> 1050) */}
        {frame >= 810 && frame < 1050 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, questionSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                letterSpacing: 3,
                color: "#00E5FF",
                marginBottom: 16,
              }}
            >
              THE PROPOSITION TO THE DEAN
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 64,
                color: "#FFFFFF",
                lineHeight: 1.15,
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              "COULD YOU BUILD A WAY FOR A STORE TO READ A PRODUCT{" "}
              <span style={{ color: "#00E5FF" }}>AUTOMATICALLY</span>?"
            </div>
          </div>
        )}

        {/* SECTION 5: THE DEAN'S "NO" (Frames 1050 -> 1170) */}
        {frame >= 1050 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, noStampSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                display: "inline-block",
                border: "8px solid #FF3B30",
                color: "#FF3B30",
                fontFamily: "'Anton', sans-serif",
                fontSize: 180,
                lineHeight: 1,
                padding: "10px 60px",
                borderRadius: 16,
                boxShadow: "0 0 80px rgba(255, 59, 48, 0.4)",
                transform: "rotate(-4deg)",
              }}
            >
              NO.
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 24,
                letterSpacing: 4,
                color: "#E5E7EB",
                marginTop: 25,
              }}
            >
              THE DEAN SAYS NO.
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
            {frame < 270 && "Philadelphia, 1948. The president of a food chain walks into Drexel with a problem."}
            {frame >= 270 && frame < 540 && "Checkout is slow. Cashiers key in every price by hand."}
            {frame >= 540 && frame < 810 && "Mistakes are everywhere. And nobody knows what's really sitting on the shelves."}
            {frame >= 810 && frame < 1050 && "He asks the dean, could you build a way for a store to read a product automatically?"}
            {frame >= 1050 && "The dean says no."}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            FRAME {frame} / 1170
          </div>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
