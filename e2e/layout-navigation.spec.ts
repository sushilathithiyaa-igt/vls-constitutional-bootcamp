import { expect, shot, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("layout: no horizontal overflow, hero and CTA visible on first screen", async ({ page }, info) => {
  const m = info.project.name;
  const { sw, cw } = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }));
  expect(sw).toBe(cw);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Constitutional Law & Practice Boot Camp");
  await expect(page.getByRole("link", { name: "Enquire / Register Now" }).first()).toBeInViewport();
  await shot(page, m, "01-hero");
});

test("layout: viewport-specific chrome", async ({ page }, info) => {
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  const nav = page.getByRole("navigation", { name: "Primary", exact: true });
  const menuButton = page.getByRole("button", { name: /^(Menu|Close)$/ });
  if (info.project.name === "mobile") {
    await expect(sticky).toBeInViewport();
    await expect(menuButton).toBeVisible();
    await expect(nav).toBeHidden();
  } else {
    await expect(nav).toBeVisible();
    await expect(menuButton).toBeHidden();
    await expect(sticky).toBeHidden();
  }
});

test("content: 13 topics, 6 syllabus units, 7 FAQs, no images until approved", async ({ page }) => {
  await expect(page.locator("#topics li p.font-semibold")).toHaveCount(13);
  await expect(page.locator("#syllabus ol > li")).toHaveCount(6);
  await expect(page.locator("#faq details")).toHaveCount(7);
  await expect(page.locator("img")).toHaveCount(0);
  await expect(page.locator("#syllabus")).toContainText("Madras High Court Writ Rules, 2021");
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/₹|\b499\b|September|Sivakumar/);
});

test("navigation: header anchors reach their sections", async ({ page }, info) => {
  const targets = [
    ["Syllabus", "#syllabus"],
    ["Petition topics", "#topics"],
    ["Who should attend", "#audience"],
    ["FAQs", "#faq"],
  ] as const;
  for (const [label, id] of targets) {
    if (info.project.name === "mobile") await page.getByRole("button", { name: "Menu" }).click();
    const scope = info.project.name === "mobile" ? page.locator("#mobile-menu") : page.getByRole("navigation", { name: "Primary", exact: true });
    await scope.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${id}$`));
    await expect(page.locator(id)).toBeInViewport();
    if (info.project.name === "mobile") await expect(page.locator("#mobile-menu")).toHaveCount(0); // menu closes on navigation
  }
});

test("navigation: registration CTAs lead to the form", async ({ page }, info) => {
  await page.getByRole("link", { name: "Enquire / Register Now" }).first().click();
  await expect(page).toHaveURL(/#register$/);
  await expect(page.locator("#register h2")).toBeInViewport();
  await shot(page, info.project.name, "02-register");

  await page.goto("/");
  await page.getByRole("link", { name: "Explore the Syllabus" }).click();
  await expect(page.locator("#syllabus")).toBeInViewport();

  await page.goto("/");
  await page.locator("#final-cta").getByRole("link", { name: "Enquire About the Boot Camp" }).click();
  await expect(page.locator("#register")).toBeInViewport();
});

test("mobile: sticky bar leads to the form and tucks away while it is on screen", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  await sticky.getByRole("link", { name: "Enquire Now" }).click();
  await expect(page.locator("#register")).toBeInViewport();
  await expect(sticky).not.toBeInViewport();
});

test("mobile: sticky bar stays hidden while the form is on screen, however we got there", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  await page.goto("/#register"); // deep link
  await expect(sticky).not.toBeInViewport();
  await page.getByLabel(/Full name/).fill("Asha"); // scrolls/focuses inside the form
  await expect(sticky).not.toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(sticky).toBeInViewport(); // and comes back outside the form
});

test("external contact links point where they should (not followed)", async ({ page }) => {
  const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  expect(hrefs).toContain("tel:+919500025216");
  expect(hrefs).toContain("tel:+919500207811");
  expect(hrefs).toContain("https://www.vlslawacademy.com/privacy-policy");
  expect(hrefs).toContain("https://www.vlslawacademy.com/terms-and-conditions");
  expect(hrefs.some((h) => h.startsWith("https://wa.me/919500025216?text="))).toBe(true);
});

test("FAQ opens and closes", async ({ page }, info) => {
  const first = page.locator("#faq details").first();
  await first.scrollIntoViewIfNeeded();
  await first.locator("summary").click();
  await expect(first).toHaveJSProperty("open", true);
  await expect(first.locator("p")).toBeVisible();
  await shot(page, info.project.name, "03-faq-open");
  await first.locator("summary").click();
  await expect(first).toHaveJSProperty("open", false);
});

test("topics and syllabus screenshots", async ({ page }, info) => {
  await page.locator("#topics").scrollIntoViewIfNeeded();
  await page.locator("#topics h2").scrollIntoViewIfNeeded();
  await shot(page, info.project.name, "04-topics");
  await page.locator("#syllabus h2").scrollIntoViewIfNeeded();
  await shot(page, info.project.name, "05-syllabus");
});
