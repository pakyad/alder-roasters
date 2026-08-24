/**
 * Pure timing model for the guided brew timer.
 *
 * A guide's timed steps become contiguous segments between their `atSeconds`
 * marks, ending at the guide's total time. Untimed prep steps sit outside the
 * clock — they are shown before starting.
 */

export interface TimedStepInput {
  readonly title: string;
  readonly instruction: string;
  readonly atSeconds?: number;
}

export interface TimerSegment {
  readonly title: string;
  readonly instruction: string;
  readonly startSeconds: number;
  readonly endSeconds: number;
}

export function buildTimerSegments(
  steps: readonly TimedStepInput[],
  totalSeconds: number,
): TimerSegment[] {
  const timed = steps
    .filter(
      (step): step is TimedStepInput & { atSeconds: number } => typeof step.atSeconds === "number",
    )
    .sort((a, b) => a.atSeconds - b.atSeconds);
  return timed.map((step, index) => ({
    title: step.title,
    instruction: step.instruction,
    startSeconds: step.atSeconds,
    endSeconds: index < timed.length - 1 ? timed[index + 1].atSeconds : totalSeconds,
  }));
}

export function activeSegmentIndex(
  segments: readonly TimerSegment[],
  elapsedSeconds: number,
): number {
  if (segments.length === 0) return -1;
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (elapsedSeconds >= segments[index].startSeconds) return index;
  }
  return 0;
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
