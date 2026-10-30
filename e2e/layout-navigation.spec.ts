import { expect, shot, test } from "./fixtures";

const POSTER_TOPICS = [
  "Writ Petitions / Writ Appeals",
  "Public Interest Litigations (PILs)",
  "Special Leave Petitions",
  "Constitutional Appeals",
  "Original Petition – Supreme Court & High Court",
  "Review Petitions",
  "Curative Petition",
  "Transfer Petitions",
  "Contempt Petitions",
  "Election Petitions",
  "Advisory Reference",
  "Supervisory Petition (Article 227)",
  "Certificate Petition (Article 134A)",
];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("first screen answers what, when and how much", async ({ page }, info) => {
  const m = info.project.name;
  const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  expect(sw).toBe(cw);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Constitutional Law & Practice Boot Camp");
  const hero = page.locator("#top");
  for (const fact of ["Friday, 13 November 2026", "6:00 PM – 9:00 PM IST", "3 Hours", "₹499"]) {
    const el = hero.locator("dl").getByText(fact, { exact: true });
    await expect(el).toBeVisible();
    if (m === "desktop") await expect(el).toBeInViewport(); // all four facts on the first desktop screen
  }
  await expect(page.getByRole("link", { name: "Register for ₹499" }).first()).toBeInViewport();
  await shot(page, m, "01-hero");
});

test("facts are identical everywhere they appear, and metadata carries them", async ({ page }) => {
  // textContent, not innerText: closed FAQ answers are in the DOM but not "rendered text"
  for (const scope of ["#top", "#register", "#how-it-works", "#faq", "#final-cta"]) {
    const t = (await page.locator(scope).textContent()) ?? "";
    expect(t, scope).toContain("₹499");
  }
  for (const scope of ["#top", "#register", "#faq", "#final-cta"]) {
    const t = (await page.locator(scope).textContent()) ?? "";
    expect(t, scope).toContain("Friday, 13 November 2026");
    expect(t, scope).toContain("6:00 PM – 9:00 PM IST");
  }
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/to be announced|fee pending|waitlist|coming soon/i);
  expect(new Set(body.match(/₹\s?[\d,]+/g))).toEqual(new Set(["₹499"]));
  expect(new Set(body.match(/\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d/g))).toEqual(new Set(["13 November 2026"]));

  await expect(page).toHaveTitle(/Constitutional Law & Practice Boot Camp \| 13 November 2026 \| VLS Law Academy/);
  const meta = (sel: string) => page.locator(sel).getAttribute("content");
  expect(await meta('meta[name="description"]')).toMatch(/13 November 2026.*6:00 PM – 9:00 PM IST.*₹499/);
  expect(await meta('meta[property="og:description"]')).toContain("₹499");
  expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
  expect(await meta('meta[property="og:image"]')).toMatch(/opengraph-image/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});

test("viewport-specific chrome", async ({ page }, info) => {
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  const nav = page.getByRole("navigation", { name: "Primary", exact: true });
  const menuButton = page.getByRole("button", { name: /^(Menu|Close)$/ });
  if (info.project.name === "mobile") {
    await expect(sticky).toBeInViewport();
    await expect(sticky.getByRole("link", { name: "Register ₹499" })).toBeVisible();
    await expect(menuButton).toBeVisible();
    await expect(nav).toBeHidden();
  } else {
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Register ₹499" })).toBeVisible();
    await expect(menuButton).toBeHidden();
    await expect(sticky).toBeHidden();
  }
});

test("content: the 13 poster topics, in order, with supporting jurisdiction context", async ({ page }) => {
  const names = await page.locator("#topics [data-topic]").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.topic));
  expect([...names].sort()).toEqual([...POSTER_TOPICS].sort());
  const nums = await page.locator("#topics [data-topic]").evaluateAll((els) => els.map((e) => e.querySelector("[aria-hidden]")?.textContent));
  expect([...nums].sort()).toEqual(Array.from({ length: 13 }, (_, i) => String(i + 1).padStart(2, "0")));
  await expect(page.locator("#topics h3")).toHaveText(["Writs & Original Remedies", "Appeals & Corrective Remedies", "Special Constitutional Proceedings"]);
  await expect(page.locator("#jurisdiction")).toContainText("Madras High Court Writ Rules, 2021");
  await expect(page.locator("#jurisdiction h3")).toHaveText(["Supreme Court", "High Courts"]);
  await expect(page.locator("#faq details")).toHaveCount(9);
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/civil procedure|criminal procedure|corporate law|property law|DRT|SARFAESI|Sivakumar|limited seats|discount/i);
});

