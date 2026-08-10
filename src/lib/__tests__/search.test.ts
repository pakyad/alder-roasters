import { describe, expect, it } from "vitest";
import { coffees } from "../../content/coffees";
import { brewGuides } from "../../content/guides";
import { searchContent } from "../search";

describe("content search", () => {
  it("returns grouped content matches across coffee and guides", () => {
    const results = searchContent("espresso", coffees, brewGuides);
    expect(results.some((result) => result.type === "coffee")).toBe(true);
    expect(results.some((result) => result.slug === "espresso-balanced-shot")).toBe(true);
  });

  it("matches all query terms without case or accent sensitivity", () => {
    expect(searchContent("HUILA peach", coffees, brewGuides).map((result) => result.slug)).toEqual([
      "huila-el-paraiso",
    ]);
  });

  it("returns no results for an empty query", () => {
    expect(searchContent("   ", coffees, brewGuides)).toEqual([]);
  });
});
