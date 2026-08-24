import type { Coffee } from "../../domain/coffee";

import styles from "./catalogue.module.css";

/**
 * Parametric packaging.
 *
 * Each coffee's bag is rendered deterministically in SVG from its own data:
 * `packageHue` drives a colour-mix'd material family, and every typographic
 * element on the label is real content (also present as page text elsewhere).
 * No photography is required, so new coffees ship with zero image assets.
 */

export function ProductBag({
  coffee,
  bare = false,
}: {
  coffee: Coffee;
  priority?: boolean;
  /** Render the artwork only — no stage background (for peeks and morphs). */
  bare?: boolean;
}) {
  const hue = coffee.packageHue;
  return (
    <div
      className={bare ? styles.bagStageBare : styles.bagStage}
      style={
        {
          "--bag-hue": String(hue),
        } as React.CSSProperties
      }
    >
      <svg
        aria-hidden="true"
        className={styles.bagSvg}
        focusable="false"
        viewBox="0 0 320 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id={`bag-body-${coffee.id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={`oklch(0.66 0.105 ${hue})`} />
            <stop offset="0.55" stopColor={`oklch(0.60 0.115 ${hue})`} />
            <stop offset="1" stopColor={`oklch(0.50 0.105 ${hue})`} />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id={`bag-fold-${coffee.id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={`oklch(0.44 0.085 ${hue})`} />
            <stop offset="1" stopColor={`oklch(0.38 0.075 ${hue})`} />
          </linearGradient>
        </defs>

        {/* floor shadow */}
        <ellipse cx="160" cy="374" fill="oklch(0.24 0.035 165 / 0.16)" rx="118" ry="12" />

        {/* gusset edges */}
        <rect fill={`oklch(0.46 0.095 ${hue})`} height="286" width="14" x="46" y="76" />
        <rect fill={`oklch(0.46 0.095 ${hue})`} height="286" width="14" x="260" y="76" />

        {/* main body */}
        <rect fill={`url(#bag-body-${coffee.id})`} height="286" rx="8" width="228" x="46" y="76" />

        {/* top crimp */}
        <rect fill={`url(#bag-fold-${coffee.id})`} height="30" rx="6" width="228" x="46" y="46" />
        <line stroke={`oklch(0.33 0.06 ${hue})`} strokeWidth="2" x1="54" x2="266" y1="61" y2="61" />
        <rect fill={`oklch(0.40 0.08 ${hue})`} height="8" width="228" x="46" y="76" />

        {/* sheen */}
        <rect fill="oklch(0.99 0.01 95 / 0.10)" height="286" width="34" x="64" y="76" rx="8" />

        {/* label plate */}
        <g className={styles.bagPlate}>
          <rect fill="var(--color-surface-raised)" height="150" stroke="var(--color-ink)" strokeWidth="1.5" width="164" x="78" y="152" />
          <text className={styles.bagWordmark} x="160" y="178">ALDER</text>
          <line stroke="var(--color-border-strong)" strokeWidth="1" x1="94" x2="226" y1="188" y2="188" />
          <text className={styles.bagName} x="160" y="216">{coffee.name}</text>
          <text className={styles.bagOrigin} x="160" y="238">
            {coffee.origin.country.toUpperCase()}
          </text>
          <text className={styles.bagMeta} x="160" y="258">
            {`${coffee.process} · ${coffee.sizes[0].grams}G`}
          </text>
          <line stroke="var(--color-border-subtle)" strokeWidth="1" x1="94" x2="226" y1="272" y2="272" />
          <text className={styles.bagLot} x="160" y="290">{`LOT ${coffee.harvest}`}</text>
        </g>
      </svg>
      <span className="sr-only">
        A bag of {coffee.name} coffee from {coffee.origin.region}, {coffee.origin.country}
      </span>
    </div>
  );
}

/** Reverse of the packaging: lot notation, roast stamp and brew guidance. */
export function ProductBagBack({ coffee }: { coffee: Coffee }) {
  const hue = coffee.packageHue;
  return (
    <div className={styles.bagStage} style={{ "--bag-hue": String(hue) } as React.CSSProperties}>
      <svg
        aria-hidden="true"
        className={styles.bagSvg}
        viewBox="0 0 320 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill={`oklch(0.58 0.10 ${hue})`} height="316" rx="8" width="228" x="46" y="46" />
        <rect fill={`oklch(0.50 0.095 ${hue})`} height="30" rx="6" width="228" x="46" y="46" />
        <rect fill="var(--color-surface-raised)" height="230" stroke="var(--color-ink)" strokeWidth="1.5" width="180" x="70" y="96" />
        <text className={styles.bagBackHeading} x="160" y="126">BREW NOTES</text>
        <foreignObject height="150" width="156" x="82" y="140">
          <div className={styles.bagBackCopy}>{coffee.roastIntent}</div>
        </foreignObject>
        <line stroke="var(--color-border-subtle)" strokeWidth="1" x1="86" x2="234" y1="292" y2="292" />
        <text className={styles.bagLot} x="160" y="308">{`LOT ${coffee.harvest} · ${coffee.origin.locality.toUpperCase()}`}</text>
      </svg>
      <span className="sr-only">The reverse of the {coffee.name} bag with brewing notes</span>
    </div>
  );
}
