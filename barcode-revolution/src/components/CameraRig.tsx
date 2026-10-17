import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface CameraRigProps {
  children: React.ReactNode;
  zoom?: [number, number]; // [startZoom, endZoom]
  panX?: [number, number]; // [startPanX, endPanY]
  panY?: [number, number];
  rotate?: [number, number];
  durationInFrames: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  zoom = [1, 1.05],
  panX = [0, 0],
  panY = [0, 0],
  rotate = [0, 0],
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const currentZoom = interpolate(frame, [0, durationInFrames], zoom, {
    extrapolateRight: "clamp",
  });
  const currentPanX = interpolate(frame, [0, durationInFrames], panX, {
    extrapolateRight: "clamp",
  });
  const currentPanY = interpolate(frame, [0, durationInFrames], panY, {
    extrapolateRight: "clamp",
  });
  const currentRotate = interpolate(frame, [0, durationInFrames], rotate, {
    extrapolateRight: "clamp",
  });

  // Subtle organic camera breathing
  const microSwayX = Math.sin(frame * 0.05) * 3;
  const microSwayY = Math.cos(frame * 0.04) * 2;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${currentZoom}) translate(${currentPanX + microSwayX}px, ${
          currentPanY + microSwayY
        }px) rotate(${currentRotate}deg)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
