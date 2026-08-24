import { describe, expect, it } from "vitest";

import { coffees } from "@/content/coffees";
import { matchFlight, type FlightPreferences } from "../flight";

const base: FlightPreferences = { mood: "balanced" };

describe("matchFlight", () => {
  it("always returns three available coffees for a balanced default", () => {
    const picks = matchFlight(base, coffees);
    expect(picks).toHaveLength(3);
    picks.forEach((pick) => expect(pick.coffee.status).not.toBe("sold-out"));
  });

  it("never includes archived coffees", () => {
    const picks = matchFlight({ mood: "bright" }, coffees);
    picks.forEach((pick) => expect(pick.coffee.archived).toBeUndefined());
  });

  it("prefers bright coffees when the mood is bright", () => {
    const picks = matchFlight({ mood: "bright" }, coffees);
    const xs = picks.map((pick) => pick.coffee.taste.coordinates.brightComforting);
    const avg = xs.reduce((sum, x) => sum + x, 0) / xs.length;
    expect(avg).toBeLessThan(4);
  });

  it("prefers comforting coffees when the mood is cozy", () => {
    const picks = matchFlight({ mood: "cozy" }, coffees);
    const xs = picks.map((pick) => pick.coffee.taste.coordinates.brightComforting);
    const avg = xs.reduce((sum, x) => sum + x, 0) / xs.length;
    expect(avg).toBeGreaterThan(4);
  });

  it("rewards matching flavour character and brew method", () => {
    const picks = matchFlight(
      { ...base, character: "floral", brewMethod: "espresso" },
      coffees,
    );
    const names = picks.map((pick) => pick.coffee.name);
    expect(names).toContain("El Paraíso");
  });

  it("is deterministic for identical preferences", () => {
    const prefs: FlightPreferences = { mood: "cozy", character: "chocolatey" };
    const first = matchFlight(prefs, coffees).map((p) => p.coffee.id);
    const second = matchFlight(prefs, coffees).map((p) => p.coffee.id);
    expect(first).toEqual(second);
  });

  it("returns reasons that name the coffee", () => {
    const [first] = matchFlight(base, coffees);
    expect(first.reason).toMatch(new RegExp(`^${first.coffee.name}:`));
  });

  it("handles an empty catalogue", () => {
    expect(matchFlight(base, [])).toEqual([]);
  });
});
