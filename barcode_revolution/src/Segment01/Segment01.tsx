import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

// ─── PALETTE ────────────────────────────────────────────
const C = {
  parchment: "#F2EDE4",
  warmCream: "#FAF7F2",
  sand: "#D4C5A0",
  sandDark: "#B8A882",
  ink: "#1A1714",
  inkSoft: "#3D3832",
  inkFaint: "#8A8278",
  amber: "#C4841D",
  warmGold: "#DAA520",
  bloodRed: "#8B3A3A",
  juicyYellow: "#F5D547",
  juicyGreen: "#4A7C38",
  white: "#FFFFFF",
  scanRed: "#E63946",
};

// ─── EASING PRESETS ─────────────────────────────────────
const ease = {
  // Cinematic smooth deceleration — titles, reveals
  cinematicOut: Easing.bezier(0.16, 1, 0.3, 1),
  // Slow anticipation, fast snap — dramatic emphasis
  dramaticIn: Easing.bezier(0.7, 0, 0.84, 0),
  // Smooth in-out — background transitions
  smoothInOut: Easing.bezier(0.45, 0, 0.55, 1),
  // Sharp snap with overshoot — attention-grabbing
  snapOut: Easing.bezier(0.34, 1.4, 0.64, 1),
  // Gentle ease — subtle movements
  gentle: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// ─── UTILITY ────────────────────────────────────────────
const clampedInterpolate = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing?: (t: number) => number
) =>
  interpolate(frame, inputRange, outputRange, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ─── MAIN COMPOSITION ──────────────────────────────────
export const Segment01: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Global background color shifts through the segment
  const bgR = clampedInterpolate(frame, [390, 540], [242, 212], ease.smoothInOut);
  const bgG = clampedInterpolate(frame, [390, 540], [237, 197], ease.smoothInOut);
  const bgB = clampedInterpolate(frame, [390, 540], [228, 160], ease.smoothInOut);

  // Return from warm sand to slightly cooler for the "nothing" beat
  const bgR2 = clampedInterpolate(frame, [600, 720], [bgR, 235], ease.smoothInOut);
  const bgG2 = clampedInterpolate(frame, [600, 720], [bgG, 228], ease.smoothInOut);
  const bgB2 = clampedInterpolate(frame, [600, 720], [bgB, 218], ease.smoothInOut);

  const bgColor = `rgb(${Math.round(bgR2)}, ${Math.round(bgG2)}, ${Math.round(bgB2)})`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* BEAT 1: "Look around you." (0:00 - 0:02, frames 0-60) */}
      <Sequence from={0} durationInFrames={75}>
        <BeatOne />
      </Sequence>

      {/* BEAT 2: "...a pattern of black lines." (0:02 - 0:07, frames 60-210) */}
      <Sequence from={45} durationInFrames={180}>
        <BeatTwo />
      </Sequence>

      {/* BEAT 3: "Probably several." (0:07 - 0:08, frames 210-240) */}
      <Sequence from={200} durationInFrames={60}>
        <BeatThree />
      </Sequence>

      {/* BEAT 4: "10,000 times. Never really looked." (0:08 - 0:13, frames 240-390) */}
      <Sequence from={240} durationInFrames={160}>
        <BeatFour />
      </Sequence>

      {/* BEAT 5: "Sketched in the sand... 1949" (0:13 - 0:20, frames 390-600) */}
      <Sequence from={390} durationInFrames={220}>
        <BeatFive />
      </Sequence>

      {/* BEAT 6: "Did absolutely nothing for 25 years" (0:20 - 0:27, frames 600-810) */}
      <Sequence from={600} durationInFrames={220}>
        <BeatSix />
      </Sequence>

      {/* BEAT 7: "One died... first product scanned... gum" (0:27 - 0:32, frames 810-960) */}
      <Sequence from={810} durationInFrames={150}>
        <BeatSeven />
      </Sequence>

      {/* Subtle film grain overlay */}
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 1 — "Look around you."
// Intimate, sparse. A single line of serif text breathes onto screen.
// Then it dissolves. No decoration. Just words and space.
// ═══════════════════════════════════════════════════════
const BeatOne: React.FC = () => {
  const frame = useCurrentFrame();

  // "LOOK" appears first
  const lookOpacity = clampedInterpolate(frame, [8, 20], [0, 1], ease.gentle);
  const lookY = clampedInterpolate(frame, [8, 22], [18, 0], ease.cinematicOut);

  // "AROUND" appears second
  const aroundOpacity = clampedInterpolate(frame, [14, 26], [0, 1], ease.gentle);
  const aroundY = clampedInterpolate(frame, [14, 28], [18, 0], ease.cinematicOut);

  // "YOU" appears third
  const youOpacity = clampedInterpolate(frame, [20, 32], [0, 1], ease.gentle);
  const youY = clampedInterpolate(frame, [20, 34], [18, 0], ease.cinematicOut);

  // The whole phrase fades out
  const fadeOut = clampedInterpolate(frame, [52, 70], [1, 0], ease.smoothInOut);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "baseline",
        }}
      >
        {[
          { text: "Look", opacity: lookOpacity, y: lookY },
          { text: "around", opacity: aroundOpacity, y: aroundY },
          { text: "you.", opacity: youOpacity, y: youY },
        ].map((word, i) => (
          <span
            key={i}
            style={{
              fontSize: 82,
              fontWeight: 400,
              fontStyle: "italic",
              color: C.ink,
              letterSpacing: "0.02em",
              opacity: word.opacity,
              transform: `translateY(${word.y}px)`,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 2 — "...a pattern of black lines."
// A single thin vertical line fades in at center.
// Then more lines appear, varying thickness.
// They slowly organize into a recognizable barcode.
// ═══════════════════════════════════════════════════════
const BeatTwo: React.FC = () => {
  const frame = useCurrentFrame();

  // The barcode pattern: widths and gaps for a realistic UPC-like pattern
  const barcodePattern = [
    3, 0, 1, 0, 1, 0, 2, 0, 3, 0, 1, 0, 1, 0, 2, 0, 1, 0, 3, 0,
    1, 0, 2, 0, 1, 0, 1, 0, 3, 0, 2, 0, 1, 0, 1, 0, 2, 0, 3, 0,
    1, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 1,
  ];

  // Phase 1: First line fades in (frames 0-20 local)
  const firstLineOpacity = clampedInterpolate(frame, [0, 25], [0, 1], ease.gentle);

  // Phase 2: Lines gradually appear (frames 20-90)
  const lineRevealProgress = clampedInterpolate(frame, [20, 100], [0, 1], ease.cinematicOut);

  // Phase 3: Lines organize into barcode (frames 90-140)
  const organizeProgress = clampedInterpolate(frame, [90, 140], [0, 1], ease.smoothInOut);

  // Phase 4: Barcode fades slightly as beat 3 takes over
  const fadeOut = clampedInterpolate(frame, [155, 175], [1, 0], ease.gentle);

  // The text "a pattern of black lines" fading in
  const textOpacity = clampedInterpolate(frame, [35, 55], [0, 0.4], ease.gentle);
  const textFadeOut = clampedInterpolate(frame, [100, 130], [1, 0], ease.gentle);

  // Barcode total width
  const barcodeWidth = 500;
  const totalUnits = barcodePattern.reduce((a, b) => a + Math.max(b, 1), 0);
  const unitWidth = barcodeWidth / totalUnits;

  // Calculate line positions
  let xOffset = 0;
  const lines: Array<{ x: number; w: number; isBar: boolean; index: number }> = [];
  let barIndex = 0;
  barcodePattern.forEach((val, i) => {
    const isBar = i % 2 === 0;
    const w = Math.max(val, 1) * unitWidth;
    if (isBar && val > 0) {
      lines.push({ x: xOffset, w: val * unitWidth, isBar: true, index: barIndex });
      barIndex++;
    }
    xOffset += w;
  });

  const totalBars = lines.length;
  const centerX = 960;
  const centerY = 540;

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Subtle text behind the lines */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          width: "100%",
          textAlign: "center",
          opacity: textOpacity * textFadeOut,
          color: C.inkFaint,
          fontSize: 22,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "'Georgia', serif",
        }}
      >
        a pattern of black lines
      </div>

      {/* The barcode lines */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        {lines.map((line, i) => {
          const normalizedIndex = i / totalBars;

          // Each line appears based on reveal progress
          const lineAppearThreshold = normalizedIndex * 0.85;
          const lineOpacity =
            i === Math.floor(totalBars / 2)
              ? firstLineOpacity // Center line appears first
              : clampedInterpolate(
                  lineRevealProgress,
                  [lineAppearThreshold, lineAppearThreshold + 0.15],
                  [0, 1]
                );

          // Random scattered position → organized barcode position
          const seed = ((i * 7919 + 1) % 97) / 97; // Deterministic pseudo-random
          const seed2 = ((i * 3571 + 13) % 89) / 89;

          const scatterX = (seed - 0.5) * 1200;
          const scatterY = (seed2 - 0.5) * 600;
          const scatterRotation = (seed - 0.5) * 40;

          const targetX = centerX - barcodeWidth / 2 + line.x;
          const targetY = centerY - 120;

          const currentX = interpolate(
            organizeProgress,
            [0, 1],
            [centerX + scatterX, targetX],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const currentY = interpolate(
            organizeProgress,
            [0, 1],
            [centerY + scatterY, targetY],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const rotation = interpolate(
            organizeProgress,
            [0, 1],
            [scatterRotation, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const barHeight = interpolate(
            organizeProgress,
            [0, 1],
            [40 + seed * 80, 240],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <rect
              key={i}
              x={currentX}
              y={currentY}
              width={Math.max(line.w, 2)}
              height={barHeight}
              rx={organizeProgress < 0.5 ? 1 : 0}
              fill={C.ink}
              opacity={lineOpacity}
              transform={`rotate(${rotation}, ${currentX + line.w / 2}, ${currentY + barHeight / 2})`}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 3 — "Probably several."
// Quick, snappy. Multiple small barcodes appear around edges.
// ═══════════════════════════════════════════════════════
const BeatThree: React.FC = () => {
  const frame = useCurrentFrame();

  const barcodes = [
    { x: 180, y: 160, scale: 0.35, rotation: -8, delay: 0 },
    { x: 1550, y: 220, scale: 0.28, rotation: 5, delay: 3 },
    { x: 320, y: 780, scale: 0.32, rotation: -3, delay: 5 },
    { x: 1400, y: 700, scale: 0.25, rotation: 12, delay: 7 },
    { x: 900, y: 140, scale: 0.22, rotation: -5, delay: 4 },
    { x: 1100, y: 850, scale: 0.3, rotation: 7, delay: 6 },
  ];

  // Fade out as beat 4 comes in
  const groupFade = clampedInterpolate(frame, [35, 55], [1, 0], ease.gentle);

  return (
    <AbsoluteFill style={{ opacity: groupFade }}>
      {barcodes.map((bc, i) => {
        const appear = clampedInterpolate(
          frame,
          [bc.delay, bc.delay + 6],
          [0, 1],
          ease.snapOut
        );
        const scaleAnim = clampedInterpolate(
          frame,
          [bc.delay, bc.delay + 8],
          [0.7, 1],
          ease.snapOut
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bc.x,
              top: bc.y,
              opacity: appear,
              transform: `scale(${bc.scale * scaleAnim}) rotate(${bc.rotation}deg)`,
              transformOrigin: "center",
            }}
          >
            <MiniBarcode seed={i * 37} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Mini barcode component for Beat 3
const MiniBarcode: React.FC<{ seed: number }> = ({ seed }) => {
  const lines: number[] = [];
  for (let i = 0; i < 30; i++) {
    const r = ((seed + i * 7919) % 97) / 97;
    lines.push(r > 0.4 ? (r > 0.7 ? 3 : 2) : 1);
  }

  return (
    <svg width="200" height="120" viewBox="0 0 200 120">
      {lines.map((w, i) => (
        <rect
          key={i}
          x={5 + i * 6.2}
          y={10}
          width={w}
          height={100}
          fill={C.ink}
          opacity={0.85}
        />
      ))}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 4 — "You've seen them 10,000 times."
// "10,000" fills the screen huge. Then: "You've never really looked."
// The number is textured with tiny barcode fragments.
// ═══════════════════════════════════════════════════════
const BeatFour: React.FC = () => {
  const frame = useCurrentFrame();

  // "10,000" crashes in
  const numberScale = clampedInterpolate(frame, [5, 25], [1.3, 1], ease.cinematicOut);
  const numberOpacity = clampedInterpolate(frame, [5, 22], [0, 1], ease.gentle);
  const numberY = clampedInterpolate(frame, [5, 25], [40, 0], ease.cinematicOut);

  // "times." appears after a beat
  const timesOpacity = clampedInterpolate(frame, [28, 42], [0, 1], ease.gentle);

  // Subtitle: "You've never really looked."
  const subtitleOpacity = clampedInterpolate(frame, [65, 85], [0, 1], ease.gentle);
  const subtitleY = clampedInterpolate(frame, [65, 85], [12, 0], ease.cinematicOut);

  // Everything fades
  const fadeOut = clampedInterpolate(frame, [130, 155], [1, 0], ease.smoothInOut);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* The big number */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          opacity: numberOpacity,
          transform: `scale(${numberScale}) translateY(${numberY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 220,
            fontWeight: 400,
            color: C.ink,
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          10,000
        </span>
        <span
          style={{
            fontSize: 48,
            color: C.inkSoft,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            opacity: timesOpacity,
            letterSpacing: "0.02em",
          }}
        >
          times.
        </span>
      </div>

      {/* The reveal line */}
      <div
        style={{
          marginTop: 60,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 36,
            color: C.inkFaint,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            letterSpacing: "0.04em",
          }}
        >
          You've never really looked.
        </span>
      </div>

      {/* Decorative: faint barcode fragments scattered */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", opacity: 0.04 }}
      >
        {Array.from({ length: 120 }).map((_, i) => {
          const x = ((i * 7919 + 3) % 1920);
          const y = ((i * 3571 + 7) % 1080);
          const w = ((i * 131 + 1) % 3) + 1;
          const h = 20 + ((i * 41) % 60);
          const lineOpacity = clampedInterpolate(
            frame,
            [10 + (i % 30), 40 + (i % 30)],
            [0, 1],
            ease.gentle
          );
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill={C.ink}
              opacity={lineOpacity}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 5 — "Sketched in the sand of a Florida beach in 1949"
// Warm color wash. Lines redraw as if finger-traced in sand.
// "1949" appears as a typographic statement.
// ═══════════════════════════════════════════════════════
const BeatFive: React.FC = () => {
  const frame = useCurrentFrame();

  // Sand texture particles drifting
  const particleOpacity = clampedInterpolate(frame, [0, 40], [0, 1], ease.gentle);

  // "1949" date stamp
  const yearOpacity = clampedInterpolate(frame, [50, 70], [0, 1], ease.gentle);
  const yearScale = clampedInterpolate(frame, [50, 75], [0.92, 1], ease.cinematicOut);

  // "Florida" location text
  const locationOpacity = clampedInterpolate(frame, [30, 50], [0, 0.6], ease.gentle);
  const locationY = clampedInterpolate(frame, [30, 50], [8, 0], ease.cinematicOut);

  // Hand-drawn sand lines appearing (finger traces in sand)
  const lineDrawProgress = clampedInterpolate(frame, [60, 150], [0, 1], ease.smoothInOut);

  // Fade out
  const fadeOut = clampedInterpolate(frame, [185, 215], [1, 0], ease.smoothInOut);

  // Sand-like lines: irregular, wobbly, hand-drawn feeling
  const sandLines = [
    { x: 560, thickness: 5, height: 280, delay: 0.0 },
    { x: 620, thickness: 3, height: 280, delay: 0.05 },
    { x: 660, thickness: 7, height: 280, delay: 0.1 },
    { x: 710, thickness: 3, height: 280, delay: 0.15 },
    { x: 750, thickness: 4, height: 280, delay: 0.2 },
    { x: 810, thickness: 8, height: 280, delay: 0.25 },
    { x: 860, thickness: 3, height: 280, delay: 0.3 },
    { x: 920, thickness: 5, height: 280, delay: 0.35 },
    { x: 960, thickness: 3, height: 280, delay: 0.4 },
    { x: 1010, thickness: 6, height: 280, delay: 0.45 },
    { x: 1070, thickness: 4, height: 280, delay: 0.5 },
    { x: 1120, thickness: 7, height: 280, delay: 0.55 },
    { x: 1170, thickness: 3, height: 280, delay: 0.6 },
    { x: 1230, thickness: 5, height: 280, delay: 0.65 },
    { x: 1290, thickness: 4, height: 280, delay: 0.7 },
    { x: 1340, thickness: 6, height: 280, delay: 0.75 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Sand texture: subtle grain dots */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", opacity: particleOpacity * 0.15 }}
      >
        {Array.from({ length: 300 }).map((_, i) => {
          const x = ((i * 7919 + 31) % 1920);
          const y = ((i * 3571 + 47) % 1080);
          const r = 1 + ((i * 41) % 3);
          return (
            <circle key={i} cx={x} cy={y} r={r} fill={C.sandDark} opacity={0.3} />
          );
        })}
      </svg>

      {/* Location text: "MIAMI BEACH, FLORIDA" */}
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          textAlign: "center",
          opacity: locationOpacity,
          transform: `translateY(${locationY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 18,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: C.sandDark,
            fontFamily: "'Georgia', serif",
          }}
        >
          Miami Beach, Florida
        </span>
      </div>

      {/* The finger-drawn sand lines */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        {sandLines.map((line, i) => {
          const lineProgress = clampedInterpolate(
            lineDrawProgress,
            [line.delay, line.delay + 0.2],
            [0, 1],
            ease.cinematicOut
          );

          // Create a wobbly path (sand trace)
          const wobble = (y: number) => {
            const seed = i * 37 + y * 0.1;
            return Math.sin(seed * 0.8) * 2.5 + Math.cos(seed * 1.3) * 1.5;
          };

          const pathPoints: string[] = [];
          const steps = 20;
          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const y = 350 + t * line.height * lineProgress;
            const x = line.x + wobble(y);
            pathPoints.push(`${s === 0 ? "M" : "L"} ${x} ${y}`);
          }

          return (
            <path
              key={i}
              d={pathPoints.join(" ")}
              stroke={C.sandDark}
              strokeWidth={line.thickness}
              fill="none"
              strokeLinecap="round"
              opacity={lineProgress * 0.7}
            />
          );
        })}
      </svg>

      {/* "1949" — the year as a monumental typographic element */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: "100%",
          textAlign: "center",
          opacity: yearOpacity,
          transform: `scale(${yearScale})`,
        }}
      >
        <span
          style={{
            fontSize: 160,
            fontWeight: 400,
            color: C.ink,
            fontFamily: "'Georgia', serif",
            letterSpacing: "0.08em",
            opacity: 0.85,
          }}
        >
          1949
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 6 — "Did absolutely nothing for 25 years"
// The word "NOTHING" sits alone, massive.
// A year counter ticks. "$15,000" appears clinical, cold.
// The warmth drains from the palette.
// ═══════════════════════════════════════════════════════
const BeatSix: React.FC = () => {
  const frame = useCurrentFrame();

  // "NOTHING" appears
  const nothingOpacity = clampedInterpolate(frame, [10, 30], [0, 1], ease.gentle);
  const nothingScale = clampedInterpolate(frame, [10, 35], [1.05, 1], ease.cinematicOut);

  // "for 25 years" below
  const yearsOpacity = clampedInterpolate(frame, [35, 55], [0, 0.5], ease.gentle);

  // Year counter ticking in the corner
  const yearCount = Math.floor(
    clampedInterpolate(frame, [20, 120], [1949, 1974], ease.smoothInOut)
  );

  // "$15,000" appears
  const priceOpacity = clampedInterpolate(frame, [100, 120], [0, 1], ease.gentle);
  const priceY = clampedInterpolate(frame, [100, 125], [20, 0], ease.cinematicOut);

  // Fading barcode ghost in background — the invention fading
  const ghostOpacity = clampedInterpolate(frame, [0, 80], [0.06, 0.01], ease.gentle);

  // Fade out
  const fadeOut = clampedInterpolate(frame, [180, 215], [1, 0], ease.smoothInOut);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Ghost barcode — fading invention */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", opacity: ghostOpacity }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <rect
            key={i}
            x={680 + i * 22}
            y={300}
            width={((i * 7 + 3) % 4) + 1}
            height={200}
            fill={C.inkFaint}
          />
        ))}
      </svg>

      {/* NOTHING */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 180,
            fontWeight: 400,
            color: C.ink,
            fontFamily: "'Georgia', serif",
            letterSpacing: "0.06em",
            opacity: nothingOpacity,
            transform: `scale(${nothingScale})`,
            display: "inline-block",
          }}
        >
          Nothing.
        </span>

        <span
          style={{
            fontSize: 28,
            color: C.inkFaint,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            letterSpacing: "0.06em",
            marginTop: 20,
            opacity: yearsOpacity,
          }}
        >
          for twenty-five years
        </span>
      </div>

      {/* Year counter — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          opacity: clampedInterpolate(frame, [15, 30], [0, 0.4], ease.gentle),
        }}
      >
        <span
          style={{
            fontSize: 42,
            color: C.inkFaint,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.1em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {yearCount}
        </span>
      </div>

      {/* $15,000 — cold, clinical */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 100,
          opacity: priceOpacity,
          transform: `translateY(${priceY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 52,
            color: C.inkSoft,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.05em",
          }}
        >
          $15,000
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// BEAT 7 — "One of them died... gum"
// A single barcode line thins and vanishes (death metaphor).
// Then a yellow rectangle (Juicy Fruit) rises from below.
// A red scan line sweeps across.
// ═══════════════════════════════════════════════════════
const BeatSeven: React.FC = () => {
  const frame = useCurrentFrame();

  // The fading line — death metaphor
  const lineOpacity = clampedInterpolate(frame, [5, 45], [0.8, 0], ease.smoothInOut);
  const lineWidth = clampedInterpolate(frame, [5, 45], [4, 0.3], ease.smoothInOut);
  const lineHeight = clampedInterpolate(frame, [5, 45], [300, 180], ease.smoothInOut);

  // Brief pause of emptiness (frames 45-60)

  // The yellow gum pack rises
  const gumY = clampedInterpolate(frame, [55, 85], [200, 0], ease.cinematicOut);
  const gumOpacity = clampedInterpolate(frame, [55, 75], [0, 1], ease.gentle);
  const gumScale = clampedInterpolate(frame, [55, 85], [0.9, 1], ease.cinematicOut);

  // Barcode draws onto the gum pack
  const barcodeDrawProgress = clampedInterpolate(frame, [80, 110], [0, 1], ease.smoothInOut);

  // Red scan line sweeps
  const scanLineX = clampedInterpolate(frame, [105, 130], [-20, 260], ease.cinematicOut);
  const scanLineOpacity = clampedInterpolate(frame, [105, 115], [0, 1], ease.gentle)
    * clampedInterpolate(frame, [125, 135], [1, 0], ease.gentle);

  // "Beep." text
  const beepOpacity = clampedInterpolate(frame, [120, 125], [0, 1]);
  const beepScale = clampedInterpolate(frame, [120, 128], [0.8, 1], ease.snapOut);

  return (
    <AbsoluteFill>
      {/* The dying line — center screen */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: lineWidth,
          height: lineHeight,
          backgroundColor: C.ink,
          opacity: lineOpacity,
          borderRadius: 1,
        }}
      />

      {/* The gum pack */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${gumY}px) scale(${gumScale})`,
          opacity: gumOpacity,
        }}
      >
        {/* Yellow gum package */}
        <div
          style={{
            width: 240,
            height: 340,
            backgroundColor: C.juicyYellow,
            borderRadius: 8,
            position: "relative",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Green stripe at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              backgroundColor: C.juicyGreen,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: C.white,
                fontSize: 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Georgia', serif",
              }}
            >
              Wrigley's
            </span>
          </div>

          {/* Brand name */}
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: C.ink,
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.04em",
              }}
            >
              JUICY
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: C.ink,
                fontFamily: "'Georgia', serif",
                letterSpacing: "0.04em",
              }}
            >
              FRUIT
            </div>
          </div>

          {/* Barcode on the package — draws in */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              overflow: "hidden",
            }}
          >
            <svg width="180" height="80" viewBox="0 0 180 80">
              {Array.from({ length: 40 }).map((_, i) => {
                const x = 10 + i * 4;
                const w = ((i * 7 + 3) % 3) + 1;
                const barProgress = clampedInterpolate(
                  barcodeDrawProgress,
                  [i / 40, Math.min((i + 5) / 40, 1)],
                  [0, 1]
                );
                return (
                  <rect
                    key={i}
                    x={x}
                    y={5}
                    width={w}
                    height={55 * barProgress}
                    fill={C.ink}
                  />
                );
              })}
              {/* Numbers below barcode */}
              <text
                x="90"
                y="72"
                textAnchor="middle"
                fontSize="8"
                fontFamily="'Courier New', monospace"
                fill={C.ink}
                opacity={barcodeDrawProgress}
              >
                0 36000 02915 2
              </text>
            </svg>

            {/* Red scan line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: scanLineX,
                width: 3,
                height: 80,
                backgroundColor: C.scanRed,
                opacity: scanLineOpacity,
                boxShadow: `0 0 12px ${C.scanRed}, 0 0 24px ${C.scanRed}40`,
              }}
            />
          </div>
        </div>
      </div>

      {/* "Beep." */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          width: "100%",
          textAlign: "center",
          opacity: beepOpacity,
          transform: `scale(${beepScale})`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            color: C.ink,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            letterSpacing: "0.1em",
          }}
        >
          Beep.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════
// FILM GRAIN OVERLAY
// Subtle analog texture across everything.
// ═══════════════════════════════════════════════════════
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();

  // Cycle through different grain patterns
  const grainSeed = frame % 4;

  return (
    <AbsoluteFill
      style={{
        opacity: 0.035,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {Array.from({ length: 800 }).map((_, i) => {
          const x = ((i * 7919 + grainSeed * 1231 + 31) % 1920);
          const y = ((i * 3571 + grainSeed * 997 + 47) % 1080);
          const r = 0.5 + ((i * 41 + grainSeed * 13) % 3) * 0.5;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={i % 3 === 0 ? "#000" : "#333"}
              opacity={0.3 + ((i * 17) % 5) * 0.1}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
