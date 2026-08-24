"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui";
import type { BrewMethod, Coffee, FlavourCharacter } from "@/domain/coffee";
import { flavourCharacters } from "@/domain/coffee";
import { matchFlight, moodOptions, type MoodOption } from "@/domain/flight";
import { formatMoney } from "@/lib/money";
import styles from "./flight-finder.module.css";

/**
 * Tasting-flight finder.
 *
 * Three calm questions, a deterministic recommendation, and full reasoning on
 * screen. Adding the flight drops three configured bags straight into the cart
 * — no funnel, no email gate.
 */
export function FlightFinder({ coffees }: { coffees: readonly Coffee[] }) {
  const [mood, setMood] = useState<MoodOption>("balanced");
  const [character, setCharacter] = useState<FlavourCharacter | "">("");
  const [method, setMethod] = useState<BrewMethod | "">("");

  const picks = useMemo(
    () =>
      matchFlight(
        {
          mood,
          character: character || undefined,
          brewMethod: method || undefined,
        },
        coffees,
      ),
    [coffees, mood, character, method],
  );

  const total = picks.reduce((sum, pick) => sum + pick.coffee.sizes[0].price.amount, 0);

  const addFlight = () => {
    for (const pick of picks) {
      window.dispatchEvent(
        new CustomEvent("alder:add-to-cart", {
          detail: {
            productId: pick.coffee.id,
            sizeGrams: 250,
            grind: "whole-bean",
            purchaseType: "one-time",
            quantity: 1,
          },
        }),
      );
    }
  };

  return (
    <div className={styles.finder}>
      <div className={styles.controls}>
        <label>
          <span>How do you want the cup to feel?</span>
          <select onChange={(event) => setMood(event.target.value as MoodOption)} value={mood}>
            {moodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Any flavour pull? Optional.</span>
          <select
            onChange={(event) => setCharacter(event.target.value as FlavourCharacter | "")}
            value={character}
          >
            <option value="">No preference</option>
            {flavourCharacters.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Your brewer? Optional.</span>
          <select
            onChange={(event) => setMethod(event.target.value as BrewMethod | "")}
            value={method}
          >
            <option value="">Any method</option>
            <option value="filter">Pour-over / filter</option>
            <option value="immersion">Immersion</option>
            <option value="espresso">Espresso</option>
          </select>
        </label>
      </div>

      <ol
        className={styles.picks}
        role="list"
        key={`${mood}|${character}|${method}`}
      >
        {picks.map((pick, index) => (
          <li
            key={pick.coffee.id}
            className={styles.pick}
            style={{ "--pick-index": index } as React.CSSProperties}
          >
            <p className={styles.reason}>{pick.reason}</p>
            <p className={styles.pickMeta}>
              {pick.coffee.name} · {pick.coffee.taste.summary}
            </p>
          </li>
        ))}
      </ol>

      <div className={styles.action}>
        <Button onClick={addFlight}>Add the flight — three 250g bags, {formatMoney({ currency: "MYR", amount: total })}</Button>
        <p className={styles.terms}>One-off purchase · whole bean · shipped with this week&rsquo;s roast</p>
      </div>
    </div>
  );
}
