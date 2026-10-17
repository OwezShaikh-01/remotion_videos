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

export const Act1_TheInvisiblePattern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Macro lines reveal (Frames 0 -> 220)
  const linesExpansion = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Phase 2: 10,000 times counter (Frames 153 -> 260)
  const counterVal = Math.floor(
    interpolate(frame, [150, 210], [0, 10000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Phase 3: Florida beach flash teaser (Frames 263 -> 397)
  const beachTease = interpolate(frame, [263, 300, 380, 397], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: 25 Years Frozen Timeline (Frames 397 -> 487)
  const twentyFiveYears = frame >= 397 && frame < 487;

  // Phase 5: $15,000 Patent Tag (Frames 487 -> 594)
  const fifteenGrand = frame >= 487 && frame < 670;

  // Phase 6: Circle vs Straight Line hook (Frames 803 -> 1102)
  const circleVsBars = frame >= 803;

  return (
    <CameraRig durationInFrames={1102} zoom={[1, 1.1]} panX={[0, -20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#08090D",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Ambient Dark Geometry */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, #151A26 0%, #06070A 80%)",
          }}
        />

        {/* SECTION A: The Macro Barcode Lines Materializing */}
        {frame < 263 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: `scale(${linesExpansion})`,
            }}
          >
            {[
              4, 8, 16, 4, 24, 8, 4, 32, 12, 4, 16, 8, 28, 4, 12, 6, 20, 8,
              36, 4,
            ].map((w, idx) => (
              <div
                key={idx}
                style={{
                  width: w * 2.5,
                  height: 520,
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 25px rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        )}

        {/* 10,000 TIMES Counter Hit */}
        {frame >= 153 && frame < 263 && (
          <div
            style={{
              position: "absolute",
              bottom: 120,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 130,
                color: "#E2B17A",
                lineHeight: 1,
                letterSpacing: 2,
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              {counterVal.toLocaleString()}
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#8D99AE",
                marginTop: 8,
              }}
            >
              TIMES SEEN // NEVER EXAMINED
            </div>
          </div>
        )}

        {/* SECTION B: 1949 Florida Beach Sand Silhouette Flash */}
        {beachTease > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(226, 177, 122, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: beachTease,
            }}
          >
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 160,
                color: "#FFFFFF",
                letterSpacing: 4,
              }}
            >
              1949
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 20,
                color: "#E2B17A",
                letterSpacing: 6,
              }}
            >
              MIAMI BEACH, FLORIDA // INVENTED IN THE SAND
            </div>
          </div>
        )}

        {/* SECTION C: 25 Years of Silence */}
        {twentyFiveYears && (
          <div style={{ textAlign: "center", zIndex: 10 }}>
            <KineticWord
              text="25 YEARS"
              triggerFrame={397}
              fontSize={150}
              color="#FF3344"
            />
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 18,
                letterSpacing: 6,
                color: "#8892B0",
                marginTop: 10,
              }}
            >
              ABSOLUTELY NOTHING HAPPENED.
            </div>
          </div>
        )}

        {/* SECTION D: $15,000 Patent Transfer Tag */}
        {fifteenGrand && (
          <div
            style={{
              position: "absolute",
              transform: "rotate(-6deg)",
              background: "#EAE5D9",
              padding: "24px 48px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
              border: "2px solid #C8C0B0",
              zIndex: 15,
            }}
          >
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: "#555",
                letterSpacing: 2,
              }}
            >
              PATENT ASSIGNMENT RECEIPT // 1952
            </div>
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 120,
                color: "#111",
                lineHeight: 1,
              }}
            >
              $15,000
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: "#888",
              }}
            >
              RIGHTS TRANSFERRED. INVENTORS MOVED ON.
            </div>
          </div>
        )}

        {/* SECTION E: The Hook - Circle vs. Bars Tease */}
        {circleVsBars && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 120,
              zIndex: 20,
            }}
          >
            {/* Bullseye Circle */}
            <div style={{ textAlign: "center" }}>
              <svg width="240" height="240" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="#FF1E44" />
                <circle cx="100" cy="100" r="72" fill="#08090D" />
                <circle cx="100" cy="100" r="54" fill="#FF1E44" />
                <circle cx="100" cy="100" r="36" fill="#08090D" />
                <circle cx="100" cy="100" r="18" fill="#FF1E44" />
              </svg>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 28,
                  color: "#FF1E44",
                  marginTop: 16,
                  letterSpacing: 2,
                }}
              >
                THE CIRCLE
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 48,
                color: "#556",
              }}
            >
              VS
            </div>

            {/* Straight Bars */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  height: 240,
                  justifyContent: "center",
                }}
              >
                {[8, 18, 6, 24, 10, 30, 8, 14, 26, 6].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: w * 1.6,
                      height: 200,
                      backgroundColor: "#00F5A0",
                      boxShadow: "0 0 15px rgba(0,245,160,0.4)",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 28,
                  color: "#00F5A0",
                  marginTop: 16,
                  letterSpacing: 2,
                }}
              >
                THE STRAIGHT BARS
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
