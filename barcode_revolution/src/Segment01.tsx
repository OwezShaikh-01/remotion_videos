import React from 'react';
import { Sequence } from 'remotion';
import { Beat1_Observation } from './scenes/Beat1_Observation';
import { Beat2_Multiplication } from './scenes/Beat2_Multiplication';
import { Beat3_TenThousand } from './scenes/Beat3_TenThousand';
import { Beat4_Microscopic } from './scenes/Beat4_Microscopic';
import { Beat5_MiamiBeach1949 } from './scenes/Beat5_MiamiBeach1949';
import { Beat6_MorseEpiphany } from './scenes/Beat6_MorseEpiphany';
import { Beat7_TheChasmAndSale } from './scenes/Beat7_TheChasmAndSale';
import { Beat8_SilverAndGum } from './scenes/Beat8_SilverAndGum';
import { EditorialSubtitles, SubtitleItem } from './components/EditorialSubtitles';

export const SEGMENT_01_DURATION = 960; // 32.0s @ 30fps

const SUBTITLES: SubtitleItem[] = [
  { start: 0, end: 60, text: 'Look around you.' },
  { start: 60, end: 210, text: "Somewhere within arm's reach, there's a pattern of black lines." },
  { start: 210, end: 240, text: 'Probably several.' },
  { start: 240, end: 330, text: "You've seen them 10,000 times." },
  { start: 330, end: 390, text: "You've never really looked." },
  { start: 390, end: 600, text: 'That pattern was first sketched in the sand of a Florida beach in 1949.' },
  { start: 600, end: 750, text: 'And then it did absolutely nothing for 25 years.' },
  { start: 750, end: 860, text: 'Its inventors sold the rights for $15,000 and moved on.' },
  {
    start: 860,
    end: 960,
    text: 'One of them died before it ever worked. And the first product it ever scanned, supposedly, was a pack of gum.',
  },
];

export const Segment01: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#080a0f',
        overflow: 'hidden',
      }}
    >
      {/* Beat 1: Observation & Contact Sheet (0:00 - 0:04) */}
      <Sequence from={0} durationInFrames={120}>
        <Beat1_Observation />
      </Sequence>

      {/* Beat 2: Perspective Multiplication (0:04 - 0:08) */}
      <Sequence from={120} durationInFrames={120}>
        <Beat2_Multiplication />
      </Sequence>

      {/* Beat 3: 10,000 Times Kinetic Poster (0:08 - 0:11) */}
      <Sequence from={240} durationInFrames={90}>
        <Beat3_TenThousand />
      </Sequence>

      {/* Beat 4: Binary Slit Microscopic Zoom (0:11 - 0:13) */}
      <Sequence from={330} durationInFrames={60}>
        <Beat4_Microscopic />
      </Sequence>

      {/* Beat 5: Miami Beach 1949 Archival Field Note (0:13 - 0:16.5) */}
      <Sequence from={390} durationInFrames={105}>
        <Beat5_MiamiBeach1949 />
      </Sequence>

      {/* Beat 6: Morse Code to Vertical Barcode Morph (0:16.5 - 0:20) */}
      <Sequence from={495} durationInFrames={105}>
        <Beat6_MorseEpiphany />
      </Sequence>

      {/* Beat 7: 25-Year Chasm & $15K Patent Stamp (0:20 - 0:26) */}
      <Sequence from={600} durationInFrames={180}>
        <Beat7_TheChasmAndSale />
      </Sequence>

      {/* Beat 8: Bernard Silver Tribute & Juicy Fruit Hero (0:26 - 0:32) */}
      <Sequence from={780} durationInFrames={180}>
        <Beat8_SilverAndGum />
      </Sequence>

      {/* Editorial Teleprompter Subtitles */}
      <EditorialSubtitles items={SUBTITLES} />
    </div>
  );
};
