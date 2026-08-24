import type { Coffee } from "./coffee";

/**
 * Seasonal-archive support.
 *
 * Archived coffees keep their editorial page and lead customers to the closest
 * current coffee by accessible taste distance — lifecycle storytelling rather
 * than dead ends.
 */

export interface TasteMatch {
  readonly coffee: Coffee;
  readonly distance: number;
}

export function nearestTasteMatch(
  archived: Coffee,
  catalogue: readonly Coffee[],
): TasteMatch | null {
  const candidates = catalogue.filter((coffee) => !coffee.archived && coffee.id !== archived.id);
  if (candidates.length === 0) return null;
  let best: TasteMatch | null = null;
  for (const candidate of candidates) {
    const distance = Math.hypot(
      candidate.taste.coordinates.brightComforting - archived.taste.coordinates.brightComforting,
      candidate.taste.coordinates.delicateFull - archived.taste.coordinates.delicateFull,
    );
    if (!best || distance < best.distance) best = { coffee: candidate, distance };
  }
  return best;
}
