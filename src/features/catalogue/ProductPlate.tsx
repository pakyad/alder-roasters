import Link from "next/link";

import type { Coffee } from "../../domain/coffee";
import { formatMoney } from "../../lib/money";
import { ProductBag } from "./ProductBag";
import styles from "./catalogue.module.css";

export function ProductPlate({ coffee, priority = false }: { coffee: Coffee; priority?: boolean }) {
  return (
    <article className={styles.plate}>
      <Link
        className={styles.plateImageLink}
        href={`/shop/${coffee.slug}`}
        aria-label={`View ${coffee.name}`}
      >
        <ProductBag coffee={coffee} priority={priority} />
      </Link>
      <div className={styles.plateCopy}>
        <div>
          <p className={styles.origin}>
            {coffee.origin.country} · {coffee.origin.region}
          </p>
          <h2 className={styles.plateTitle}>
            <Link href={`/shop/${coffee.slug}`}>{coffee.name}</Link>
          </h2>
        </div>
        <p className={styles.taste}>{coffee.taste.summary}</p>
        <div className={styles.plateMeta}>
          <span>From {formatMoney(coffee.sizes[0].price)}</span>
          {coffee.status !== "available" && (
            <span className={styles.status}>
              {coffee.status === "low-stock" ? "Low stock" : "Sold out"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
