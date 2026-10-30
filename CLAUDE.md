# VLS Constitutional Law & Practice Boot Camp — project rules

Read `docs/PROJECT_BRIEF.md` first. Work on one module at a time; run lint, `npm test`, `npm run build` and `npm run test:e2e` before committing.

## Source of truth
- The course **poster** is the primary source: the 13 key topics, in the poster's order and terminology. The VLS brochure (Module 1, Constitutional Laws and Practice) is secondary and only supplies short supporting context.
- Copy: `docs/VLS_BOOTCAMP_CONTENT.md` and `lib/content.ts`. Course facts live in one place: `course` in `lib/content.ts`.
- Confirmed facts (owner-confirmed, see `docs/APPROVALS.md`): Friday, 13 November 2026 · 6:00 PM – 9:00 PM IST · 3 Hours · ₹499.
- Still unconfirmed, never rendered as fact: teaching mode, faculty, certificates/recordings, payment provider, production domain, live lead destination.

## Hard content rules
- Do not present the brochure's six syllabus units as modules of this session. The 13 poster topics are the curriculum. Never add Civil/Criminal Procedure, Corporate, Property or any other brochure module.
- Never promise mastery of all 13 topics in three hours, "courtroom-ready" outcomes, or independent filing of every petition.
- Never copy dates, prices, faculty, testimonials or slides from the DRT/SARFAESI, AI for Advocates or MACT pages.
- Do not assume ₹499 includes or excludes taxes; do not invent payment links or keys; never show a fake payment-success state. The form starts a registration enquiry and says so.
- Academy photographs are general classroom/premises photos, never captioned or described as pictures of this boot camp. No faculty names, no testimonials.
- No fake scarcity (seats, deadlines, discounts).
- Contact: +91 95000 25216 (course), +91 95002 07811 (academy).

## Design (match the existing VLS landing pages)
- Reference: https://businesslaw.vlslawacademy.com/ — white header with logo, dark hero with gold eyebrow and Georgia headline with an italic gold accent, registration card in the hero, facts row, ivory (#F5F1E9) body, red CTAs, Inter body text.
- Palette: VLS red #AE1015, charcoal #111315, ivory #F5F1E9, gold #C8A46B. Variance 6, motion 3, density 5.
- No gradient headlines, fake 3D gavels, glassmorphism, emoji icons, carousels, placeholder photography or wall-to-wall identical cards.
- Motion is restrained; honour `prefers-reduced-motion`. Visible focus states; label every field; tap targets >= 44px; form text >= 16px.

## Engineering
- Next.js App Router + Tailwind. Minimal dependencies; justify any new one. Dev-only: Vitest, Playwright, axe.
- Images: local files under `public/assets/vls/` via `next/image`; never hotlink at runtime.
- SEO: `NEXT_PUBLIC_SITE_URL` (https) is required on a Vercel production build; previews stay noindex.
- Never touch live VLS sites, production lead endpoints or payment keys. No secrets in the repo. Do not deploy.
- The e2e suite blocks all non-loopback requests and posts only to a local mock webhook.
- Observed here: stray " 2" duplicate files appear inside `.next` (cause not confirmed; possibly folder sync). If a build fails on `routes.d 2.ts`, delete `.next` and rebuild.
