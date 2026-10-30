"use client";

import { useEffect, useRef, useState } from "react";
import { btnPrimary, Container } from "./ui";

const links = [
  { href: "#syllabus", label: "Syllabus" },
  { href: "#topics", label: "Petition topics" },
  { href: "#audience", label: "Who should attend" },
  { href: "#faq", label: "FAQs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex min-h-11 flex-col justify-center leading-tight">
          <span className="block text-[15px] font-bold tracking-[0.12em] text-vls">VLS LAW ACADEMY </span>
          <span className="block text-[11px] uppercase tracking-[0.16em] text-muted">Constitutional Law Boot Camp</span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/80 hover:text-vls">
              {l.label}
            </a>
          ))}
          <a href="#register" className={`${btnPrimary} !min-h-10 !px-5 !py-2`}>
            Enquire
          </a>
        </nav>

        <button
          ref={toggle}
          type="button"
          className="inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <nav id="mobile-menu" aria-label="Primary mobile" className="border-t border-line bg-ivory lg:hidden">
          <Container className="flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <a href="#register" onClick={() => setOpen(false)} className={`${btnPrimary} my-4`}>
              Enquire / Register Now
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
