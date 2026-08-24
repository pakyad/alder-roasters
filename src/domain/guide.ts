import type { BrewMethod } from "./coffee";

export interface BrewGuideStep {
  readonly title: string;
  readonly instruction: string;
  readonly atSeconds?: number;
}

export interface BrewGuide {
  readonly slug: string;
  readonly title: string;
  readonly method: string;
  readonly brewMethod: BrewMethod;
  readonly difficulty: "Easy" | "Moderate";
  readonly timeMinutes: number;
  /** Total length of the timed brew, powering the guided timer. */
  readonly totalSeconds: number;
  readonly ratio: { readonly coffeeGrams: number; readonly waterGrams: number };
  readonly equipment: readonly string[];
  readonly introduction: string;
  readonly steps: readonly BrewGuideStep[];
  readonly troubleshooting: readonly { readonly problem: string; readonly adjustment: string }[];
  readonly recommendedCoffeeIds: readonly string[];
  readonly image: { readonly src: string; readonly alt: string };
}
