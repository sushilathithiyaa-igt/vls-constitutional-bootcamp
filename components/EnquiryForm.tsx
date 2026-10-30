"use client";

import { useRef, useState } from "react";
import { readUtm } from "@/lib/attribution";
import { contact, course, registration, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/content";
import type { EnquiryResponse } from "@/lib/enquiry";
import {
  LEARNER_STATUSES,
  normalizeIndianMobile,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/validation";
import { btnPrimary, btnSecondary, WhatsAppIcon } from "./ui";

const empty: EnquiryInput = { name: "", mobile: "", email: "", status: "", city: "", consent: false };
const ORDER: (keyof EnquiryInput)[] = ["name", "mobile", "email", "status", "city", "consent"];

const field =
  "mt-1.5 block min-h-12 w-full border border-ink/25 bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink/40 focus:border-vls aria-[invalid=true]:border-vls";

type Result = { kind: "idle" } | { kind: "saved" } | { kind: "handoff"; url: string } | { kind: "error" };

/**
 * Validates, then POSTs to /api/enquiry.
 *  - saved:   the configured destination accepted the lead.
 *  - handoff: no destination configured, so the details open in WhatsApp. Not claimed as saved.
 *  - error:   delivery failed; nothing is claimed as saved and WhatsApp/phone remain available.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const lock = useRef(false); // synchronous guard: state updates are too late to stop a fast double-click

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const whatsappDetails = () => {
    const lines = [
      `Hello VLS Law Academy, I would like to register for the ${course.name} on ${course.dateShort} (${course.fee}). Please share the payment and confirmation details.`,
      `Name: ${values.name.trim()}`,
      `Mobile: ${normalizeIndianMobile(values.mobile)}`,
      `Email: ${values.email.trim()}`,
      `Status: ${values.status}`,
      values.city.trim() ? `City: ${values.city.trim()}` : "",
    ].filter(Boolean);
    return whatsappLink(lines.join("\n"));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lock.current) return;
    const found = validateEnquiry(values);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    lock.current = true;
    setSubmitting(true);
    setResult({ kind: "idle" });
    const honeypot = (new FormData(e.currentTarget).get("website") as string) ?? "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, utm: readUtm(), pageUrl: window.location.href.split("#")[0], website: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as EnquiryResponse | null;
      if (data?.ok) {
        setResult({ kind: "saved" });
        setValues(empty);
      } else if (data?.mode === "invalid") {
        setErrors(data.errors);
      } else if (data?.mode === "whatsapp") {
        // The async fetch can outlive the click gesture, so a popup blocker may stop window.open.
        // The visible link below carries the same details.
        const url = whatsappDetails();
        window.open(url, "_blank", "noopener,noreferrer");
        setResult({ kind: "handoff", url });
      } else {
        setResult({ kind: "error" });
      }
    } catch {
      setResult({ kind: "error" });
    } finally {
      lock.current = false;
      setSubmitting(false);
    }
  };

  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm font-medium text-vls">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof EnquiryInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label="Boot camp enquiry form">
      {errorCount > 0 && (
        <p role="alert" className="border-l-4 border-vls bg-vls/5 px-4 py-3 text-sm font-medium text-vls">
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and try again.
        </p>
      )}

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-semibold">
          Full name <span className="text-vls" aria-hidden="true">*</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required value={values.name}
          onChange={(e) => set("name", e.target.value)} className={field} {...a11y("name")} />
        {err("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mobile" className="text-sm font-semibold">
            Mobile number <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required
            placeholder="98765 43210" value={values.mobile}
            onChange={(e) => set("mobile", e.target.value)} className={field} {...a11y("mobile")} />
          {err("mobile")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required
            value={values.email} onChange={(e) => set("email", e.target.value)} className={field} {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="text-sm font-semibold">
            Current status <span className="text-vls" aria-hidden="true">*</span>
          </label>
          <select id="status" name="status" required value={values.status}
            onChange={(e) => set("status", e.target.value)} className={field} {...a11y("status")}>
            <option value="">Select one</option>
            {LEARNER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {err("status")}
        </div>
        <div>
          <label htmlFor="city" className="text-sm font-semibold">
            City <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="city" name="city" type="text" autoComplete="address-level2" value={values.city}
            onChange={(e) => set("city", e.target.value)} className={field} {...a11y("city")} />
          {err("city")}
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id="consent" name="consent" type="checkbox" checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-6 w-6 shrink-0 accent-[#ae1015]" {...a11y("consent")} />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink/85">
            I agree to be contacted by VLS Law Academy about this enquiry, as described in the{" "}
            <a href={contact.privacy} target="_blank" rel="noopener noreferrer" className="font-semibold text-vls underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        {err("consent")}
      </div>

      <button type="submit" disabled={submitting} aria-disabled={submitting} className={`${btnPrimary} w-full disabled:opacity-60 sm:w-auto`}>
        {submitting ? "Sending…" : registration.submit}
      </button>

      <p className="text-sm leading-relaxed text-muted">{registration.note}</p>

      <div role="status" aria-live="polite">
        {result.kind === "saved" && (
          <p className="border-l-4 border-gold bg-gold/10 px-4 py-3 text-sm text-ink">
            <strong>Thank you. We have received your enquiry.</strong> Our team will contact you with the course
            schedule, fees and registration details.
          </p>
        )}
        {result.kind === "handoff" && (
          <p className="border-l-4 border-gold bg-gold/10 px-4 py-3 text-sm text-ink">
            We opened WhatsApp with your details. <strong>Your enquiry reaches us only once you send that
            message.</strong> If WhatsApp did not open,{" "}
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-vls underline underline-offset-2">
              open it with your details
            </a>{" "}
            or call {contact.coursePhone}.
          </p>
        )}
        {result.kind === "error" && (
          <p className="border-l-4 border-vls bg-vls/5 px-4 py-3 text-sm text-ink">
            <strong>We could not send your enquiry just now.</strong> It has not been received. Please try again,
            or reach us on WhatsApp or at {contact.coursePhone}.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        <a
          href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSecondary} !px-3 text-sm whitespace-nowrap flex-1 basis-[10.5rem]`}
        >
          <WhatsAppIcon /> Chat on WhatsApp
        </a>
        <a href={contact.courseTel} className={`${btnSecondary} !px-3 text-sm whitespace-nowrap flex-1 basis-[10.5rem]`}>
          Call {contact.coursePhone}
        </a>
      </div>
    </form>
  );
}
