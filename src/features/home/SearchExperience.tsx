"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { coffees } from "../../content/coffees";
import { brewGuides } from "../../content/guides";
import { searchContent } from "../../lib/search";
import styles from "./editorial.module.css";

export function SearchExperience() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchContent(query, coffees, brewGuides), [query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <label className={styles.searchLabel} htmlFor="site-search">
        Search coffees and brew guides
      </label>
      <input
        autoComplete="off"
        autoFocus
        className={styles.searchInput}
        id="site-search"
        onChange={(event) => setQuery(event.target.value.slice(0, 100))}
        placeholder="Try peach, Kenya or AeroPress"
        type="search"
        value={query}
      />
      <p className={styles.resultCount} aria-live="polite">
        {hasQuery
          ? `${results.length} ${results.length === 1 ? "result" : "results"}`
          : "Start with a flavour, place or brew method."}
      </p>
      {hasQuery && results.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Nothing matched that search</h2>
          <p>
            Try a broader word such as “fruit”, “filter” or “espresso”, or browse the complete
            seasonal range.
          </p>
          <Link href="/shop">Browse all coffees</Link>
        </div>
      ) : (
        <ul className={styles.searchResults}>
          {results.map((result) => (
            <li key={`${result.type}-${result.slug}`}>
              <Link
                href={
                  result.type === "coffee" ? `/shop/${result.slug}` : `/brew-guides/${result.slug}`
                }
              >
                <span className="eyebrow">{result.type}</span>
                <strong>{result.title}</strong>
                <span>{result.context}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
