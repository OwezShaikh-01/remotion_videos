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

export const Act3_MorseInTheSand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: UV Ink Failure (Frames 0 -> 136)
  const isUV = frame < 136;
  const uvFlicker = interpolate(
    Math.sin(frame * 0.8),
    [-1, 1],
    [0.2, 0.9]
  );

  // Phase 2: Miami Beach & Morse Code Extrusion (Frames 136 -> 744)
  const isMorseBeach = frame >= 136 && frame < 844;
  const stretchSpring = spring({
    frame: frame - 280,
    fps,
    config: { damping: 14, stiffness: 60, mass: 1.2 },
  });
  const barHeight = interpolate(stretchSpring, [0, 1], [14, 460]);

  // Phase 3: 35mm Optical Film Sound Strip (Frames 844 -> 1093)
  const isMovieOptics = frame >= 844 && frame < 1093;

  // Phase 4: Patent Granted & The Chasm (Frames 1093 -> 1288)
  const isPatent = frame >= 1093;

  return (
    <CameraRig durationInFrames={1288} zoom={[1, 1.1]} panX={[0, 30]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#0B0A08",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* PHASE 1: Failed UV Glow Ink */}
        {isUV && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 120,
                color: "#B347FF",
                textShadow: `0 0 ${40 * uvFlicker}px #B347FF`,
                opacity: uvFlicker,
              }}
            >
              ULTRAVIOLET INK
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 22,
                color: "#FF3344",
                marginTop: 16,
                letterSpacing: 4,
                fontWeight: 700,
              }}
            >
              [IDEA 01: FAILED]
            </div>
          </div>
        )}

        {/* PHASE 2: Miami Beach Sand & Morse Downward Extrusion */}
        {isMorseBeach && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Top Amber Phosphor Morse Code Source */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
              <div
                style={{
                  width: 70,
                  height: 18,
                  borderRadius: 4,
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
              <div
                style={{
                  width: 100,
                  height: 18,
                  borderRadius: 4,
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
              <div
                style={{
                  width: 70,
                  height: 18,
                  borderRadius: 4,
                  background: "#FFAE42",
                  boxShadow: "0 0 25px #FF9F1C",
                }}
              />
            </div>

            {/* Extruded Bars Moving Downward in the Sand */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                height: 480,
              }}
            >
              <div style={{ width: 10, height: barHeight, backgroundColor: "#EAE5D9" }} />
              <div style={{ width: 65, height: barHeight, backgroundColor: "#FFFFFF", boxShadow: "0 0 30px rgba(255,255,255,0.4)" }} />
              <div style={{ width: 10, height: barHeight, backgroundColor: "#EAE5D9" }} />
              <div style={{ width: 95, height: barHeight, backgroundColor: "#FFFFFF", boxShadow: "0 0 40px rgba(255,255,255,0.5)" }} />
              <div style={{ width: 10, height: barHeight, backgroundColor: "#EAE5D9" }} />
              <div style={{ width: 65, height: barHeight, backgroundColor: "#FFFFFF", boxShadow: "0 0 30px rgba(255,255,255,0.4)" }} />
            </div>

            {/* Headline Trigger */}
            <div
              style={{
                position: "absolute",
                bottom: 80,
                textAlign: "center",
              }}
            >
              <KineticWord
                text="STRETCH THEM DOWNWARD"
                triggerFrame={220}
                fontSize={64}
                color="#E2B17A"
              />
            </div>
          </div>
        )}

        {/* PHASE 3: 35mm Movie Soundtrack Optical Trick */}
        {isMovieOptics && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: 4,
                color: "#E2B17A",
                marginBottom: 16,
              }}
            >
              READING MECHANISM: 35mm OPTICAL SOUNDTRACK
            </div>

            {/* Film Strip Representation */}
            <div
              style={{
                width: 900,
                height: 220,
                backgroundColor: "#11141E",
                border: "2px solid #333D50",
                borderRadius: 8,
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "0 40px",
                overflow: "hidden",
              }}
            >
              {/* Optical Light Beam Passing Through */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: 4,
                  backgroundColor: "#00F5A0",
                  boxShadow: "0 0 30px #00F5A0, 0 0 60px #00F5A0",
                }}
              />
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {[8, 20, 6, 32, 14, 8, 40, 10, 24, 6, 18].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: w * 3,
                      height: 160,
                      backgroundColor: "#FFF",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 48,
                color: "#FFF",
                marginTop: 24,
                letterSpacing: 1,
              }}
            >
              LIGHT ➔ VOLTAGE SIGNAL
            </div>
          </div>
        )}

        {/* PHASE 4: US Patent Granted in 1952 */}
        {isPatent && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                border: "4px solid #E2B17A",
                padding: "30px 60px",
                transform: "rotate(-3deg)",
                background: "rgba(10, 12, 16, 0.9)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 14,
                  color: "#E2B17A",
                  letterSpacing: 4,
                }}
              >
                U.S. PATENT OFFICE // OCT 7, 1952
              </div>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 100,
                  color: "#FFFFFF",
                  letterSpacing: 2,
                }}
              >
                PATENT GRANTED
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 16,
                  color: "#FF3344",
                  marginTop: 10,
                }}
              >
                WHAT THEY DON'T HAVE IS A WORLD THAT CAN USE IT.
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
