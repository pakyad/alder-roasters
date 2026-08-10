import { describe, expect, it } from "vitest";
import { coffees } from "../../content/coffees";
import { filterCoffees, isCoffeeStatus, parseCoffeeFilters, sortCoffees } from "../catalogue";

describe("catalogue filtering", () => {
  it("combines flavour, brew method and availability", () => {
    const result = filterCoffees(coffees, {
      flavour: "floral",
      brewMethod: "filter",
      availability: "in-stock",
    });
    expect(result.map((coffee) => coffee.slug)).toEqual([
      "nyeri-gichathaini",
      "huila-el-paraiso",
      "guji-haro-wachhu",
    ]);
  });

  it("recovers from malformed URL values", () => {
    const filters = parseCoffeeFilters(
      new URLSearchParams("flavour=unknown&brew=filter&availability=maybe"),
    );
    expect(filters).toEqual({ brewMethod: "filter" });
  });

  it("sorts without mutating the catalogue", () => {
    const original = coffees.map((coffee) => coffee.id);
    const sorted = sortCoffees(coffees, "price-ascending");
    expect(sorted[0].slug).toBe("sabah-kundasang");
    expect(coffees.map((coffee) => coffee.id)).toEqual(original);
  });

  it("supports every availability and sort state", () => {
    expect(filterCoffees(coffees, { availability: "sold-out" })).toHaveLength(1);
    expect(
      filterCoffees(coffees, { availability: "in-stock" }).every(
        (coffee) => coffee.status !== "sold-out",
      ),
    ).toBe(true);
    expect(sortCoffees(coffees, "name")[0].name).toBe("El Paraíso");
    expect(sortCoffees(coffees, "featured")[0].featuredRank).toBe(1);
  });

  it("parses complete valid filter state and validates statuses", () => {
    expect(
      parseCoffeeFilters(
        new URLSearchParams("flavour=chocolatey&brew=espresso&availability=sold-out"),
      ),
    ).toEqual({
      flavour: "chocolatey",
      brewMethod: "espresso",
      availability: "sold-out",
    });
    expect(isCoffeeStatus("available")).toBe(true);
    expect(isCoffeeStatus("retired")).toBe(false);
  });
});
