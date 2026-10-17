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

export const Act5_BullseyeVsBars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: RCA Bullseye Pitch & Smear (Frames 0 -> 427)
  const isBullseyePitch = frame < 427;
  const smearProgress = interpolate(frame, [80, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: George Laurer Refusal & Straight Bars (Frames 427 -> 845)
  const isLaurerBars = frame >= 427 && frame < 845;

  // Phase 3: Woodland Backs Laurer & April 1973 Victory (Frames 845 -> 1212)
  const isVictory = frame >= 845;

  return (
    <CameraRig durationInFrames={1212} zoom={[1, 1.08]} panX={[-15, 15]}>
      <AbsoluteFill
        style={{
          backgroundColor: "#08090D",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* PHASE 1: RCA Bullseye Pitch & Smear Catastrophe */}
        {isBullseyePitch && (
          <div style={{ textAlign: "center", position: "relative" }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: 4,
                color: "#FF3344",
                marginBottom: 20,
              }}
            >
              PROPOSAL: RCA CONCENTRIC BULLSEYE // 1971
            </div>

            {/* The Concentric Circle with Lateral Smear Bleed */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <svg width="280" height="280" viewBox="0 0 200 200">
                <defs>
                  <filter id="smearBleed">
                    <feGaussianBlur
                      stdDeviation={`${smearProgress * 8} 0.5`}
                      result="blur"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" opacity="0.6" />
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="100" cy="100" r="90" fill="#E8EDF5" filter={smearProgress > 0 ? "url(#smearBleed)" : "none"} />
                <circle cx="100" cy="100" r="76" fill="#08090D" />
                <circle cx="100" cy="100" r="62" fill="#E8EDF5" filter={smearProgress > 0 ? "url(#smearBleed)" : "none"} />
                <circle cx="100" cy="100" r="48" fill="#08090D" />
                <circle cx="100" cy="100" r="34" fill="#E8EDF5" filter={smearProgress > 0 ? "url(#smearBleed)" : "none"} />
                <circle cx="100" cy="100" r="18" fill="#08090D" />
              </svg>

              {smearProgress > 0.4 && (
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(-12deg)",
                    background: "#FF1E44",
                    color: "#FFF",
                    fontFamily: "'Impact', sans-serif",
                    fontSize: 48,
                    padding: "10px 24px",
                    boxShadow: "0 0 40px rgba(255, 30, 68, 0.8)",
                  }}
                >
                  FATAL INK SMEAR!
                </div>
              )}
            </div>

            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 16,
                color: "#8D99AE",
                marginTop: 24,
              }}
            >
              ON ROTARY PRESSES, CURVES BLEED SIDEWAYS INTO NEIGHBORING TRACKS.
            </div>
          </div>
        )}

        {/* PHASE 2: George Laurer Refuses Manager */}
        {isLaurerBars && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: 4,
                color: "#00F5A0",
                marginBottom: 16,
              }}
            >
              IBM RALEIGH, NC // GEORGE LAURER
            </div>

            <KineticWord
              text="LAURER REFUSED."
              triggerFrame={450}
              fontSize={100}
              color="#FFFFFF"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
                marginTop: 40,
              }}
            >
              {[6, 16, 6, 24, 10, 8, 30, 12, 18, 6, 14, 28, 6].map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    width: w * 2.5,
                    height: 220,
                    backgroundColor: "#00F5A0",
                    boxShadow: "0 0 20px rgba(0, 245, 160, 0.4)",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 16,
                color: "#E2B17A",
                marginTop: 24,
              }}
            >
              STRAIGHT BARS RUN PARALLEL TO PRINT ROLLERS. INK BLEEDS HARMLESSLY ALONG THE BAR.
            </div>
          </div>
        )}

        {/* PHASE 3: Woodland Backs It & The 1973 Victory */}
        {isVictory && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: 4,
                color: "#8892B0",
                marginBottom: 12,
              }}
            >
              APRIL 3, 1973 // SYMBOL COMMITTEE SELECTION
            </div>

            <KineticWord
              text="IBM BARS WIN."
              triggerFrame={880}
              fontSize={120}
              color="#00F5A0"
            />

            <div
              style={{
                maxWidth: 700,
                margin: "30px auto 0 auto",
                background: "rgba(18, 22, 34, 0.9)",
                border: "1px solid #2B3347",
                padding: "20px 30px",
                borderRadius: 8,
                fontFamily: "'Courier New', monospace",
                fontSize: 15,
                color: "#F4EFE6",
                lineHeight: 1.6,
              }}
            >
              "Woodland's original circle lost to a cousin of his own lines. And Woodland publicly helped it win."
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
