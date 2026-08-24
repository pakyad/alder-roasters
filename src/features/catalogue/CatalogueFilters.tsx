import Link from "next/link";

import type { CoffeeFilters, CoffeeSort } from "../../domain/coffee";
import styles from "./catalogue.module.css";

const labels: Record<string, string> = {
  "fruit-forward": "Fruit-forward",
  floral: "Floral",
  sweet: "Sweet",
  chocolatey: "Chocolatey",
  spiced: "Spiced",
  filter: "Filter",
  immersion: "Immersion",
  espresso: "Espresso",
  "in-stock": "In stock",
  "sold-out": "Sold out",
};

export function CatalogueFilters({
  filters,
  sort,
  resultCount,
}: {
  filters: CoffeeFilters;
  sort: CoffeeSort;
  resultCount: number;
}) {
  const chips = (
    [
      { key: "flavour", value: filters.flavour },
      { key: "brew", value: filters.brewMethod },
      { key: "availability", value: filters.availability },
    ] as const
  ).filter((chip) => typeof chip.value === "string") as readonly {
    key: string;
    value: string;
  }[];

  const hrefWithout = (removedKey: string) => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    for (const chip of chips) {
      if (chip.key !== removedKey) params.set(chip.key, chip.value);
    }
    return `/shop?${params.toString()}`;
  };

  return (
    <aside className={styles.filters} aria-label="Filter coffees">
      <details className={styles.filterDisclosure} open>
        <summary>Filter coffees{chips.length ? ` (${chips.length})` : ""}</summary>
        <form className={styles.filterForm} action="/shop" method="get">
          <label>
            Flavour character
            <select name="flavour" defaultValue={filters.flavour ?? ""}>
              <option value="">All flavours</option>
              <option value="fruit-forward">Fruit-forward</option>
              <option value="floral">Floral</option>
              <option value="sweet">Sweet</option>
              <option value="chocolatey">Chocolatey</option>
              <option value="spiced">Spiced</option>
            </select>
          </label>
          <label>
            Brew method
            <select name="brew" defaultValue={filters.brewMethod ?? ""}>
              <option value="">All methods</option>
              <option value="filter">Filter</option>
              <option value="immersion">Immersion</option>
              <option value="espresso">Espresso</option>
            </select>
          </label>
          <label>
            Availability
            <select name="availability" defaultValue={filters.availability ?? ""}>
              <option value="">Any availability</option>
              <option value="in-stock">In stock</option>
              <option value="sold-out">Sold out</option>
            </select>
          </label>
          <input type="hidden" name="sort" value={sort} />
          <button className={styles.applyButton} type="submit">
            Show {resultCount} {resultCount === 1 ? "coffee" : "coffees"}
          </button>
        </form>
      </details>
      {chips.length > 0 && (
        <div className={styles.activeFilters} aria-label="Active filters">
          <span>Showing:</span>
          {chips.map((chip) => (
            <Link
              className={styles.filterChip}
              href={hrefWithout(chip.key)}
              key={chip.key}
              aria-label={`Remove ${labels[chip.value]} filter`}
            >
              {labels[chip.value]}
              <span aria-hidden="true" className={styles.chipRemove}>
                ×
              </span>
            </Link>
          ))}
          <Link className={styles.clearAll} href={`/shop?sort=${sort}`}>
            Clear all
          </Link>
        </div>
      )}
    </aside>
  );
}
