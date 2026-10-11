import { spring, Easing } from "remotion";

/**
 * Advanced Motion Physics & Kinetic Animation Helpers
 * Implements Disney's 12 Principles of Animation:
 * Anticipation, Squash & Stretch, Staging, Follow-Through, Secondary Action.
 */

export interface SquashStretch {
  scaleX: number;
  scaleY: number;
  rotation: number;
}

/**
 * Calculate organic squash & stretch during acceleration and impact
 */
export function getSquashStretch(
  progress: number, // 0 to 1
  impactProgress: number, // 0 to 1 (when landing)
  direction: "vertical" | "horizontal" = "vertical"
): { scaleX: number; scaleY: number } {
  // During flight (acceleration stretch)
  const stretchFactor = Math.sin(progress * Math.PI) * 0.22;
  
  // During landing (squash on impact)
  const squashFactor = Math.sin(impactProgress * Math.PI) * 0.28;

  if (direction === "vertical") {
    const scaleY = 1 + stretchFactor - squashFactor;
    const scaleX = 1 - stretchFactor * 0.6 + squashFactor * 0.6;
    return { scaleX, scaleY };
  } else {
    const scaleX = 1 + stretchFactor - squashFactor;
    const scaleY = 1 - stretchFactor * 0.6 + squashFactor * 0.6;
    return { scaleX, scaleY };
  }
}

/**
 * Anticipation Spring:
 * Pulls slightly in the opposite direction before explosive forward movement,
 * followed by a juicy overshoot and settle.
 */
export function anticipationSpring({
  frame,
  fps,
  delay = 0,
  anticipationFrames = 6,
  anticipationAmount = 0.12,
  config = { damping: 12, mass: 0.6, stiffness: 220 },
}: {
  frame: number;
  fps: number;
  delay?: number;
  anticipationFrames?: number;
  anticipationAmount?: number;
  config?: { damping: number; mass: number; stiffness: number };
}): number {
  const localFrame = frame - delay;
  if (localFrame < 0) return 0;

  if (localFrame < anticipationFrames) {
    // Recoil / wind-up backwards
    const p = localFrame / anticipationFrames;
    const recoil = Math.sin(p * Math.PI) * -anticipationAmount;
    return recoil;
  }

  // Explosive snap forward with spring
  const spr = spring({
    frame: localFrame - anticipationFrames,
    fps,
    config,
  });

  return spr;
}

/**
 * Harmonic Floating Drift:
 * Ensures elements are NEVER completely static; provides organic micro-life.
 */
export function getHarmonicDrift(
  frame: number,
  {
    speed = 0.05,
    ampX = 6,
    ampY = 8,
    rotAmp = 1.2,
    phase = 0,
  }: {
    speed?: number;
    ampX?: number;
    ampY?: number;
    rotAmp?: number;
    phase?: number;
  } = {}
): { x: number; y: number; rotate: number } {
  const t = frame * speed + phase;
  const x = Math.sin(t) * ampX + Math.cos(t * 0.6) * (ampX * 0.4);
  const y = Math.cos(t * 0.8) * ampY + Math.sin(t * 0.4) * (ampY * 0.3);
  const rotate = Math.sin(t * 0.7) * rotAmp;
  return { x, y, rotate };
}

/**
 * Kinetic Impact Glitch / Chromatic Aberration offset on hard hit frames
 */
export function getChromaticOffset(
  frame: number,
  hitFrame: number,
  duration = 8,
  intensity = 10
): { redX: number; redY: number; blueX: number; blueY: number; opacity: number } {
  const diff = frame - hitFrame;
  if (diff < 0 || diff > duration) {
    return { redX: 0, redY: 0, blueX: 0, blueY: 0, opacity: 0 };
  }

  const decay = 1 - diff / duration;
  const jitter = Math.sin(diff * 2.8) * intensity * decay;

  return {
    redX: jitter,
    redY: -jitter * 0.4,
    blueX: -jitter,
    blueY: jitter * 0.4,
    opacity: decay * 0.75,
  };
}

/**
 * Whip Pan Transition easing
 */
export const WHIP_EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const POP_EASE = Easing.bezier(0.34, 1.56, 0.64, 1);
