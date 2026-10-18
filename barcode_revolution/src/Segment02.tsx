import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {C, F, W, H, FPS, prog, eo, eio, ein, eb, lerp, win, rnd, Barcode, makeDigits, HERO, Sentence, Word} from './lib';
import {buildWordsX, digitCenters, Subs, Overlays} from './shared';
import {loadFonts} from './fonts';

loadFonts();

const fill: React.CSSProperties = {position: 'absolute', left: 0, top: 0, width: W, height: H};
const abs = (s: React.CSSProperties): React.CSSProperties => ({position: 'absolute', ...s});

/* Times are LOCAL to this segment (global time minus 32.0s). Intervals come from the voiceover's energy envelope. */
const sentences: Sentence[] = [
  {id: 'a1', parts: [{s: 0.0, e: 2.46, text: 'And the first product it ever scanned,'}, {s: 2.9, e: 3.82, text: 'supposedly,'}, {s: 4.62, e: 5.7, text: 'was a pack of gum.'}]},
  {id: 'a2', parts: [{s: 6.14, e: 9.78, text: "By the end of this video, you'll know why the winning design almost lost to a circle."}]},
  {id: 'a3', parts: [{s: 10.64, e: 11.76, text: "And you'll be able to check,"}, {s: 12.16, e: 12.82, text: 'in your head,'}, {s: 13.24, e: 14.5, text: 'whether a barcode is real.'}]},
  {id: 'a4', parts: [{s: 15.32, e: 15.92, text: 'But first,'}, {s: 16.56, e: 17.14, text: 'a question'}, {s: 17.24, e: 18.54, text: 'overheard in a hallway.'}]},
  {id: 'a5', parts: [{s: 19.5, e: 20.12, text: 'Philadelphia,'}, {s: 20.45, e: 21.45, text: '1948.'}]},
  {id: 'a6', parts: [{s: 22.16, e: 25.28, text: 'The president of a food chain walks into Drexel Institute of Technology'}, {s: 25.36, e: 26.42, text: 'with a problem.'}]},
  {id: 'a7', parts: [{s: 27.36, e: 27.76, text: 'Checkout'}, {s: 27.84, e: 28.36, text: 'is slow.'}]},
  {id: 'a8', parts: [{s: 29.26, e: 31.6, text: 'Cashiers key in every price by hand.'}]},
  {id: 'a9', parts: [{s: 32.16, e: 33.32, text: 'Mistakes are everywhere.'}]},
];
const WORDS: Record<string, Word[]> = Object.fromEntries(sentences.map((s) => [s.id, buildWordsX(s)]));

