"use client";

import { useBrewProfile } from "@/features/brew-profile/brew-profile";
import type { Coffee } from "@/domain/coffee";
import styles from "./grind-advice.module.css";

const methodToGrind: Record<string, string> = {
  filter: "filter",
  immersion: "aeropress",
  espresso: "espresso",
};

/** Quiet personalisation: adapts the grind suggestion to the remembered setup. */
export function GrindAdvice({ coffee }: { coffee: Coffee }) {
  const profile = useBrewProfile();
  if (!profile) return null;
  const preferred = methodToGrind[profile.method];
  if (!preferred || !coffee.compatibleGrinds.includes(preferred as never)) return null;
  if (preferred !== "espresso" && profile.grinder === "no-grinder") {
    return (
      <p className={styles.note} role="status">
        For your {labelMethod(profile.method)}, choose the <strong>{label(preferred)}</strong> grind
        below — no grinder needed.
      </p>
    );
  }
  return (
    <p className={styles.note} role="status">
      Brewing {labelMethod(profile.method)}? The <strong>{label(preferred)}</strong> grind is your
      best starting point.
    </p>
  );
}

function label(grind: string): string {
  return grind === "whole-bean" ? "Whole bean" : grind.charAt(0).toUpperCase() + grind.slice(1);
}
function labelMethod(method: string): string {
  return method === "espresso" ? "espresso" : `${method}`;
}
