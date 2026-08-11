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
  Kenya: { accent: "#6f3b32", stage: "#d3cbc0" },
  Colombia: { accent: "#786541", stage: "#d6d0c5" },
  Indonesia: { accent: "#445149", stage: "#cbc9bf" },
  Ethiopia: { accent: "#665347", stage: "#d8d1c6" },
  Malaysia: { accent: "#405955", stage: "#c8ceca" },
  Guatemala: { accent: "#59463d", stage: "#d0c8c1" },
  Rwanda: { accent: "#584957", stage: "#cec8cc" },
  default: { accent: "#493a31", stage: "#d5cec3" },
};
