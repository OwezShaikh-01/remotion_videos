import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { getHarmonicDrift, getChromaticOffset } from "../utils/motion";

interface CameraRigProps {
  children: React.ReactNode;
  impactFrames?: number[];
  zoomStart?: number;
  zoomEnd?: number;
  panXStart?: number;
  panXEnd?: number;
  panYStart?: number;
  panYEnd?: number;
  style?: React.CSSProperties;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  impactFrames = [],
  zoomStart = 1,
  zoomEnd = 1.04,
  panXStart = 0,
  panXEnd = -20,
  panYStart = 0,
  panYEnd = -15,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow organic camera push & pan across scene lifetime
  const progress = frame / Math.max(1, durationInFrames);
  const baseScale = interpolate(progress, [0, 1], [zoomStart, zoomEnd]);
  const basePanX = interpolate(progress, [0, 1], [panXStart, panXEnd]);
  const basePanY = interpolate(progress, [0, 1], [panYStart, panYEnd]);

  // Micro-harmonic camera breathing
  const drift = getHarmonicDrift(frame, { speed: 0.03, ampX: 4, ampY: 4, rotAmp: 0.3 });

  // Camera Shake from closest impact frame
  let shakeX = 0;
  let shakeY = 0;
  let shakeRot = 0;

  for (const hit of impactFrames) {
    const diff = frame - hit;
    if (diff >= 0 && diff < 16) {
      const shakeDecay = (16 - diff) / 16;
      const freq = diff * 2.5;
      shakeX += Math.sin(freq) * 14 * shakeDecay;
      shakeY += Math.cos(freq * 1.2) * 12 * shakeDecay;
      shakeRot += Math.sin(freq * 0.8) * 0.8 * shakeDecay;
    }
  }

  // Chromatic glitch from impact frames
  let chromatic = { redX: 0, redY: 0, blueX: 0, blueY: 0, opacity: 0 };
  for (const hit of impactFrames) {
    const c = getChromaticOffset(frame, hit, 8, 12);
    if (c.opacity > chromatic.opacity) {
      chromatic = c;
    }
  }

  const totalTransform = `
    translate3d(${basePanX + drift.x + shakeX}px, ${basePanY + drift.y + shakeY}px, 0)
    scale(${baseScale})
    rotate(${drift.rotate + shakeRot}deg)
  `;

  return (
    <div
      style={{
        position: "absolute",
        inset: -40, // slight bleed to allow shake without letterboxing
        overflow: "hidden",
        transform: totalTransform,
        transformOrigin: "center center",
        willChange: "transform",
        ...style,
      }}
    >
      {/* Base Scene Layer */}
      <div style={{ position: "absolute", inset: 40 }}>{children}</div>

      {/* Optical Chromatic Aberration Ghost Layers on Impacts */}
      {chromatic.opacity > 0 && (
        <>
          {/* Red channel shift */}
          <div
            style={{
              position: "absolute",
              inset: 40,
              pointerEvents: "none",
              mixBlendMode: "screen",
              opacity: chromatic.opacity * 0.6,
              transform: `translate3d(${chromatic.redX}px, ${chromatic.redY}px, 0)`,
              filter: "url(#redGlow)",
            }}
          >
            {children}
          </div>
          {/* Cyan/Blue channel shift */}
          <div
            style={{
              position: "absolute",
              inset: 40,
              pointerEvents: "none",
              mixBlendMode: "screen",
              opacity: chromatic.opacity * 0.6,
              transform: `translate3d(${chromatic.blueX}px, ${chromatic.blueY}px, 0)`,
              filter: "url(#blueGlow)",
            }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};
