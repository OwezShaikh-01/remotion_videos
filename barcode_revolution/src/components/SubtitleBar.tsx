import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

export interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  text: string;
}

export const SubtitleBar: React.FC<{ cues: SubtitleCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();

  const currentCue = cues.find(
    (cue) => frame >= cue.startFrame && frame < cue.endFrame
  );

  if (!currentCue) {
    return null;
  }

  const fadeIn = interpolate(
    frame - currentCue.startFrame,
    [0, 5],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const fadeOut = interpolate(
    currentCue.endFrame - frame,
    [0, 5],
    [0, 1],
    { extrapolateLeft: 'clamp' }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
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
          backgroundColor: 'rgba(11, 13, 18, 0.78)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(242, 239, 230, 0.12)',
          padding: '10px 28px',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.body,
            fontSize: 26,
            fontWeight: 500,
            color: THEME.colors.boneWhite,
            letterSpacing: '0.01em',
          }}
        >
          {currentCue.text}
        </span>
      </div>
    </div>
  );
};
