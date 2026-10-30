# VLS Constitutional Law & Practice Boot Camp: page content

Source of truth in code: `lib/content.ts`. This file records the same content for review.
Primary source: the course poster. Secondary: the VLS brochure's Module 1 (Constitutional Laws and Practice), used only for concise supporting context. No other brochure module is part of this boot camp.

## Confirmed course facts (project owner)
- Course: Constitutional Law & Practice Boot Camp, VLS Law Academy
- Date: Friday, 13 November 2026
- Time: 6:00 PM – 9:00 PM IST (evening timing assumed from the poster's "6 to 9")
- Duration: 3 Hours
- Registration fee: ₹499 (tax treatment not stated; the page says nothing about it)
- Course enquiry: +91 95000 25216 · Academy: +91 95002 07811 · https://www.vlslawacademy.com/

## Page order
A. Sticky header (logo, nav, "Register ₹499")
B. Hero: eyebrow, "Constitutional Law / & Practice Boot Camp", tagline, facts (date, time, duration, fee), CTA "Register for ₹499" + "Explore What You'll Learn", supporting copy, real classroom photograph behind a dark overlay
C. Registration card in the hero (form: name, mobile, email, status, optional city, consent). Explains that submitting starts an enquiry and that no payment is taken on the page
D. Quick facts (the hero facts row; repeated in the card, FAQ and closing CTA)
E. Why Constitutional Practice Matters (+ photograph)
F. The gap: theory vs practical procedure (questions)
G. All 13 Key Topics Covered, in three groups, poster terminology and numbering
H. Constitutional Remedies and Jurisdiction (Supreme Court / High Courts)
I. What Participants Will Learn
J. Who Should Attend
K/L. Why VLS Law Academy + classroom and premises photographs (captioned as general academy photographs)
M. Faculty: omitted (not confirmed). N. Testimonials: omitted (none approved)
O. How Registration Works (enquiry, payment and confirmation details from the academy, session)
P. FAQs (9)
Q. Final CTA
R. Footer (logo, address, phones, website, Privacy Policy, Terms)

## The 13 key topics (poster order)
01 Writ Petitions / Writ Appeals · 02 Public Interest Litigations (PILs) · 03 Special Leave Petitions · 04 Constitutional Appeals · 05 Original Petition – Supreme Court & High Court · 06 Review Petitions · 07 Curative Petition · 08 Transfer Petitions · 09 Contempt Petitions · 10 Election Petitions · 11 Advisory Reference · 12 Supervisory Petition (Article 227) · 13 Certificate Petition (Article 134A)

Groups (display only): Writs & Original Remedies (01, 02, 05, 12) · Appeals & Corrective Remedies (03, 04, 06, 07, 13) · Special Constitutional Proceedings (08, 09, 10, 11).
A note on the page says the three-hour session offers a structured overview of each topic, not a full course on every petition.

## Registration behaviour
- Primary CTA "Register for ₹499" scrolls to the registration card; it starts an enquiry. It does not take payment and the page never shows a payment-success state.
- Form posts to `/api/enquiry`. With `LEAD_WEBHOOK_URL` set the lead is forwarded (payload includes `course`, `courseSession`, `feeInr`, UTM); without it the form opens a pre-filled WhatsApp message and says the enquiry reaches the academy only once that message is sent. Failures say the enquiry was not received.
