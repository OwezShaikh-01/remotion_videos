import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame} from 'remotion';
import {C, F, W, H, FPS, prog, eo, eio, ein, eb, lerp, win, rnd, Barcode, makeDigits, HERO, sentences, WORDS} from './lib';
import {loadFonts} from './fonts';

loadFonts();

const fill: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: W, height: H};

/* =============================== 0.0 – 2.4  OPEN =============================== */
const Open: React.FC<{t: number}> = ({t}) => {
  if (t > 2.5) return null;
  const grow = eo(t, 0.2, 1.25);
  const shrink = eio(t, 1.85, 2.4);
  const h = grow * lerp(420, 14, shrink);
  const w = lerp(3, 14, shrink);
  const out = 1 - prog(t, 1.65, 2.1);
  return (
    <div style={fill}>
      <div style={{position: 'absolute', left: 960 - 80, top: 540 - h / 2 - 30, width: 160, height: h + 60, background: 'radial-gradient(ellipse at center, rgba(242,239,230,0.17), rgba(242,239,230,0) 70%)', opacity: grow}} />
      <div style={{position: 'absolute', left: 960 - w / 2, top: 540 - h / 2, width: w, height: h, borderRadius: w / 2, background: C.bone}} />
      <div style={{position: 'absolute', left: 0, top: 730, width: W, display: 'flex', justifyContent: 'center', gap: 34, opacity: out}}>
        {WORDS.s1.map((wd, i) => {
          const p = eo(t, wd.t0 - 0.05, wd.t0 + 0.45);
          return (
            <span key={i} style={{fontFamily: F.serif, fontWeight: 300, fontSize: 118, color: C.bone, letterSpacing: '0.01em', opacity: p, transform: `translateY(${(1 - p) * 22}px)`}}>
              {wd.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ============================ 1.9 – 8.5  DESK / REACH ============================ */
type Obj = {x: number; y: number; w: number; h: number; rot: number; r: number; bg: string; at: number; lx: number; ly: number; lw: number; lh: number; digits: string; decor: React.ReactNode};
const abs = (s: React.CSSProperties): React.CSSProperties => ({position: 'absolute', ...s});
const OBJS: Obj[] = [
  {
    x: 720, y: 440, w: 230, h: 320, rot: -10, r: 10, bg: 'linear-gradient(160deg,#2f5694,#1a2f58)', at: 2.55, lx: 104, ly: 232, lw: 112, lh: 72, digits: HERO,
    decor: (
      <>
        <div style={abs({left: 0, top: 0, right: 0, height: 96, background: 'linear-gradient(180deg,rgba(242,239,230,.14),rgba(242,239,230,0))'})} />
        <div style={abs({left: 18, top: 24, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 56, color: C.bone})}>Oats</div>
        <div style={abs({left: 20, top: 96, width: 92, height: 3, background: C.sand, opacity: 0.8})} />
        <div style={abs({left: 50, top: 122, width: 124, height: 92, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#e8d6a8,#b99a5a)', boxShadow: '0 6px 18px rgba(0,0,0,.35)'})} />
      </>
    ),
  },
  {
    x: 1190, y: 400, w: 210, h: 310, rot: 7, r: 6, bg: 'linear-gradient(150deg,#6a2a38,#3a1621)', at: 2.8, lx: 49, ly: 222, lw: 112, lh: 72, digits: makeDigits(11),
    decor: (
      <>
        <div style={abs({left: 0, top: 0, bottom: 0, width: 12, background: 'rgba(0,0,0,.32)', borderRadius: '6px 0 0 6px'})} />
        <div style={abs({left: 34, top: 40, width: 140, height: 4, background: C.bone, opacity: 0.85})} />
        <div style={abs({left: 34, top: 56, width: 96, height: 4, background: C.bone, opacity: 0.55})} />
        <div style={abs({left: 34, top: 92, width: 70, height: 3, background: C.sand, opacity: 0.8})} />
        <div style={abs({left: 34, top: 112, width: 140, height: 3, background: C.bone, opacity: 0.22})} />
        <div style={abs({left: 34, top: 124, width: 120, height: 3, background: C.bone, opacity: 0.22})} />
        <div style={abs({left: 34, top: 136, width: 132, height: 3, background: C.bone, opacity: 0.22})} />
      </>
    ),
  },
  {
    x: 940, y: 800, w: 360, h: 240, rot: -4, r: 6, bg: 'linear-gradient(150deg,#a88556,#80623a)', at: 3.05, lx: 20, ly: 20, lw: 170, lh: 104, digits: makeDigits(23),
    decor: (
      <>
        <div style={abs({left: 232, top: 0, bottom: 0, width: 46, background: 'rgba(222,198,150,.5)'})} />
        <div style={abs({left: 20, top: 150, width: 150, height: 5, background: 'rgba(30,20,8,.55)'})} />
        <div style={abs({left: 20, top: 168, width: 110, height: 5, background: 'rgba(30,20,8,.4)'})} />
        <div style={abs({left: 20, top: 186, width: 130, height: 5, background: 'rgba(30,20,8,.3)'})} />
      </>
    ),
  },
  {
    x: 1310, y: 722, w: 250, h: 310, rot: 12, r: 14, bg: 'linear-gradient(160deg,#1f7377,#0f3f45)', at: 3.3, lx: 69, ly: 222, lw: 112, lh: 66, digits: makeDigits(37),
    decor: (
      <>
        <div style={abs({left: 0, top: 0, right: 0, height: 36, background: 'repeating-linear-gradient(90deg,rgba(0,0,0,.24) 0 5px,rgba(255,255,255,.07) 5px 10px)', borderRadius: '14px 14px 0 0'})} />
        <div style={abs({left: 0, bottom: 0, right: 0, height: 36, background: 'repeating-linear-gradient(90deg,rgba(0,0,0,.24) 0 5px,rgba(255,255,255,.07) 5px 10px)', borderRadius: '0 0 14px 14px'})} />
        <div style={abs({left: 60, top: 66, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#f2efe6,#c9c3ad)'})} />
        <div style={abs({left: 0, right: 0, top: 108, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 40, color: '#0f3f45'})}>Crisps</div>
      </>
    ),
  },
  {
    x: 610, y: 690, w: 300, h: 130, rot: -18, r: 6, bg: '#e6e3da', at: 3.5, lx: 176, ly: 34, lw: 112, lh: 62, digits: makeDigits(41),
    decor: (
      <>
        <div style={abs({left: 0, top: 0, bottom: 0, width: 96, background: '#2f7d62', borderRadius: '6px 0 0 6px'})} />
        <div style={abs({left: 22, top: 40, width: 52, height: 52, borderRadius: '50%', border: '4px solid rgba(242,239,230,.9)'})} />
        <div style={abs({left: 112, top: 100, width: 60, height: 4, background: 'rgba(20,20,20,.5)'})} />
      </>
    ),
  },
  {
    x: 960, y: 330, w: 190, h: 140, rot: 5, r: 8, bg: 'linear-gradient(150deg,#4a3b78,#2c2250)', at: 3.7, lx: 40, ly: 66, lw: 112, lh: 60, digits: makeDigits(53),
    decor: (
      <>
        <div style={abs({left: 16, top: 16, width: 90, height: 4, background: C.bone, opacity: 0.8})} />
        <div style={abs({left: 16, top: 30, width: 60, height: 3, background: C.bone, opacity: 0.4})} />
      </>
    ),
  },
];

const Desk: React.FC<{t: number}> = ({t}) => {
  if (t < 1.9 || t > 8.6) return null;
  const a = win(t, 1.9, 8.6, 0.2, 0.8);
  const ringP = eio(t, 2.15, 3.9);
  const dim = eo(t, 4.4, 5.2);
  const sc = lerp(1.0, 1.07, prog(t, 2, 7.6)) * lerp(1, 0.8, ein(t, 7.6, 8.6));
  const rot = lerp(-1.6, 1.4, prog(t, 2, 8));
  const R = 470;
  const circ = 2 * Math.PI * R;
  const cnt = t < 6.72 ? 0 : Math.min(6, 1 + Math.floor((t - 6.72) / 0.13));
  const hud = prog(t, 6.6, 6.95) * (1 - prog(t, 7.9, 8.4));
  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, transform: `scale(${sc}) rotate(${rot}deg)`, transformOrigin: '50% 50%'}}>
        <svg style={fill} width={W} height={H}>
          <circle cx={960} cy={540} r={R} fill="none" stroke={C.bone} strokeOpacity={0.5} strokeWidth={2} strokeDasharray={`${circ * ringP} ${circ}`} transform="rotate(-90 960 540)" />
          <circle cx={960} cy={540} r={R + 14} fill="none" stroke={C.bone} strokeOpacity={0.2 * ringP} strokeWidth={2} strokeDasharray="2 12" />
        </svg>
        {OBJS.map((o, i) => {
          const p = prog(t, o.at, o.at + 0.3);
          const pb = eb(t, o.at, o.at + 0.7);
          const rp = prog(t, 6.72 + i * 0.13, 6.72 + i * 0.13 + 0.6);
          return (
            <div key={i} style={{position: 'absolute', left: o.x - o.w / 2, top: o.y - o.h / 2, width: o.w, height: o.h, opacity: p, transform: `translateY(${(1 - pb) * 36}px) rotate(${o.rot}deg) scale(${0.7 + 0.3 * pb})`}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: o.r, background: o.bg, boxShadow: '0 34px 60px rgba(0,0,0,.55), 0 4px 10px rgba(0,0,0,.4), inset 1.5px 1.5px 0 rgba(255,255,255,.16)', filter: `brightness(${1 - 0.62 * dim})`}}>{o.decor}</div>
              <div style={{position: 'absolute', left: o.lx, top: o.ly, width: o.lw, height: o.lh, boxShadow: `0 0 ${46 * dim}px rgba(242,239,230,${0.42 * dim})`, borderRadius: 3}}>
                <Barcode id={`d${i}`} digits={o.digits} w={o.lw} h={o.lh} bg="#f4f1e8" radius={3} />
              </div>
              {rp > 0 && rp < 1 ? (
                <div style={{position: 'absolute', left: o.lx - 6, top: o.ly - 6, width: o.lw + 12, height: o.lh + 12, border: `2px solid ${C.bone}`, borderRadius: 8, opacity: (1 - rp) * 0.9, transform: `scale(${1 + 0.55 * eo(t, 6.72 + i * 0.13, 6.72 + i * 0.13 + 0.6)})`}} />
              ) : null}
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 960 - 7, top: 540 - 7, width: 14, height: 14, borderRadius: 7, background: C.bone}} />
        <div style={{position: 'absolute', left: 960 - 60, top: 566, width: 120, textAlign: 'center', fontFamily: F.mono, fontSize: 14, letterSpacing: '0.4em', color: C.bone, opacity: 0.65 * prog(t, 2.3, 2.9)}}>YOU</div>
      </div>
      <div style={{position: 'absolute', left: 1500, top: 470, opacity: hud, fontFamily: F.mono, color: C.bone}}>
        <div style={{fontSize: 17, letterSpacing: '0.3em', opacity: 0.6, lineHeight: 1.7}}>BARCODES<br />WITHIN REACH</div>
        <div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.05}}>{String(cnt).padStart(2, '0')}</div>
      </div>
    </div>
  );
};

/* ========================== 7.9 – 11.9  THE WALL / 10,000 ========================== */
const WALL = Array.from({length: 40}, (_, i) => makeDigits(100 + i));
const Wall: React.FC<{t: number}> = ({t}) => {
  if (t < 7.8 || t > 12.0) return null;
  const a = win(t, 7.9, 11.9, 0.6, 1.0);
  const xs = lerp(-300, 2300, prog(t, 8.3, 10.2));
  const sc = lerp(1.0, 1.1, prog(t, 7.9, 11.9));
  const n = Math.round(10000 * (1 - Math.pow(1 - prog(t, 8.5, 10.4), 3)));
  const label = n.toLocaleString('en-US');
  const cOut = 1 - prog(t, 10.75, 11.3);
  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, transform: `scale(${sc})`, transformOrigin: '50% 50%'}}>
        {WALL.map((d, i) => {
          const c = i % 8, r = Math.floor(i / 8);
          const cx = c * 240 + 120, cy = r * 216 + 108;
          const sweep = Math.exp(-Math.pow((cx - xs) / 260, 2));
          const fl = rnd(i * 13.37 + Math.floor(t * 10) * 3.1) > 0.86 ? 1 : 0;
          const b = Math.min(1, 0.13 + 0.6 * sweep + fl * 0.28);
          return (
            <div key={i} style={{position: 'absolute', left: cx - 106, top: cy - 50, opacity: b}}>
              <Barcode id={`w${i}`} digits={d} w={212} h={100} fg={C.bone} />
            </div>
          );
        })}
      </div>
      <div style={{...fill, background: 'radial-gradient(ellipse 760px 380px at 960px 520px, rgba(11,13,18,0.9), rgba(11,13,18,0) 100%)', opacity: cOut * prog(t, 8.3, 8.8)}} />
      <div style={{...fill, opacity: cOut}}>
        <div style={{position: 'absolute', left: 0, width: W, top: 400, textAlign: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 230, color: C.bone, letterSpacing: '-0.03em', opacity: prog(t, 8.45, 8.8)}}>{label}</div>
        <div style={{position: 'absolute', left: 0, width: W, top: 660, textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 28, letterSpacing: '0.6em', color: C.bone, opacity: 0.7 * prog(t, 9.9, 10.4)}}>TIMES</div>
      </div>
    </div>
  );
};

/* ======================= 10.9 – 14.3  RACK FOCUS: "never looked" ======================= */
const Focus: React.FC<{t: number}> = ({t}) => {
  if (t < 10.9 || t > 14.4) return null;
  const a = prog(t, 10.9, 11.6) * (1 - prog(t, 13.3, 14.1));
  const blur = 20 * (1 - eo(t, 11.25, 12.55));
  const sc = lerp(0.93, 1.24, eio(t, 10.9, 14.2));
  return (
    <div style={{...fill, opacity: a}}>
      <div style={{position: 'absolute', left: 960 - 500, top: 520 - 250, width: 1000, height: 500, transform: `scale(${sc})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, boxShadow: '0 0 140px rgba(242,239,230,0.16)', borderRadius: 18}}>
        <Barcode id="hero" digits={HERO} w={1000} h={500} bg={C.bone} radius={18} digitsText />
      </div>
    </div>
  );
};

/* ============================ 13.2 – 24.7  SAND & TIDE ============================ */
const GR: [number, number][] = [[560, 14], [636, 14], [712, 40], [792, 14], [872, 52], [958, 14], [1034, 32], [1110, 14], [1186, 14], [1264, 46], [1348, 16], [1420, 32]];
const NP = 16;
const groovePts = (i: number) => {
  const [x, w] = GR[i];
  const y0 = 400 + rnd(i * 3.3) * 14;
  const y1 = 790 + rnd(i * 5.1) * 18;
  return Array.from({length: NP}, (_, k) => {
    const f = k / (NP - 1);
    return [x + Math.sin(k * 0.8 + i * 1.7) * 3.5 + (rnd(i * 9 + k) - 0.5) * 3.5, lerp(y0, y1, f)] as [number, number];
  });
};
const GP = GR.map((_, i) => groovePts(i));
const tideEdge = (y0: number, t: number) =>
  Array.from({length: 124}, (_, i) => {
    const x = -300 + i * 18;
    return [x, y0 + 26 * Math.sin(x * 0.011 + t * 1.8) + 14 * Math.sin(x * 0.027 - t * 2.3) + 10 * Math.sin(x * 0.005 + 1.2)] as [number, number];
  });

const Sand: React.FC<{t: number}> = ({t}) => {
  if (t < 13.2 || t > 24.8) return null;
  const a = prog(t, 13.3, 14.1) * (1 - prog(t, 24.0, 24.7));
  const sc = lerp(1.2, 1.0, eio(t, 13.3, 17.4));
  const y0 = lerp(-140, 1280, eio(t, 20.25, 23.55));
  const tide = t > 20.2 ? tideEdge(y0, t) : null;
  const clipD = tide ? `M-300 -600 L2300 -600 ${[...tide].reverse().map(([x, y]) => `L${x} ${y}`).join(' ')} Z` : '';
  const foam = tide ? tide.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ') : '';
  const dusk = 0.55 * eio(t, 20.3, 23.6);
  const yr = Math.round(1949 + 25 * eio(t, 20.45, 23.45));
  const tl = win(t, 20.3, 24.0, 0.4, 0.5);
  const mx = 360 + 1200 * eio(t, 20.45, 23.45);
  const eng = eo(t, 17.9, 18.7);
  return (
    <div style={{...fill, opacity: a, overflow: 'hidden', background: '#a88958'}}>
      <div style={{...fill, transform: `scale(${sc})`, transformOrigin: '50% 50%'}}>
        <Img src={staticFile('img/sand.jpg')} style={{position: 'absolute', left: -240, top: -160, width: 2400, height: 1400}} />
        {/* engraved year */}
        <div style={{position: 'absolute', left: 0, width: W, top: 118, textAlign: 'center', fontFamily: F.serif, fontWeight: 600, fontSize: 190, letterSpacing: '0.04em', color: 'rgba(92,64,28,0.55)', textShadow: '0 3px 1px rgba(255,238,200,0.55), 0 -2px 2px rgba(34,20,6,0.55)', opacity: eng, transform: `scale(${lerp(1.05, 1, eng)})`}}>1949</div>
        {/* grooves */}
        <svg style={fill} width={W} height={H}>
          {GR.map(([x, w], i) => {
            const st = 14.6 + i * 0.29;
            const p = prog(t, st, st + 0.3);
            if (p <= 0) return null;
            const pts = GP[i];
            const d = pts.map(([px, py], k) => `${k ? 'L' : 'M'}${px} ${py}`).join(' ');
            const dsh = `${p} 2`;
            return (
              <g key={i}>
                <path d={d} pathLength={1} strokeDasharray={dsh} fill="none" stroke="rgba(58,40,18,0.58)" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
                <path d={d} pathLength={1} strokeDasharray={dsh} fill="none" stroke="rgba(28,16,4,0.5)" strokeWidth={Math.max(2, w * 0.22)} strokeLinecap="round" transform={`translate(${-w * 0.3} 0)`} />
                <path d={d} pathLength={1} strokeDasharray={dsh} fill="none" stroke="rgba(255,238,200,0.6)" strokeWidth={Math.max(2, w * 0.18)} strokeLinecap="round" transform={`translate(${w * 0.42} 0)`} />
              </g>
            );
          })}
        </svg>
        {/* finger tip */}
        {GR.map((g, i) => {
          const st = 14.6 + i * 0.29;
          const p = prog(t, st, st + 0.3);
          if (p <= 0 || p >= 1) return null;
          const pts = GP[i];
          const f = p * (NP - 1);
          const k = Math.min(NP - 2, Math.floor(f));
          const px = lerp(pts[k][0], pts[k + 1][0], f - k);
          const py = lerp(pts[k][1], pts[k + 1][1], f - k);
          return (
            <div key={i} style={{position: 'absolute', left: px - 36, top: py - 36, width: 72, height: 72, borderRadius: 36, background: 'radial-gradient(circle, rgba(40,26,10,0.45) 0%, rgba(40,26,10,0.18) 45%, rgba(40,26,10,0) 70%)', border: '2px solid rgba(255,238,200,0.35)'}} />
          );
        })}
        {/* tide: wet sand wipes everything clean */}
        {tide ? (
          <>
            <div style={{...fill, clipPath: `path('${clipD}')`}}>
              <Img src={staticFile('img/sandwet.jpg')} style={{position: 'absolute', left: -240, top: -160, width: 2400, height: 1400}} />
            </div>
            <svg style={fill} width={W} height={H}>
              <path d={foam} fill="none" stroke="rgba(242,239,230,0.3)" strokeWidth={26} strokeLinejoin="round" />
              <path d={foam} fill="none" stroke="rgba(242,239,230,0.9)" strokeWidth={5} strokeLinejoin="round" />
            </svg>
          </>
        ) : null}
      </div>
      <div style={{...fill, background: C.ink, opacity: dusk}} />
      {/* 25 years */}
      <div style={{...fill, opacity: tl}}>
        <div style={{...fill, background: 'radial-gradient(ellipse 760px 280px at 960px 470px, rgba(11,13,18,0.6), rgba(11,13,18,0) 100%)'}} />
        <div style={{position: 'absolute', left: 0, width: W, top: 330, textAlign: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 230, letterSpacing: '-0.03em', color: C.bone, textShadow: '0 6px 40px rgba(0,0,0,.45)'}}>{yr}</div>
        <svg style={fill} width={W} height={H}>
          <line x1={360} x2={1560} y1={800} y2={800} stroke={C.bone} strokeOpacity={0.35} strokeWidth={2} />
          <line x1={360} x2={mx} y1={800} y2={800} stroke={C.bone} strokeOpacity={0.95} strokeWidth={3} />
          {Array.from({length: 26}, (_, i) => (
            <line key={i} x1={360 + i * 48} x2={360 + i * 48} y1={800 - (i % 5 === 0 ? 14 : 8)} y2={800 + (i % 5 === 0 ? 14 : 8)} stroke={C.bone} strokeOpacity={360 + i * 48 <= mx ? 0.95 : 0.35} strokeWidth={2} />
          ))}
          <circle cx={mx} cy={800} r={8} fill={C.bone} />
        </svg>
        <div style={{position: 'absolute', left: 300, top: 830, width: 120, textAlign: 'center', fontFamily: F.mono, fontSize: 22, color: C.bone, opacity: 0.7}}>1949</div>
        <div style={{position: 'absolute', left: 1500, top: 830, width: 120, textAlign: 'center', fontFamily: F.mono, fontSize: 22, color: C.bone, opacity: 0.7}}>1974</div>
      </div>
    </div>
  );
};

/* ============================ 24.0 – 29.3  THE PAPER ============================ */
const Paper: React.FC<{t: number}> = ({t}) => {
  if (t < 24.0 || t > 29.4) return null;
  const a = prog(t, 24.0, 24.7) * (1 - prog(t, 28.7, 29.3));
  const sIn = eo(t, 24.4, 25.5);
  const sOut = ein(t, 27.87, 28.75);
  const px = 640 - sOut * 560;
  const py = 520 + (1 - sIn) * 240;
  const rot = -3 + (1 - sIn) * 7 - sOut * 6;
  const rights = WORDS.s8[4].t0;
  const amt = WORDS.s8[6].t0;
  const stP = prog(t, rights, rights + 0.22);
  const stS = lerp(2.4, 1, eo(t, rights, rights + 0.2));
  const n = Math.round(15000 * (1 - Math.pow(1 - prog(t, amt, amt + 0.95), 3)));
  const aOut = 1 - prog(t, 27.9, 28.5);
  const figX = [0, 20, 50, 70, 112, 134, 186, 206];
  return (
    <div style={{...fill, opacity: a, background: `radial-gradient(ellipse 900px 800px at 640px 520px, #1b1f2b 0%, ${C.ink} 75%)`}}>
      <div style={{position: 'absolute', left: px - 300, top: py - 390, width: 600, height: 780, transform: `rotate(${rot}deg)`, background: 'linear-gradient(160deg,#efe9d6,#dcd3ba)', borderRadius: 4, boxShadow: '0 50px 90px rgba(0,0,0,.6), 0 6px 14px rgba(0,0,0,.4)', opacity: prog(t, 24.4, 24.9)}}>
        <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', fontFamily: F.serif, fontWeight: 600, fontSize: 17, letterSpacing: '0.2em', color: '#3a372e'}}>UNITED STATES PATENT OFFICE</div>
        <div style={{position: 'absolute', top: 76, left: 60, right: 60, height: 2, background: 'rgba(40,38,30,.5)'}} />
        <div style={{position: 'absolute', top: 100, left: 60, right: 60, textAlign: 'center', fontFamily: F.serif, fontWeight: 600, fontSize: 30, lineHeight: 1.2, color: '#26241d'}}>CLASSIFYING APPARATUS<br />AND METHOD</div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} style={{position: 'absolute', left: 60, top: 220 + i * 22, width: 480 - rnd(i * 4.1) * 120, height: 8, borderRadius: 4, background: 'rgba(40,38,30,.2)'}} />
        ))}
        <div style={{position: 'absolute', left: 60, top: 440, width: 480, height: 270, border: '2px solid rgba(40,38,30,.4)'}}>
          <svg width={480} height={270}>
            <g transform="translate(40 52)">
              {figX.map((x, i) => (
                <rect key={i} x={x} y={0} width={i % 3 === 0 ? 14 : 6} height={130} fill="#26241d" />
              ))}
            </g>
            <g transform="translate(350 118)" fill="none" stroke="#26241d" strokeWidth={5}>
              <circle r={14} fill="#26241d" />
              <circle r={36} />
              <circle r={58} />
              <circle r={80} />
            </g>
            <text x={40} y={34} fontFamily={F.mono} fontSize={15} fill="#26241d">FIG. 1</text>
            <text x={318} y={34} fontFamily={F.mono} fontSize={15} fill="#26241d">FIG. 2</text>
          </svg>
        </div>
      </div>
      <div style={{position: 'absolute', left: 735, top: 262, opacity: stP * aOut, transform: `rotate(-9deg) scale(${stS})`, border: `8px solid ${C.red}`, color: C.red, borderRadius: 10, padding: '4px 34px', fontFamily: F.sans, fontWeight: 600, fontSize: 96, letterSpacing: '0.18em'}}>SOLD</div>
      <div style={{position: 'absolute', left: 1000, top: 330, width: 800, textAlign: 'center', opacity: prog(t, amt, amt + 0.15) * aOut}}>
        <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 200, color: C.bone, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums'}}>{'$' + n.toLocaleString('en-US')}</div>
        <div style={{margin: '8px auto 0', width: 560 * eo(t, amt + 0.6, amt + 1.3), height: 2, background: C.sand}} />
        <div style={{marginTop: 20, fontFamily: F.mono, fontSize: 22, letterSpacing: '0.4em', color: C.sand, opacity: prog(t, amt + 1.0, amt + 1.5)}}>FOR THE PATENT</div>
      </div>
    </div>
  );
};

/* ============================ 28.9 – 32.0  TWO LIGHTS ============================ */
const Dots: React.FC<{t: number}> = ({t}) => {
  if (t < 28.9) return null;
  const a = prog(t, 29.05, 29.8);
  const died = WORDS.s9[3].t0;
  const decay = eio(t, died, died + 1.15);
  const fl = 0.93 + 0.05 * Math.sin(t * 9) + 0.03 * Math.sin(t * 23 + 1);
  const morph = eio(t, 30.95, 31.9);
  const rx = lerp(1040, 960, morph);
  const rh = lerp(14, 420, morph);
  const rw = lerp(14, 3, morph);
  const rb = lerp(0.8, 1, decay) * fl;
  return (
    <div style={{...fill, opacity: a}}>
      {/* left light: goes out */}
      <div style={{position: 'absolute', left: 880 - 150, top: 540 - 150, width: 300, height: 300, background: `radial-gradient(circle, rgba(201,166,107,${0.5 * (1 - decay) * fl}) 0%, rgba(201,166,107,0) 68%)`}} />
      <div style={{position: 'absolute', left: 880 - 9 * (1 - decay), top: 540 - 9 * (1 - decay), width: 18 * (1 - decay), height: 18 * (1 - decay), borderRadius: 9, background: '#f0d9a6', opacity: 1 - decay}} />
      {/* right light: stays, becomes the line */}
      <div style={{position: 'absolute', left: rx - 150, top: 540 - 150 - rh / 2 + 7, width: 300, height: 300 + Math.max(0, rh - 14), background: `radial-gradient(ellipse, rgba(201,166,107,${0.45 * rb * (1 - morph)}) 0%, rgba(201,166,107,0) 68%)`}} />
      <div style={{position: 'absolute', left: rx - rw / 2, top: 540 - rh / 2, width: rw, height: rh, borderRadius: rw / 2, background: `linear-gradient(180deg, ${morph > 0.5 ? C.bone : '#f0d9a6'}, ${morph > 0.5 ? C.bone : '#f0d9a6'})`, opacity: rb}} />
      <div style={{position: 'absolute', left: 960 - 80, top: 540 - rh / 2 - 30, width: 160, height: rh + 60, background: 'radial-gradient(ellipse at center, rgba(242,239,230,0.17), rgba(242,239,230,0) 70%)', opacity: morph, transform: `translateX(${rx - 960}px)`}} />
    </div>
  );
};

/* ================================ SUBTITLES ================================ */
const Subs: React.FC<{t: number}> = ({t}) => {
  const s = sentences.find((s) => t >= s.parts[0].s - 0.25 && t <= s.parts[s.parts.length - 1].e + 0.5);
  if (!s || s.id === 's1') return null;
  const ws = WORDS[s.id];
  const a0 = s.parts[0].s - 0.25;
  const a1 = s.parts[s.parts.length - 1].e + 0.5;
  const op = Math.min(prog(t, a0, a0 + 0.2), 1 - prog(t, a1 - 0.25, a1));
  return (
    <div style={{position: 'absolute', left: 0, bottom: 62, width: W, display: 'flex', justifyContent: 'center', opacity: op}}>
      <div style={{maxWidth: 1480, textAlign: 'center', padding: '12px 30px 14px', background: 'rgba(11,13,18,0.58)', borderRadius: 16, fontFamily: F.sans, fontWeight: 500, fontSize: 40, lineHeight: 1.3, color: C.bone}}>
        {ws.map((w, i) => (
          <span key={i} style={{opacity: 0.34 + 0.66 * prog(t, w.t0 - 0.05, w.t0 + 0.1)}}>
            {w.text}
            {i < ws.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================================== ROOT ================================== */
export const Segment01: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${C.ink2} 0%, ${C.ink} 72%)`}}>
      <Audio src={staticFile('audio/seg01.wav')} />
      <Open t={t} />
      <Desk t={t} />
      <Wall t={t} />
      <Focus t={t} />
      <Sand t={t} />
      <Paper t={t} />
      <Dots t={t} />
      <div style={{...fill, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)'}} />
      <div style={{...fill, backgroundImage: `url(${staticFile('img/grain.png')})`, backgroundSize: '512px 512px', backgroundPosition: `${-rnd(frame * 1.7) * 512}px ${-rnd(frame * 2.3 + 9) * 512}px`, opacity: 0.55}} />
      <Subs t={t} />
    </AbsoluteFill>
  );
};