test("images: real local assets, rendered, with alt text and sensible dimensions", async ({ page }) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete));
  const imgs = await page.locator("img").evaluateAll((els) =>
    els.map((i) => {
      const img = i as HTMLImageElement;
      return { alt: img.alt, w: img.naturalWidth, h: img.naturalHeight, cw: img.clientWidth, ch: img.clientHeight, src: img.currentSrc };
    }),
  );
  expect(imgs.length).toBeGreaterThanOrEqual(6); // header logo, hero, matters, 2 gallery, footer logo
  for (const i of imgs) {
    expect(i.w, i.src).toBeGreaterThan(100);
    expect(i.h, i.src).toBeGreaterThan(100);
    expect(i.cw, i.src).toBeGreaterThan(0);
    expect(i.alt.length, i.src).toBeGreaterThan(5);
    expect(i.src, "no hotlinked images at runtime").not.toMatch(/^https?:\/\/(?!127\.0\.0\.1|localhost)/);
  }
  // the hero photograph must be larger than its slot (no upscaling blur)
  const hero = imgs.find((i) => /classroom-wide-session/.test(decodeURIComponent(i.src)));
  expect(hero, "hero photograph present").toBeTruthy();
});

test("navigation: header anchors reach their sections", async ({ page }, info) => {
  const targets = [
    ["Topics", "#topics"],
    ["What You'll Learn", "#learn"],
    ["Who Should Attend", "#audience"],
    ["FAQs", "#faq"],
  ] as const;
  for (const [label, id] of targets) {
    if (info.project.name === "mobile") await page.getByRole("button", { name: "Menu" }).click();
    const scope = info.project.name === "mobile" ? page.locator("#mobile-menu") : page.getByRole("navigation", { name: "Primary", exact: true });
    await scope.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${id}$`));
    await expect(page.locator(id)).toBeInViewport();
    if (info.project.name === "mobile") await expect(page.locator("#mobile-menu")).toHaveCount(0);
  }
});

test("registration CTAs lead to the form, and explain that nothing is paid on the page", async ({ page }, info) => {
  await expect(page.locator("#top")).toContainText("Starts your registration enquiry");
  await page.locator("#top").getByRole("link", { name: "Register for ₹499" }).click();
  await expect(page).toHaveURL(/#register$/);
  await expect(page.locator("#register")).toBeInViewport();
  await expect(page.locator("#register")).toContainText("No payment is taken on this page");
  await shot(page, info.project.name, "02-register");

  await page.goto("/");
  await page.getByRole("link", { name: /Explore What You'll Learn/ }).click();
  await expect(page.locator("#topics")).toBeInViewport();

  await page.goto("/");
  await page.locator("#final-cta").getByRole("link", { name: "Register for ₹499" }).click();
  await expect(page.locator("#register")).toBeInViewport();

  await page.goto("/");
  await page.locator("#how-it-works").getByRole("link", { name: "Register for ₹499" }).click();
  await expect(page.locator("#register")).toBeInViewport();
});

test("mobile: sticky bar leads to the form and tucks away while it is on screen", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  await sticky.getByRole("link", { name: "Register ₹499" }).click();
  await expect(page.locator("#register")).toBeInViewport();
  await expect(sticky).not.toBeInViewport();
});

test("mobile: sticky bar stays hidden while the form is on screen, however we got there", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  const sticky = page.getByRole("complementary", { name: "Quick enquiry actions" });
  await page.goto("/#register");
  await expect(sticky).not.toBeInViewport();
  await page.getByLabel(/Full name/).fill("Asha");
  await expect(sticky).not.toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(sticky).toBeInViewport();
});

test("contact links point where they should (not followed)", async ({ page }) => {
  const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  expect(hrefs).toContain("tel:+919500025216");
  expect(hrefs).toContain("tel:+919500207811");
  expect(hrefs).toContain("https://www.vlslawacademy.com/privacy-policy");
  expect(hrefs).toContain("https://www.vlslawacademy.com/terms-and-conditions");
  expect(hrefs).toContain("https://www.vlslawacademy.com/");
  const wa = hrefs.filter((h) => h.startsWith("https://wa.me/919500025216?text="));
  expect(wa.length).toBeGreaterThan(0);
  for (const h of wa) expect(decodeURIComponent(h)).toMatch(/13 November 2026.*₹499/);
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

test("topics and jurisdiction screenshots", async ({ page }, info) => {
  await page.locator("#topics h2").scrollIntoViewIfNeeded();
  await shot(page, info.project.name, "04-topics");
  await page.locator("#jurisdiction h2").scrollIntoViewIfNeeded();
  await shot(page, info.project.name, "05-jurisdiction");
});

test("no broken routes, console errors or failed requests", async ({ page, request }) => {
  const problems: string[] = [];
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("response", (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));
  await page.goto("/");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
  for (const path of ["/robots.txt", "/sitemap.xml", "/icon.png", "/apple-icon.png", "/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//); // preview/staging stays noindex outside production
});
