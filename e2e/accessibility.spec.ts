import AxeBuilder from "@axe-core/playwright";
import { expect, formAlert, settle, test } from "./fixtures";
import type { Page } from "@playwright/test";

const scan = async (page: Page) => {
  await settle(page);
  return (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze()).violations;
};

const summarise = (v: Awaited<ReturnType<typeof scan>>) =>
  v.map((x) => `${x.id} (${x.impact}) x${x.nodes.length}: ${x.nodes[0]?.target.join(" ")}`);

test("axe: default page has no WCAG A/AA or best-practice violations", async ({ page }) => {
  await page.goto("/");
  expect(summarise(await scan(page))).toEqual([]);
});

test("axe: form error state, open FAQ and open mobile menu", async ({ page }, info) => {
  await page.goto("/#register");
  await page.getByRole("button", { name: "Request Course Details" }).click();
  await expect(formAlert(page)).toBeVisible();
  expect(summarise(await scan(page)), "form error state").toEqual([]);

  await page.locator("#faq details summary").first().click();
  expect(summarise(await scan(page)), "FAQ open").toEqual([]);

  if (info.project.name === "mobile") {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    expect(summarise(await scan(page)), "mobile menu open").toEqual([]);
  }
});

test("document basics: language, one h1, ordered headings, labelled controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveCount(1);
  const levels = await page.locator("h1,h2,h3").evaluateAll((hs) => hs.map((h) => Number(h.tagName[1])));
  for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading jump at index ${i}`).toBeLessThanOrEqual(1);
  const unlabelled = await page.locator("form input:not([tabindex='-1']), form select").evaluateAll(
    (els) => els.filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id),
  );
  expect(unlabelled).toEqual([]);
});

test("reduced motion: entrance animation is switched off", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const animations = await page.locator(".rise").evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
  expect(animations.length).toBeGreaterThan(0);
  expect(animations.every((a) => a === "none")).toBe(true);
});
