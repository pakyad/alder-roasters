import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("critical commerce journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("configures coffee, persists the cart, and completes the demo checkout", async ({
    page,
  }) => {
    await page.goto("/shop/nyeri-gichathaini");
    await page.getByRole("radio", { name: /1000g/ }).check();
    await page.getByLabel("Grind").selectOption("filter");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByText(/Gichathaini, 1000g, filter added/)).toBeVisible();

    await page.getByRole("link", { name: /Cart/ }).click();
    await expect(page.getByRole("heading", { name: "Review your coffee" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gichathaini" })).toBeVisible();

    await page.getByRole("link", { name: "Continue to demo checkout" }).click();
    await page.getByLabel("Recipient name").fill("Alder Test");
    await page.getByLabel("Email").fill("alder@example.com");
    await page.getByLabel("Street address").fill("12 Sample Street");
    await page.getByLabel("City").fill("Petaling Jaya");
    await page.getByLabel("Postcode").fill("46000");
    await page.getByRole("button", { name: "Place demonstration order" }).click();
    await expect(page).toHaveURL(/\/checkout\/confirmation/);
    await expect(page.getByText("Demonstration complete", { exact: true })).toBeVisible();
  });

  test("shows useful validation without collecting payment data", async ({ page }) => {
    await page.goto("/shop/nyeri-gichathaini");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.goto("/checkout");
    await page.getByRole("button", { name: "Place demonstration order" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Check the highlighted fields" }),
    ).toBeVisible();
    await expect(page.locator('input[autocomplete="cc-number"]')).toHaveCount(0);
  });
});

test("filters catalogue through a shareable URL", async ({ page }) => {
  await page.goto("/shop");
  await page.getByLabel("Flavour character").selectOption("fruit-forward");
  await page.getByRole("button", { name: /Show .* coffees?/ }).click();
  await expect(page).toHaveURL(/flavour=fruit-forward/);
  await expect(page.getByLabel("Active filters")).toContainText("Fruit-forward");
});

test("search connects guides and products", async ({ page }) => {
  await page.goto("/search");
  await page.getByLabel("Search coffees and brew guides").fill("V60");
  await expect(page.getByText("A clear, sweet V60")).toBeVisible();
  await page.getByRole("link", { name: /A clear, sweet V60/ }).click();
  await expect(page.getByRole("heading", { name: "A clear, sweet V60" })).toBeVisible();
});

for (const route of ["/", "/shop", "/shop/nyeri-gichathaini", "/cart"]) {
  test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("mobile navigation exposes every primary path", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation behaviour");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Subscriptions", exact: true }),
  ).toBeVisible();
});
