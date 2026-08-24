"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Coffee, GrindOption } from "../../domain/coffee";
import { formatMoney } from "../../lib/money";
import styles from "./catalogue.module.css";
import barStyles from "./sticky-bar.module.css";

export interface ProductSelection {
  readonly productId: string;
  readonly sizeGrams: 250 | 1000;
  readonly grind: GrindOption;
  readonly purchaseType: "one-time" | "subscription";
  readonly cadenceWeeks?: 4;
  readonly quantity: 1;
}

export type AddProductHandler = (selection: ProductSelection) => void;

export function PurchaseConfigurator({
  coffee,
  onAdd,
}: {
  coffee: Coffee;
  onAdd?: AddProductHandler;
}) {
  const [sizeGrams, setSizeGrams] = useState<250 | 1000>(250);
  const [grind, setGrind] = useState<GrindOption>("whole-bean");
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const [message, setMessage] = useState("");
  const [condensed, setCondensed] = useState(false);
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const size = coffee.sizes.find((entry) => entry.grams === sizeGrams) ?? coffee.sizes[0];
  const subscriptionPrice = useMemo(
    () => ({ ...size.price, amount: Math.round(size.price.amount * 0.9) }),
    [size],
  );
  const displayedPrice = purchaseType === "subscription" ? subscriptionPrice : size.price;
  const soldOut = coffee.status === "sold-out";

  useEffect(() => {
    const form = formRef.current;
    if (!form || soldOut) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCondensed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [soldOut]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    add();
  }

  function add() {
    const selection: ProductSelection = {
      productId: coffee.id,
      sizeGrams,
      grind,
      purchaseType,
      ...(purchaseType === "subscription" ? { cadenceWeeks: 4 as const } : {}),
      quantity: 1,
    };
    if (onAdd) onAdd(selection);
    else
      window.dispatchEvent(
        new CustomEvent<ProductSelection>("alder:add-to-cart", { detail: selection }),
      );
    setMessage(`${coffee.name}, ${sizeGrams}g, ${grind.replace("-", " ")} added.`);
  }

  return (
    <>
      <form className={styles.configurator} onSubmit={submit} ref={formRef} id={formId}>
        <fieldset>
          <legend>Size</legend>
          <div className={styles.optionRow}>
            {coffee.sizes.map((entry) => (
              <label key={entry.grams}>
                <input
                  checked={sizeGrams === entry.grams}
                  name="size"
                  onChange={() => setSizeGrams(entry.grams)}
                  type="radio"
                />{" "}
                <span>{entry.grams}g</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Grind</legend>
          <select
            aria-label="Grind"
            aria-describedby="grind-help"
            value={grind}
            onChange={(event) => setGrind(event.target.value as GrindOption)}
          >
            {coffee.compatibleGrinds.map((option) => (
              <option key={option} value={option}>
                {option.replace("-", " ")}
              </option>
            ))}
          </select>
          <p id="grind-help" className={styles.help}>
            Whole bean stays freshest; choose a ground option if you do not have a grinder.
          </p>
        </fieldset>
        <fieldset>
          <legend>Purchase</legend>
          <div className={styles.purchaseOptions}>
            <label>
              <input
                checked={purchaseType === "one-time"}
                name="purchase"
                onChange={() => setPurchaseType("one-time")}
                type="radio"
              />{" "}
              <span>
                <strong>One-time</strong>
                <small>{formatMoney(size.price)}</small>
              </span>
            </label>
            <label className={!coffee.subscriptionEligible ? styles.disabledOption : ""}>
              <input
                checked={purchaseType === "subscription"}
                disabled={!coffee.subscriptionEligible}
                name="purchase"
                onChange={() => setPurchaseType("subscription")}
                type="radio"
              />{" "}
              <span>
                <strong>Subscribe & save 10%</strong>
                <small>
                  {coffee.subscriptionEligible
                    ? `${formatMoney(subscriptionPrice)} every 4 weeks · pause or cancel anytime`
                    : "Not available for this coffee"}
                </small>
              </span>
            </label>
          </div>
        </fieldset>
        <div className={styles.priceRegion} aria-live="polite">
          <strong>{formatMoney(displayedPrice)}</strong>
          {purchaseType === "subscription" && <span> every 4 weeks</span>}
        </div>
        <button className={styles.addButton} disabled={soldOut} type="submit">
          {soldOut
            ? "Currently sold out"
            : purchaseType === "subscription"
              ? "Add subscription"
              : "Add to cart"}
        </button>
        <p className={styles.feedback} aria-live="polite">
          {message}
        </p>
      </form>

      {!soldOut && condensed && typeof document !== "undefined"
        ? createPortal(
            <div className={barStyles.bar} role="region" aria-label="Quick add">
              <div className={barStyles.info}>
                <p className={barStyles.name}>{coffee.name}</p>
                <p className={barStyles.config}>
                  {sizeGrams}g · {grind.replace("-", " ")} ·{" "}
                  {purchaseType === "subscription" ? "every 4 weeks" : "one-time"}
                </p>
              </div>
              <p className={barStyles.price} aria-live="polite">
                {formatMoney(displayedPrice)}
              </p>
              <button className={barStyles.add} form={formId} type="submit">
                Add to cart
              </button>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
