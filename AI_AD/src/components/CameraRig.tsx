import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { subtleDrift } from "../utils/motion";

interface CameraRigProps {
  children: React.ReactNode;
  zoomStart?: number;
  zoomEnd?: number;
  panXStart?: number;
  panXEnd?: number;
  panYStart?: number;
  panYEnd?: number;
  style?: React.CSSProperties;
  impactFrames?: number[]; // retained for compatibility, treated cleanly
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  zoomStart = 1,
  zoomEnd = 1.03,
  panXStart = 0,
  panXEnd = -15,
  panYStart = 0,
  panYEnd = -10,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow, cinematic camera glide across the scene lifetime
  const progress = frame / Math.max(1, durationInFrames);
  const baseScale = interpolate(progress, [0, 1], [zoomStart, zoomEnd]);
  const basePanX = interpolate(progress, [0, 1], [panXStart, panXEnd]);
  const basePanY = interpolate(progress, [0, 1], [panYStart, panYEnd]);

  // Whisper-soft ambient drift (completely smooth, zero shake)
  const drift = subtleDrift(frame, { speed: 0.015, ampX: 2, ampY: 2.5 });

  const totalTransform = `
    translate3d(${basePanX + drift.x}px, ${basePanY + drift.y}px, 0)
    scale(${baseScale})
  `;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        transform: totalTransform,
        transformOrigin: "center center",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
