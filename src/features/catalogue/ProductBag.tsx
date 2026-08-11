import Image from "next/image";
import type { CSSProperties } from "react";

import type { Coffee } from "../../domain/coffee";

import styles from "./catalogue.module.css";

export function ProductBag({ coffee, priority = false }: { coffee: Coffee; priority?: boolean }) {
  const palette = labelPalettes[coffee.origin.country] ?? labelPalettes.default;
  return (
    <div
      className={styles.bagStage}
      style={{ "--label-accent": palette.accent, "--stage-tone": palette.stage } as CSSProperties}
    >
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
        <span className={styles.lotCode}>{coffee.harvest}</span>
      </div>
      <span className="sr-only">
        A bag of {coffee.name} coffee from {coffee.origin.region}, {coffee.origin.country}
      </span>
    </div>
  );
}

const labelPalettes: Record<string, { accent: string; stage: string }> = {
  Kenya: { accent: "#a7472f", stage: "#ded0bc" },
  Colombia: { accent: "#bb7a2e", stage: "#ddd5c7" },
  Indonesia: { accent: "#59664d", stage: "#d4d2c2" },
  Ethiopia: { accent: "#826247", stage: "#e2d8c8" },
  Malaysia: { accent: "#46605a", stage: "#ccd3ca" },
  Guatemala: { accent: "#75513f", stage: "#d8ccc2" },
  Rwanda: { accent: "#6d4b66", stage: "#d8ced4" },
  default: { accent: "#5a3e32", stage: "#e2d7c7" },
};
