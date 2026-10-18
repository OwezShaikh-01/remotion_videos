import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {C, F, W, H, FPS, prog, eo, eio, ein, eb, lerp, win, rnd, Sentence, Word} from './lib';
import {buildWordsX, Subs, Overlays} from './shared';
import {loadFonts} from './fonts';

loadFonts();

const fill: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: W, height: H};
const abs = (s: React.CSSProperties): React.CSSProperties => ({position: 'absolute', ...s});

/* Times are LOCAL to Segment 03 (global time 66.0s to 93.5s). */
const sentences: Sentence[] = [
  {id: 'c1', parts: [{s: 0.14, e: 2.58, text: "And nobody knows what's really sitting on the shelves."}]},
  {id: 'c2', parts: [{s: 3.52, e: 4.44, text: 'He asks the dean,'}, {s: 5.22, e: 8.76, text: 'could you build a way for a store to read a product automatically?'}]},
  {id: 'c3', parts: [{s: 9.66, e: 10.60, text: 'The dean says no.'}]},
  {id: 'c4', parts: [{s: 11.54, e: 13.86, text: 'But a graduate student named Bernard Silver'}, {s: 14.08, e: 15.66, text: 'is standing close enough to hear.'}]},
  {id: 'c5', parts: [{s: 16.58, e: 17.38, text: 'He tells his friend,'}, {s: 17.64, e: 19.02, text: 'Norman Joseph Woodland.'}]},
  {id: 'c6', parts: [{s: 19.74, e: 21.40, text: "And Woodland can't let it go."}]},
  {id: 'c7', parts: [{s: 22.32, e: 23.14, text: 'Their first idea'}, {s: 23.46, e: 25.80, text: 'is ink that glows under ultraviolet light.'}]},
  {id: 'c8', parts: [{s: 26.68, e: 27.30, text: "It doesn't work."}]},
];
const WORDS: Record<string, Word[]> = Object.fromEntries(sentences.map((s) => [s.id, buildWordsX(s)]));

/* =========================================================================
   SCENE 1: 0.0 – 3.6  THE BLIND AISLES (Inventory Chaos in 1948)
   Dangling bare lightbulb, wooden shelving crates, grease pencil tally marks,
   phantom inventory boxes, flickering red error reticles, unrecorded stock.
   ========================================================================= */
