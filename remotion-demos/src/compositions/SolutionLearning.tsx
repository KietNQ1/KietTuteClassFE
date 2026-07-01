import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HomeworkPage } from "../learning/HomeworkPage";
import { GradingPage } from "../learning/GradingPage";
import { ESSAY_SCROLL_Y } from "../learning/learningScale";

function frameRange(
  frame: number,
  startSec: number,
  endSec: number,
  fps: number
): number {
  return interpolate(frame, [startSec * fps, endSec * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function glowPulse(frame: number, fps: number, atSec: number): number {
  return spring({
    frame: frame - Math.round(atSec * fps),
    fps,
    config: { damping: 14, stiffness: 220 },
  });
}

export const SolutionLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });

  const sessionGlow =
    frame >= Math.round(0.5 * fps) && frame < Math.round(1.15 * fps)
      ? glowPulse(frame, fps, 0.5)
      : 0;

  const expandedSession = frame >= Math.round(0.95 * fps);

  const assignGlow =
    frame >= Math.round(1.8 * fps) && frame < Math.round(2.45 * fps)
      ? glowPulse(frame, fps, 1.8)
      : 0;

  const highlightAssignIndex =
    frame >= Math.round(1.6 * fps) ? 0 : null;

  const gradingIn = frameRange(frame, 2.5, 3.1, fps);
  const homeworkOpacity = 1 - gradingIn;
  const gradingOpacity = gradingIn;

  const studentGlow =
    frame >= Math.round(3.4 * fps) && frame < Math.round(4.05 * fps)
      ? glowPulse(frame, fps, 3.4)
      : 0;

  const selectedStudentIndex = 0;

  // Xem câu TN trước → cuộn xuống hết câu tự luận → rồi mới chấm điểm
  const scrollStartSec = 5.5;
  const scrollEndSec = 7.2;
  const scrollY = interpolate(
    frame,
    [scrollStartSec * fps, scrollEndSec * fps],
    [0, ESSAY_SCROLL_Y],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scrollDone = frame >= Math.round(scrollEndSec * fps);

  const showEssayFocus = scrollDone && frame >= Math.round(7.35 * fps);

  const scoreEntered = frame >= Math.round(7.65 * fps);
  const essayScore = scoreEntered ? 4.5 : 0;
  const totalScore = scoreEntered ? 8.5 : 4;

  const submitGlow =
    frame >= Math.round(10.5 * fps) && frame < Math.round(11.15 * fps)
      ? glowPulse(frame, fps, 10.5)
      : 0;

  return (
    <AbsoluteFill style={{ background: "#fffaf1" }}>
      <div style={{ width: "100%", height: "100%", opacity: enter }}>
        {homeworkOpacity > 0.01 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: homeworkOpacity,
              pointerEvents: homeworkOpacity < 0.5 ? "none" : undefined,
            }}
          >
            <HomeworkPage
              expandedSession={expandedSession}
              sessionGlow={sessionGlow}
              assignGlow={assignGlow}
              highlightAssignIndex={highlightAssignIndex}
            />
          </div>
        ) : null}

        {gradingOpacity > 0.01 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: gradingOpacity,
            }}
          >
            <GradingPage
              selectedStudentIndex={selectedStudentIndex}
              studentGlow={studentGlow}
              essayScore={essayScore}
              totalScore={totalScore}
              submitGlow={submitGlow}
              scrollY={scrollY}
              showEssayFocus={showEssayFocus}
            />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
