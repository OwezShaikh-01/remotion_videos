import React from "react";
import { Composition, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3MeetAI } from "./scenes/Scene3MeetAI";
import { Scene4Showcase } from "./scenes/Scene4Showcase";
import { Scene5ValueProp } from "./scenes/Scene5ValueProp";
import { Scene6CallToAction } from "./scenes/Scene6CallToAction";
import { NoiseOverlay } from "./components/NoiseOverlay";

export const MainAdComposition: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#090A0E",
        overflow: "hidden",
      }}
    >
      {/* Scene 1: The New Standard (0 - 4.6s) */}
      <Sequence from={0} durationInFrames={140}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: The Friction of the Past (4.2s - 9.2s) */}
      <Sequence from={126} durationInFrames={150}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: The Autonomous Creative Instrument (8.9s - 14.6s) */}
      <Sequence from={268} durationInFrames={170}>
        <Scene3MeetAI />
      </Sequence>

      {/* Scene 4: The Capabilities Showreel (14.3s - 21.3s) */}
      <Sequence from={430} durationInFrames={210}>
        <Scene4Showcase />
      </Sequence>

      {/* Scene 5: Scale Unlimited Force Multiplier (21.0s - 25.8s) */}
      <Sequence from={632} durationInFrames={145}>
        <Scene5ValueProp />
      </Sequence>

      {/* Scene 6: Grand Finale & Call to Action (25.5s - 30.0s) */}
      <Sequence from={765} durationInFrames={135}>
        <Scene6CallToAction />
      </Sequence>

      {/* Subtle 35mm Fine Film Grain Texture */}
      <NoiseOverlay opacity={0.035} />
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HireAIMotionDesigner"
        component={MainAdComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
