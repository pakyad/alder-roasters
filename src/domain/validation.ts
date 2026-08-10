import type { Coffee } from "./coffee";
import type { BrewGuide } from "./guide";

export function validateContent(
  coffees: readonly Coffee[],
  guides: readonly BrewGuide[],
): readonly string[] {
  const errors: string[] = [];
  const coffeeIds = new Set<string>();
  const coffeeSlugs = new Set<string>();
  const guideSlugs = new Set(guides.map((guide) => guide.slug));

  for (const coffee of coffees) {
    if (coffeeIds.has(coffee.id)) errors.push(`Duplicate coffee id: ${coffee.id}`);
    if (coffeeSlugs.has(coffee.slug)) errors.push(`Duplicate coffee slug: ${coffee.slug}`);
    coffeeIds.add(coffee.id);
    coffeeSlugs.add(coffee.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(coffee.slug))
      errors.push(`Invalid coffee slug: ${coffee.slug}`);
    if (coffee.sizes.length === 0) errors.push(`Coffee has no sizes: ${coffee.id}`);
    for (const size of coffee.sizes) {
      if (!Number.isSafeInteger(size.price.amount) || size.price.amount <= 0)
        errors.push(`Invalid price: ${coffee.id}/${size.grams}`);
    }
    for (const guideSlug of coffee.relatedGuideSlugs) {
      if (!guideSlugs.has(guideSlug)) errors.push(`Unknown guide ${guideSlug} on ${coffee.id}`);
    }
  }

  for (const guide of guides) {
    for (const coffeeId of guide.recommendedCoffeeIds) {
      if (!coffeeIds.has(coffeeId)) errors.push(`Unknown coffee ${coffeeId} on ${guide.slug}`);
    }
  }
  return errors;
}
