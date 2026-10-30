import { describe, expect, it } from "vitest";
import * as content from "../lib/content";
import { normalizeIndianMobile, validateEnquiry } from "../lib/validation";

// The poster's 13 key topics, in poster order and with its terminology.
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

const allText = () => JSON.stringify(content);

describe("course facts (confirmed by the project owner)", () => {
  it("are exactly the approved date, time, duration and fee", () => {
    expect(content.course.dateLong).toBe("Friday, 13 November 2026");
    expect(content.course.dateISO).toBe("2026-11-13");
    expect(content.course.time).toBe("6:00 PM – 9:00 PM IST");
    expect(content.course.duration).toBe("3 Hours");
    expect(content.course.fee).toBe("₹499");
    expect(content.course.feeInr).toBe(499);
  });

  it("are shown in the hero facts", () => {
    const v = content.hero.facts.map((f) => f.value);
    expect(v).toEqual([content.course.dateLong, content.course.time, content.course.duration, content.course.fee]);
  });

  it("carry the same fee and date everywhere they are mentioned", () => {
    const text = allText();
    expect(text).toContain("13 November 2026");
    expect(text).toContain("₹499");
    // no other rupee amount and no other 2026 date
    expect(text.match(/₹\s?[\d,]+/g)?.every((m) => m === "₹499")).toBe(true);
    expect(text.match(/\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d/g)?.every((d) => d === "13 November 2026")).toBe(true);
  });
});

describe("curriculum", () => {
  it("has exactly the 13 poster topics, once each, numbered 01-13", () => {
    const clusters: readonly { items: readonly { n: string; name: string }[] }[] = content.topics.clusters;
    const items = clusters.flatMap((c) => c.items);
    expect(items).toHaveLength(13);
    const byNumber = [...items].sort((a, b) => Number(a.n) - Number(b.n));
    expect(byNumber.map((i) => i.n)).toEqual(Array.from({ length: 13 }, (_, i) => String(i + 1).padStart(2, "0")));
    expect(byNumber.map((i) => i.name)).toEqual(POSTER_TOPICS);
  });

  it("groups the topics into the three agreed sections", () => {
    expect(content.topics.clusters.map((c) => c.title)).toEqual([
      "Writs & Original Remedies",
      "Appeals & Corrective Remedies",
      "Special Constitutional Proceedings",
    ]);
  });

  it("keeps the Madras High Court Writ Rules, 2021 visible as supporting context", () => {
    expect(JSON.stringify(content.jurisdiction)).toContain("Madras High Court Writ Rules, 2021");
  });

  it("does not promise mastery in three hours", () => {
    expect(content.topics.note).toMatch(/overview/i);
    expect(allText()).not.toMatch(/courtroom-ready|court-ready|become an expert|guaranteed/i);
    const q = content.faqs.find((f) => /master all 13/i.test(f.q));
    expect(q?.a).toMatch(/^No\./);
  });
});

describe("no stale or unrelated content", () => {
  it("has no placeholder or outdated messaging", () => {
    expect(allText()).not.toMatch(/to be announced|fee pending|waitlist|coming soon|join the waitlist/i);
  });

  it("does not advertise unrelated brochure modules, other courses or unconfirmed people", () => {
    expect(allText()).not.toMatch(/civil procedure|criminal procedure|corporate law|property law|DRT|SARFAESI|motor accident|Sivakumar|limited seats|early bird|discount/i);
  });

  it("leaves teaching mode, recordings and certificates to the academy to confirm", () => {
    for (const re of [/online or in person/i, /recordings, materials or certificates/i]) {
      expect(content.faqs.find((f) => re.test(f.q))?.a).toMatch(/confirm/i);
    }
    expect(allText()).not.toMatch(/certificate (will|is) (be )?(issued|provided)|recordings? (will|are) (be )?(provided|shared)/i);
  });
});

describe("photos", () => {
  it("point at local assets with descriptive alt text and never claim to be from this boot camp", () => {
    for (const p of Object.values(content.photos)) {
      expect(p.src.startsWith("/assets/vls/")).toBe(true);
      expect(p.alt.length).toBeGreaterThan(10);
      expect(p.alt).not.toMatch(/boot camp/i);
    }
    expect(content.whyVls.galleryCaption).not.toMatch(/boot camp/i);
  });
});

describe("validation", () => {
  it("normalizes Indian mobiles", () => {
    expect(normalizeIndianMobile("98765 43210")).toBe("9876543210");
    expect(normalizeIndianMobile("+91 98765-43210")).toBe("9876543210");
    expect(normalizeIndianMobile("09876543210")).toBe("9876543210");
    expect(normalizeIndianMobile("5876543210")).toBeNull();
    expect(normalizeIndianMobile("98765")).toBeNull();
    expect(normalizeIndianMobile("abcdefghij")).toBeNull();
  });

  const ok = { name: "Asha K", mobile: "9876543210", email: "a@b.in", status: "Law student", city: "", consent: true };
  it("accepts a valid enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("rejects missing consent, bad email, bad status", () => {
    const e = validateEnquiry({ ...ok, consent: false, email: "nope", status: "x" });
    expect(Object.keys(e).sort()).toEqual(["consent", "email", "status"]);
  });
  it("rejects empty required fields", () => {
    const e = validateEnquiry({ name: "", mobile: "", email: "", status: "", city: "", consent: false });
    expect(Object.keys(e).sort()).toEqual(["consent", "email", "mobile", "name", "status"]);
  });
});
