import React from 'react';
import {Composition} from 'remotion';
import {Segment01} from './Segment01';
import {Segment02} from './Segment02';
import {W, H, FPS} from './lib';

export const Root: React.FC = () => (
  <>
    <Composition id="Segment01" component={Segment01} durationInFrames={32 * FPS} fps={FPS} width={W} height={H} />
    <Composition id="Segment02" component={Segment02} durationInFrames={34 * FPS} fps={FPS} width={W} height={H} />
  </>
);
