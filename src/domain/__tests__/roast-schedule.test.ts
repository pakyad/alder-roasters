import { describe, expect, it } from "vitest";

import {
  currentCutoff,
  formatCutoffDate,
  formatRoastDate,
  nextRoastDate,
  peakWindow,
  roastWeekForOrder,
} from "../roast-schedule";

/** Wednesday 2 Sep 2026, 10:00 MYT (02:00 UTC). */
const WEDNESDAY = new Date("2026-09-02T02:00:00Z");
/** Sunday 6 Sep 2026, 22:00 MYT — before the 23:59 cutoff. */
const SUNDAY_EARLY = new Date("2026-09-06T14:00:00Z");
/** Monday 7 Sep 2026, 10:00 MYT — the Sep 6 cutoff has passed. */
const MONDAY_AFTER = new Date("2026-09-07T02:00:00Z");
/** Tuesday roast day itself, 12:00 MYT. */
const TUESDAY_NOON = new Date("2026-09-08T04:00:00Z");

describe("nextRoastDate", () => {
  it("returns the coming Tuesday from midweek", () => {
    const roast = nextRoastDate(WEDNESDAY);
    expect(formatRoastDate(roast)).toContain("Tue");
    expect(roast.toISOString()).toBe("2026-09-07T16:00:00.000Z");
  });

  it("treats roast day itself as the current roast", () => {
    expect(nextRoastDate(TUESDAY_NOON).toISOString()).toBe("2026-09-07T16:00:00.000Z");
  });

  it("points a Monday order at the next Tuesday", () => {
    expect(nextRoastDate(MONDAY_AFTER).toISOString()).toBe("2026-09-07T16:00:00.000Z");
  });
});

describe("currentCutoff", () => {
  it("measures midweek orders against that week's Sunday cutoff", () => {
    const { cutoff, passed } = currentCutoff(WEDNESDAY);
    expect(passed).toBe(false);
    expect(cutoff.toISOString()).toBe("2026-09-06T15:59:00.000Z");
  });

  it("accepts an order placed before Sunday 23:59 MYT", () => {
    const { passed } = currentCutoff(SUNDAY_EARLY);
    expect(passed).toBe(false);
  });

  it("marks a post-cutoff order as rolled forward", () => {
    const { cutoff, passed } = currentCutoff(MONDAY_AFTER);
    expect(passed).toBe(true);
    expect(cutoff.toISOString()).toBe("2026-09-13T15:59:00.000Z");
  });
});

describe("roastWeekForOrder", () => {
  it("joins the same-week roast when ordered midweek", () => {
    const week = roastWeekForOrder(WEDNESDAY);
    expect(week.roastDate.toISOString()).toBe("2026-09-07T16:00:00.000Z");
    expect(week.dispatchDate.toISOString()).toBe("2026-09-09T16:00:00.000Z");
    expect(week.rolledToNextRoast).toBe(false);
  });

  it("keeps a pre-cutoff Sunday order in the same roast week", () => {
    const week = roastWeekForOrder(SUNDAY_EARLY);
    expect(week.roastDate.toISOString()).toBe("2026-09-07T16:00:00.000Z");
  });

  it("moves a post-cutoff order to the following roast week", () => {
    const week = roastWeekForOrder(MONDAY_AFTER);
    expect(week.roastDate.toISOString()).toBe("2026-09-14T16:00:00.000Z");
    expect(week.dispatchDate.toISOString()).toBe("2026-09-16T16:00:00.000Z");
    expect(week.missedRoastDate?.toISOString()).toBe("2026-09-07T16:00:00.000Z");
  });

  it("omits the missed roast when the cutoff was made", () => {
    expect(roastWeekForOrder(WEDNESDAY).missedRoastDate).toBeUndefined();
  });
});

describe("peakWindow", () => {
  it("opens one week after roast and closes four weeks out", () => {
    const window = peakWindow(new Date("2026-09-07T16:00:00.000Z"));
    expect(window.opensOn.toISOString()).toBe("2026-09-14T16:00:00.000Z");
    expect(window.closesOn.toISOString()).toBe("2026-10-05T16:00:00.000Z");
  });
});

describe("formatting", () => {
  it("formats dates and cutoffs in MYT", () => {
    expect(formatRoastDate(new Date("2026-09-07T16:00:00.000Z"))).toContain("8 Sep");
    expect(formatCutoffDate(new Date("2026-09-06T15:59:00.000Z"))).toContain("MYT");
    expect(formatCutoffDate(new Date("2026-09-06T15:59:00.000Z"))).toContain("11:59");
  });
});
