import { Composition } from "remotion";
import { SolutionCalendar } from "./compositions/SolutionCalendar";
import { SolutionLearning } from "./compositions/SolutionLearning";
import { SolutionAI } from "./compositions/SolutionAI";

export const RemotionRoot: React.FC = () => {
  const fps = 30;
  const width = 854;
  const height = 686;
  const durationLearning = 15 * fps;
  const durationAI = 15 * fps;
  const durationCalendar = 15 * fps;

  return (
    <>
      <Composition
        id="SolutionCalendar"
        component={SolutionCalendar}
        durationInFrames={durationCalendar}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="SolutionLearning"
        component={SolutionLearning}
        durationInFrames={durationLearning}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="SolutionAI"
        component={SolutionAI}
        durationInFrames={durationAI}
        fps={fps}
        width={width}
        height={height}
      />
    </>
  );
};