/* ===================== 0.0 – 6.3  THE BEAM & THE GUM ===================== */
const Gum: React.FC<{t: number}> = ({t}) => {
  if (t > 6.4) return null;
  const a = 1 - prog(t, 5.7, 6.3);
  const goL = eio(t, 0.45, 1.15);
  const goR = eio(t, 1.25, 2.65);
  const bx = t < 1.2 ? lerp(960, 120, goL) : lerp(120, 1860, goR);
  const red = prog(t, 0.35, 0.85);
  const bh = lerp(420, 1180, red);
  const beamOp = t < 2.65 ? 1 : 1 - prog(t, 2.65, 3.1);
  const clipR = t < 1.25 ? W : t > 2.7 ? 0 : Math.max(0, W - bx);
  const hit = Math.exp(-Math.pow((bx - 1115) / 70, 2)) * (t > 1.25 && t < 2.8 ? 1 : 0);
  const glow = prog(t, 4.5, 5.1);
  const sup = prog(t, 2.9, 3.25);
  return (
    <div style={{...fill, opacity: a}}>
      <div style={{...fill, clipPath: `inset(0 ${clipR}px 0 0)`}}>
        <div style={abs({left: 960 - 190, top: 540 - 280, width: 380, height: 560, transform: `rotate(-5deg) scale(${1 + 0.035 * glow})`})}>
          <div style={abs({inset: 0, borderRadius: 14, background: 'linear-gradient(165deg,#ffd878,#f5b84a 45%,#d98a17)', boxShadow: `0 40px 70px rgba(0,0,0,.55), 0 0 ${150 * glow}px rgba(245,184,74,${0.55 * glow}), inset 2px 2px 0 rgba(255,255,255,.3)`})} />
          <div style={abs({left: 0, top: 0, right: 0, height: 46, borderRadius: '14px 14px 0 0', background: 'repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 4px,rgba(255,255,255,.18) 4px 8px)'})} />
          <div style={abs({left: 0, bottom: 0, right: 0, height: 46, borderRadius: '0 0 14px 14px', background: 'repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 4px,rgba(255,255,255,.18) 4px 8px)'})} />
          <div style={abs({inset: 0, borderRadius: 14, overflow: 'hidden'})}>
            <div style={abs({left: -40, top: 150, width: 460, height: 38, background: 'rgba(255,255,255,.16)', transform: 'rotate(-14deg)'})} />
            <div style={abs({left: -40, top: 300, width: 460, height: 22, background: 'rgba(122,61,0,.18)', transform: 'rotate(-14deg)'})} />
          </div>
          <div style={abs({left: 60, top: 118, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%,#fff3d0,#f2d79a)', boxShadow: '0 10px 24px rgba(0,0,0,.28)'})} />
          <div style={abs({left: 60, top: 190, width: 260, textAlign: 'center', fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 104, color: '#8a4a00'})}>Gum</div>
          <div style={abs({left: 60, top: 316, width: 260, textAlign: 'center', fontFamily: F.mono, fontSize: 15, letterSpacing: '0.35em', color: '#8a4a00'})}>CHEWING</div>
          <div style={abs({left: 206, top: 436, width: 150, height: 90, boxShadow: `0 0 ${50 * hit}px rgba(255,77,61,${0.8 * hit})`, borderRadius: 4})}>
            <Barcode id="gumbc" digits={makeDigits(77)} w={150} h={90} bg="#f6f3ea" radius={4} />
          </div>
        </div>
        <div style={abs({left: 1160, top: 250, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 70, color: C.bone, opacity: sup * 0.95, transform: `translateY(${(1 - sup) * 14}px)`})}>
          supposedly<span style={{color: C.amber}}>?</span>
        </div>
      </div>
      <div style={{...fill, opacity: beamOp}}>
        <div style={abs({left: bx - 110, top: 540 - bh / 2, width: 220, height: bh, background: 'linear-gradient(90deg, rgba(255,77,61,0), rgba(255,77,61,0.34), rgba(255,77,61,0))', opacity: red})} />
        <div style={abs({left: bx - 80, top: 540 - bh / 2 - 30, width: 160, height: bh + 60, background: 'radial-gradient(ellipse at center, rgba(242,239,230,0.17), rgba(242,239,230,0) 70%)', opacity: 1 - red})} />
        <div style={abs({left: bx - 1.5, top: 540 - bh / 2, width: 3, height: bh, background: C.bone, opacity: 1 - red})} />
        <div style={abs({left: bx - 2.5, top: 540 - bh / 2, width: 5, height: bh, background: C.red, boxShadow: '0 0 28px rgba(255,77,61,.9)', opacity: red})} />
      </div>
    </div>
  );
};

/* ===================== 5.9 – 10.8  BARS vs CIRCLE ===================== */
const Versus: React.FC<{t: number}> = ({t}) => {
  if (t < 5.9 || t > 10.9) return null;
  const a = win(t, 5.9, 10.9, 0.5, 0.7);
  const pop = eb(t, 6.3, 7.0);
  const grow = eo(t, 8.5, 9.6);
  const bump = Math.sin(prog(t, 9.0, 9.9) * Math.PI);
  const cardOp = 1 - 0.28 * bump;
  const lab1 = prog(t, 7.6, 8.0);
  const lab2 = prog(t, 9.3, 9.7);
  return (
    <div style={{...fill, opacity: a}}>
      <svg style={fill} width={W} height={H}>
        {Array.from({length: 7}, (_, i) => (
          <circle key={i} cx={960} cy={500} r={lerp(0, 120 + i * 58, grow)} fill="none" stroke={C.bone} strokeOpacity={Math.max(0.1, 0.75 - i * 0.09)} strokeWidth={3 + 7 * bump} />
        ))}
        <circle cx={960} cy={500} r={lerp(0, 40, grow)} fill={C.bone} fillOpacity={0.9} />
      </svg>
      <div style={abs({left: 610, top: 330, width: 700, height: 340, opacity: cardOp, transform: `scale(${0.82 + 0.18 * pop})`, boxShadow: '0 0 120px rgba(242,239,230,0.18), 0 30px 70px rgba(0,0,0,.6)', borderRadius: 16})}>
        <Barcode id="vsbc" digits={HERO} w={700} h={340} bg={C.bone} radius={16} />
      </div>
      <div style={abs({left: 0, width: W, top: 262, textAlign: 'center', fontFamily: F.mono, fontSize: 22, letterSpacing: '0.45em', color: C.bone, opacity: 0.8 * lab1})}>THE WINNING DESIGN</div>
      <div style={abs({left: 1440, top: 478, fontFamily: F.mono, fontSize: 22, letterSpacing: '0.45em', color: C.bone, opacity: 0.85 * lab2})}>BULLSEYE</div>
    </div>
  );
};

/* ===================== 10.4 – 15.2  CHECKING IN YOUR HEAD ===================== */
const Check: React.FC<{t: number}> = ({t}) => {
  if (t < 10.4 || t > 15.3) return null;
  const a = win(t, 10.4, 15.3, 0.5, 0.7);
  const BW = 900, BH = 430, BL = 360, BT = 300;
  const xs = digitCenters(BW);
  const fs = BH * 0.125;
  const dyc = BH * 0.93 - fs * 0.35;
  const dig = HERO.split('');
  const think = prog(t, 12.1, 12.5) * (1 - prog(t, 12.9, 13.3));
  const ok = eo(t, 13.6, 14.2);
  const chk = prog(t, 13.8, 14.3);
  return (
    <div style={{...fill, opacity: a}}>
      <div style={abs({left: BL - 40, top: BT - 40, width: BW + 80, height: BH + 80, borderRadius: 30, boxShadow: `0 0 ${120 * think}px rgba(242,239,230,${0.35 * think})`})} />
      <div style={abs({left: BL, top: BT, width: BW, height: BH, borderRadius: 18, boxShadow: '0 30px 70px rgba(0,0,0,.6)'})}>
        <Barcode id="chkbc" digits={HERO} w={BW} h={BH} bg={C.bone} radius={18} digitsText />
      </div>
      {xs.map((x, i) => {
        const st = 11.3 + i * 0.12;
        const p = prog(t, st, st + 0.12) * (1 - prog(t, st + 0.5, st + 0.8));
        const last = i === 11;
        const keep = last ? ok : 0;
        const o = Math.max(p, keep);
        if (o <= 0.01) return null;
        return (
          <div key={i} style={abs({left: BL + x - 24, top: BT + dyc - 34, width: 48, height: 68, borderRadius: 10, background: C.ink, opacity: o, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: fs, color: C.bone})}>{dig[i]}</div>
        );
      })}
      <div style={abs({left: BL + xs[11] - 38, top: BT + dyc - 48, width: 76, height: 96, borderRadius: 16, border: `3px solid ${C.red}`, opacity: ok, transform: `scale(${lerp(1.5, 1, ok)})`})} />
      <svg style={abs({left: 1380, top: 380, width: 220, height: 220, opacity: ok})} viewBox="0 0 220 220">
        <circle cx={110} cy={100} r={84} fill="none" stroke={C.bone} strokeWidth={6} />
        <path d="M66 102 L98 134 L156 70" fill="none" stroke={C.bone} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${chk} 2`} />
        <text x={110} y={212} textAnchor="middle" fontFamily={F.mono} fontWeight={700} fontSize={26} letterSpacing={8} fill={C.bone}>REAL</text>
      </svg>
      <div style={abs({left: 0, width: BL * 2 + BW, top: 780, textAlign: 'center', fontFamily: F.mono, fontSize: 20, letterSpacing: '0.4em', color: C.bone, opacity: 0.6 * think})}>IN YOUR HEAD</div>
    </div>
  );
};

/* ===================== 14.9 – 19.5  THE HALLWAY ===================== */
const Hall: React.FC<{t: number}> = ({t}) => {
  if (t < 14.9 || t > 19.6) return null;
  const a = prog(t, 14.9, 15.6) * (1 - prog(t, 19.1, 19.6));
  const nl = -260, nr = 2180, nt = -220, nb = 1300, fl = 850, fr = 1070, ft = 425, fb = 565;
  const rect = (u: number) => ({l: lerp(nl, fl, u), r: lerp(nr, fr, u), t: lerp(nt, ft, u), b: lerp(nb, fb, u)});
  const uu = (z: number) => 1 - 1 / (1 + 0.55 * Math.max(z, 0));
  const P = (pts: [number, number][]) => pts.map((p) => p.join(',')).join(' ');
  const cam = (t - 14.9) * 0.3;
  const els: React.ReactNode[] = [];
  let src: [number, number, number] | null = null;
  for (let i = 9; i >= -1; i--) {
    const z = i + 1 - cam;
    if (z < -0.1) continue;
    const u1 = uu(z), u2 = uu(z + 0.55);
    const r1 = rect(u1), r2 = rect(u2);
    const h1 = r1.b - r1.t, h2 = r2.b - r2.t;
    const dim = 0.35 + 0.65 * (1 - u2);
    const Ld: [number, number][] = [[r1.l, r1.t + 0.22 * h1], [r2.l, r2.t + 0.22 * h2], [r2.l, r2.b], [r1.l, r1.b]];
    const Rd: [number, number][] = [[r1.r, r1.t + 0.22 * h1], [r2.r, r2.t + 0.22 * h2], [r2.r, r2.b], [r1.r, r1.b]];
    els.push(<polygon key={'l' + i} points={P(Ld)} fill="#0a0e16" stroke="rgba(242,239,230,0.14)" strokeWidth={2} opacity={dim} />);
    els.push(<polygon key={'r' + i} points={P(Rd)} fill="#0a0e16" stroke="rgba(242,239,230,0.14)" strokeWidth={2} opacity={dim} />);
    // ceiling lamp
    const c1 = uu(z + 0.15), c2 = uu(z + 0.45);
    const q1 = rect(c1), q2 = rect(c2);
    const cx1 = (q1.l + q1.r) / 2, cx2 = (q2.l + q2.r) / 2, w1 = (q1.r - q1.l) * 0.09, w2 = (q2.r - q2.l) * 0.09;
    els.push(<polygon key={'c' + i} points={P([[cx1 - w1, q1.t], [cx1 + w1, q1.t], [cx2 + w2, q2.t], [cx2 - w2, q2.t]])} fill="rgba(242,239,230,0.55)" opacity={dim * 0.8} />);
    if (i === 3) {
      src = [(Rd[0][0] + Rd[1][0] + Rd[2][0] + Rd[3][0]) / 4, (Rd[0][1] + Rd[1][1] + Rd[2][1] + Rd[3][1]) / 4, Rd[0][1]];
      els.push(<polygon key="glow" points={P(Rd)} fill="rgba(201,166,107,0.22)" stroke="rgba(201,166,107,0.7)" strokeWidth={3} />);
    }
  }
  const q = prog(t, 16.56, 17.0);
  return (
    <div style={{...fill, opacity: a, background: '#0b0e15'}}>
      <div style={abs({left: fl - 140, top: ft - 90, width: fr - fl + 280, height: fb - ft + 180, background: 'radial-gradient(ellipse at center, rgba(245,200,130,0.9), rgba(201,166,107,0.35) 45%, rgba(201,166,107,0) 72%)'})} />
      <svg style={fill} width={W} height={H}>
        <polygon points={P([[nl, nt], [fl, ft], [fl, fb], [nl, nb]])} fill="#151b29" />
        <polygon points={P([[nr, nt], [fr, ft], [fr, fb], [nr, nb]])} fill="#111723" />
        <polygon points={P([[nl, nt], [nr, nt], [fr, ft], [fl, ft]])} fill="#0d111a" />
        <polygon points={P([[nl, nb], [nr, nb], [fr, fb], [fl, fb]])} fill="#1a2030" />
        <polygon points={P([[(nl + nr) / 2 - 0.16 * (nr - nl), nb], [(nl + nr) / 2 + 0.16 * (nr - nl), nb], [(fl + fr) / 2 + 0.16 * (fr - fl), fb], [(fl + fr) / 2 - 0.16 * (fr - fl), fb]])} fill="rgba(201,166,107,0.07)" />
        <rect x={fl} y={ft} width={fr - fl} height={fb - ft} fill="rgba(255,226,170,0.28)" />
        {els}
        {src
          ? [0, 1, 2].map((k) => {
              const ph = (((t - 16.4) * 0.9 + k / 3) % 1 + 1) % 1;
              const r = 30 + ph * 150;
              const [sx, sy] = src!;
              return <path key={k} d={`M${sx} ${sy - r} A${r} ${r} 0 0 0 ${sx} ${sy + r}`} fill="none" stroke={C.bone} strokeWidth={4} strokeLinecap="round" opacity={(1 - ph) * 0.8 * prog(t, 16.3, 16.8)} />;
            })
          : null}
      </svg>
      {src ? (
        <div style={abs({left: src[0] - 330, top: src[2] - 150 - (1 - q) * -20, fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 170, color: C.bone, opacity: q, textShadow: '0 4px 40px rgba(0,0,0,.6)'})}>?</div>
      ) : null}
    </div>
  );
};

/* ===================== 19.3 – 22.2  PHILADELPHIA, 1948 ===================== */
const Title: React.FC<{t: number}> = ({t}) => {
  if (t < 19.3 || t > 22.3) return null;
  const a = prog(t, 19.3, 19.9) * (1 - prog(t, 21.8, 22.3));
  const yr = 1900 + Math.round(48 * eo(t, 20.45, 21.25));
  const ping = (((t - 19.7) * 0.8) % 1 + 1) % 1;
  return (
    <div style={{...fill, opacity: a, background: `radial-gradient(ellipse at 50% 45%, ${C.ink2} 0%, ${C.ink} 75%)`}}>
      <svg style={fill} width={W} height={H}>
        {Array.from({length: 25}, (_, i) => (
          <line key={'v' + i} x1={i * 80} x2={i * 80} y1={0} y2={H} stroke={C.bone} strokeOpacity={0.06} />
        ))}
        {Array.from({length: 14}, (_, i) => (
          <line key={'h' + i} x1={0} x2={W} y1={i * 80} y2={i * 80} stroke={C.bone} strokeOpacity={0.06} />
        ))}
        <line x1={0} x2={W} y1={500} y2={500} stroke={C.bone} strokeOpacity={0.22 * eo(t, 19.5, 20.2)} />
        <line x1={960} x2={960} y1={0} y2={H} stroke={C.bone} strokeOpacity={0.22 * eo(t, 19.5, 20.2)} />
        <circle cx={960} cy={500} r={14 + ping * 120} fill="none" stroke={C.bone} strokeOpacity={(1 - ping) * 0.5} strokeWidth={2} />
        <circle cx={960} cy={500} r={7} fill={C.bone} />
      </svg>
      <div style={abs({left: 0, width: W, top: 250, textAlign: 'center', fontFamily: F.serif, fontWeight: 300, fontSize: 92, letterSpacing: '0.24em', color: C.bone, opacity: eo(t, 19.5, 20.2), transform: `translateY(${(1 - eo(t, 19.5, 20.2)) * 16}px)`, paddingLeft: '0.24em'})}>PHILADELPHIA</div>
      <div style={abs({left: 0, width: W, top: 560, textAlign: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 250, letterSpacing: '-0.03em', color: C.bone, opacity: prog(t, 20.4, 20.7), textShadow: '0 8px 50px rgba(0,0,0,.6)'})}>{yr}</div>
      <div style={abs({left: 0, width: W, top: 520, textAlign: 'center', fontFamily: F.mono, fontSize: 20, letterSpacing: '0.4em', color: C.bone, opacity: 0.55 * eo(t, 19.9, 20.5)})}>39.95° N · 75.17° W</div>
    </div>
  );
};

/* ===================== 21.9 – 27.3  DREXEL ===================== */
const Man: React.FC<{x: number; y: number; ph: number; s?: number; o?: number}> = ({x, y, ph, s = 1, o = 1}) => {
  const sw = Math.sin(ph);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <g fill="#090b10" stroke="rgba(242,239,230,0.3)" strokeWidth={1.5}>
        <rect x={-13} y={-60} width={13} height={60} rx={6} transform={`rotate(${sw * 26} -6 -60)`} />
        <rect x={1} y={-60} width={13} height={60} rx={6} transform={`rotate(${-sw * 26} 8 -60)`} />
        <path d="M-30 -138 Q0 -150 30 -138 L37 -48 L-37 -48 Z" />
        <rect x={-38} y={-134} width={11} height={66} rx={5} transform={`rotate(${-sw * 20} -32 -134)`} />
        <circle cx={0} cy={-158} r={15} />
        <ellipse cx={0} cy={-169} rx={29} ry={5.5} />
        <rect x={-14} y={-188} width={28} height={21} rx={4} />
      </g>
    </g>
  );
};
const Drexel: React.FC<{t: number}> = ({t}) => {
  if (t < 21.9 || t > 27.4) return null;
  const a = prog(t, 21.9, 22.5) * (1 - prog(t, 26.9, 27.4));
  const walk = eio(t, 22.2, 26.1);
  const fx = lerp(120, 940, walk);
  const enter = prog(t, 26.0, 26.7);
  const base = 905 - enter * 45;
  const fo = 1 - enter;
  const pres = WORDS.a6[1].t0;
  const tag = prog(t, pres, pres + 0.4);
  const prob = prog(t, 25.4, 26.3);
  const lit = 0.8 + 0.2 * Math.sin(t * 3);
  return (
    <div style={{...fill, opacity: a, background: 'linear-gradient(180deg,#121829 0%,#262a42 46%,#5d4650 74%,#2b2a34 88%)'}}>
      <div style={{...fill, transform: 'translateY(-110px)'}}>
      <svg style={fill} width={W} height={H}>
        <polygon points="460,505 1460,505 960,372" fill="#2c3040" stroke="rgba(242,239,230,0.14)" strokeWidth={2} />
        <rect x={460} y={505} width={1000} height={62} fill="#343848" />
        <rect x={470} y={567} width={980} height={278} fill="#232736" />
        <rect x={895} y={640} width={130} height={205} fill="#f1bf6a" opacity={lit} />
        <rect x={895} y={640} width={130} height={205} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth={4} />
        {Array.from({length: 8}, (_, i) => (
          <rect key={i} x={488 + i * 132} y={567} width={46} height={278} fill="#3d4254" stroke="rgba(242,239,230,0.1)" strokeWidth={2} />
        ))}
        <rect x={430} y={845} width={1060} height={34} fill="#4a4a56" />
        <rect x={400} y={879} width={1120} height={36} fill="#55555f" />
        <rect x={0} y={915} width={W} height={400} fill="#2b2a34" />
        <path d="M900 845 L1020 845 L1040 915 L880 915 Z" fill="rgba(241,191,106,0.3)" />
      </svg>
      <div style={abs({left: 0, width: W, top: 520, textAlign: 'center', fontFamily: F.mono, fontSize: 21, letterSpacing: '0.34em', color: C.bone, opacity: 0.8 * prog(t, 22.2, 22.9)})}>DREXEL INSTITUTE OF TECHNOLOGY</div>
      <svg style={fill} width={W} height={H}>
        <Man x={fx} y={base} ph={walk * 38} o={fo} />
        {prob > 0 ? (
          <path d="M0 0 C 40 -50, 110 -20, 70 30 S -50 30, -20 -40 S 90 -90, 130 -30 S 60 70, -10 50 S -70 -20, -30 -60" transform={`translate(${fx - 52} ${base - 262}) scale(1.0)`} fill="none" stroke={C.red} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={`${prob} 2`} opacity={fo} />
        ) : null}
      </svg>
      <div style={abs({left: fx - 190, top: 190, width: 380, textAlign: 'center', fontFamily: F.mono, fontSize: 19, letterSpacing: '0.28em', color: C.bone, opacity: tag * fo * 0.9})}>PRESIDENT · FOOD CHAIN</div>
      <div style={abs({left: fx - 1, top: 226, width: 2, height: Math.max(0, base - 205 - 226) * tag, background: C.bone, opacity: 0.4 * fo})} />
      </div>
    </div>
  );
};

/* ===================== 27.0 – 34.0  THE CHECKOUT ===================== */
const ITEMS: [string, number][] = [['MILK', 0.39], ['BREAD', 1.14], ['BUTTER', 0.79], ['EGGS', 0.62], ['COFFEE', 2.15]];
const KEYS = ['7', '8', '9', 'C', '4', '5', '6', 'x', '1', '2', '3', '+', '0', '.', '00', '='];
const EVENTS: {t: number; k: string; item: number}[] = (() => {
  const ev: {t: number; k: string; item: number}[] = [];
  let tt = 29.3;
  ITEMS.forEach(([, p], i) => {
    String(Math.round(p * 100)).split('').forEach((d) => {
      ev.push({t: tt, k: d, item: i});
      tt += 0.14;
    });
    ev.push({t: tt, k: '+', item: i});
    tt += 0.14;
  });
  return ev;
})();
const WRONG = [0.97, 1.41, 0.26];
const Person: React.FC<{x: number; y: number; o: number}> = ({x, y, o}) => (
  <g transform={`translate(${x} ${y})`} opacity={o} fill={C.bone}>
    <circle cx={0} cy={-52} r={17} />
    <rect x={-20} y={-30} width={40} height={64} rx={16} />
  </g>
);
const Checkout: React.FC<{t: number}> = ({t}) => {
  if (t < 27.0) return null;
  const a = prog(t, 27.0, 27.6);
  const RX = 300, RY = 250;
  const pressed = EVENTS.filter((e) => t >= e.t);
  const cur = pressed.length ? pressed[pressed.length - 1] : null;
  let buf = '';
  if (cur) for (const e of pressed) if (e.item === cur.item && e.k !== '+') buf += e.k;
  const typing = cur && cur.k !== '+' ? buf : cur ? String(Math.round(ITEMS[cur.item][1] * 100)) : '';
  const disp = typing ? (parseInt(typing, 10) / 100).toFixed(2) : '0.00';
  const err = prog(t, 32.3, 32.5);
  const errBlink = Math.sin(t * 22) > -0.3 ? 1 : 0.35;
  const shake = err > 0 ? Math.sin(t * 60) * 2 * (1 - prog(t, 32.6, 33.4)) : 0;
  return (
    <div style={{...fill, opacity: a, background: `radial-gradient(ellipse at 40% 45%, ${C.ink2} 0%, ${C.ink} 80%)`}}>
      {/* register */}
      <div style={abs({left: RX + shake, top: RY, width: 520, height: 430})}>
        <div style={abs({inset: 0, borderRadius: 22, background: 'linear-gradient(170deg,#3d475c,#232a3a)', boxShadow: '0 40px 80px rgba(0,0,0,.6), inset 2px 2px 0 rgba(255,255,255,.12)'})} />
        <div style={abs({left: 40, top: 30, width: 440, height: 96, borderRadius: 10, background: '#05070a', border: '4px solid #10151f', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 24, fontFamily: F.mono, fontWeight: 700, fontSize: 62, color: err > 0 ? C.red : C.bone, opacity: err > 0 ? errBlink : 1})}>
          {err > 0 ? 'ERR' : disp}
        </div>
        {KEYS.map((k, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const on = EVENTS.some((e) => e.k === k && t >= e.t && t < e.t + 0.13);
          return (
            <div key={i} style={abs({left: 52 + col * 106, top: 158 + row * 66, width: 92, height: 54, borderRadius: 10, background: on ? '#bdb7a6' : '#e6e3da', boxShadow: on ? 'inset 0 2px 4px rgba(0,0,0,.4)' : '0 5px 0 #9c968a', transform: `translateY(${on ? 4 : 0}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.ink})}>{k}</div>
          );
        })}
      </div>
      {/* tape */}
      <div style={abs({left: 1140, top: 120, width: 330, height: 640, background: 'linear-gradient(160deg,#efe9d6,#ddd5bc)', borderRadius: '0 0 6px 6px', boxShadow: '0 30px 60px rgba(0,0,0,.55)'})}>
        <div style={abs({left: 0, right: 0, top: 22, textAlign: 'center', fontFamily: F.mono, fontSize: 18, letterSpacing: '0.35em', color: '#4a463a'})}>GROCERY</div>
        {ITEMS.map(([name, p], i) => {
          const plus = EVENTS.find((e) => e.item === i && e.k === '+')!;
          const show = prog(t, plus.t, plus.t + 0.12);
          if (show <= 0) return null;
          const wi = i >= 1 && i <= 3 ? i - 1 : -1;
          const wt = 32.2 + (wi >= 0 ? wi * 0.32 : 0);
          const bad = wi >= 0 && t >= wt;
          const price = bad ? WRONG[wi] : p;
          const circ = wi >= 0 ? prog(t, wt + 0.05, wt + 0.35) : 0;
          return (
            <div key={i} style={abs({left: 24, right: 24, top: 80 + i * 92, height: 60, opacity: show, transform: `translateX(${(1 - show) * -18}px)`, fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: '#26241d', display: 'flex', justifyContent: 'space-between', alignItems: 'center'})}>
              <span>{name}</span>
              <span style={{color: bad ? C.red : '#26241d'}}>{price.toFixed(2)}</span>
              {wi >= 0 ? (
                <svg style={abs({left: 150, top: -10, width: 150, height: 80})} viewBox="0 0 150 80">
                  <ellipse cx={80} cy={40} rx={58} ry={25} fill="none" stroke={C.red} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={`${circ} 2`} transform="rotate(-4 80 40)" />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
      {/* queue */}
      <svg style={fill} width={W} height={H}>
        {Array.from({length: 10}, (_, i) => {
          const at = 27.4 + i * 0.07;
          const inch = prog(t, 28.0, 33.0) * 18;
          return <Person key={i} x={420 + i * 130 - inch} y={840} o={0.26 * prog(t, at, at + 0.35)} />;
        })}
      </svg>
      <div style={{...fill, background: C.ink, opacity: prog(t, 33.55, 34.0)}} />
    </div>
  );
};

/* ================================== ROOT ================================== */
export const Segment02: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, ${C.ink2} 0%, ${C.ink} 72%)`}}>
      <Audio src={staticFile('audio/seg02.wav')} />
      <Gum t={t} />
      <Versus t={t} />
      <Check t={t} />
      <Hall t={t} />
      <Title t={t} />
      <Drexel t={t} />
      <Checkout t={t} />
      <Overlays frame={frame} />
      <Subs t={t} sentences={sentences} words={WORDS} skip={['a5']} />
    </AbsoluteFill>
  );
};
