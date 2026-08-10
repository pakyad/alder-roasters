import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { coffees } from "../../content/coffees";
import { ProductPlate } from "./ProductPlate";

describe("ProductPlate", () => {
  it("renders useful product identity and an accessible detail link", () => {
    render(<ProductPlate coffee={coffees[0]} />);
    expect(screen.getByRole("link", { name: /view gichathaini/i })).toHaveAttribute(
      "href",
      "/shop/nyeri-gichathaini",
    );
    expect(screen.getByText(/bright red fruit/i)).toBeInTheDocument();
    expect(screen.getByText(/RM\s*68\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/a bag of gichathaini coffee/i)).toHaveClass("sr-only");
  });
});
