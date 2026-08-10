import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { coffees } from "../../content/coffees";
import { PurchaseConfigurator } from "./PurchaseConfigurator";

describe("PurchaseConfigurator", () => {
  it("updates the recurring price and submits a typed selection", () => {
    const onAdd = vi.fn();
    render(<PurchaseConfigurator coffee={coffees[0]} onAdd={onAdd} />);
    fireEvent.click(screen.getByLabelText(/subscribe & save/i));
    expect(screen.getAllByText(/every 4 weeks/i)).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: /add subscription/i }));
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: coffees[0].id,
        purchaseType: "subscription",
        cadenceWeeks: 4,
        sizeGrams: 250,
        grind: "whole-bean",
      }),
    );
    expect(screen.getByText(/added/i)).toBeInTheDocument();
  });

  it("prevents purchase for a sold-out coffee", () => {
    render(<PurchaseConfigurator coffee={coffees[6]} />);
    expect(screen.getByRole("button", { name: /currently sold out/i })).toBeDisabled();
    expect(screen.getByLabelText(/subscribe & save/i)).toBeDisabled();
  });
});
