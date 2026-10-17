import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";
import { CameraRig } from "../components/CameraRig";
import { GrainOverlay } from "../components/GrainOverlay";

interface Act1Props {
  includeAudio?: boolean;
}

export const Act1_TheInvisiblePattern: React.FC<Act1Props> = ({
  includeAudio = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------------------------------------------------------------------------
  // TIMING & SPRINGS (Total: 1,080 frames @ 30fps = 36.00s)
  // Beat 1: 0 -> 240   (0s - 8s)   "Look around you... pattern of black lines"
  // Beat 2: 240 -> 450 (8s - 15s)  "10,000 times... never really looked"
  // Beat 3: 450 -> 690 (15s - 23s) "Florida beach 1949... sketched in the sand"
  // Beat 4: 690 -> 870 (23s - 29s) "Did absolutely nothing for 25 years"
  // Beat 5: 870 -> 1080(29s - 36s) "Sold rights for $15,000 and moved on"
  // ---------------------------------------------------------------------------

  // Phase 1: Macro barcode drop & expand
  const barsEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Phase 2: 10,000 Counter
  const counterVal = Math.floor(
    interpolate(frame, [250, 400], [0, 10000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const counterScale = spring({
    frame: frame - 240,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 3: Miami Beach 1949 transition
  const beachFade = interpolate(frame, [450, 490, 650, 690], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const polaroidSpring = spring({
    frame: frame - 460,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Phase 4: 25 Years of Silence
  const frozenProgress = interpolate(frame, [690, 740], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const timelineProgress = interpolate(frame, [720, 840], [1949, 1974], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: $15,000 Buyout
  const checkSpring = spring({
    frame: frame - 870,
    fps,
    config: { damping: 13, stiffness: 95 },
  });
  const stampSpring = spring({
    frame: frame - 920,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Global Continuous Laser Scanning Blade
  const laserCycle = frame % 120;
  const laserY = interpolate(laserCycle, [0, 120], [200, 880]);

  // Reticle pulse
  const reticlePulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.4, 0.9]
  );

  return (
    <CameraRig durationInFrames={1080} zoom={[1, 1.06]} panX={[0, -20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#060709",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Optional Standalone Synchronized Voiceover Track */}
        {includeAudio && (
          <Audio src={staticFile("voiceover.wav")} startFrom={0} endAt={1080} />
        )}

        {/* Dynamic Background Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Radial Dark Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, rgba(6, 7, 9, 0.88) 85%)",
          }}
        />

        {/* 4 Corner HUD Crosshair Reticles */}
        <div
          style={{
            position: "absolute",
            top: 260,
            left: "calc(50% - 440px)",
            width: 32,
            height: 32,
            borderTop: "3px solid #00E5FF",
            borderLeft: "3px solid #00E5FF",
            opacity: reticlePulse,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 260,
            right: "calc(50% - 440px)",
            width: 32,
            height: 32,
            borderTop: "3px solid #00E5FF",
            borderRight: "3px solid #00E5FF",
            opacity: reticlePulse,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 240,
            left: "calc(50% - 440px)",
            width: 32,
            height: 32,
            borderBottom: "3px solid #00E5FF",
            borderLeft: "3px solid #00E5FF",
            opacity: reticlePulse,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 240,
            right: "calc(50% - 440px)",
            width: 32,
            height: 32,
            borderBottom: "3px solid #00E5FF",
            borderRight: "3px solid #00E5FF",
            opacity: reticlePulse,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />

        {/* Global Sweeping Laser Beam */}
        <div
          style={{
            position: "absolute",
            top: laserY,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "#FF3B30",
            boxShadow:
              "0 0 16px #FF3B30, 0 0 35px rgba(255, 59, 48, 0.8), 0 0 60px rgba(255, 59, 48, 0.4)",
            opacity: frame < 870 ? 0.9 : 0.3,
            zIndex: 25,
            pointerEvents: "none",
          }}
        />

        {/* TOP EDITORIAL HUD HEADER */}
        <div
          style={{
            position: "absolute",
            top: 55,
            left: 85,
            right: 85,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            zIndex: 40,
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
                background: "rgba(255, 59, 48, 0.12)",
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
                color: "#FFFFFF",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              SEEN 10,000 TIMES.{" "}
              <span style={{ color: "#FF3B30" }}>NEVER LOOKED.</span>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#718096",
              textAlign: "right",
              lineHeight: 1.8,
            }}
          >
            SYS: OPTICAL MACHINE CODE<br />
            FIRST SKETCH: FLORIDA BEACH 1949<br />
            INERTIA: 25 YEARS UNTOUCHED<br />
            TARGET: UNIVERSAL PRODUCT CODE
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* BEAT 1: THE MONOLITH BARCODE (Frames 0 -> 240)                     */}
        {/* ----------------------------------------------------------------- */}
        {frame < 250 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              transform: `scale(${Math.max(0, barsEntrance)})`,
              background: "#FFFFFF",
              padding: "32px 50px",
              borderRadius: 12,
              boxShadow:
                "0 30px 90px rgba(0,0,0,0.9), 0 0 60px rgba(255,255,255,0.08)",
              zIndex: 20,
            }}
          >
            {[
              5, 2, 12, 3, 8, 2, 14, 4, 7, 10, 2, 16, 4, 6, 11, 3, 8, 2, 14, 5,
            ].map((w, idx) => (
              <div
                key={idx}
                style={{
                  width: w * 2.5,
                  height: 380,
                  backgroundColor: "#000000",
                  borderRadius: 1,
                  transform: `scaleY(${interpolate(
                    frame - idx * 2,
                    [0, 25],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )})`,
                  transformOrigin: "top center",
                }}
              />
            ))}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BEAT 2: 10,000 TIMES ACCELERATOR (Frames 240 -> 450)              */}
        {/* ----------------------------------------------------------------- */}
        {frame >= 240 && frame < 450 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, counterScale)})`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#00E5FF",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              HUMAN EXPOSURE FREQUENCY
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 180,
                color: "#FFFFFF",
                letterSpacing: 4,
                lineHeight: 0.9,
                textShadow:
                  "0 10px 50px rgba(0,0,0,0.9), 0 0 80px rgba(0, 229, 255, 0.25)",
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
                letterSpacing: 5,
                marginTop: 20,
              }}
            >
              TIMES YOU'VE SEEN THEM.{" "}
              <span
                style={{
                  color: "#FF3B30",
                  borderBottom: "3px solid #FF3B30",
                  paddingBottom: 2,
                }}
              >
                NEVER REALLY LOOKED.
              </span>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BEAT 3: FLORIDA BEACH 1949 (Frames 450 -> 690)                     */}
        {/* ----------------------------------------------------------------- */}
        {frame >= 450 && frame < 690 && (
          <div
            style={{
              opacity: beachFade,
              transform: `scale(${Math.max(0, polaroidSpring)})`,
              textAlign: "center",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#FAF7EE",
                padding: "20px 24px 34px 24px",
                borderRadius: 8,
                boxShadow: "0 25px 70px rgba(0,0,0,0.85)",
                transform: "rotate(-2deg)",
                width: 680,
                color: "#1A1A1A",
                position: "relative",
              }}
            >
              {/* Tape corner */}
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: 30,
                  width: 90,
                  height: 28,
                  backgroundColor: "rgba(226, 177, 122, 0.45)",
                  backdropFilter: "blur(4px)",
                  transform: "rotate(-5deg)",
                  borderRadius: 2,
                }}
              />

              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "#8C6D1F",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  textAlign: "left",
                }}
              >
                ARCHIVAL WITNESS // MIAMI BEACH 1949
              </div>

              <div
                style={{
                  height: 180,
                  background:
                    "radial-gradient(ellipse at 50% 30%, #F5DEB3 0%, #D4A373 70%, #9C6644 100%)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.15)",
                }}
              >
                {/* 4 Sand Furrows */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: i % 2 === 0 ? 12 : 28,
                      height: "140%",
                      backgroundColor: "#4A3525",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)",
                      transform: "rotate(4deg)",
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 48,
                  lineHeight: 1,
                  marginTop: 18,
                  color: "#18140E",
                  textTransform: "uppercase",
                }}
              >
                FIRST SKETCHED IN THE SAND
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#E2B17A",
                marginTop: 24,
                textTransform: "uppercase",
              }}
            >
              NORMAN JOSEPH WOODLAND DRAGS HIS FINGERS DOWNWARD
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BEAT 4: 25 YEARS OF SILENCE (Frames 690 -> 870)                    */}
        {/* ----------------------------------------------------------------- */}
        {frame >= 690 && frame < 870 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(frozenProgress, [0, 1], [0.92, 1])})`,
              opacity: frozenProgress,
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 16,
                color: "#00E5FF",
                letterSpacing: 4,
                marginBottom: 10,
              }}
            >
              CHRONOLOGY GAP: {Math.round(timelineProgress)}
            </div>
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 170,
                color: "#FFFFFF",
                lineHeight: 0.9,
                letterSpacing: 2,
                textShadow:
                  "0 15px 50px rgba(0,0,0,0.9), 0 0 70px rgba(0, 229, 255, 0.2)",
              }}
            >
              25 YEARS
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#9CA3AF",
                letterSpacing: 4,
                marginTop: 20,
              }}
            >
              AND THEN IT DID{" "}
              <span style={{ color: "#FF3B30" }}>ABSOLUTELY NOTHING.</span>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* BEAT 5: $15,000 RIGHTS SOLD (Frames 870 -> 1080)                   */}
        {/* ----------------------------------------------------------------- */}
        {frame >= 870 && (
          <div
            style={{
              textAlign: "center",
              transform: `scale(${Math.max(0, checkSpring)})`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: "#11141E",
                border: "2px solid #E2B17A",
                borderRadius: 14,
                padding: "36px 64px",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(226, 177, 122, 0.15)",
                position: "relative",
              }}
            >
              {/* Red Surrender Rubber Stamp */}
              <div
                style={{
                  position: "absolute",
                  top: 25,
                  right: 35,
                  border: "3px solid #FF3B30",
                  color: "#FF3B30",
                  fontFamily: "'Special Elite', monospace",
                  fontSize: 26,
                  fontWeight: 900,
                  padding: "6px 18px",
                  borderRadius: 6,
                  letterSpacing: 3,
                  transform: `scale(${Math.max(0, stampSpring)}) rotate(-10deg)`,
                  backgroundColor: "rgba(255, 59, 48, 0.1)",
                }}
              >
                SURRENDERED
              </div>

              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 14,
                  letterSpacing: 3,
                  color: "#9CA3AF",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                PHILCO ACQUISITION // 1962
              </div>
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 150,
                  color: "#E2B17A",
                  lineHeight: 1,
                  letterSpacing: 2,
                }}
              >
                $15,000
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginTop: 16,
                  letterSpacing: 2,
                }}
              >
                SOLD THE RIGHTS AND MOVED ON.
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM DYNAMIC SUBTITLE TELEPROMPTER */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 85,
            right: 85,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(10, 12, 18, 0.82)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "16px 28px",
            borderRadius: 8,
            backdropFilter: "blur(12px)",
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              color: "#F3F4F6",
              fontWeight: 600,
            }}
          >
            {frame < 240 && (
              <span>
                Look around you. Somewhere within arm's reach, there's a{" "}
                <b style={{ color: "#00E5FF" }}>pattern of black lines</b>.
              </span>
            )}
            {frame >= 240 && frame < 450 && (
              <span>
                You've seen them <b style={{ color: "#E2B17A" }}>10,000 times</b>.
                You've <b style={{ color: "#FF3B30" }}>never really looked</b>.
              </span>
            )}
            {frame >= 450 && frame < 690 && (
              <span>
                That pattern was first sketched in the sand of a{" "}
                <b style={{ color: "#E2B17A" }}>Florida beach in 1949</b>.
              </span>
            )}
            {frame >= 690 && frame < 870 && (
              <span>
                And then it did{" "}
                <b style={{ color: "#00E5FF" }}>absolutely nothing</b> for{" "}
                <b style={{ color: "#FFFFFF" }}>25 years</b>.
              </span>
            )}
            {frame >= 870 && (
              <span>
                Its inventors sold the rights for{" "}
                <b style={{ color: "#E2B17A" }}>$15,000</b> and moved on.
              </span>
            )}
          </div>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            SEGMENT 01 • FRAME {frame} / 1080 (
            {(frame / 30).toFixed(1)}s)
          </div>
        </div>

        {/* Global 35mm Analog Film Grain Overlay */}
        <GrainOverlay />
      </AbsoluteFill>
    </CameraRig>
  );
};
