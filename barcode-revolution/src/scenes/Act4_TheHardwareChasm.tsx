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

export const Act4_TheHardwareChasm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 3 Missing Technologies Blueprint (Frames 0 -> 491)
  const isMissingTech = frame < 491;

  // Phase 2: Bernard Silver Passes & Patent Expiration (Frames 491 -> 883)
  const isTragedyAndExpiry = frame >= 491 && frame < 883;

  // Phase 3: The 1971 Silicon & Laser Convergence (Frames 883 -> 1230)
  const isTechBoom = frame >= 883;

  return (
    <CameraRig durationInFrames={1230} zoom={[1, 1.08]} panY={[0, -20]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#07080C",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* PHASE 1: The 3 Missing Technologies */}
        {isMissingTech && (
          <div style={{ textAlign: "center", width: 1200 }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 16,
                letterSpacing: 4,
                color: "#FF3344",
                marginBottom: 30,
              }}
            >
              REQUIRED HARDWARE // NONE OF THIS EXISTS YET (1952)
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 40,
              }}
            >
              {/* Requirement 1: Precise Bright Light */}
              <div
                style={{
                  background: "#10131E",
                  border: "1px solid #232B3D",
                  padding: "36px 24px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔴</div>
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 26, color: "#FFF" }}>
                  PRECISE BRIGHT LIGHT
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#FF3344", marginTop: 8 }}>
                  [LASER NOT INVENTED]
                </div>
              </div>

              {/* Requirement 2: Fast Photodetector */}
              <div
                style={{
                  background: "#10131E",
                  border: "1px solid #232B3D",
                  padding: "36px 24px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 26, color: "#FFF" }}>
                  FAST DATA CONVERTER
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#FF3344", marginTop: 8 }}>
                  [TOO SLOW IN 1952]
                </div>
              </div>

              {/* Requirement 3: Storefront Computer */}
              <div
                style={{
                  background: "#10131E",
                  border: "1px solid #232B3D",
                  padding: "36px 24px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>💾</div>
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 26, color: "#FFF" }}>
                  STORE COMPUTER
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#FF3344", marginTop: 8 }}>
                  [ROOM-SIZED & MILLIONS]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: Silver Dies (1962) & Patent Expires (1969) */}
        {isTragedyAndExpiry && (
          <div style={{ textAlign: "center" }}>
            {frame < 688 ? (
              <div>
                <KineticWord
                  text="1962"
                  triggerFrame={491}
                  fontSize={120}
                  color="#8892B0"
                />
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 20,
                    color: "#FFFFFF",
                    marginTop: 10,
                  }}
                >
                  BERNARD SILVER DIES. HE NEVER SAW IT WORK.
                </div>
              </div>
            ) : (
              <div>
                <KineticWord
                  text="1969"
                  triggerFrame={688}
                  fontSize={140}
                  color="#FF1E44"
                />
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 22,
                    color: "#FFFFFF",
                    marginTop: 10,
                    letterSpacing: 2,
                  }}
                >
                  THE PATENT EXPIRES.
                </div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 14,
                    color: "#00F5A0",
                    marginTop: 8,
                  }}
                >
                  ...AND RIGHT THEN, THE WORLD CATCHES UP.
                </div>
              </div>
            )}
          </div>
        )}

        {/* PHASE 3: The 1971 Convergence (Lasers + Microprocessors) */}
        {isTechBoom && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 60,
                marginBottom: 30,
              }}
            >
              {/* Laser Practicality */}
              <div
                style={{
                  background: "#111520",
                  border: "2px solid #FF1E44",
                  padding: "30px 40px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 36, color: "#FF1E44" }}>
                  GAS LASERS
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#AAA" }}>
                  COMMERCIALLY VIABLE
                </div>
              </div>

              <div style={{ fontSize: 40, color: "#555" }}>+</div>

              {/* Intel 1971 4004 Microprocessor */}
              <div
                style={{
                  background: "#111520",
                  border: "2px solid #00F5A0",
                  padding: "30px 40px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 36, color: "#00F5A0" }}>
                  INTEL 1971
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#AAA" }}>
                  MICROPROCESSOR BORN
                </div>
              </div>
            </div>

            <KineticWord
              text="THE COMMITTEE FORMS"
              triggerFrame={950}
              fontSize={72}
              color="#FFFFFF"
            />
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
