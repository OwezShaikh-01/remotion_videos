import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

export interface SubtitleItem {
  start: number;
  end: number;
  text: string;
}

export const EditorialSubtitles: React.FC<{ items: SubtitleItem[] }> = ({ items }) => {
  const frame = useCurrentFrame();

  const current = items.find((it) => frame >= it.start && frame < it.end);

  if (!current) return null;

  const fadeIn = interpolate(frame - current.start, [0, 4], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(current.end - frame, [0, 4], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 900,
        pointerEvents: 'none',
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(8, 10, 15, 0.85)',
          border: '1px solid rgba(243, 239, 230, 0.15)',
          padding: '8px 26px',
          borderRadius: 20,
          boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.hero,
            fontSize: 24,
            fontWeight: 600,
            color: THEME.colors.paperCream,
            letterSpacing: '0.02em',
          }}
        >
          {current.text}
        </span>
      </div>
    </div>
  );
};
