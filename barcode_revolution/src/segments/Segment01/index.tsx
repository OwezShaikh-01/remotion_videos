import React from 'react';
import { Sequence } from 'remotion';
import { Scene1Hook } from './Scene1Hook';
import { Scene2Ubiquity } from './Scene2Ubiquity';
import { Scene3FloridaSand } from './Scene3FloridaSand';
import { Scene4TheChasm } from './Scene4TheChasm';
import { NoiseOverlay } from '../../components/NoiseOverlay';
import { Vignette } from '../../components/Vignette';
import { SubtitleBar, SubtitleCue } from '../../components/SubtitleBar';

// 32 seconds @ 30fps = 960 frames
export const SEGMENT_01_DURATION = 960;

const SUBTITLES: SubtitleCue[] = [
  { startFrame: 0, endFrame: 60, text: 'Look around you.' },
  {
    startFrame: 60,
    endFrame: 210,
    text: "Somewhere within arm's reach, there's a pattern of black lines.",
  },
  { startFrame: 210, endFrame: 240, text: 'Probably several.' },
  { startFrame: 240, endFrame: 330, text: "You've seen them 10,000 times." },
  { startFrame: 330, endFrame: 390, text: "You've never really looked." },
  {
    startFrame: 390,
    endFrame: 600,
    text: 'That pattern was first sketched in the sand of a Florida beach in 1949.',
  },
  {
    startFrame: 600,
    endFrame: 750,
    text: 'And then it did absolutely nothing for 25 years.',
  },
  {
    startFrame: 750,
    endFrame: 860,
    text: 'Its inventors sold the rights for $15,000 and moved on.',
  },
  {
    startFrame: 860,
    endFrame: 960,
    text:
      'One of them died before it ever worked. And the first product it ever scanned, supposedly, was a pack of gum.',
  },
];

export const Segment01: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#0b0d12',
        overflow: 'hidden',
      }}
    >
      {/* Beat 1: The Hook (0:00 - 0:08) */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>

      {/* Beat 2: Ubiquity & Macro Zoom (0:08 - 0:13) */}
      <Sequence from={240} durationInFrames={150}>
        <Scene2Ubiquity />
      </Sequence>

      {/* Beat 3: Florida Beach Sand (0:13 - 0:20) */}
      <Sequence from={390} durationInFrames={210}>
        <Scene3FloridaSand />
      </Sequence>

      {/* Beat 4: The 25-Year Chasm & Gum Tease (0:20 - 0:32) */}
      <Sequence from={600} durationInFrames={360}>
        <Scene4TheChasm />
      </Sequence>

      {/* Editorial Subtitles */}
      <SubtitleBar cues={SUBTITLES} />

      {/* Global Cinematic Grading */}
      <NoiseOverlay opacity={0.04} />
      <Vignette intensity={0.55} />
    </div>
  );
};
