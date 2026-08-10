import {
  brewMethods,
  coffeeStatuses,
  flavourCharacters,
  type Coffee,
  type CoffeeFilters,
  type CoffeeSort,
} from "./coffee";

export function filterCoffees(
  coffees: readonly Coffee[],
  filters: CoffeeFilters,
): readonly Coffee[] {
  return coffees.filter((coffee) => {
    if (filters.flavour && !coffee.taste.characters.includes(filters.flavour)) return false;
    if (filters.brewMethod && !coffee.brewMethods.includes(filters.brewMethod)) return false;
    if (filters.availability === "in-stock" && coffee.status === "sold-out") return false;
    if (filters.availability === "sold-out" && coffee.status !== "sold-out") return false;
    return true;
  });
}

export function sortCoffees(coffees: readonly Coffee[], sort: CoffeeSort): readonly Coffee[] {
  const copy = [...coffees];
  if (sort === "name") return copy.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "price-ascending")
    return copy.sort((a, b) => a.sizes[0].price.amount - b.sizes[0].price.amount);
  return copy.sort(
    (a, b) =>
      (a.featuredRank ?? Number.MAX_SAFE_INTEGER) - (b.featuredRank ?? Number.MAX_SAFE_INTEGER),
  );
}

export function parseCoffeeFilters(params: URLSearchParams): CoffeeFilters {
  const flavour = params.get("flavour");
  const brewMethod = params.get("brew");
  const availability = params.get("availability");
  return {
    ...(flavourCharacters.includes(flavour as never)
      ? { flavour: flavour as CoffeeFilters["flavour"] }
      : {}),
    ...(brewMethods.includes(brewMethod as never)
      ? { brewMethod: brewMethod as CoffeeFilters["brewMethod"] }
      : {}),
    ...(availability === "in-stock" || availability === "sold-out" ? { availability } : {}),
  };
}

export function isCoffeeStatus(value: string): boolean {
  return coffeeStatuses.includes(value as never);
}
