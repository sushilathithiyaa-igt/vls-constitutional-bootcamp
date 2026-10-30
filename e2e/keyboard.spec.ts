import { expect, formAlert, mock, shot, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await mock.reset();
  await page.goto("/");
});

type FocusStop = {
  label: string;
  outlineStyle: string;
  outlineWidth: number;
  inView: boolean;
} | null;

const focusInfo = (): FocusStop => {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return null;
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    label: (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || "").trim().slice(0, 40),
    outlineStyle: cs.outlineStyle,
    outlineWidth: parseFloat(cs.outlineWidth),
    inView: r.bottom > 0 && r.top < innerHeight,
  };
};

test("skip link is first, becomes visible, and moves focus to main", async ({ page }) => {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("every one of the first 14 tab stops shows a visible focus indicator and stays on screen", async ({ page }, info) => {
  const stops: FocusStop[] = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    stops.push(await page.evaluate(focusInfo));
  }
  const bad = stops.filter((s) => !s || !(s.outlineStyle !== "none" && s.outlineWidth >= 2) || !s.inView);
  expect(bad, `stops without visible focus: ${JSON.stringify(bad)}`).toEqual([]);
  expect(stops.some((s) => s?.label.includes("Register"))).toBe(true);
  await shot(page, info.project.name, "06-focus");
});

test("mobile menu works from the keyboard and Escape returns focus to the button", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  const button = page.locator("header button[aria-controls=mobile-menu]"); // label flips Menu <-> Close
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(button).toBeFocused();
});

test("empty submit from the keyboard announces errors and focuses the first invalid field", async ({ page }) => {
  await page.getByRole("button", { name: "Submit Registration Enquiry" }).focus();
  await page.keyboard.press("Enter");
  await expect(formAlert(page)).toContainText("5 highlighted fields");
  await expect(page.getByLabel(/Full name/)).toBeFocused();
  await expect(page.getByLabel(/Full name/)).toHaveAttribute("aria-invalid", "true");
});

test("the whole enquiry can be completed with the keyboard only", async ({ page }) => {
  await page.getByLabel(/Full name/).focus();
  const kb = page.keyboard;
  await kb.type("Keyboard Learner");
  await kb.press("Tab");
  await kb.type("9876543210");
  await kb.press("Tab");
  await kb.type("kb@example.test");
  await kb.press("Tab"); // status select
  await kb.type("Graduate");
  await kb.press("Tab"); // city
  await kb.press("Tab"); // consent
  await kb.press("Space");
  await expect(page.getByLabel(/I agree to be contacted/)).toBeChecked();
  await kb.press("Tab"); // privacy link inside the label is not a stop before the button? either way, reach the button
  while (!(await page.getByRole("button", { name: /Submit Registration Enquiry|Sending/ }).evaluate((b) => b === document.activeElement))) {
    await kb.press("Tab");
  }
  await kb.press("Enter");
  await expect(page.getByRole("status")).toContainText("We have received your enquiry");
  const leads = await mock.received();
  expect(leads).toHaveLength(1);
  expect(leads[0].body).toMatchObject({ name: "Keyboard Learner", status: "Graduate", mobile: "9876543210" });
});
