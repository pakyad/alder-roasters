import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button>Choose coffee</Button>);
    expect(screen.getByRole("button", { name: "Choose coffee" })).toBeEnabled();
  });

  it("renders a link when an href is provided", () => {
    render(<Button href="/shop">Shop coffee</Button>);
    expect(screen.getByRole("link", { name: "Shop coffee" })).toHaveAttribute("href", "/shop");
  });
});
