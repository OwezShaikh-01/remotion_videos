import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../components/CameraRig";

export const Act2_TheTragedyAndCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Obituary Card for Bernard Silver (Frames 0 -> 240)
  const silverCardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Phase 2: Juicy Fruit Pack Silhouette (Frames 240 -> 450)
  const gumPackSpring = spring({
    frame: frame - 240,
    fps,
    config: { damping: 12, stiffness: 85 },
  });

  // Phase 3: Bullseye vs Bars Duel (Frames 450 -> 700)
  const circleRotation = interpolate(frame, [450, 700], [0, 180]);
  const circleVsBarsSpring = spring({
    frame: frame - 450,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Phase 4: Math Check Digit Tease (Frames 700 -> 870)
  const mathTeaseSpring = spring({
    frame: frame - 700,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 5: Hallway Question Lead-in (Frames 870 -> 990)
  const hallwayFade = interpolate(frame, [870, 930], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CameraRig durationInFrames={990} zoom={[1, 1.06]} panX={[0, 20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#07080D",
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
              "linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
                color: "#E2B17A",
                background: "rgba(226, 177, 122, 0.12)",
                border: "1px solid rgba(226, 177, 122, 0.35)",
                padding: "6px 14px",
                borderRadius: 4,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              ACT 02 // THE CIRCLE & THE TRAGEDY
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
              ONE DIED BEFORE IT WORKED
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
            INVENTORS: SILVER & WOODLAND<br />
            FIRST SCAN: JUNE 26, 1974<br />
            TARGET: WRIGLEY'S JUICY FRUIT
          </div>
        </div>

        {/* SECTION 1: BERNARD SILVER OBITUARY MEMORIAL (Frames 0 -> 240) */}
        {frame < 240 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, silverCardSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: 320,
                background: "#12141F",
                border: "1px solid #282D42",
                borderRadius: 12,
                padding: "28px 24px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                margin: "0 auto 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: "#FF453A",
                  letterSpacing: 2,
                  marginBottom: 8,
                }}
              >
                IN MEMORIAM // 1924 – 1962
              </div>
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 38,
                  color: "#FFF",
                }}
              >
                BERNARD SILVER
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: "#9CA3AF",
                  marginTop: 6,
                }}
              >
                CO-INVENTOR // DIED AT AGE 38
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 72,
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              HE NEVER SAW IT <span style={{ color: "#FF453A" }}>WORK</span>.
            </div>
          </div>
        )}

        {/* SECTION 2: THE JUICY FRUIT GUM PACK (Frames 240 -> 450) */}
        {frame >= 240 && frame < 450 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, gumPackSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: 440,
                height: 180,
                background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
                borderRadius: 10,
                boxShadow: "0 30px 80px rgba(250, 204, 21, 0.25), 0 0 0 1px rgba(255,255,255,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 30px",
                color: "#1E1B4B",
              }}
            >
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 48,
                  letterSpacing: 2,
                }}
              >
                JUICY FRUIT
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 13,
                  fontWeight: "bold",
                  letterSpacing: 3,
                }}
              >
                WRIGLEY'S 10-PACK CHEWING GUM
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
              THE FIRST PRODUCT EVER SCANNED
            </div>
          </div>
        )}

        {/* SECTION 3: BULLSEYE VS BARS TEASE (Frames 450 -> 700) */}
        {frame >= 450 && frame < 700 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 80,
              transform: `scale(${Math.max(0, circleVsBarsSpring)})`,
              zIndex: 15,
            }}
          >
            {/* The Concentric Bullseye */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  border: "12px solid #FFF",
                  boxShadow:
                    "0 0 0 14px #07080D, 0 0 0 24px #FFF, 0 0 0 36px #07080D, 0 0 0 46px #FFF",
                  transform: `rotate(${circleRotation}deg)`,
                  margin: "0 auto 25px",
                }}
              />
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 32,
                  color: "#FF453A",
                }}
              >
                THE BULLSEYE CIRCLE
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 64,
                color: "#6B7280",
              }}
            >
              VS
            </div>

            {/* The Rectangular Bars */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  height: 220,
                  background: "#FFF",
                  padding: "16px 24px",
                  borderRadius: 6,
                  margin: "0 auto 25px",
                }}
              >
                {[6, 12, 4, 16, 8, 4, 20, 8, 4, 14, 6].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: w * 1.8,
                      height: "100%",
                      backgroundColor: "#000",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 32,
                  color: "#00E5FF",
                }}
              >
                IBM'S STRAIGHT BARS
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: IN YOUR HEAD CHECK DIGIT TEASE (Frames 700 -> 870) */}
        {frame >= 700 && frame < 870 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, mathTeaseSpring)})`,
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
              MENTAL VERIFICATION ALGORITHM
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginBottom: 25,
              }}
            >
              {["0", "3", "6", "0", "0", "0", "2", "9", "1", "4", "5", "[2]"].map(
                (char, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 60,
                      height: 70,
                      background: idx === 11 ? "#FF3B30" : "#131722",
                      border: "1px solid #232B40",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 36,
                      color: "#FFF",
                    }}
                  >
                    {char}
                  </div>
                )
              )}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              YOU'LL BE ABLE TO CHECK A BARCODE IN YOUR HEAD
            </div>
          </div>
        )}

        {/* SECTION 5: HALLWAY TRANSITION (Frames 870 -> 990) */}
        {frame >= 870 && (
          <div
            style={{
              textAlign: "center",
              opacity: hallwayFade,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#E2B17A",
                marginBottom: 12,
              }}
            >
              PHILADELPHIA // 1948
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 90,
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              A QUESTION OVERHEARD<br />
              <span style={{ color: "#00E5FF" }}>IN A HALLWAY</span>
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
            {frame < 240 && "One of them died before it ever worked."}
            {frame >= 240 && frame < 450 && "And the first product it ever scanned, supposedly, was a pack of gum."}
            {frame >= 450 && frame < 700 && "By the end of this video, you'll know why the winning design almost lost to a circle."}
            {frame >= 700 && frame < 870 && "And you'll be able to check, in your head, whether a barcode is real."}
            {frame >= 870 && "But first, a question overheard in a hallway."}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            FRAME {frame} / 990
          </div>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
