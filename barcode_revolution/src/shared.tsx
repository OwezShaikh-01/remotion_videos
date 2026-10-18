import React from 'react';
import {staticFile} from 'remotion';
import {C, F, W, H, prog, rnd, Sentence, Word} from './lib';

/* ---- syllable-weighted word timing (extra overrides for segment 2+ vocabulary) ---- */
const OV: Record<string, number> = {
  '10,000': 3, '$15,000': 6, '1948': 5, '1949': 5, '25': 3, philadelphia: 5, video: 3, every: 2, mistakes: 2, everywhere: 3,
  theres: 1, youll: 1, real: 1, scanned: 1, drexel: 2, institute: 3, technology: 4, supposedly: 4, overheard: 3,
};
const syl = (w: string) => {
  const k = w.toLowerCase().replace(/[^a-z0-9$,]/g, '').replace(/,$/, '');
  if (OV[k] !== undefined) return OV[k];
  const m = k.replace(/[^a-z]/g, '');
  let g = (m.match(/[aeiouy]+/g) || []).length;
  if (/e$/.test(m) && !/le$/.test(m) && g > 1) g--;
  if (/ed$/.test(m) && !/[td]ed$/.test(m) && g > 1) g--;
  return Math.max(1, g);
};
export const buildWordsX = (s: Sentence): Word[] => {
  const out: Word[] = [];
  for (const p of s.parts) {
    const ws = p.text.split(' ');
    const wt = ws.map(syl);
    const tot = wt.reduce((a, b) => a + b, 0);
    let acc = 0;
    ws.forEach((w, i) => {
      const t0 = p.s + ((p.e - p.s) * acc) / tot;
      acc += wt[i];
      out.push({text: w, t0, t1: p.s + ((p.e - p.s) * acc) / tot});
    });
  }
  return out;
};

/** horizontal centres of the 12 printed UPC-A digits for a barcode of width w (matches <Barcode digitsText>) */
export const digitCenters = (w: number) => {
  const Q = 9, mw = w / 113;
  const xs = [Q * mw * 0.45];
  for (let k = 1; k <= 5; k++) xs.push((Q + 3 + k * 7 + 3.5) * mw);
  for (let k = 0; k <= 4; k++) xs.push((Q + 50 + k * 7 + 3.5) * mw);
  xs.push(w - Q * mw * 0.45);
  return xs;
};

/* --------------------------------- subtitles --------------------------------- */
export const Subs: React.FC<{t: number; sentences: Sentence[]; words: Record<string, Word[]>; skip?: string[]}> = ({t, sentences, words, skip = []}) => {
  const s = sentences.find((s) => t >= s.parts[0].s - 0.25 && t <= s.parts[s.parts.length - 1].e + 0.5);
  if (!s || skip.includes(s.id)) return null;
  const ws = words[s.id];
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

/* ------------------------------ vignette + grain ------------------------------ */
export const Overlays: React.FC<{frame: number}> = ({frame}) => (
  <>
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)'}} />
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, backgroundImage: `url(${staticFile('img/grain.png')})`, backgroundSize: '512px 512px', backgroundPosition: `${-rnd(frame * 1.7) * 512}px ${-rnd(frame * 2.3 + 9) * 512}px`, opacity: 0.55}} />
  </>
);
