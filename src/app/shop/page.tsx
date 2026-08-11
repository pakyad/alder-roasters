import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "../../components/ui";
import { coffees } from "../../content/coffees";
import { filterCoffees, parseCoffeeFilters, sortCoffees } from "../../domain/catalogue";
import type { CoffeeSort } from "../../domain/coffee";
import { CatalogueFilters, ProductPlate } from "../../features/catalogue";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop coffee",
  description: "Explore ALDER's small, seasonal range by flavour, brew method and availability.",
};

type Search = Record<string, string | string[] | undefined>;
const sorts: readonly CoffeeSort[] = ["featured", "price-ascending", "name"];

export default async function ShopPage({ searchParams }: { searchParams: Promise<Search> }) {
  const raw = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw))
    if (typeof value === "string") params.set(key, value);
  const filters = parseCoffeeFilters(params);
  const requestedSort = params.get("sort") as CoffeeSort;
  const sort = sorts.includes(requestedSort) ? requestedSort : "featured";
  const results = sortCoffees(filterCoffees(coffees, filters), sort);
  return (
    <div className={styles.main}>
      <Container>
        <header className={styles.intro}>
          <p className="eyebrow">Coffee / current release</p>
          <h1>What is on the shelf.</h1>
          <p className="lead">
            Choose by the way it tastes or the way you brew. Prices start at 250g.
          </p>
        </header>
        <div className={styles.tools}>
          <p aria-live="polite">
            <strong>{results.length}</strong> {results.length === 1 ? "coffee" : "coffees"}
          </p>
          <form className={styles.sort} action="/shop">
            <label htmlFor="catalogue-sort">Sort by</label>
            <select id="catalogue-sort" name="sort" defaultValue={sort}>
              <option value="featured">Featured</option>
              <option value="price-ascending">Price: low to high</option>
              <option value="name">Name</option>
            </select>
            {filters.flavour && <input type="hidden" name="flavour" value={filters.flavour} />}
            {filters.brewMethod && <input type="hidden" name="brew" value={filters.brewMethod} />}
            {filters.availability && (
              <input type="hidden" name="availability" value={filters.availability} />
            )}
            <button type="submit">Apply</button>
          </form>
        </div>
        <CatalogueFilters filters={filters} sort={sort} resultCount={results.length} />
        <section className={styles.grid} aria-label="Coffee results">
          {results.length ? (
            results.map((coffee, index) => (
              <ProductPlate coffee={coffee} key={coffee.id} priority={index < 3} />
            ))
          ) : (
            <div className={styles.empty}>
              <h2>No coffees match just yet.</h2>
              <p>Clear the filters and explore the full seasonal range.</p>
              <Link href={`/shop?sort=${sort}`}>View all coffees</Link>
            </div>
          )}
        </section>
        <p className={styles.seasonNote}>
          Sold-out lots remain in the archive. Coffee changes with each harvest; the catalogue
          should too.
        </p>
      </Container>
    </div>
  );
}
