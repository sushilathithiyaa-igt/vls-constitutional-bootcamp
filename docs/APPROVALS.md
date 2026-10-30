# Approvals tracker

Status as of 2026-10-30. CONFIRMED = stated by the project owner in chat. Everything PENDING must not be rendered as fact on the page.

## Confirmed by the project owner
| Item | Value | Notes |
| --- | --- | --- |
| Course date | Friday, 13 November 2026 | Shown in hero, registration card, how-it-works, FAQ, closing CTA, metadata and share card. |
| Time | 6:00 PM – 9:00 PM IST | "Evening" assumed from the poster's "6 to 9". |
| Duration | 3 Hours | |
| Registration fee | ₹499 | Tax treatment NOT stated and not assumed; the page does not mention tax. |
| Primary source | The course poster (13 topics) | The brochure is secondary context only. |
| Reuse of academy branding and general classroom photographs | Authorised | Logo, `classroom-wide-session`, `classroom-faculty-teaching`, `classroom-students-notes`, `academy-interior`. Used as general academy photographs, never captioned as pictures of this boot camp. |
| Course enquiry / academy phone | +91 95000 25216 / +91 95002 07811 | |
| Privacy Policy / Terms URLs | https://www.vlslawacademy.com/privacy-policy and /terms-and-conditions | Both returned 200 on 2026-10-30. |

## Still pending (not rendered as fact)
| Item | Status | Notes |
| --- | --- | --- |
| Teaching mode (online / offline / hybrid) and venue | PENDING | FAQ tells visitors to confirm with the academy. |
| Assigned faculty / instructor profile | PENDING | No faculty section. Do not name anyone from the reference pages. |
| Recordings, study material, certificates | PENDING | FAQ: "confirm with the academy". |
| Testimonials | NONE APPROVED | Testimonials on other VLS pages belong to other courses. |
| Payment provider and payment link | PENDING | No payment is taken on the page. `aiforadvocates` loads Razorpay checkout, but no key, link or flow is reused here. |
| Live lead destination | PENDING | `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_TOKEN`): JSON POST, payload in `lib/enquiry.ts`. Unset = WhatsApp handoff only, never claimed as saved. |
| Course identifier | PROPOSED | `constitutional-law-bootcamp`, sent with `courseSession: "2026-11-13"` and `feeInr: 499`. VLS to confirm what its system expects. |
| Final production domain | PENDING | Set `NEXT_PUBLIC_SITE_URL` (https). A Vercel production build fails without it; previews are noindex. |
| Analytics / Meta Pixel IDs | PENDING | Other VLS pages use `fbq`/GA; none are reused here. |
| Real-device and VoiceOver checks | NOT DONE | Automated axe and keyboard tests pass; no manual screen-reader or real-phone pass has been performed. |
| Final VLS publication approval | PENDING | |
