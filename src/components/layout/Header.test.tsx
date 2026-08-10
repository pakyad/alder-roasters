import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";
import { CartProvider } from "@/features/cart";

function renderHeader() {
  return render(
    <CartProvider>
      <Header />
    </CartProvider>,
  );
}

describe("Header", () => {
  it("exposes primary and utility navigation", () => {
    renderHeader();
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute("href", "/search");
    expect(screen.getByRole("link", { name: /Cart/ })).toHaveAttribute("href", "/cart");
  });

  it("toggles the mobile menu accessibly", async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");
  });
});
