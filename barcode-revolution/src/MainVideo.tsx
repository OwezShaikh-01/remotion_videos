import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { Act1_TheInvisiblePattern } from "./scenes/Act1_TheInvisiblePattern";
import { Act2_DrexelHallway } from "./scenes/Act2_DrexelHallway";
import { Act3_MorseInTheSand } from "./scenes/Act3_MorseInTheSand";
import { Act4_TheHardwareChasm } from "./scenes/Act4_TheHardwareChasm";
import { Act5_BullseyeVsBars } from "./scenes/Act5_BullseyeVsBars";
import { Act6_TheFirstBeep } from "./scenes/Act6_TheFirstBeep";

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#06070A", overflow: "hidden" }}>
      {/* Synchronized Voiceover Audio Track */}
      <Audio src={staticFile("voiceover.wav")} />

      {/* Frame-Accurate Act Sequences (Total: 6,540 frames = 3m 38s @ 30fps) */}
      <Series>
        {/* Act 1: 00:00.00 -> 00:36.74 (1102 frames) */}
        <Series.Sequence durationInFrames={1102}>
          <Act1_TheInvisiblePattern />
        </Series.Sequence>

        {/* Act 2: 00:36.74 -> 01:08.67 (958 frames) */}
        <Series.Sequence durationInFrames={958}>
          <Act2_DrexelHallway />
        </Series.Sequence>

        {/* Act 3: 01:08.67 -> 01:51.60 (1288 frames) */}
        <Series.Sequence durationInFrames={1288}>
          <Act3_MorseInTheSand />
        </Series.Sequence>

        {/* Act 4: 01:51.60 -> 02:32.59 (1230 frames) */}
        <Series.Sequence durationInFrames={1230}>
          <Act4_TheHardwareChasm />
        </Series.Sequence>

        {/* Act 5: 02:32.59 -> 03:13.00 (1212 frames) */}
        <Series.Sequence durationInFrames={1212}>
          <Act5_BullseyeVsBars />
        </Series.Sequence>

        {/* Act 6: 03:13.00 -> 03:38.00 (750 frames) */}
        <Series.Sequence durationInFrames={750}>
          <Act6_TheFirstBeep />
        </Series.Sequence>
      </Series>

      {/* Global 35mm Analog Film Grain & Atmospheric Vignette */}
      <GrainOverlay />
    </AbsoluteFill>
  );
};
