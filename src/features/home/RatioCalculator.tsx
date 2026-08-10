"use client";

import { useId, useState } from "react";

import styles from "./editorial.module.css";

type RatioCalculatorProps = {
  coffeeGrams: number;
  waterGrams: number;
};

export function RatioCalculator({ coffeeGrams, waterGrams }: RatioCalculatorProps) {
  const inputId = useId();
  const [coffee, setCoffee] = useState(coffeeGrams);
  const ratio = waterGrams / coffeeGrams;
  const water = Math.round(coffee * ratio);

  return (
    <div className={styles.calculator} aria-labelledby={`${inputId}-title`}>
      <p className="eyebrow" id={`${inputId}-title`}>
        Scale this recipe
      </p>
      <label htmlFor={inputId}>Coffee dose</label>
      <div className={styles.inputUnit}>
        <input
          id={inputId}
          inputMode="decimal"
          min="1"
          max="100"
          onChange={(event) => {
            const next = Number(event.target.value);
            if (Number.isFinite(next) && next > 0) setCoffee(next);
          }}
          type="number"
          value={coffee}
        />
        <span>g</span>
      </div>
      <p className={styles.ratioResult} aria-live="polite">
        Use <strong>{water}g water</strong>
      </p>
      <p className="text-secondary">
        Same 1:{ratio.toFixed(1)} ratio, rounded to the nearest gram.
      </p>
    </div>
  );
}
