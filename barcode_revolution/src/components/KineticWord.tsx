import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { THEME } from '../theme';

interface KineticWordProps {
  text: string;
  delay?: number;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  highlightWords?: string[];
  highlightColor?: string;
  asHeadline?: boolean;
}

export const KineticWord: React.FC<KineticWordProps> = ({
  text,
  delay = 0,
  fontFamily = THEME.fonts.story,
  fontSize = 64,
  color = THEME.colors.boneWhite,
  fontWeight = 600,
  letterSpacing = '-0.02em',
  highlightWords = [],
  highlightColor = THEME.colors.amber,
  asHeadline = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${fontSize * 0.28}px`,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 1400,
        margin: '0 auto',
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 3;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: {
            damping: 14,
            mass: 0.6,
            stiffness: 110,
          },
        });

        const isHighlighted = highlightWords.some(
          (hw) => word.toLowerCase().replace(/[^a-z0-9]/g, '') === hw.toLowerCase()
        );

        const currentWordColor = isHighlighted ? highlightColor : color;

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              padding: '4px 2px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontFamily,
                fontSize,
                fontWeight,
                color: currentWordColor,
                letterSpacing,
                transform: `translateY(${(1 - progress) * 100}%)`,
                opacity: progress,
                textShadow: isHighlighted
                  ? `0 0 25px ${highlightColor}66`
                  : undefined,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};
