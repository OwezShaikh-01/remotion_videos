import React from 'react';
import { Composition } from 'remotion';
import { Segment01, SEGMENT_01_DURATION } from './segments/Segment01';
import { THEME, GLOBAL_STYLES } from './theme';

export const Root: React.FC = () => {
  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* Segment 01 Composition: 0:00 - 0:32 (32s @ 30fps = 960 frames) */}
      <Composition
        id="Segment01"
        component={Segment01}
        durationInFrames={SEGMENT_01_DURATION}
        fps={THEME.fps}
        width={THEME.dimensions.width}
        height={THEME.dimensions.height}
      />

      {/* Master Video Composition (will contain all 14 segments chained) */}
      <Composition
        id="MasterVideo"
        component={Segment01}
        durationInFrames={SEGMENT_01_DURATION}
        fps={THEME.fps}
        width={THEME.dimensions.width}
        height={THEME.dimensions.height}
      />
    </>
  );
};
