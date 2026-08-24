import { test } from "@playwright/test";

const shots = [
  { path: "/", name: "home" },
  { path: "/shop", name: "shop" },
  { path: "/shop/nyeri-gichathaini", name: "pdp" },
  { path: "/brew-guides/v60-clear-sweet", name: "guide" },
];

test.describe("visual capture", () => {
  for (const shot of shots) {
    test(`capture ${shot.name}`, async ({ page }, testInfo) => {
      await page.goto(shot.path);
      await page.waitForLoadState("networkidle");
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        fullPage: true,
        path: testInfo.outputPath(`${shot.name}.png`),
      });
    });
  }
});
