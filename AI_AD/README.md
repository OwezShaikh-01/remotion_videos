# AI Motion Designer Commercial (30s Kinetic Motion Graphics)

A high-end, 30-second kinetic typography and motion graphics commercial built with **Remotion** and **React**.

> **Theme:** *"Hire Your Next Lead Motion Designer: AI"*  
> **Aesthetic:** High-End Editorial & Luxury Architectural (Apple Keynote / Stripe / Pentagram style). Smooth, fluid, confident motion with zero chaos or cyberpunk tropes.  
> **Specs:** 30.0 Seconds (`900 frames @ 30 FPS`), 1920×1080 Full HD.

---

## ⚡ 1-Click Quickstart

Clone the repository and launch the interactive preview:

```bash
# 1. Enter the project directory
cd AI_AD

# 2. Install dependencies
npm install

# 3. Start Remotion Studio (One-click interactive preview)
npm run dev
# or: npm start
```

This automatically opens Remotion Studio at `http://localhost:3000` where you can scrub individual frames, inspect fluid easing curves, and watch the full 30s playback.

---

## 🎬 Render to MP4

To render the finished 1080p MP4 video directly:

```bash
npm run render
```

The output file is saved to:
```
out/hire-ai-motion.mp4
```

---

## 📐 Architecture & Fluid Motion Principles

1. **Fluid Masked Typography (`ExpressiveText.tsx`):**
   - Premium overflow-hidden line and word reveal clipping.
   - Smooth, non-linear ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Staggered editorial cadence with subtle upward glide.

2. **Damped Physics & Physics Tuning (`motion.ts` & `theme.ts`):**
   - **Silky Springs:** Critical damping (`mass: 0.8-1.0`, `stiffness: 70-95`, `damping: 26-30`) eliminating harsh bounces and jarring recoils.
   - **Subtle Harmonic Drift:** Gentle ambient floating motion preventing static dead frames.
   - **Zero Shake & Glitch:** Clean, confident camera glides and studio lighting transitions.

3. **Cinematic Studio Camera & Atmosphere (`CameraRig.tsx`):**
   - Continuous slow focal dolly zoom (`1.0 -> 1.03`).
   - Deep obsidian canvas with soft diffused studio lighting auras.
   - Fine architectural grid lines and 35mm print-grade film grain.

4. **Visual Accents & Refined Graphic Systems:**
   - **`BezierGraph.tsx`:** Serene cubic-bezier curve instrument with live tangent handles and speed metrics.
   - **`LiquidGeometry.tsx`:** Ambient diffused studio light auras.
   - **`BadgeSeal.tsx`:** Stately rotating studio seal with silky damped spin.
   - **`Marquee.tsx`:** Slow, dignified horizontal ticker glide.
   - **`NoiseOverlay.tsx`:** Subtle 3.5% print-grade SVG film grain.

---

## 📁 Project Structure

```
AI_AD/
├── src/
│   ├── components/
│   │   ├── BadgeSeal.tsx         # Rotating circular typographic stamp
│   │   ├── BezierGraph.tsx       # Live speed graph curve editor
│   │   ├── CameraRig.tsx         # 3D camera pan, shake, chromatic ghosting
│   │   ├── ExpressiveText.tsx    # Character-level 3D kinetic typography
│   │   ├── GeometricShapes.tsx   # Bauhaus accents, rings, pill tags
│   │   ├── ImpactBurst.tsx       # Shockwave rings & radial spark rays
│   │   ├── LiquidGeometry.tsx    # Harmonic morphing SVG blobs
│   │   ├── Marquee.tsx           # High-speed angled ticker ribbons
│   │   ├── NoiseOverlay.tsx      # Sub-pixel SVG film grain
│   │   └── StudioHeader.tsx      # Live timecode & audio waveform bar
│   ├── scenes/
│   │   ├── Scene1Hook.tsx        # 01 / The Hook (Stark Vermilion & Inversion)
│   │   ├── Scene2Problem.tsx     # 02 / The Reality (3D Card Tumble & OBSOLETE Slam)
│   │   ├── Scene3MeetAI.tsx      # 03 / The Revelation (Speed Bezier Graph)
│   │   ├── Scene4Showcase.tsx    # 04 / The Showreel (Type, Brand, Product Motion)
│   │   ├── Scene5ValueProp.tsx   # 05 / Scale Unlimited (100+ Concepts Counter)
│   │   └── Scene6CallToAction.tsx# 06 / Grand Finale (Magnetic Button & Click)
│   ├── utils/
│   │   └── motion.ts             # Squash & stretch, anticipation, drift
│   ├── Root.tsx                  # Master 30s timeline composition
│   ├── theme.ts                  # Swiss color palette & spring tokens
│   └── index.ts                  # Remotion root registration
├── package.json
└── tsconfig.json
```
