import { describe, expect, it } from "vitest";

import { activeSegmentIndex, buildTimerSegments, formatClock } from "../brew-timer";

const steps = [
  { title: "Prep", instruction: "Rinse." },
  { title: "Bloom", instruction: "Pour 45g.", atSeconds: 0 },
  { title: "Build", instruction: "Pour to 250g.", atSeconds: 40 },
];

const segments = buildTimerSegments(steps, 180);

describe("buildTimerSegments", () => {
  it("keeps only timed steps and closes the final segment at total time", () => {
    expect(segments).toEqual([
      { title: "Bloom", instruction: "Pour 45g.", startSeconds: 0, endSeconds: 40 },
      { title: "Build", instruction: "Pour to 250g.", startSeconds: 40, endSeconds: 180 },
    ]);
  });

  it("sorts out-of-order marks", () => {
    const shuffled = [steps[2], steps[1], steps[0]];
    const result = buildTimerSegments(shuffled, 180);
    expect(result[0].title).toBe("Bloom");
  });

  it("handles guides without any timed steps", () => {
    expect(buildTimerSegments([steps[0]], 60)).toEqual([]);
  });
});

describe("activeSegmentIndex", () => {
  it("finds the running segment", () => {
    expect(activeSegmentIndex(segments, 10)).toBe(0);
    expect(activeSegmentIndex(segments, 41)).toBe(1);
    expect(activeSegmentIndex(segments, 180)).toBe(1);
  });

  it("returns -1 when there are no segments", () => {
    expect(activeSegmentIndex([], 5)).toBe(-1);
  });
});

describe("formatClock", () => {
  it("renders m:ss and never goes negative", () => {
    expect(formatClock(65)).toBe("1:05");
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(-4)).toBe("0:00");
  });
});
