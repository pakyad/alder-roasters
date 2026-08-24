import type { BrewGuide } from "../domain/guide";

export const brewGuides = [
  {
    slug: "v60-clear-sweet",
    title: "A clear, sweet V60",
    method: "V60",
    brewMethod: "filter",
    difficulty: "Moderate",
    timeMinutes: 4,
    totalSeconds: 180,
    ratio: { coffeeGrams: 15, waterGrams: 250 },
    equipment: ["V60 brewer", "paper filter", "kettle", "scale", "timer"],
    introduction: "A calm starting recipe for coffees with bright fruit and floral detail.",
    steps: [
      {
        title: "Rinse and prepare",
        instruction: "Rinse the filter, discard the water and add medium-fine coffee.",
      },
      {
        title: "Bloom",
        instruction: "Pour 45g water, wet every ground and wait 40 seconds.",
        atSeconds: 0,
      },
      {
        title: "Build the brew",
        instruction: "Pour gently to 150g, then to 250g by 1:45.",
        atSeconds: 40,
      },
      {
        title: "Finish",
        instruction: "Let the bed drain. Aim for a total time around 3:00.",
        atSeconds: 105,
      },
    ],
    troubleshooting: [
      { problem: "Sour or thin", adjustment: "Grind a little finer or extend the final pour." },
      { problem: "Dry or bitter", adjustment: "Grind a little coarser and keep pours gentle." },
    ],
    recommendedCoffeeIds: [
      "coffee-nyeri-gichathaini",
      "coffee-huila-el-paraiso",
      "coffee-guji-haro-wachhu",
    ],
    image: {
      src: "/images/guides/v60.webp",
      alt: "Water being poured into a V60 brewer on a scale",
    },
  },
  {
    slug: "aeropress-everyday-cup",
    title: "An everyday AeroPress cup",
    method: "AeroPress",
    brewMethod: "immersion",
    difficulty: "Easy",
    timeMinutes: 3,
    totalSeconds: 150,
    ratio: { coffeeGrams: 16, waterGrams: 240 },
    equipment: ["AeroPress", "filter", "kettle", "scale", "timer"],
    introduction: "A forgiving, full-flavoured recipe for mornings when repeatability matters.",
    steps: [
      {
        title: "Set up",
        instruction: "Place a rinsed filter in the cap and add medium-fine coffee.",
      },
      {
        title: "Pour and stir",
        instruction: "Add all 240g water, stir five times and fit the plunger.",
        atSeconds: 0,
      },
      {
        title: "Steep",
        instruction: "Wait until 1:45, then swirl the brewer once.",
        atSeconds: 15,
      },
      {
        title: "Press",
        instruction: "Press slowly for about 30 seconds and stop at the hiss.",
        atSeconds: 105,
      },
    ],
    troubleshooting: [
      { problem: "Cup feels weak", adjustment: "Grind finer before adding more coffee." },
      { problem: "Press is difficult", adjustment: "Grind coarser and press more slowly." },
    ],
    recommendedCoffeeIds: [
      "coffee-kintamani-sukawana",
      "coffee-sabah-kundasang",
      "coffee-antigua-la-labor",
    ],
    image: { src: "/images/guides/aeropress.webp", alt: "An AeroPress brewing over a ceramic cup" },
  },
  {
    slug: "espresso-balanced-shot",
    title: "A balanced home espresso",
    method: "Espresso",
    brewMethod: "espresso",
    difficulty: "Moderate",
    timeMinutes: 5,
    totalSeconds: 32,
    ratio: { coffeeGrams: 18, waterGrams: 36 },
    equipment: ["espresso machine", "grinder", "scale", "timer"],
    introduction:
      "Use yield and taste together: the numbers create a repeatable start, not a pass-or-fail test.",
    steps: [
      {
        title: "Warm and dose",
        instruction: "Warm the group and basket, then dose 18g and distribute evenly.",
      },
      { title: "Extract", instruction: "Aim for 36g espresso in 26–30 seconds.", atSeconds: 0 },
      {
        title: "Taste",
        instruction: "Stir before tasting so the layers are combined.",
        atSeconds: 28,
      },
      {
        title: "Adjust",
        instruction: "Change only the grind, keeping dose and yield stable for the next shot.",
      },
    ],
    troubleshooting: [
      { problem: "Sharp and quick", adjustment: "Grind finer to slow the shot." },
      { problem: "Bitter and slow", adjustment: "Grind coarser to shorten contact time." },
    ],
    recommendedCoffeeIds: [
      "coffee-huila-el-paraiso",
      "coffee-kintamani-sukawana",
      "coffee-sabah-kundasang",
      "coffee-antigua-la-labor",
    ],
    image: {
      src: "/images/guides/espresso.webp",
      alt: "Espresso flowing into a small stoneware cup on a scale",
    },
  },
] as const satisfies readonly BrewGuide[];

export function getBrewGuideBySlug(slug: string): BrewGuide | undefined {
  return brewGuides.find((guide) => guide.slug === slug);
}
