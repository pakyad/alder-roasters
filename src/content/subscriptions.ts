import type { SubscriptionPlan } from "../domain/subscription";

export const subscriptionPlans = [
  {
    id: "roasters-choice",
    name: "Roaster's Choice",
    promise: "A different seasonal coffee selected for balance, clarity and variety.",
    quantities: [1, 2, 3],
    bagGrams: 250,
    compatibleGrinds: ["whole-bean", "filter", "aeropress", "espresso"],
    cadencesWeeks: [2, 4],
    pricePerBag: { currency: "MYR", amount: 5400 },
    dispatchRule: "Roasted on Monday and dispatched on Tuesday after each renewal.",
    flexibilityTerms:
      "Pause, change or cancel before the next renewal. This demonstration does not create a real subscription.",
  },
  {
    id: "stay-with-one",
    name: "Stay With One",
    promise: "Keep a dependable current coffee in your routine while that harvest lasts.",
    quantities: [1, 2, 3],
    bagGrams: 250,
    compatibleGrinds: ["whole-bean", "filter", "aeropress", "espresso"],
    cadencesWeeks: [2, 4],
    pricePerBag: { currency: "MYR", amount: 4700 },
    dispatchRule: "Roasted on Monday and dispatched on Tuesday after each renewal.",
    flexibilityTerms:
      "Pause, change or cancel before the next renewal. If the harvest ends, choose a replacement before another box is prepared.",
    fixedCoffeeId: "coffee-sabah-kundasang",
  },
] as const satisfies readonly SubscriptionPlan[];
