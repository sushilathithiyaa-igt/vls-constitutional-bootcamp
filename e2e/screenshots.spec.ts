import { settle, test } from "./fixtures";

// Review screenshots (written to e2e-screenshots/, git-ignored): hero, full page, registration form.
test("screenshots: hero, full page and registration form", async ({ page }, info) => {
  const m = info.project.name;
  await page.goto("/");
  await settle(page); // entrance animation finished: shots show the resting state
  await page.screenshot({ path: `e2e-screenshots/${m}-hero.png` });

  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete));
  await page.addStyleTag({ content: "aside[aria-label='Quick enquiry actions']{display:none!important}" }); // keep the fixed bar out of the stitched full page
  await page.screenshot({ path: `e2e-screenshots/${m}-fullpage.png`, fullPage: true });

  await page.addStyleTag({ content: "header{position:static!important}" }); // sticky header would be stitched into the middle of a tall element shot
  await page.locator("#register").screenshot({ path: `e2e-screenshots/${m}-registration-form.png` });
});
