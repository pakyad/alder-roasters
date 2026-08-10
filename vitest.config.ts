import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: [
        "src/domain/cart.ts",
        "src/domain/catalogue.ts",
        "src/domain/validation.ts",
        "src/lib/money.ts",
        "src/lib/search.ts",
        "src/features/cart/cart-store.ts",
        "src/features/checkout/validation.ts",
      ],
      thresholds: { branches: 80, functions: 80, lines: 80, statements: 80 },
    },
  },
});
