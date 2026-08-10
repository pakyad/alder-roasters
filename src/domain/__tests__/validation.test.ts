import { describe, expect, it } from "vitest";
import { coffees } from "../../content/coffees";
import { brewGuides } from "../../content/guides";
import { validateContent } from "../validation";

describe("authored content", () => {
  it("has consistent identifiers, prices and cross references", () => {
    expect(validateContent(coffees, brewGuides)).toEqual([]);
  });
});
