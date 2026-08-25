import type { BrewMethod, Coffee, FlavourCharacter } from "./coffee";

/**
 * Deterministic tasting-flight matching.
 *
 * The finder is deliberately not a quiz funnel: it scores the live range
 * against three calm preferences and always explains its reasoning through
 * each coffee's own taste data. Results are stable for identical input.
 *
 * Each pick carries a role in the flight — opener, pivot, closer — so the
 * trio reads as one composed set rather than three similar bags.
 */

export const moodOptions = ["bright", "balanced", "cozy"] as const;
export type MoodOption = (typeof moodOptions)[number];

export interface FlightPreferences {
  readonly character?: FlavourCharacter;
  readonly brewMethod?: BrewMethod;
  readonly mood: MoodOption;
}

export interface FlightPick {
  readonly coffee: Coffee;
  /** Why this coffee is in the flight, in plain language. */
  readonly reason: string;
  /** The part this bag plays in the trio. */
  readonly role: "opens" | "pivots" | "closes";
}

const ROLE_COPY: Record<FlightPick["role"], string> = {
  opens: "Opens the flight",
  pivots: "Holds the middle",
  closes: "Closes it slow",
};

/** Target position on the bright↔comforting axis for each mood. */
const MOOD_TARGETS: Record<MoodOption, number> = {
  bright: 1.5,
  balanced: 4.5,
  cozy: 8,
};

export function matchFlight(
  preferences: FlightPreferences,
  catalogue: readonly Coffee[],
): FlightPick[] {
  const eligible = catalogue.filter((coffee) => !coffee.archived);
  if (eligible.length === 0) return [];

  const target = MOOD_TARGETS[preferences.mood];
  const scored = eligible
    .map((coffee) => {
      let score = -Math.abs(coffee.taste.coordinates.brightComforting - target) * 1.5;
      if (preferences.character && coffee.taste.characters.includes(preferences.character)) {
        score += 3;
      }
      if (preferences.brewMethod && coffee.brewMethods.includes(preferences.brewMethod)) {
        score += 2;
      }
      return { coffee, score };
    })
    .sort((a, b) => b.score - a.score || rankOf(a.coffee) - rankOf(b.coffee));

  const roles: FlightPick["role"][] = ["opens", "pivots", "closes"];
  return scored.slice(0, Math.min(3, scored.length)).map(({ coffee }, index) => ({
    coffee,
    reason: pickReason(roles[index], preferences, coffee, index === 1 && scored.length > 2),
    role: roles[index],
  }));
}

/**
 * One calm sentence per bag, phrased for its role so no two picks read alike.
 * The pivot mentions the flavour preference when one was given.
 */
function pickReason(
  role: FlightPick["role"],
  preferences: FlightPreferences,
  coffee: Coffee,
  isPivot: boolean,
): string {
  const flavour = isPivot && preferences.character ? ` ${preferences.character} character` : "";
  switch (role) {
    case "opens":
      return `${ROLE_COPY.opens} — bright and aromatic${flavour}.`;
    case "pivots":
      return `${ROLE_COPY.pivots} — the${flavour || " balanced"} heart of the set.`;
    case "closes":
      return `${ROLE_COPY.closes} — round, comforting, unhurried.`;
  }
}

function rankOf(coffee: Coffee): number {
  return coffee.featuredRank ?? 99;
}
