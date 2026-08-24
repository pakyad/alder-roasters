export const coffeeStatuses = ["available", "low-stock", "sold-out"] as const;
export type CoffeeStatus = (typeof coffeeStatuses)[number];

export const brewMethods = ["filter", "immersion", "espresso"] as const;
export type BrewMethod = (typeof brewMethods)[number];

export const flavourCharacters = [
  "fruit-forward",
  "floral",
  "sweet",
  "chocolatey",
  "spiced",
] as const;
export type FlavourCharacter = (typeof flavourCharacters)[number];

export const grindOptions = ["whole-bean", "filter", "aeropress", "espresso"] as const;
export type GrindOption = (typeof grindOptions)[number];

export interface Money {
  readonly currency: "MYR";
  readonly amount: number;
}

export interface CoffeeSize {
  readonly grams: 250 | 1000;
  readonly price: Money;
}

export interface CoffeeImage {
  readonly src: string;
  readonly alt: string;
}

export interface Coffee {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly status: CoffeeStatus;
  readonly featuredRank: number | null;
  readonly origin: {
    readonly country: string;
    readonly region: string;
    readonly locality: string;
  };
  readonly producer: string;
  readonly altitudeMetres: readonly [number, number];
  readonly varieties: readonly string[];
  readonly process: string;
  readonly harvest: string;
  readonly roastIntent: string;
  readonly taste: {
    readonly summary: string;
    readonly notes: readonly string[];
    readonly characters: readonly FlavourCharacter[];
    readonly brightness: 1 | 2 | 3 | 4 | 5;
    readonly body: 1 | 2 | 3 | 4 | 5;
    /** Position on the accessible taste map: 0 = bright/delicate, 10 = comforting/full. */
    readonly coordinates: {
      readonly brightComforting: number;
      readonly delicateFull: number;
    };
  };
  /** Hue anchor (degrees) driving the parametric packaging colour. */
  readonly packageHue: number;
  /** Archived coffees keep their editorial page but are no longer part of the live range. */
  readonly archived?: boolean;
  readonly brewMethods: readonly BrewMethod[];
  readonly story: {
    readonly place: string;
    readonly process: string;
    readonly roast: string;
    readonly cup: string;
  };
  readonly sizes: readonly CoffeeSize[];
  readonly compatibleGrinds: readonly GrindOption[];
  readonly subscriptionEligible: boolean;
  readonly relatedGuideSlugs: readonly string[];
  readonly images: readonly CoffeeImage[];
}

export interface CoffeeFilters {
  readonly flavour?: FlavourCharacter;
  readonly brewMethod?: BrewMethod;
  readonly availability?: "in-stock" | "sold-out";
}

export type CoffeeSort = "featured" | "price-ascending" | "name";
