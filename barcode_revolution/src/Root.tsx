import React from "react";
import { Composition } from "remotion";
import { Segment01 } from "./Segment01/Segment01";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Segment01"
        component={Segment01}
        durationInFrames={960}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
