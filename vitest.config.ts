/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

// getViteConfig wires up the same Vite setup Astro uses, so tsconfig path
// aliases (@/*, @utils/*, @config, …) and plugins resolve inside tests.
export default getViteConfig({
  test: {
    environment: "node",
    // Only pick up colocated unit tests; e2e specs live in ./e2e and run
    // under Playwright, not Vitest.
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      // Scope coverage to the plain TS/JS logic we can meaningfully unit-test.
      // .astro components are exercised by Playwright, not counted here, so
      // including them would only drag the number down with untestable files.
      include: ["src/utils/**/*.ts", "src/plugins/**/*.mjs"],
      exclude: ["**/*.test.ts", "src/utils/parseConfig.ts"],
      // Fail CI on regressions below these lines. Current suite clears 80%.
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
