import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../components/CameraRig";

export const Act1_TheInvisiblePattern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Macro lines reveal (Frames 0 -> 240)
  const linesExpansion = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Phase 2: 10,000 times counter (Frames 240 -> 450)
  const counterVal = Math.floor(
    interpolate(frame, [240, 390], [0, 10000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Phase 3: Florida beach flash teaser (Frames 450 -> 690)
  const beachTease = interpolate(frame, [450, 490, 650, 690], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: 25 Years Frozen Timeline (Frames 690 -> 870)
  const frozenProgress = interpolate(frame, [690, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: $15,000 Patent Tag (Frames 870 -> 1080)
  const fifteenGrandSpring = spring({
    frame: frame - 870,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Laser scanning blade animation
  const laserY = interpolate(frame % 90, [0, 90], [280, 800]);

  return (
    <CameraRig durationInFrames={1080} zoom={[1, 1.08]} panX={[0, -25]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#07080B",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Ambient Dark Blueprint Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, rgba(7, 8, 11, 0.9) 85%)",
          }}
        />

        {/* Global Laser Scanning Line */}
        <div
          style={{
            position: "absolute",
            top: laserY,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "#FF3B30",
            boxShadow: "0 0 16px #FF3B30, 0 0 35px rgba(255, 59, 48, 0.7)",
            opacity: frame < 870 ? 0.85 : 0.2,
            zIndex: 10,
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
                color: "#FF3B30",
                background: "rgba(255, 59, 48, 0.1)",
                border: "1px solid rgba(255, 59, 48, 0.35)",
                padding: "6px 14px",
                borderRadius: 4,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              ACT 01 // THE INVISIBLE ARCHITECTURE
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
              THE PATTERN WITHIN ARM'S REACH
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
            SYS: OPTICAL SYMBOLOGY<br />
            TARGET: UNIVERSAL PRODUCT CODE<br />
            FREQUENCY: 30 FPS // 1080P
          </div>
        </div>

        {/* SECTION 1: MACRO BARCODE REVEAL (Frames 0 -> 240) */}
        {frame < 250 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: `scale(${linesExpansion})`,
              background: "#FFFFFF",
              padding: "36px 48px",
              borderRadius: 8,
              boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            {[
              4, 8, 16, 4, 24, 8, 4, 32, 12, 4, 16, 8, 28, 4, 12, 6, 20, 8,
              36, 4, 18, 6, 12, 28, 8, 4, 16, 4,
            ].map((w, idx) => (
              <div
                key={idx}
                style={{
                  width: w * 2.2,
                  height: 420,
                  backgroundColor: "#000000",
                }}
              />
            ))}
          </div>
        )}

        {/* SECTION 2: 10,000 TIMES ACCELERATOR (Frames 240 -> 450) */}
        {frame >= 240 && frame < 450 && (
          <div style={{ textAlign: "center", zIndex: 15 }}>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 160,
                color: "#FFFFFF",
                letterSpacing: 4,
                lineHeight: 1,
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              {counterVal.toLocaleString()}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 34,
                fontWeight: 700,
                color: "#E2B17A",
                textTransform: "uppercase",
                letterSpacing: 6,
                marginTop: 15,
              }}
            >
              TIMES YOU'VE SEEN THEM. NEVER REALLY LOOKED.
            </div>
          </div>
        )}

        {/* SECTION 3: FLORIDA BEACH 1949 FLASH (Frames 450 -> 690) */}
        {frame >= 450 && frame < 690 && (
          <div
            style={{
              opacity: beachTease,
              textAlign: "center",
              position: "relative",
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: 18,
                color: "#E2B17A",
                letterSpacing: 4,
                marginBottom: 12,
              }}
            >
              MIAMI BEACH, FLORIDA // 1949
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 110,
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 0.95,
              }}
            >
              FIRST SKETCHED<br />
              <span style={{ color: "#E2B17A" }}>IN THE SAND</span>
            </div>
          </div>
        )}

        {/* SECTION 4: 25 YEARS OF SILENCE (Frames 690 -> 870) */}
        {frame >= 690 && frame < 870 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(frozenProgress, [0, 1], [0.92, 1])})`,
              opacity: frozenProgress,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 18,
                color: "#00E5FF",
                letterSpacing: 4,
                marginBottom: 10,
              }}
            >
              THE INERTIA GAP
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 150,
                color: "#FFFFFF",
                lineHeight: 0.95,
              }}
            >
              25 YEARS
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: "#8C99AF",
                letterSpacing: 5,
                marginTop: 15,
              }}
            >
              AND THEN IT DID ABSOLUTELY NOTHING.
            </div>
          </div>
        )}

        {/* SECTION 5: $15,000 RIGHTS SOLD (Frames 870 -> 1080) */}
        {frame >= 870 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, fifteenGrandSpring)})`,
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                letterSpacing: 3,
                color: "#FF453A",
                marginBottom: 8,
              }}
            >
              PATENT VALUATION
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 140,
                color: "#E2B17A",
                lineHeight: 1,
              }}
            >
              $15,000
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 15,
                letterSpacing: 2,
              }}
            >
              SOLD THE RIGHTS AND MOVED ON.
            </div>
          </div>
        )}

        {/* SUBTITLE TELEPROMPTER */}
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
            {frame < 240 && "Somewhere within arm's reach there's a pattern of black lines..."}
            {frame >= 240 && frame < 450 && "You've seen them 10,000 times, you've never really looked."}
            {frame >= 450 && frame < 690 && "That pattern was first sketched in the sand of a Florida beach in 1949."}
            {frame >= 690 && frame < 870 && "And then it did absolutely nothing for 25 years."}
            {frame >= 870 && "Its inventors sold the rights for $15,000 and moved on."}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            FRAME {frame} / 1080
          </div>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
