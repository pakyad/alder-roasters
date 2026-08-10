import Image from "next/image";

import type { Coffee } from "../../domain/coffee";

import styles from "./catalogue.module.css";

export function ProductBag({ coffee, priority = false }: { coffee: Coffee; priority?: boolean }) {
  return (
    <div className={styles.bagStage}>
      <Image
        alt=""
        aria-hidden="true"
        className={styles.bagImage}
        fill
        priority={priority}
        sizes="(max-width: 700px) 88vw, (max-width: 1100px) 42vw, 28vw"
        src="/images/products/coffee-bag-master.webp"
      />
      <div className={styles.bagLabel}>
        <span className={styles.bagMark}>ALDER</span>
        <strong>{coffee.name}</strong>
        <span>{coffee.origin.country}</span>
        <span>
          {coffee.process} · {coffee.sizes[0].grams}g
        </span>
      </div>
      <span className="sr-only">
        A bag of {coffee.name} coffee from {coffee.origin.region}, {coffee.origin.country}
      </span>
    </div>
  );
}
