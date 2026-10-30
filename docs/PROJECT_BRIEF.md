PROJECT: VLS Constitutional Law & Practice Boot Camp
DESCRIPTION: Mobile-first, conversion-focused landing page for the Friday, 13 November 2026 boot camp (6:00-9:00 PM IST, 3 hours, ₹499)
EXECUTION PLATFORM: Claude Code
STACK: Next.js (App Router) + Tailwind; Vitest, Playwright and axe (dev only)
SCOPE: One landing page, enquiry flow, responsive UI
OUT OF SCOPE: Other courses, student portal, unapproved payments
PRIMARY GOAL: Qualified course enquiries
SECONDARY GOAL: WhatsApp and telephone enquiries

DESIGN:
  primary: "#AE1015"
  dark: "#111315"
  background: "#F5F1E9"
  accent: "#C8A46B"
  variance: 6
  motion: 3
  density: 5

CONTENT SOURCE:
  - Constitutional Law Boot Camp poster (PRIMARY: the 13 key topics)
  - VLS syllabus brochure, Module 1 (SECONDARY: supporting context only)
  - docs/VLS_BOOTCAMP_CONTENT.md

MODULES:
  M0: Repository research and setup
  M1: Landing page layout and content
  M2: Registration enquiry flow
  M3: Responsive, accessible and performance polish
  M4: Read-only verification and release preparation

STATUS: Complete (completion pass 2026-10-30): poster-led 13 topics, confirmed date/time/fee, official logo and academy photographs, VLS-style hero with registration card. Pending outside the repo: lead destination, payment provider, production domain, teaching mode, faculty, publication approval.
DEPLOYMENT: Local preview and staging only until approved

LOOP RULES:
  Actions:      Read repo, write scoped frontend changes, run local tests
  Done:         All approved content renders, lead flow works, audits pass
  Bounds:       One module at a time, bounded retries, stop on unresolved external dependencies
  Blast radius: Never modify existing live landing pages, production leads, payments or unrelated routes
  Digest:       Short change report, screenshots, test results, remaining approval items
  Publication approval stays with the VLS team.
