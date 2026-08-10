import type { GrindOption, Money } from "./coffee";

export interface SubscriptionPlan {
  readonly id: "roasters-choice" | "stay-with-one";
  readonly name: string;
  readonly promise: string;
  readonly quantities: readonly (1 | 2 | 3)[];
  readonly bagGrams: 250;
  readonly compatibleGrinds: readonly GrindOption[];
  readonly cadencesWeeks: readonly (2 | 4)[];
  readonly pricePerBag: Money;
  readonly dispatchRule: string;
  readonly flexibilityTerms: string;
  readonly fixedCoffeeId?: string;
}
