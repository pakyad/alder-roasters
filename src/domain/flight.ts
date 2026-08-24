import type { BrewMethod, Coffee, FlavourCharacter } from "./coffee";

/**
 * Deterministic tasting-flight matching.
 *
 * The finder is deliberately not a quiz funnel: it scores the live range
 * against three calm preferences and always explains its reasoning through
 * each coffee's own taste data. Results are stable for identical input.
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
}

/** Target position on the bright↔comforting axis for each mood. */
const MOOD_TARGETS: Record<MoodOption, number> = {
  bright: 1.5,
  balanced: 4.5,
  cozy: 8,
};

const MOOD_LABELS: Record<MoodOption, string> = {
  bright: "leans bright and lively",
  balanced: "sits in the balanced middle",
  cozy: "leans comforting and full",
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
      const reasons: string[] = [`it ${MOOD_LABELS[preferences.mood]}`];
      if (preferences.character && coffee.taste.characters.includes(preferences.character)) {
        score += 3;
        reasons.push(`matches your ${preferences.character} preference`);
      }
      if (preferences.brewMethod && coffee.brewMethods.includes(preferences.brewMethod)) {
        score += 2;
        reasons.push(`brews well as ${labelMethod(preferences.brewMethod)}`);
      }
      return { coffee, score, reasons };
    })
    .sort((a, b) => b.score - a.score || rankOf(a.coffee) - rankOf(b.coffee));

  return scored.slice(0, Math.min(3, scored.length)).map(({ coffee, reasons }) => ({
    coffee,
    reason: formatReason(coffee.name, reasons),
  }));
}

function rankOf(coffee: Coffee): number {
  return coffee.featuredRank ?? 99;
}

function labelMethod(method: BrewMethod): string {
  return method === "espresso" ? "espresso" : `${method} methods`;
}

function formatReason(name: string, reasons: readonly string[]): string {
  const [head, ...rest] = reasons;
  return `${name}: ${[head, ...rest].join(", ")}.`;
}
