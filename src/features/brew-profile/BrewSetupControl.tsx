"use client";

import { useId } from "react";

import {
  brewMethodsForProfile,
  grindersForProfile,
  saveBrewProfile,
  useBrewProfile,
  type ProfileBrewMethod,
  type ProfileGrinder,
} from "./brew-profile";
import styles from "./brew-profile.module.css";

const methodLabels: Record<ProfileBrewMethod, string> = {
  filter: "Pour-over / filter",
  immersion: "Immersion (AeroPress, French press)",
  espresso: "Espresso",
};
const grinderLabels: Record<ProfileGrinder, string> = {
  "no-grinder": "I buy ground coffee",
  "hand-grinder": "Hand grinder",
  "electric-grinder": "Electric grinder",
};

/** Footer utility: remembers how the visitor brews, locally and only locally. */
export function BrewSetupControl() {
  const profile = useBrewProfile();
  const id = useId();

  return (
    <div className={styles.control}>
      <p className={styles.title}>Your brewing setup</p>
      <p className={styles.hint}>
        Stored in this browser only. It tunes grind advice and guide suggestions.
      </p>
      <div className={styles.row}>
        <label className="sr-only" htmlFor={`${id}-method`}>
          How do you brew?
        </label>
        <select
          id={`${id}-method`}
          onChange={(event) =>
            saveBrewProfile({
              method: event.target.value as ProfileBrewMethod,
              grinder: profile?.grinder ?? "no-grinder",
            })
          }
          value={profile?.method ?? ""}
        >
          <option disabled value="">
            How do you brew?
          </option>
          {brewMethodsForProfile.map((method) => (
            <option key={method} value={method}>
              {methodLabels[method]}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor={`${id}-grinder`}>
          Your grinder
        </label>
        <select
          id={`${id}-grinder`}
          onChange={(event) =>
            saveBrewProfile({
              method: profile?.method ?? "filter",
              grinder: event.target.value as ProfileGrinder,
            })
          }
          value={profile?.grinder ?? ""}
        >
          <option disabled value="">
            Your grinder
          </option>
          {grindersForProfile.map((grinder) => (
            <option key={grinder} value={grinder}>
              {grinderLabels[grinder]}
            </option>
          ))}
        </select>
        {profile && (
          <button className={styles.clear} onClick={() => saveBrewProfile(null)} type="button">
            Forget
          </button>
        )}
      </div>
    </div>
  );
}
