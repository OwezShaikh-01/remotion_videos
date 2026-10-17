import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { Act1_TheInvisiblePattern } from "./scenes/Act1_TheInvisiblePattern";
import { Act2_DrexelHallway } from "./scenes/Act2_DrexelHallway";
import { Act3_MorseInTheSand } from "./scenes/Act3_MorseInTheSand";
import { Act4_TheHardwareChasm } from "./scenes/Act4_TheHardwareChasm";
import { Act5_BullseyeVsBars } from "./scenes/Act5_BullseyeVsBars";
import { Act6_TheFirstBeep } from "./scenes/Act6_TheFirstBeep";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master 3m 38s Composition (Exactly 6,540 frames @ 30fps) */}
      <Composition
        id="BarcodeRevolution"
        component={MainVideo}
        durationInFrames={6540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Act Preview Compositions for Fast Debugging */}
      <Composition
        id="Act1-TheInvisiblePattern"
        component={Act1_TheInvisiblePattern}
        durationInFrames={1102}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Act2-DrexelHallway"
        component={Act2_DrexelHallway}
        durationInFrames={958}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Act3-MorseInTheSand"
        component={Act3_MorseInTheSand}
        durationInFrames={1288}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Act4-TheHardwareChasm"
        component={Act4_TheHardwareChasm}
        durationInFrames={1230}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Act5-BullseyeVsBars"
        component={Act5_BullseyeVsBars}
        durationInFrames={1212}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Act6-TheFirstBeep"
        component={Act6_TheFirstBeep}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
