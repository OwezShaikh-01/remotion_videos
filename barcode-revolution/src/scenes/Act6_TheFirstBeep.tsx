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

export const Act6_TheFirstBeep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beep impact is at frame 585 (03:32.51 in master sequence)
  const isPreBeep = frame < 585;
  const isPostBeep = frame >= 585;

  // Gum pack translation across the scanner window
  const gumTranslateX = interpolate(frame, [300, 585], [-400, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Laser optical flare on beep
  const laserFlash = interpolate(frame, [580, 585, 610], [1, 8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // End fade out
  const endFade = interpolate(frame, [720, 750], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CameraRig durationInFrames={750} zoom={[1, 1.12]} panY={[0, -10]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#06070B",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
          opacity: endFade,
        }}
      >
        {/* Background Laser Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 60%, rgba(255, 30, 68, 0.15) 0%, #05060A 80%)",
          }}
        />

        {/* Ambient Top HUD Timestamp */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 80,
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: "#8D99AE",
            letterSpacing: 3,
            zIndex: 10,
          }}
        >
          <div>JUNE 26, 1974 // 08:01 AM EST</div>
          <div style={{ color: "#FFF", fontWeight: 700 }}>
            MARSH SUPERMARKET // TROY, OHIO
          </div>
        </div>

        {/* Counter Aperture & Ruby Laser Line */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            width: "100%",
            height: 180,
            backgroundColor: "#111520",
            borderTop: "3px solid #2B3347",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Ruby Laser Beam */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: 3 * laserFlash,
              backgroundColor: "#FFF",
              boxShadow:
                "0 0 10px #FF1E44, 0 0 30px #FF1E44, 0 0 80px rgba(255, 30, 68, 0.9)",
              zIndex: 5,
            }}
          />
        </div>

        {/* 2.5D Juicy Fruit 10-Pack Moving Across Scanner */}
        {frame >= 250 && (
          <div
            style={{
              position: "absolute",
              top: 280,
              left: "40%",
              transform: `translateX(${gumTranslateX}px) perspective(800px) rotateX(15deg) rotateY(-10deg) rotateZ(6deg)`,
              width: 380,
              height: 220,
              background: "linear-gradient(135deg, #FFE033 0%, #E6B800 100%)",
              borderRadius: 8,
              boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
              border: "2px solid #FFF275",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              zIndex: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  fontFamily: "'Impact', sans-serif",
                  fontSize: 28,
                  color: "#B80D22",
                }}
              >
                WRIGLEY'S JUICY FRUIT
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#4A3A00" }}>
                10 PACK
              </div>
            </div>

            {/* Barcode on Gum */}
            <div
              style={{
                background: "#FFF",
                padding: "8px 14px",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {[3, 3, 3, 8, 8, 4, 12, 6, 3, 3, 3, 6, 14, 4, 8, 8, 3, 3, 3].map(
                  (w, i) => (
                    <div
                      key={i}
                      style={{
                        width: w,
                        height: 40,
                        backgroundColor: i % 2 === 0 ? "#000" : "transparent",
                      }}
                    />
                  )
                )}
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#000",
                  letterSpacing: 4,
                  marginTop: 3,
                }}
              >
                0 22000 00041 4
              </div>
            </div>
          </div>
        )}

        {/* THE HISTORIC BEEP IMPACT */}
        {isPostBeep && (
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-8deg)",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            <KineticWord
              text="BEEP!"
              triggerFrame={585}
              fontSize={180}
              color="#00F5A0"
              style={{
                textShadow:
                  "0 0 40px rgba(0, 245, 160, 0.9), 0 0 100px rgba(0, 245, 160, 0.5)",
              }}
            />
            <div
              style={{
                fontFamily: "'Impact', sans-serif",
                fontSize: 48,
                color: "#FFFFFF",
                marginTop: -10,
              }}
            >
              NO PRICE KEYED IN.
            </div>
          </div>
        )}

        {/* Paper Receipt & Economics Pill */}
        {frame >= 640 && (
          <div
            style={{
              position: "absolute",
              bottom: 40,
              display: "flex",
              justifyContent: "space-between",
              width: "85%",
              alignItems: "flex-end",
              zIndex: 25,
            }}
          >
            <div
              style={{
                background: "#EAE5D9",
                color: "#111",
                padding: "16px 24px",
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                transform: "rotate(3deg)",
              }}
            >
              <div>MARSH SUPERMARKET #02</div>
              <div>WRIGLEY JUICY FRT 10PK ...... $0.67</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>TOTAL: $0.70</div>
            </div>

            <div
              style={{
                background: "rgba(255, 30, 68, 0.95)",
                color: "#FFF",
                padding: "14px 28px",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(255, 30, 68, 0.5)",
              }}
            >
              <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 32 }}>
                $4,000 SCANNER
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11 }}>
                ~$25,000 TODAY PER CHECKOUT
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
