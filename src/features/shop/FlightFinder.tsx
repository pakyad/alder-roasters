"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui";
import type { BrewMethod, Coffee, FlavourCharacter } from "@/domain/coffee";
import { flavourCharacters } from "@/domain/coffee";
import { matchFlight, moodOptions, type MoodOption } from "@/domain/flight";
import { formatMoney } from "@/lib/money";
import { ProductBag } from "../catalogue/ProductBag";
import styles from "./flight-finder.module.css";

/**
 * Tasting-flight finder.
 *
 * Three calm questions, one composed trio. Each pick is a real bag with a
 * role — opener, pivot, closer — and adding the flight drops the three
 * configured bags straight into the cart. No funnel, no email gate.
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
          <span>How should the cup feel?</span>
          <select onChange={(event) => setMood(event.target.value as MoodOption)} value={mood}>
            {moodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Any flavour in mind?</span>
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
          <span>What&rsquo;s your brewer?</span>
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

      <div className={styles.picksHead}>
        <p className="eyebrow">Your three bags</p>
        <p className={styles.picksNote}>Chosen to open, pivot and close — tasted as one set.</p>
      </div>
      <ol className={styles.picks} key={`${mood}|${character}|${method}`}>
        {picks.map((pick, index) => (
          <li
            key={pick.coffee.id}
            className={styles.pick}
            style={
              { "--pick-index": index, "--row-hue": pick.coffee.packageHue } as React.CSSProperties
            }
          >
            <Link
              className={styles.pickCard}
              href={`/shop/${pick.coffee.slug}`}
              transitionTypes={["nav-forward"]}
            >
              <span aria-hidden="true" className={styles.pickBag}>
                <ProductBag bare coffee={pick.coffee} />
              </span>
              <span className={styles.pickBody}>
                <span className={styles.pickRole}>{pick.reason}</span>
                <span className={styles.pickName}>{pick.coffee.name}</span>
                <span className={styles.pickTaste}>{pick.coffee.taste.summary}</span>
                <span className={styles.pickMeta}>
                  {formatMoney(pick.coffee.sizes[0].price)} · 250g
                  <span aria-hidden="true" className={styles.pickArrow}>
                    →
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className={styles.action}>
        <Button onClick={addFlight}>
          Add the flight — three 250g bags, {formatMoney({ currency: "MYR", amount: total })}
        </Button>
        <p className={styles.terms}>
          One-off purchase · whole bean · shipped with this week&rsquo;s roast
        </p>
      </div>
    </div>
  );
}
