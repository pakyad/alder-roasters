"use client";

import { useEffect, useState } from "react";

/**
 * Local-only brewing setup memory.
 *
 * The visitor can tell the site how they brew; grind advice and guide
 * suggestions adapt quietly. Nothing leaves the browser and clearing it is one
 * click away in the same control.
 */

export const BREW_PROFILE_KEY = "alder-brew-profile-v1";

export const brewMethodsForProfile = ["filter", "immersion", "espresso"] as const;
export const grindersForProfile = [
  "no-grinder",
  "hand-grinder",
  "electric-grinder",
] as const;

export type ProfileBrewMethod = (typeof brewMethodsForProfile)[number];
export type ProfileGrinder = (typeof grindersForProfile)[number];

export interface BrewProfile {
  readonly method: ProfileBrewMethod;
  readonly grinder: ProfileGrinder;
}

function isProfile(value: unknown): value is BrewProfile {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.method === "string" &&
    brewMethodsForProfile.includes(record.method as ProfileBrewMethod) &&
    typeof record.grinder === "string" &&
    grindersForProfile.includes(record.grinder as ProfileGrinder)
  );
}

export function loadBrewProfile(): BrewProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BREW_PROFILE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveBrewProfile(profile: BrewProfile | null): void {
  if (typeof window === "undefined") return;
  if (!profile) {
    window.localStorage.removeItem(BREW_PROFILE_KEY);
    return;
  }
  window.localStorage.setItem(BREW_PROFILE_KEY, JSON.stringify(profile));
}

/** Reactive hook: null until hydrated, then the stored profile or null. */
export function useBrewProfile(): BrewProfile | null {
  const [profile, setProfile] = useState<BrewProfile | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setProfile(loadBrewProfile()), 0);
    return () => clearTimeout(timer);
  }, []);
  return profile;
}
