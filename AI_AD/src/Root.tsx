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
        backgroundColor: "#0E1013",
        overflow: "hidden",
      }}
    >
      {/* Scene 1: The Hook (0 - 4.6s) */}
      <Sequence from={0} durationInFrames={140}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: The Agony of Traditional Workflows (4.3s - 9.3s) */}
      <Sequence from={130} durationInFrames={150}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: Meet Your Autonomous AI Motion Designer (9.0s - 14.6s) */}
      <Sequence from={270} durationInFrames={170}>
        <Scene3MeetAI />
      </Sequence>

      {/* Scene 4: What Can It Create? Showreel (14.3s - 21.3s) */}
      <Sequence from={430} durationInFrames={210}>
        <Scene4Showcase />
      </Sequence>

      {/* Scene 5: Scalable Value Proposition (21.0s - 25.8s) */}
      <Sequence from={630} durationInFrames={145}>
        <Scene5ValueProp />
      </Sequence>

      {/* Scene 6: Grand Finale & Call to Action (25.5s - 30.0s) */}
      <Sequence from={765} durationInFrames={135}>
        <Scene6CallToAction />
      </Sequence>

      {/* Global Cinematic Noise Grain Layer */}
      <NoiseOverlay opacity={0.045} />
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
