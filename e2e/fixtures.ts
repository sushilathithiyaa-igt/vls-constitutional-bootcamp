import { expect, test as base, type Page } from "@playwright/test";
import { MOCK_PORT } from "../playwright.config";

const MOCK = `http://127.0.0.1:${MOCK_PORT}`;
const LOCAL = /^(http:\/\/(127\.0\.0\.1|localhost)[:/]|data:|blob:|about:)/;

export type Lead = { auth: string | null; body: Record<string, unknown> };

export const mock = {
  reset: () => fetch(`${MOCK}/__reset`, { method: "POST" }),
  received: async (): Promise<Lead[]> => (await fetch(`${MOCK}/__received`)).json(),
};

/**
 * Every test blocks all non-loopback requests (so test data cannot reach a live service)
 * and records them; the afterEach below fails the test if the page tried to reach one.
 * window.open is stubbed in every test, so the browser never actually opens wa.me.
 */
export const test = base.extend<{ blockExternal: void; stubWindowOpen: void }>({
  blockExternal: [
    async ({ page }, provide) => {
      const blocked: string[] = [];
      await page.route("**/*", (route) => {
        const url = route.request().url();
        if (LOCAL.test(url)) return route.continue();
        blocked.push(url);
        return route.abort();
      });
      await provide();
      expect(blocked, "page attempted to reach a non-local host").toEqual([]);
    },
    { auto: true },
  ],
  stubWindowOpen: [
    async ({ page }, provide) => {
      await page.addInitScript(() => {
        const w = window as unknown as { __opened: string[] };
        w.__opened = [];
        window.open = (url?: string | URL) => {
          w.__opened.push(String(url));
          return null;
        };
      });
      await provide();
    },
    { auto: true },
  ],
});

export { expect };

export async function openedUrls(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as unknown as { __opened?: string[] }).__opened ?? []);
}

export async function fillValid(page: Page, over: Partial<Record<string, string>> = {}) {
  const v = { name: "Asha Kumar", mobile: "98765 43210", email: "asha@example.test", status: "Law student", city: "Chennai", ...over };
  await page.getByLabel(/Full name/).fill(v.name);
  await page.getByLabel(/Mobile number/).fill(v.mobile);
  await page.getByLabel(/^Email/).fill(v.email);
  await page.getByLabel(/Current status/).selectOption(v.status);
  await page.getByLabel(/City/).fill(v.city);
  await page.getByLabel(/I agree to be contacted/).check();
}

export async function shot(page: Page, project: string, name: string) {
  await settle(page); // let CSS transitions (sticky bar, entrance) finish so shots show the resting state
  await page.screenshot({ path: `e2e-screenshots/${project}-${name}.png`, fullPage: false });
}

/** The form's own alert (Next.js also renders a route-announcer with role="alert"). */
export const formAlert = (page: Page) => page.locator("form [role=alert]");

/** Axe reads colours mid-fade if the entrance animation is still running. */
export async function settle(page: Page) {
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))));
}