const Shelves: React.FC<{t: number}> = ({t}) => {
  if (t > 3.6) return null;
  const a = win(t, 0.0, 3.6, 0.15, 0.5);
  const sc = lerp(1.12, 1.0, eo(t, 0, 3.5));
  const panX = lerp(-30, 20, eio(t, 0, 3.5));

  // Dangling ceiling bulb swinging softly in 1948 warehouse
  const swingAngle = Math.sin(t * 3.2) * 2.8;
  const bulbFlicker = 0.94 + 0.06 * Math.sin(t * 24 + 1.2);

  // 1948 grocery vintage cartons
  const cartons = [
    {x: 180, y: 360, w: 140, h: 160, brand: "SOUP", sub: "TOMATO", tag: "LOT-42", err: true, rot: -1.5},
    {x: 350, y: 360, w: 170, h: 130, brand: "OATS", sub: "ROLLED", tag: "BOX-88", err: false, rot: 1.2},
    {x: 550, y: 360, w: 130, h: 175, brand: "PEACHES", sub: "HALVES", tag: "CAN-19", err: true, rot: -0.8},
    {x: 710, y: 360, w: 190, h: 140, brand: "COFFEE", sub: "ROAST", tag: "TIN-04", err: false, rot: 2.1},
    {x: 930, y: 360, w: 150, h: 160, brand: "FLOUR", sub: "WHITE", tag: "BAG-91", err: true, rot: -1.0},
    {x: 1110, y: 360, w: 140, h: 150, brand: "SUGAR", sub: "CANE", tag: "BAG-53", err: false, rot: 1.5},
    {x: 1280, y: 360, w: 180, h: 145, brand: "SOAP", sub: "BARS", tag: "LOT-16", err: true, rot: -2.0},
    {x: 1490, y: 360, w: 150, h: 165, brand: "TEA", sub: "ORANGE", tag: "TIN-77", err: false, rot: 0.8},

    {x: 140, y: 620, w: 200, h: 155, brand: "CRACKERS", sub: "SALTED", tag: "LOT-09", err: false, rot: 1.0},
    {x: 370, y: 620, w: 150, h: 170, brand: "MILK", sub: "EVAP", tag: "CAN-62", err: true, rot: -1.8},
    {x: 550, y: 620, w: 160, h: 145, brand: "BEANS", sub: "DRIED", tag: "LOT-33", err: false, rot: 0.5},
    {x: 740, y: 620, w: 190, h: 160, brand: "LARD", sub: "PURE", tag: "TUB-81", err: true, rot: -1.2},
    {x: 960, y: 620, w: 140, h: 150, brand: "SALT", sub: "IODIZED", tag: "BOX-27", err: false, rot: 1.9},
    {x: 1130, y: 620, w: 170, h: 140, brand: "YEAST", sub: "CAKES", tag: "LOT-70", err: true, rot: -0.7},
    {x: 1330, y: 620, w: 170, h: 165, brand: "VINEGAR", sub: "CIDER", tag: "JUG-44", err: false, rot: 1.4},
    {x: 1530, y: 620, w: 180, h: 150, brand: "SYRUP", sub: "MAPLE", tag: "TIN-58", err: true, rot: -1.5},

    {x: 220, y: 880, w: 160, h: 150, brand: "STARCH", sub: "CORN", tag: "BOX-11", err: true, rot: -1.0},
    {x: 410, y: 880, w: 180, h: 160, brand: "COCOA", sub: "DUTCH", tag: "TIN-95", err: false, rot: 0.6},
    {x: 620, y: 880, w: 150, h: 145, brand: "RAISINS", sub: "SEEDLESS", tag: "BOX-38", err: true, rot: -2.2},
    {x: 800, y: 880, w: 170, h: 155, brand: "PRUNES", sub: "DRIED", tag: "BOX-49", err: false, rot: 1.1},
    {x: 1000, y: 880, w: 190, h: 150, brand: "RICE", sub: "GRAIN", tag: "BAG-84", err: true, rot: -0.9},
    {x: 1220, y: 880, w: 160, h: 160, brand: "BARLEY", sub: "PEARL", tag: "BAG-66", err: false, rot: 1.7},
    {x: 1410, y: 880, w: 170, h: 140, brand: "TALLOW", sub: "BLOCK", tag: "TUB-22", err: true, rot: -1.3},
  ];

  return (
    <div style={{...fill, opacity: a, transform: `scale(${sc}) translateX(${panX}px)`, transformOrigin: '50% 50%'}}>
      {/* Light cone from swinging incandescent bulb */}
      <div
        style={abs({
          left: 960 - 550,
          top: -40,
          width: 1100,
          height: 980,
          transform: `rotate(${swingAngle}deg)`,
          transformOrigin: '50% 0%',
          background: `radial-gradient(ellipse at 50% 10%, rgba(245,184,74,${0.28 * bulbFlicker}) 0%, rgba(201,166,107,0.08) 45%, rgba(0,0,0,0) 75%)`,
          pointerEvents: 'none',
        })}
      />

      {/* Heavy industrial oak shelving structure */}
      <svg style={fill} width={W} height={H}>
        {/* Vertical warehouse uprights */}
        {[100, 480, 880, 1280, 1680].map((x, i) => (
          <g key={i}>
            <rect x={x - 8} y={80} width={16} height={920} fill="#1e1b16" />
            <line x1={x} y1={80} x2={x} y2={1000} stroke="rgba(242,239,230,0.14)" strokeWidth={2} />
            {Array.from({length: 12}).map((_, r) => (
              <circle key={r} cx={x} cy={140 + r * 70} r={3} fill="rgba(242,239,230,0.25)" />
            ))}
          </g>
        ))}

        {/* Horizontal oak shelf beams with wood grain lines */}
        {[360, 620, 880].map((y, i) => (
          <g key={i}>
            <rect x={60} y={y} width={1800} height={22} fill="linear-gradient(180deg,#2b2318,#19140c)" rx={2} />
            <line x1={60} y1={y} x2={1860} y2={y} stroke="rgba(242,239,230,0.22)" strokeWidth={2} />
            <line x1={60} y1={y + 22} x2={1860} y2={y + 22} stroke="rgba(0,0,0,0.8)" strokeWidth={3} />
            {/* Shelf lip bracket screws */}
            {[100, 480, 880, 1280, 1680].map((bx, k) => (
              <polygon key={k} points={`${bx - 12},${y + 22} ${bx + 12},${y + 22} ${bx},${y + 42}`} fill="#12100d" stroke="rgba(242,239,230,0.15)" strokeWidth={1} />
            ))}
          </g>
        ))}
      </svg>

      {/* Cartons & Tins on Shelves */}
      {cartons.map((c, i) => {
        const p = prog(t, 0.05 + i * 0.03, 0.35 + i * 0.03);
        const pb = eb(t, 0.05 + i * 0.03, 0.65 + i * 0.03);
        const errPulse = c.err && t > 1.2 ? 0.7 + 0.3 * Math.sin(t * 14 + i * 1.7) : 0;
        const tagNum = (Math.floor(rnd(i * 31.7 + Math.floor(t * 4)) * 90) + 10);

        return (
          <div
            key={i}
            style={abs({
              left: c.x,
              top: c.y - c.h,
              width: c.w,
              height: c.h,
              opacity: p,
              transform: `translateY(${(1 - pb) * 24}px) rotate(${c.rot}deg)`,
            })}
          >
            {/* Vintage Package Body */}
            <div
              style={abs({
                inset: 0,
                borderRadius: 4,
                background: c.err
                  ? 'linear-gradient(165deg,#201d24 0%,#131118 70%)'
                  : 'linear-gradient(165deg,#2e2920 0%,#181510 70%)',
                border: `1.5px solid rgba(${c.err ? '255,77,61' : '242,239,230'}, ${c.err ? 0.45 * errPulse : 0.12})`,
                boxShadow: '0 18px 36px rgba(0,0,0,0.7), inset 1px 1px 0 rgba(255,255,255,0.08)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
              })}
            >
              {/* Cardboard label top */}
              <div>
                <div style={{fontFamily: F.mono, fontSize: 10, letterSpacing: '0.25em', color: C.sand, opacity: 0.65}}>
                  {c.tag}
                </div>
                <div style={{fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 20, color: C.bone, marginTop: 4, letterSpacing: '0.04em'}}>
                  {c.brand}
                </div>
                <div style={{fontFamily: F.sans, fontSize: 10, letterSpacing: '0.15em', color: C.sand, opacity: 0.5}}>
                  {c.sub}
                </div>
              </div>

              {/* Grease pencil question mark / missing stock count */}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <div
                  style={{
                    fontFamily: F.mono,
                    fontWeight: 700,
                    fontSize: c.err ? 26 : 14,
                    color: c.err ? C.red : C.bone,
                    opacity: c.err ? 0.95 : 0.35,
                    textShadow: c.err ? `0 0 16px ${C.red}` : 'none',
                  }}
                >
                  {c.err ? (t > 1.3 ? '??' : `ERR-${tagNum}`) : `QTY:${tagNum}`}
                </div>
                {c.err && (
                  <div style={{fontFamily: F.mono, fontSize: 9, letterSpacing: '0.2em', color: C.red, opacity: 0.8}}>
                    UNVERIFIED
                  </div>
                )}
              </div>

              {/* Red error tracking border pulse */}
              {c.err && t > 1.2 && (
                <div style={abs({inset: 0, border: `2px dashed ${C.red}`, opacity: errPulse * 0.7, borderRadius: 4})} />
              )}
            </div>
          </div>
        );
      })}

      {/* Floating HUD: Store Inventory Blindness in 1948 */}
      <div style={abs({left: 100, top: 120, fontFamily: F.mono, color: C.bone})}>
        <div style={{fontSize: 14, letterSpacing: '0.4em', color: C.sand, opacity: 0.75}}>
          GROCERY STORE INVENTORY STATUS : 1948
        </div>
        <div style={{fontSize: 52, fontWeight: 700, color: C.red, letterSpacing: '0.04em', marginTop: 6, textShadow: '0 4px 30px rgba(255,77,61,0.5)'}}>
          {t > 1.4 ? 'TOTAL INVENTORY BLINDNESS' : 'HAND-TALLY DISCREPANCY'}
        </div>
        <div style={{fontSize: 16, fontFamily: F.sans, color: C.bone, opacity: 0.6, marginTop: 6}}>
          No automated tracking. Cashiers guess. Shelves emptied with zero record.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SCENE 2: 3.0 – 6.0  THE DREXEL CORRIDOR (Office of the Dean)
   Mahogany wainscoting, checkered floor, brass fixtures, frosted glass door
   lettered "OFFICE OF THE DEAN — DREXEL INSTITUTE", shadows of figures.
   ========================================================================= */
const DeanCorridor: React.FC<{t: number}> = ({t}) => {
  if (t < 2.9 || t > 6.2) return null;
  const a = win(t, 3.0, 6.0, 0.4, 0.4);
  const zoom = eio(t, 3.0, 5.8);
  const sc = lerp(0.86, 1.06, zoom);
  const rot = lerp(-1.2, 1.0, eio(t, 3.0, 5.8));
  const lampFlicker = 0.95 + 0.05 * Math.sin(t * 18);

  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, transform: `scale(${sc}) rotate(${rot}deg)`, transformOrigin: '50% 50%'}}>
        {/* 1948 Collegiate Gothic Hallway Perspective Floor & Ceiling */}
        <svg style={fill} width={W} height={H}>
          {/* Checkered marble hallway floor tiles */}
          <polygon points={`0,${H} ${W},${H} 1240,740 680,740`} fill="#11131a" />
          {[720, 780, 850, 930, 1030, 1150].map((y, i) => (
            <line key={i} x1={0} y1={y} x2={W} y2={y} stroke="rgba(242,239,230,0.12)" strokeWidth={1.5} />
          ))}
          {[-400, -100, 200, 500, 800, 1100, 1400, 1700, 2000, 2300].map((x, i) => (
            <line key={i} x1={x} y1={H} x2={960 + (x - 960) * 0.28} y2={740} stroke="rgba(242,239,230,0.12)" strokeWidth={1.5} />
          ))}

          {/* Wall perspective lines converging toward center */}
          <line x1={0} y1={0} x2={680} y2={340} stroke="rgba(242,239,230,0.18)" strokeWidth={2} />
          <line x1={W} y1={0} x2={1240} y2={340} stroke="rgba(242,239,230,0.18)" strokeWidth={2} />
          <line x1={0} y1={H} x2={680} y2={740} stroke="rgba(242,239,230,0.18)" strokeWidth={2} />
          <line x1={W} y1={H} x2={1240} y2={740} stroke="rgba(242,239,230,0.18)" strokeWidth={2} />

          {/* Wall wood panel wainscotings */}
          {[220, 420, 580].map((y, i) => (
            <g key={i}>
              <line x1={0} y1={y} x2={680} y2={340 + (y / H) * 400} stroke="rgba(201,166,107,0.2)" strokeWidth={2} />
              <line x1={W} y1={y} x2={1240} y2={340 + (y / H) * 400} stroke="rgba(201,166,107,0.2)" strokeWidth={2} />
            </g>
          ))}
        </svg>

        {/* Overhead amber sconce lamp casting warm volumetric cone */}
        <div
          style={abs({
            left: 960 - 320,
            top: 40,
            width: 640,
            height: 480,
            background: `radial-gradient(ellipse at 50% 15%, rgba(245,184,74,${0.32 * lampFlicker}) 0%, rgba(201,166,107,0.1) 45%, rgba(0,0,0,0) 75%)`,
            pointerEvents: 'none',
          })}
        />

        {/* THE DEAN'S OFFICE DOOR AT THE END OF THE HALLWAY */}
        <div
          style={abs({
            left: 960 - 250,
            top: 540 - 310,
            width: 500,
            height: 620,
            borderRadius: '8px 8px 0 0',
            background: 'linear-gradient(180deg,#1c2130 0%,#0f121a 100%)',
            border: '10px solid rgba(242,239,230,0.25)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.85), inset 0 0 80px rgba(0,0,0,0.7)',
            position: 'relative',
          })}
        >
          {/* Frosted Glass Window with Gilded Lettering */}
          <div
            style={abs({
              left: 45,
              top: 45,
              right: 45,
              height: 310,
              borderRadius: 6,
              background: 'linear-gradient(145deg,rgba(245,215,160,0.22),rgba(242,239,230,0.08))',
              border: '3px solid rgba(245,215,160,0.4)',
              boxShadow: 'inset 0 0 50px rgba(245,184,74,0.2), 0 0 40px rgba(245,184,74,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 30px',
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            {/* Silhouettes of Food Chain President & Dean behind the frosted glass */}
            <svg style={abs({inset: 0, width: '100%', height: '100%', opacity: 0.35})}>
              {/* President with fedora hat */}
              <circle cx={140} cy={160} r={46} fill="#0b0d12" />
              <ellipse cx={140} cy={135} rx={58} ry={14} fill="#0b0d12" />
              <path d="M70,300 C80,210 200,210 210,300 Z" fill="#0b0d12" />
              {/* Dean seated */}
              <circle cx={280} cy={175} r={42} fill="#0b0d12" />
              <path d="M220,300 C230,225 330,225 340,300 Z" fill="#0b0d12" />
            </svg>

            {/* Gilded Gold Leaf Door Lettering */}
            <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 16, letterSpacing: '0.35em', color: C.sand, opacity: 0.95}}>
              DREXEL INSTITUTE
            </div>
            <div
              style={{
                fontFamily: F.serif,
                fontWeight: 600,
                fontSize: 28,
                letterSpacing: '0.14em',
                color: C.bone,
                marginTop: 8,
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}
            >
              OFFICE OF THE DEAN
            </div>
            <div style={{width: 90, height: 2, background: C.sand, opacity: 0.6, margin: '14px 0'}} />
            <div style={{fontFamily: F.mono, fontSize: 12, letterSpacing: '0.45em', color: C.bone, opacity: 0.6}}>
              SCHOOL OF ENGINEERING • 1948
            </div>
          </div>

          {/* Lower Door Molded Panels */}
          <div style={abs({left: 45, bottom: 45, right: 45, height: 190, border: '2px solid rgba(242,239,230,0.14)', borderRadius: 4, background: 'rgba(0,0,0,0.35)'})}>
            {/* Heavy Brass Doorknob & Keyhole Escutcheon Plate */}
            <div style={abs({left: 36, top: 70, width: 34, height: 50, borderRadius: 6, background: 'linear-gradient(180deg,#c9a66b,#8a6f3a)', boxShadow: '0 4px 12px rgba(0,0,0,0.7)', border: '1px solid #ffe4a0'})}>
              <div style={abs({left: 7, top: 10, width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fff0b3,#997a3d)', boxShadow: '0 3px 6px rgba(0,0,0,0.5)'})} />
              <div style={abs({left: 15, top: 34, width: 4, height: 10, background: '#0b0d12', borderRadius: 1})} />
            </div>
          </div>
        </div>

        {/* Cinematic caption */}
        <div style={abs({left: 0, width: W, top: 900, textAlign: 'center', fontFamily: F.mono, fontSize: 18, letterSpacing: '0.5em', color: C.sand, opacity: 0.65})}>
          PHILADELPHIA, 1948 • DREXEL INSTITUTE OF TECHNOLOGY
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SCENE 3: 5.2 – 9.8  THE IMPOSSIBLE QUESTION (Optical Blueprint)
   Cyanotype blueprint vellum, conveyor optic raycasting, phototube lens array,
   sweeping optical aperture, large editorial Fraunces quote typography.
   ========================================================================= */
const TheQuestion: React.FC<{t: number}> = ({t}) => {
  if (t < 5.1 || t > 9.9) return null;
  const a = win(t, 5.2, 9.7, 0.4, 0.5);
  const qProg = eo(t, 5.3, 7.6);
  const raySweep = eio(t, 6.2, 9.2);
  const beamX = lerp(480, 1440, raySweep);

  return (
    <div style={{...fill, opacity: a, background: 'radial-gradient(ellipse at 50% 50%, #0d1b2a 0%, #060c14 85%)'}}>
      {/* Blueprint background grid lines */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <pattern id="bpGrid" width={40} height={40} patternUnits="userSpaceOnUse">
            <rect width={40} height={40} fill="none" stroke="rgba(91,141,239,0.08)" strokeWidth={1} />
            <circle cx={20} cy={20} r={1} fill="rgba(91,141,239,0.18)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#bpGrid)" />

        {/* Blueprint border frame with technical registration marks */}
        <rect x={60} y={60} width={W - 120} height={H - 120} fill="none" stroke={C.blue} strokeWidth={2} strokeOpacity={0.35} />
        <rect x={70} y={70} width={W - 140} height={H - 140} fill="none" stroke={C.blue} strokeWidth={1} strokeOpacity={0.2} strokeDasharray="8 8" />

        {/* Corner registration crosshairs */}
        {[80, W - 80].map((cx, i) =>
          [80, H - 80].map((cy, j) => (
            <g key={`${i}-${j}`} stroke={C.blue} strokeWidth={1.5} strokeOpacity={0.5}>
              <line x1={cx - 15} y1={cy} x2={cx + 15} y2={cy} />
              <line x1={cx} y1={cy - 15} x2={cx} y2={cy + 15} />
              <circle cx={cx} cy={cy} r={8} fill="none" />
            </g>
          ))
        )}
      </svg>

      {/* The monumental question */}
      <div style={abs({left: 200, top: 120, width: 1520, textAlign: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 16, letterSpacing: '0.45em', color: C.blue, textTransform: 'uppercase', opacity: 0.9}}>
          PRELIMINARY INQUIRY : AUTOMATED STORE CHECKOUT (1948)
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 74,
            lineHeight: 1.25,
            color: C.bone,
            marginTop: 20,
            letterSpacing: '-0.01em',
            textShadow: '0 8px 30px rgba(0,0,0,0.8)',
          }}
        >
          “Could you build a way for a store to read a product automatically?”
        </div>
      </div>

      {/* Technical Blueprint: 1948 Theoretical Optical Scanner System */}
      <div style={abs({left: 960 - 450, bottom: 100, width: 900, height: 360, opacity: prog(t, 6.0, 6.8)})}>
        <svg width={900} height={360} viewBox="0 0 900 360" style={{display: 'block'}}>
          {/* Title box in blueprint style */}
          <rect x={40} y={20} width={380} height={46} fill="rgba(10,25,47,0.7)" stroke={C.blue} strokeWidth={1.5} strokeOpacity={0.6} />
          <text x={55} y={40} fontFamily={F.mono} fontSize={12} fill={C.blue} letterSpacing="0.2em">FIG. 0A : OPTICAL READ HEAD</text>
          <text x={55} y={56} fontFamily={F.mono} fontSize={10} fill={C.bone} opacity={0.6}>CONTINUOUS CONVEYOR TRANSIT</text>

          {/* Conveyor belt mechanism */}
          <line x1={80} y1={280} x2={820} y2={280} stroke={C.bone} strokeWidth={4} strokeOpacity={0.4} />
          <line x1={80} y1={300} x2={820} y2={300} stroke={C.bone} strokeWidth={2} strokeOpacity={0.2} strokeDasharray="6 6" />
          {Array.from({length: 20}).map((_, i) => (
            <g key={i}>
              <circle cx={100 + i * 36} cy={290} r={6} fill="none" stroke={C.bone} strokeWidth={1.5} strokeOpacity={0.35} />
              <circle cx={100 + i * 36} cy={290} r={2} fill={C.bone} fillOpacity={0.5} />
            </g>
          ))}

          {/* Overhead optical sensor housing */}
          <polygon points="400,90 500,90 540,160 360,160" fill="rgba(13,27,42,0.85)" stroke={C.sand} strokeWidth={2.5} strokeOpacity={0.85} />
          <line x1={450} y1={40} x2={450} y2={90} stroke={C.sand} strokeWidth={3} strokeOpacity={0.7} />
          <circle cx={450} cy={125} r={22} fill="none" stroke={C.bone} strokeWidth={2} strokeOpacity={0.6} />
          <circle cx={450} cy={125} r={8} fill={C.blue} fillOpacity={0.8} />

          {/* Optical projection cone onto the passing item */}
          <defs>
            <linearGradient id="scanBeamG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.blue} stopOpacity={0.9} />
              <stop offset="60%" stopColor={C.blue} stopOpacity={0.25} />
              <stop offset="100%" stopColor={C.blue} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <polygon points="420,160 480,160 580,278 320,278" fill="url(#scanBeamG)" />

          {/* Sweeping optical ray slices */}
          <line x1={450} y1={160} x2={beamX - 510} y2={278} stroke={C.sand} strokeWidth={2.5} strokeOpacity={0.9} />
          <line x1={450} y1={160} x2={beamX - 490} y2={278} stroke={C.bone} strokeWidth={1} strokeOpacity={0.5} strokeDasharray="3 3" />

          {/* Passing merchandise carton under the beam */}
          <g transform={`translate(${beamX - 560}, 210)`}>
            <rect width={100} height={68} rx={4} fill="#1c2130" stroke={C.bone} strokeWidth={2} strokeOpacity={0.7} />
            <rect x={14} y={12} width={72} height={8} fill={C.bone} fillOpacity={0.3} />
            <rect x={14} y={26} width={50} height={6} fill={C.sand} fillOpacity={0.5} />
            <rect x={14} y={42} width={72} height={16} fill="rgba(91,141,239,0.3)" stroke={C.blue} strokeWidth={1} />
            <text x={50} y={54} fontFamily={F.mono} fontSize={9} fill={C.bone} textAnchor="middle" letterSpacing="0.1em">TAG CODE</text>
          </g>

          {/* Dimension measurement arrows */}
          <line x1={80} y1={330} x2={820} y2={330} stroke={C.blue} strokeWidth={1} strokeOpacity={0.5} />
          <polygon points="80,330 90,326 90,334" fill={C.blue} />
          <polygon points="820,330 810,326 810,334" fill={C.blue} />
          <text x={450} y={345} fontFamily={F.mono} fontSize={11} fill={C.blue} textAnchor="middle" letterSpacing="0.3em">CONVEYOR VELOCITY : 12 IN / SEC</text>
        </svg>
      </div>
    </div>
  );
};

/* =========================================================================
   SCENE 4: 9.4 – 11.8  THE DEAN SAYS NO (The Harsh Rejection)
   Massive monumental "NO.", door glass rattling shockwave, red stamp:
   "REJECTED — PHYSICALLY IMPOSSIBLE / ECONOMICALLY UNFEASIBLE".
   ========================================================================= */
const TheDeanSaysNo: React.FC<{t: number}> = ({t}) => {
  if (t < 9.3 || t > 11.9) return null;
  const a = win(t, 9.4, 11.8, 0.15, 0.35);
  const slam = eb(t, 9.55, 9.85);
  const flash = prog(t, 9.66, 9.75) * (1 - prog(t, 9.75, 10.3));

  return (
    <div style={{...fill, opacity: a, background: '#0b0d12'}}>
      {/* Red flash shockwave on denial */}
      <div style={{...fill, background: C.red, opacity: flash * 0.22}} />

      {/* Massive Typographic Rejection */}
      <div style={abs({left: 0, top: 0, width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'})}>
        <div style={{fontFamily: F.mono, fontSize: 18, letterSpacing: '0.65em', color: C.sand, opacity: 0.65, marginBottom: 16}}>
          DREXEL FACULTY RESPONSE • PHILADELPHIA 1948
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 280,
            lineHeight: 0.9,
            color: C.bone,
            letterSpacing: '-0.03em',
            transform: `scale(${lerp(1.32, 1.0, slam)})`,
            textShadow: '0 25px 90px rgba(0,0,0,0.95), 0 0 50px rgba(255,77,61,0.25)',
          }}
        >
          “NO.”
        </div>

        {/* Official Dean's Rejection Stamp */}
        <div
          style={{
            marginTop: 40,
            padding: '12px 36px',
            border: `3px solid ${C.red}`,
            color: C.red,
            fontFamily: F.mono,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '0.35em',
            borderRadius: 8,
            opacity: prog(t, 9.82, 10.15),
            transform: `rotate(-4deg) scale(${lerp(1.4, 1.0, eb(t, 9.82, 10.15))})`,
            boxShadow: '0 0 30px rgba(255,77,61,0.4)',
          }}
        >
          REJECTED : IMPOSSIBLE TO AUTOMATE
        </div>

        <div style={{marginTop: 24, fontFamily: F.sans, fontSize: 18, color: C.bone, opacity: 0.5, letterSpacing: '0.05em'}}>
          The Dean dismisses the grocery executive. The problem is deemed insoluble.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SCENE 5: 11.3 – 21.8  SILVER & WOODLAND (The Acoustic Transmission & Obsession)
   Acoustic soundwave propagating across hallway tiles to Bernard Silver.
   Technical dossier cards for Silver & Woodland. Transmission circuit wire.
   Woodland's node spinning into relentless obsessive orbital loops.
   ========================================================================= */
const SilverAndWoodland: React.FC<{t: number}> = ({t}) => {
  if (t < 11.2 || t > 21.9) return null;
  const a = win(t, 11.3, 21.8, 0.4, 0.5);

  // Acoustic wave propagation from Dean's door (left edge) to Bernard Silver
  const waveProg = eo(t, 11.4, 14.2);
  const soundRadius = lerp(40, 780, waveProg);
  const soundOp = 1 - prog(t, 14.0, 15.4);

  // Bernard Silver card entrance
  const silverIn = eb(t, 11.6, 12.4);

  // Transmission line to Woodland (t 16.2 - 17.6)
  const wireProg = eo(t, 16.2, 17.6);

  // Norman Woodland card entrance (t 17.2)
  const woodIn = eb(t, 17.2, 18.0);

  // Woodland obsession mode ignites (t 19.5 - 21.8)
  const obsess = prog(t, 19.5, 20.8);
  const rotLoop = (t - 19.5) * 220;

  return (
    <div style={{...fill, opacity: a, background: `radial-gradient(ellipse at 50% 50%, #151824 0%, ${C.ink} 80%)`}}>
      {/* Acoustic wavefronts rippling from Dean's door */}
      <svg style={fill} width={W} height={H}>
        <defs>
          <radialGradient id="acousticWave" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.4} />
            <stop offset="50%" stopColor={C.amber} stopOpacity={0.12} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Concentric spherical soundwaves of the overheard conversation */}
        {[soundRadius, soundRadius * 0.78, soundRadius * 0.56, soundRadius * 0.35].map((r, i) => (
          <circle
            key={i}
            cx={80}
            cy={540}
            r={r}
            fill="none"
            stroke={C.amber}
            strokeWidth={3 - i * 0.5}
            strokeOpacity={soundOp * (0.8 - i * 0.15)}
            strokeDasharray={i % 2 === 0 ? "8 6" : "4 4"}
          />
        ))}

        {/* High-speed transmission circuit line connecting Silver to Woodland */}
        {wireProg > 0 && (
          <g>
            <line
              x1={620}
              y1={540}
              x2={lerp(620, 1300, wireProg)}
              y2={540}
              stroke={C.sand}
              strokeWidth={4}
              strokeDasharray="10 8"
              strokeOpacity={0.9}
            />
            {/* Pulsing signal packet traveling between them */}
            <circle
              cx={lerp(620, 1300, (wireProg * 3) % 1)}
              cy={540}
              r={7}
              fill={C.amber}
              filter="drop-shadow(0 0 10px #f5b84a)"
            />
          </g>
        )}
      </svg>

      {/* NODE 1: BERNARD SILVER (The Eavesdropper) */}
      <div
        style={abs({
          left: 420 - 190,
          top: 540 - 250,
          width: 380,
          height: 500,
          opacity: silverIn,
          transform: `scale(${0.8 + 0.2 * silverIn})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 16,
            background: 'linear-gradient(165deg,#1c2132 0%,#10131c 100%)',
            border: '2px solid rgba(245,184,74,0.4)',
            boxShadow: '0 34px 70px rgba(0,0,0,0.75), inset 1.5px 1.5px 0 rgba(255,255,255,0.1)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Portrait Seal with Acoustic Sensor Ring */}
          <div
            style={{
              width: 144,
              height: 144,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%,#2c354e,#131622)',
              border: '2.5px solid rgba(242,239,230,0.35)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{fontFamily: F.mono, fontSize: 34, fontWeight: 700, color: C.bone}}>BS</div>
            {/* Acoustic ear listening reticle */}
            <div style={abs({inset: -12, borderRadius: '50%', border: '2px dashed rgba(245,184,74,0.7)'})} />
            <div style={abs({right: -6, top: 10, padding: '3px 8px', background: C.amber, borderRadius: 10, fontFamily: F.mono, fontSize: 9, fontWeight: 700, color: C.ink})}>
              HEARS IT
            </div>
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 30, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            Bernard Silver
          </div>
          <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.3em', color: C.sand, marginTop: 6}}>
            GRADUATE STUDENT • DREXEL
          </div>
          <div style={{width: 80, height: 2, background: C.bone, opacity: 0.2, margin: '18px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.85, textAlign: 'center', lineHeight: 1.45}}>
            Standing close enough in the hallway to overhear the food chain president's problem.
          </div>
        </div>
      </div>

      {/* NODE 2: NORMAN JOSEPH WOODLAND (The Obsessive Catalyst) */}
      <div
        style={abs({
          left: 1420 - 190,
          top: 540 - 250,
          width: 380,
          height: 500,
          opacity: woodIn,
          transform: `scale(${0.8 + 0.2 * woodIn})`,
        })}
      >
        <div
          style={abs({
            inset: 0,
            borderRadius: 16,
            background: 'linear-gradient(165deg,#1c2132 0%,#10131c 100%)',
            border: `2px solid rgba(${obsess > 0 ? '255,77,61' : '91,141,239'}, ${obsess > 0 ? 0.85 : 0.4})`,
            boxShadow: `0 34px 70px rgba(0,0,0,0.75), 0 0 ${80 * obsess}px rgba(255,77,61,${0.5 * obsess})`,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          {/* Portrait Seal with Obsessive Orbiting Spirals */}
          <div
            style={{
              width: 144,
              height: 144,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%,#2c354e,#131622)',
              border: `2.5px solid ${obsess > 0 ? C.red : C.bone}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{fontFamily: F.mono, fontSize: 34, fontWeight: 700, color: C.bone}}>NJW</div>

            {/* Obsessive spinning mathematical rings when Woodland "can't let it go" */}
            {obsess > 0 && (
              <svg style={abs({inset: -40, width: 224, height: 224, transform: `rotate(${rotLoop}deg)`})}>
                <circle cx={112} cy={112} r={88} fill="none" stroke={C.red} strokeWidth={2.5} strokeDasharray="14 10" strokeOpacity={0.9} />
                <circle cx={112} cy={112} r={102} fill="none" stroke={C.amber} strokeWidth={1.5} strokeDasharray="4 16" strokeOpacity={0.7} />
                <circle cx={112} cy={112} r={74} fill="none" stroke={C.blue} strokeWidth={1} strokeDasharray="8 8" strokeOpacity={0.5} />
              </svg>
            )}

            {obsess > 0 && (
              <div style={abs({right: -10, top: 8, padding: '4px 10px', background: C.red, borderRadius: 10, fontFamily: F.mono, fontSize: 10, fontWeight: 700, color: C.bone, boxShadow: `0 0 16px ${C.red}`})}>
                OBSESSED
              </div>
            )}
          </div>

          <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 30, color: C.bone, marginTop: 24, textAlign: 'center'}}>
            N. Joseph Woodland
          </div>
          <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '0.3em', color: obsess > 0 ? C.red : C.blue, marginTop: 6}}>
            {obsess > 0 ? 'CANNOT LET IT GO' : 'TEACHER & INVENTOR'}
          </div>
          <div style={{width: 80, height: 2, background: C.bone, opacity: 0.2, margin: '18px 0'}} />
          <div style={{fontFamily: F.sans, fontSize: 15, color: C.bone, opacity: 0.85, textAlign: 'center', lineHeight: 1.45}}>
            {obsess > 0 ? (
              <span style={{color: C.amber, fontWeight: 600}}>
                Fixated on the impossible. The spark that begins the 25-year invention.
              </span>
            ) : (
              'Silver tells his friend. Woodland takes the problem personally.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SCENE 6: 21.5 – 27.5  ULTRAVIOLET EXPERIMENT & THE FAILURE
   Hanovia quartz mercury UV lamp ignites with eerie 365nm purple glow.
   Fluorescent ink luminesces on cardboard.
   Under blistering thermal heat, ink melts, smears, and bleeds into illegibility.
   Lamp pops, flickers, and cuts to pitch blackness ("It doesn't work.").
   ========================================================================= */
const UltravioletLab: React.FC<{t: number}> = ({t}) => {
  if (t < 21.4) return null;
  const a = prog(t, 21.5, 22.3);

  // 365nm UV Lamp ignition
  const lampOn = prog(t, 22.2, 23.5);
  const uvHum = 0.94 + 0.06 * Math.sin(t * 32);

  // Thermal heat bleed & smudge (t 25.6 - 27.1)
  const bleed = prog(t, 25.6, 27.1);
  const blurPx = lerp(0, 32, bleed);
  const smearScaleX = lerp(1.0, 1.35, bleed);

  // Lamp burnout & power cut (t 26.68 - 27.45)
  const burnout = prog(t, 26.68, 27.4);
  const flicker = burnout > 0 ? (Math.sin(t * 42) > 0 ? 0.2 : 0.85) * (1 - burnout) : 1;

  return (
    <div
      style={{
        ...fill,
        opacity: a * flicker,
        background: `radial-gradient(ellipse at 50% 45%, rgba(147,51,234,${0.38 * lampOn * uvHum}) 0%, rgba(88,28,135,${0.18 * lampOn}) 45%, ${C.ink} 80%)`,
      }}
    >
      {/* 365nm UV Blacklight Overhead Beam Cones */}
      <div
        style={abs({
          left: 960 - 520,
          top: 0,
          width: 1040,
          height: 680,
          background: 'linear-gradient(180deg, rgba(192,132,252,0.45) 0%, rgba(147,51,234,0.15) 55%, rgba(0,0,0,0) 100%)',
          clipPath: 'polygon(32% 0%, 68% 0%, 100% 100%, 0% 100%)',
          opacity: lampOn * uvHum,
          pointerEvents: 'none',
        })}
      />

      {/* Lab Desk: Test Package Under Ultraviolet Lamp */}
      <div
        style={abs({
          left: 960 - 320,
          top: 540 - 180,
          width: 640,
          height: 420,
          borderRadius: 14,
          background: 'linear-gradient(160deg,#171322 0%,#0c0a12 100%)',
          border: '2px solid rgba(192,132,252,0.4)',
          boxShadow: `0 40px 90px rgba(0,0,0,0.85), 0 0 ${160 * lampOn}px rgba(168,85,247,${0.45 * lampOn * uvHum})`,
          padding: 40,
          overflow: 'hidden',
          position: 'relative',
        })}
      >
        {/* Lab specimen dossier header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontFamily: F.mono, fontSize: 14, letterSpacing: '0.35em', color: '#c084fc', fontWeight: 700}}>
              WOODLAND & SILVER • LAB SPECIMEN 01
            </div>
            <div style={{fontFamily: F.mono, fontSize: 11, color: C.sand, opacity: 0.7, marginTop: 3}}>
              HANOVIA 365nm MERCURY VAPOR BURNER
            </div>
          </div>
          <div style={{padding: '4px 12px', background: 'rgba(168,85,247,0.25)', border: '1px solid #c084fc', borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: '#e9d5ff'}}>
            UV-A ACTIVATED
          </div>
        </div>

        {/* Glowing Fluorescent Ink Patterns */}
        <div
          style={{
            marginTop: 48,
            filter: `blur(${blurPx}px)`,
            transform: `scaleX(${smearScaleX})`,
            transformOrigin: '50% 50%',
          }}
        >
          <svg width={560} height={140} viewBox="0 0 560 140" style={{display: 'block'}}>
            {Array.from({length: 32}).map((_, i) => {
              const x = 20 + i * 16.5;
              const w = i % 5 === 0 ? 10 : i % 2 === 0 ? 6 : 3;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={15}
                    width={w + bleed * 10}
                    height={110}
                    fill="#c084fc"
                    fillOpacity={0.95}
                    style={{
                      filter: `drop-shadow(0 0 ${16 + bleed * 12}px #a855f7) drop-shadow(0 0 ${30 * lampOn}px #7e22ce)`,
                    }}
                  />
                  {/* Fluorescent speckle noise along edges */}
                  {bleed > 0.3 && (
                    <circle cx={x + (rnd(i * 9) - 0.5) * 20} cy={60 + (rnd(i * 13) - 0.5) * 60} r={rnd(i) * 5} fill="#e9d5ff" opacity={0.6} />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Thermal Failure Callout Stamp */}
        {bleed > 0.15 && (
          <div
            style={abs({
              left: 40,
              bottom: 30,
              right: 40,
              padding: '12px 20px',
              background: 'rgba(255,77,61,0.28)',
              border: `2px solid ${C.red}`,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: F.mono,
              fontSize: 13,
              color: C.bone,
              opacity: prog(t, 25.8, 26.5),
              boxShadow: '0 0 30px rgba(255,77,61,0.4)',
            })}
          >
            <span style={{color: C.red, fontWeight: 700, letterSpacing: '0.2em'}}>
              CRITICAL FAILURE : THERMAL SMUDGE
            </span>
            <span style={{color: C.sand}}>INK BLEEDS UNDER INCANDESCENT HEAT</span>
          </div>
        )}
      </div>

      {/* Editorial title: "THE FIRST EXPERIMENT" */}
      <div style={abs({left: 0, width: W, top: 140, textAlign: 'center', opacity: lampOn})}>
        <div style={{fontFamily: F.mono, fontSize: 16, letterSpacing: '0.5em', color: '#c084fc', textTransform: 'uppercase'}}>
          Initial Prototype
        </div>
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 68, color: C.bone, marginTop: 8, textShadow: '0 8px 30px rgba(0,0,0,0.8)'}}>
          Glowing Ultraviolet Ink
        </div>
      </div>

      {/* Harsh Reality: "It doesn't work." */}
      {t > 26.65 && (
        <div
          style={abs({
            left: 0,
            width: W,
            top: 540 - 65,
            textAlign: 'center',
            fontFamily: F.serif,
            fontWeight: 700,
            fontSize: 110,
            color: C.red,
            letterSpacing: '0.02em',
            textShadow: '0 15px 50px rgba(0,0,0,0.95), 0 0 30px rgba(255,77,61,0.6)',
            transform: `scale(${lerp(1.2, 1.0, eb(t, 26.68, 27.1))})`,
          })}
        >
          It doesn't work.
        </div>
      )}
    </div>
  );
};

/* ================================== ROOT COMPOSITION ================================== */
export const Segment03: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${C.ink2} 0%, ${C.ink} 72%)`}}>
      <Audio src={staticFile('audio/seg03.wav')} />
      <Shelves t={t} />
      <DeanCorridor t={t} />
      <TheQuestion t={t} />
      <TheDeanSaysNo t={t} />
      <SilverAndWoodland t={t} />
      <UltravioletLab t={t} />
      <Overlays frame={frame} />
      <Subs t={t} sentences={sentences} words={WORDS} />
    </AbsoluteFill>
  );
};
