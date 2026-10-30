import { expect, test } from "./fixtures";

const SIZES = [
  { w: 375, h: 812 },
  { w: 390, h: 844 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1440, h: 900 },
];

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== "desktop", "sizes are set explicitly below; run once");
});

for (const { w, h } of SIZES) {
  test(`${w}px: no overflow, facts and CTA early, fixed elements do not overlap, tap targets and inputs usable`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");

    const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    expect(sw, "horizontal scroll").toBe(cw);

    // what / when / how much, near the top (first two screens on small phones, first screen otherwise)
    const limit = w < 768 ? h * 2 : h;
    for (const fact of ["Friday, 13 November 2026", "6:00 PM – 9:00 PM IST", "3 Hours", "₹499"]) {
      const top = await page.locator("#top dl").getByText(fact, { exact: true }).evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
      expect(top, fact).toBeLessThan(limit);
    }
    const ctaTop = await page.locator("#top").getByRole("link", { name: "Register for ₹499" }).evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
    expect(ctaTop).toBeLessThan(limit);

    // fixed elements (sticky bar) never overlap each other or the header
    const fixed = await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .filter((e) => getComputedStyle(e).position === "fixed" && e.getBoundingClientRect().height > 0 && !e.closest("[aria-hidden=true]"))
        .map((e) => {
          const r = e.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, vis: r.bottom > 0 && r.top < innerHeight };
        })
        .filter((r) => r.vis),
    );
    for (let i = 0; i < fixed.length; i++)
      for (let j = i + 1; j < fixed.length; j++) {
        const a = fixed[i], b = fixed[j];
        const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
        expect(overlap, "overlapping fixed elements").toBe(false);
      }

    // primary actions are comfortable tap targets; form text is >= 16px so phones do not zoom on focus
    const small = await page.locator("a.bg-vls, button[type=submit], header button").evaluateAll((els) =>
      els.filter((e) => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().height < 44).map((e) => (e.textContent ?? "").trim()),
    );
    expect(small, "primary controls under 44px tall").toEqual([]);
    const tiny = await page.locator("form input:not([tabindex='-1']):not([type=checkbox]), form select").evaluateAll((els) =>
      els.filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16).map((e) => (e as HTMLInputElement).name),
    );
    expect(tiny, "form controls under 16px").toEqual([]);

    // the registration form is reachable and every field fits the viewport width
    const widest = await page.locator("#register form").evaluate((f) => Math.max(...[...f.querySelectorAll("input,select,button,a")].map((e) => e.getBoundingClientRect().right)));
    expect(widest).toBeLessThanOrEqual(w);
  });
}
