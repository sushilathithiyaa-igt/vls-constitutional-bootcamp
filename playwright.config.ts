import { defineConfig, devices } from "@playwright/test";

/**
 * Safety: the app under test only ever talks to a loopback mock webhook. These env values are
 * passed explicitly to the test servers, so a LEAD_WEBHOOK_URL in the shell or .env.local
 * can never receive test data.
 */
export const MOCK_PORT = 4545;
export const CONFIGURED_PORT = 3200; // LEAD_WEBHOOK_URL -> loopback mock
export const UNCONFIGURED_PORT = 3201; // no LEAD_WEBHOOK_URL -> WhatsApp-only fallback

const base = { NEXT_PUBLIC_SITE_URL: "", VERCEL_ENV: "", ALLOW_INDEXING: "" };

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./e2e-results",
  fullyParallel: false,
  workers: 1, // tests share one mock destination, so they run serially
  retries: 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "e2e-report" }]],
  use: {
    baseURL: `http://127.0.0.1:${CONFIGURED_PORT}`,
    channel: "chrome", // system Chrome: no browser download needed
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: [
    {
      command: "node e2e/mock-lead-server.mjs",
      url: `http://127.0.0.1:${MOCK_PORT}/__health`,
      reuseExistingServer: false,
      env: { MOCK_PORT: String(MOCK_PORT) },
    },
    {
      // Builds once; the second server below reuses the same build.
      command: `npm run build && npx next start -H 127.0.0.1 -p ${CONFIGURED_PORT}`,
      url: `http://127.0.0.1:${CONFIGURED_PORT}`,
      reuseExistingServer: false,
      timeout: 240_000,
      env: {
        ...base,
        LEAD_WEBHOOK_URL: `http://127.0.0.1:${MOCK_PORT}/lead`,
        LEAD_WEBHOOK_TOKEN: "e2e-test-token",
      },
    },
    {
      command: `npx next start -H 127.0.0.1 -p ${UNCONFIGURED_PORT}`,
      url: `http://127.0.0.1:${UNCONFIGURED_PORT}`,
      reuseExistingServer: false,
      env: { ...base, LEAD_WEBHOOK_URL: "", LEAD_WEBHOOK_TOKEN: "" },
    },
  ],
});
