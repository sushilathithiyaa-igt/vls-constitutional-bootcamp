"use client";

import { useEffect, useState } from "react";
import { course, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/content";
import { WhatsAppIcon } from "./ui";

/** Compact bottom action on mobile. Hidden while the registration form or final CTA is on screen. */
export function StickyEnquiryBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["register", "final-cta"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <aside
      aria-label="Quick enquiry actions"
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 lg:hidden ${hidden ? "translate-y-full" : ""}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href="#register"
          tabIndex={hidden ? -1 : 0}
          className="inline-flex min-h-12 flex-1 items-center justify-center bg-vls px-4 text-[15px] font-semibold text-white active:bg-vls-dark"
        >
          Register {course.fee}
        </a>
        <a
          href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : 0}
          aria-label="Enquire on WhatsApp (opens in a new tab)"
          className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 border border-ink/30 px-4 text-[15px] font-semibold"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
