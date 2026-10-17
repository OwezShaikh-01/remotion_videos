import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface CameraRigProps {
  children: React.ReactNode;
  zoom?: [number, number]; // [startZoom, endZoom]
  panX?: [number, number]; // [startPanX, endPanY]
  panY?: [number, number]; // [startPanY, endPanY]
  durationInFrames: number;
  driftIntensity?: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  zoom = [1, 1.05],
  panX = [0, 0],
  panY = [0, 0],
  durationInFrames,
  driftIntensity = 1,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, durationInFrames], zoom, {
    extrapolateRight: 'clamp',
  });

  const translationX = interpolate(frame, [0, durationInFrames], panX, {
    extrapolateRight: 'clamp',
  });

  const translationY = interpolate(frame, [0, durationInFrames], panY, {
    extrapolateRight: 'clamp',
  });

  // Subtle organic camera breathing (sin/cos harmonic motion)
  const breathingX = Math.sin(frame * 0.035) * 2.5 * driftIntensity;
  const breathingY = Math.cos(frame * 0.028) * 2.0 * driftIntensity;
  const subtleTilt = Math.sin(frame * 0.02) * 0.25 * driftIntensity;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        transformOrigin: '50% 50%',
        transform: `translate3d(${translationX + breathingX}px, ${
          translationY + breathingY
        }px, 0) scale(${scale}) rotate(${subtleTilt}deg)`,
      }}
    >
      {children}
    </div>
  );
};
