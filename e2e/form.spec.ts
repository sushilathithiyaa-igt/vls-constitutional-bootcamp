import { expect, fillValid, formAlert, mock, openedUrls, shot, test, type Lead } from "./fixtures";
import { CONFIGURED_PORT, UNCONFIGURED_PORT } from "../playwright.config";

const submit = (page: import("@playwright/test").Page) => page.getByRole("button", { name: /Submit Registration Enquiry|Sending/ });

test.beforeEach(async () => {
  await mock.reset();
});

test.describe("validation (no request leaves the browser)", () => {
  test("empty submit shows inline errors, an alert, and focuses the first invalid field", async ({ page }, info) => {
    const posts: string[] = [];
    page.on("request", (r) => r.method() === "POST" && posts.push(r.url()));
    await page.goto("/#register");
    await submit(page).click();
    await expect(formAlert(page)).toContainText("Please fix the 5 highlighted fields");
    for (const msg of [
      "Please enter your full name.",
      "Please enter your mobile number.",
      "Please enter your email address.",
      "Please select your current status.",
      "Please agree to be contacted about this enquiry.",
    ]) {
      await expect(page.getByText(msg)).toBeVisible();
    }
    await expect(page.locator("[aria-invalid=true]")).toHaveCount(5);
    await expect(page.getByLabel(/Full name/)).toBeFocused();
    expect(posts).toEqual([]);
    await shot(page, info.project.name, "07-form-errors");
  });

  test("bad mobile and email get specific messages and focus moves to the first of them", async ({ page }) => {
    await page.goto("/#register");
    await fillValid(page, { mobile: "12345", email: "not-an-email" });
    await submit(page).click();
    await expect(page.getByText("Enter a valid 10-digit Indian mobile number.")).toBeVisible();
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
    await expect(formAlert(page)).toContainText("2 highlighted fields");
    await expect(page.getByLabel(/Mobile number/)).toBeFocused();
  });

  test("missing consent alone blocks submission; fixing a field clears its error", async ({ page }) => {
    await page.goto("/#register");
    await fillValid(page);
    await page.getByLabel(/I agree to be contacted/).uncheck();
    await submit(page).click();
    await expect(page.getByText("Please agree to be contacted about this enquiry.")).toBeVisible();
    await page.getByLabel(/I agree to be contacted/).check();
    await expect(page.getByText("Please agree to be contacted about this enquiry.")).toHaveCount(0);
    expect(await mock.received()).toEqual([]);
  });

  test("accepts Indian mobile formats and sends the normalised number", async ({ page }) => {
    await page.goto("/#register");
    await fillValid(page, { mobile: "+91 98765-43210" });
    await submit(page).click();
    await expect(page.getByRole("status")).toContainText("We have received your enquiry");
    expect((await mock.received())[0].body.mobile).toBe("9876543210");
  });
});

test.describe(`destination configured (simulated webhook on :${CONFIGURED_PORT})`, () => {
  test("success: one lead with course id, UTM and consent; double-click sends once", async ({ page }, info) => {
    await page.goto("/?utm_source=e2e&utm_campaign=bootcamp&evil=1#top");
    await page.locator("#register").scrollIntoViewIfNeeded();
    await fillValid(page);
    await submit(page).dblclick();
    await expect(page.getByRole("status")).toContainText("We have received your enquiry");
    await expect(page.getByLabel(/Full name/)).toHaveValue(""); // form reset after a saved enquiry
    await shot(page, info.project.name, "08-form-success");

    const leads: Lead[] = await mock.received();
    expect(leads).toHaveLength(1);
    expect(leads[0].auth).toBe("Bearer e2e-test-token");
    expect(leads[0].body).toMatchObject({
      course: "constitutional-law-bootcamp",
      courseSession: "2026-11-13",
      feeInr: 499,
      name: "Asha Kumar",
      mobile: "9876543210",
      email: "asha@example.test",
      status: "Law student",
      city: "Chennai",
      utm: { utm_source: "e2e", utm_campaign: "bootcamp" },
    });
    expect(leads[0].body.consent).toMatchObject({ given: true });
    expect(String(leads[0].body.pageUrl)).not.toContain("#");
    expect(leads[0].body.utm).not.toHaveProperty("evil"); // only the five standard UTM keys are forwarded
  });

  test("failed webhook: honest error, nothing claimed as received, entries kept, can retry", async ({ page }, info) => {
    await page.goto("/#register");
    await fillValid(page, { name: "Fail Case Tester" });
    await submit(page).click();
    const status = page.getByRole("status");
    await expect(status).toContainText("We could not send your enquiry just now");
    await expect(status).toContainText("It has not been received");
    await expect(status).not.toContainText("Thank you");
    await expect(page.getByLabel(/Full name/)).toHaveValue("Fail Case Tester");
    await expect(submit(page)).toBeEnabled();
    await shot(page, info.project.name, "09-form-failure");

    await page.getByLabel(/Full name/).fill("Asha Kumar"); // retry succeeds
    await submit(page).click();
    await expect(status).toContainText("We have received your enquiry");
    expect(await mock.received()).toHaveLength(2); // one failed attempt + one success
  });
});

test.describe(`no destination configured (:${UNCONFIGURED_PORT}, WhatsApp-only)`, () => {
  test.use({ baseURL: `http://127.0.0.1:${UNCONFIGURED_PORT}` });

  test("opens a pre-filled WhatsApp message, says the enquiry is not yet received, and nothing is stored", async ({ page }, info) => {
    await page.goto("/#register");
    await fillValid(page);
    await submit(page).click();

    const status = page.getByRole("status");
    await expect(status).toContainText("We opened WhatsApp with your details");
    await expect(status).toContainText("reaches us only once you send that message");
    await expect(status).not.toContainText("received your enquiry");

    const opened = await openedUrls(page);
    expect(opened).toHaveLength(1);
    const url = new URL(opened[0]);
    expect(url.origin + url.pathname).toBe("https://wa.me/919500025216");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain("Name: Asha Kumar");
    expect(text).toContain("Mobile: 9876543210");
    expect(text).toContain("Status: Law student");
    expect(text).toMatch(/13 November 2026 \(₹499\)/);

    const fallbackLink = status.getByRole("link", { name: "open it with your details" });
    await expect(fallbackLink).toHaveAttribute("href", /^https:\/\/wa\.me\/919500025216\?text=/);
    await shot(page, info.project.name, "10-whatsapp-fallback");

    expect(await mock.received()).toEqual([]); // the unconfigured server never forwards anything
  });
});
