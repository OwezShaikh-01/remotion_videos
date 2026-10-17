import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../components/CameraRig";
import { KineticWord } from "../components/KineticWord";

export const Act2_DrexelHallway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 1948 Hallway Entry (Frames 0 -> 262)
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  // Phase 2: Checkout Bottleneck & Mistakes (Frames 262 -> 492)
  const isBottleneck = frame >= 262 && frame < 657;

  // Phase 3: The Dean's Rejection "NO" (Frames 657 -> 703)
  const isDeanNo = frame >= 657 && frame < 728;

  // Phase 4: Bernard Silver & Norman Woodland (Frames 728 -> 958)
  const isPartners = frame >= 728;

  return (
    <CameraRig durationInFrames={958} zoom={[1, 1.08]} panY={[0, -15]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#07080D",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle Architectural Grid Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* PHASE 1: Philadelphia, 1948 Drexel Hallway */}
        {frame < 262 && (
          <div style={{ textAlign: "center", transform: `scale(${entryProgress})` }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: 6,
                color: "#E2B17A",
                marginBottom: 10,
              }}
            >
              PHILADELPHIA // 1948
            </div>
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 110,
                color: "#FFFFFF",
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              DREXEL INSTITUTE
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: "#8D99AE",
                marginTop: 12,
              }}
            >
              OVERHEARD IN A HALLWAY
            </div>
          </div>
        )}

        {/* PHASE 2: The Checkout Bottleneck & Human Error */}
        {isBottleneck && (
          <div style={{ position: "relative", width: 1200, height: 600 }}>
            {/* Rapid Fire Keystrokes Visual */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 80,
              }}
            >
              {[
                "$0.45",
                "$1.20",
                "KEY BY HAND",
                "ERR: WRONG PRICE",
                "$0.89",
                "$2.15",
                "HUMAN ERROR",
                "$0.19",
                "MISCOUNT",
                "LINE AT STANDSTILL",
              ].map((txt, i) => {
                const itemVisible = frame >= 262 + i * 18;
                if (!itemVisible) return null;
                const isErr = txt.includes("ERR") || txt.includes("ERROR") || txt.includes("MISCOUNT");
                return (
                  <div
                    key={i}
                    style={{
                      background: isErr ? "#FF1E44" : "#1A2030",
                      color: "#FFF",
                      padding: "16px 28px",
                      borderRadius: 4,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 700,
                      fontSize: isErr ? 24 : 20,
                      transform: `rotate(${((i % 5) - 2) * 4}deg)`,
                      boxShadow: isErr
                        ? "0 0 30px rgba(255, 30, 68, 0.7)"
                        : "0 10px 25px rgba(0,0,0,0.5)",
                    }}
                  >
                    {txt}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PHASE 3: The Dean Says NO */}
        {isDeanNo && (
          <div style={{ textAlign: "center" }}>
            <KineticWord
              text="NO."
              triggerFrame={657}
              fontSize={240}
              color="#FF1E44"
              rotation={-4}
            />
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 18,
                letterSpacing: 4,
                color: "#8892B0",
                marginTop: 20,
              }}
            >
              "THE DEAN SAID IT WAS IMPOSSIBLE."
            </div>
          </div>
        )}

        {/* PHASE 4: Silver & Woodland Obsession */}
        {isPartners && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 80,
            }}
          >
            {/* Bernard Silver Card */}
            <div
              style={{
                background: "#EAE5D9",
                color: "#111",
                padding: "20px 24px 34px 24px",
                width: 320,
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                transform: "rotate(-4deg)",
              }}
            >
              <div
                style={{
                  height: 220,
                  backgroundColor: "#202532",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FFF",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                }}
              >
                [GRADUATE STUDENT]
              </div>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 26,
                  marginTop: 14,
                  letterSpacing: 1,
                }}
              >
                BERNARD SILVER
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#666" }}>
                OVERHEARD THE PROBLEM
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 60,
                color: "#E2B17A",
              }}
            >
              ➔
            </div>

            {/* Norman Joseph Woodland Card */}
            <div
              style={{
                background: "#EAE5D9",
                color: "#111",
                padding: "20px 24px 34px 24px",
                width: 320,
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                transform: "rotate(4deg)",
              }}
            >
              <div
                style={{
                  height: 220,
                  backgroundColor: "#161924",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#E2B17A",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                }}
              >
                [THE INVENTOR]
              </div>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 26,
                  marginTop: 14,
                  letterSpacing: 1,
                }}
              >
                NORMAN WOODLAND
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#666" }}>
                COULDN'T LET IT GO
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
