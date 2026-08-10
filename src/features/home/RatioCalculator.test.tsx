import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RatioCalculator } from "./RatioCalculator";
describe("RatioCalculator", () => {
  it("scales water while preserving the guide ratio", () => {
    render(<RatioCalculator coffeeGrams={15} waterGrams={250} />);
    expect(screen.getByText(/250g water/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/coffee dose/i), { target: { value: "18" } });
    expect(screen.getByText(/300g water/i)).toBeInTheDocument();
  });
  it("ignores invalid non-positive doses", () => {
    render(<RatioCalculator coffeeGrams={16} waterGrams={240} />);
    fireEvent.change(screen.getByLabelText(/coffee dose/i), { target: { value: "0" } });
    expect(screen.getByText(/240g water/i)).toBeInTheDocument();
  });
});
