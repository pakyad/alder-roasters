import type { Coffee } from "../domain/coffee";
import type { BrewGuide } from "../domain/guide";

export interface SearchResult {
  readonly type: "coffee" | "guide";
  readonly slug: string;
  readonly title: string;
  readonly context: string;
}

export function searchContent(
  query: string,
  coffees: readonly Coffee[],
  guides: readonly BrewGuide[],
): readonly SearchResult[] {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return [];
  const results: SearchResult[] = [];
  for (const coffee of coffees) {
    const context = `${coffee.origin.country} · ${coffee.taste.notes.join(", ")}`;
    const haystack = normalise(
      [
        coffee.name,
        coffee.origin.country,
        coffee.origin.region,
        coffee.process,
        ...coffee.taste.notes,
        ...coffee.brewMethods,
      ].join(" "),
    );
    if (terms.every((term) => haystack.includes(term)))
      results.push({ type: "coffee", slug: coffee.slug, title: coffee.name, context });
  }
  for (const guide of guides) {
    const context = `${guide.method} · ${guide.difficulty} · ${guide.timeMinutes} minutes`;
    const haystack = normalise(
      [guide.title, guide.method, guide.brewMethod, ...guide.equipment].join(" "),
    );
    if (terms.every((term) => haystack.includes(term)))
      results.push({ type: "guide", slug: guide.slug, title: guide.title, context });
  }
  return results;
}

function normalise(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-MY")
    .trim();
}
