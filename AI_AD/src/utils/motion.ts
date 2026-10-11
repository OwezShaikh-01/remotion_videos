import { interpolate, spring, Easing } from "remotion";

/**
 * Premium Luxury Motion & Fluid Animation Utilities
 * Inspired by Apple Keynote, Stripe, and high-end Swiss design studios.
 * Prioritizes buttery-smooth deceleration, continuous elegance, and zero visual chaos.
 */

// The definitive Apple/Stripe fluid easing curve
export const FLUID_EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const GENTLE_EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

/**
 * Fluid spring calculation with silky damping
 */
export function fluidSpring({
  frame,
  fps,
  delay = 0,
  config = { damping: 28, mass: 1.0, stiffness: 85 },
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: { damping: number; mass: number; stiffness: number };
}): number {
  if (frame - delay < 0) return 0;
  return spring({
    frame: frame - delay,
    fps,
    config,
  });
}

/**
 * Whisper-soft ambient drift (adds micro-life without shaking or dizziness)
 */
export function subtleDrift(
  frame: number,
  {
    speed = 0.02,
    ampX = 3,
    ampY = 4,
    phase = 0,
  }: {
    speed?: number;
    ampX?: number;
    ampY?: number;
    phase?: number;
  } = {}
): { x: number; y: number } {
  const t = frame * speed + phase;
  return {
    x: Math.sin(t) * ampX,
    y: Math.cos(t * 0.8) * ampY,
  };
}

/**
 * Clean masked reveal progress for silky typography and cards
 */
export function maskedReveal(
  frame: number,
  start: number,
  duration = 24
): { translateY: number; opacity: number } {
  const progress = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: FLUID_EASE,
  });

  return {
    translateY: interpolate(progress, [0, 1], [100, 0]),
    opacity: interpolate(progress, [0, 0.4, 1], [0, 1, 1]),
  };
}
