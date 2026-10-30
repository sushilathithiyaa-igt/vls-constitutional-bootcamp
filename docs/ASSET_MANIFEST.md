# Asset manifest

Authorised for reuse by the project owner (2026-10-30). Source: the academy's own hosted assets on the DRT landing page, `https://businesslaw.vlslawacademy.com/assets/vls/<path>`. Files were downloaded once, checked as valid images (file type and dimensions) and viewed, then stored locally and served through `next/image`. Nothing is hotlinked at runtime.

| Local file | Source path | Size | Dimensions | Used for | Alt text |
| --- | --- | --- | --- | --- | --- |
| `public/assets/vls/brand/vls-logo.png` | `brand/vls-logo.png` | 12.9 KB | 234×234 PNG | Header and footer logo; favicon (`app/icon.png`, `app/apple-icon.png`); share card | VLS Law Academy |
| `public/assets/vls/classroom/classroom-wide-session.jpg` | `classroom/classroom-wide-session.jpg` | 200 KB | 1500×1125 | Hero background (under a dark overlay) | Faculty teaching a classroom of learners at VLS Law Academy |
| `public/assets/vls/classroom/classroom-faculty-teaching.jpg` | `classroom/classroom-faculty-teaching.jpg` | 274 KB | 2568×1444 | "Why Constitutional Practice Matters" | Faculty member addressing learners during a class at VLS Law Academy |
| `public/assets/vls/classroom/classroom-students-notes.jpg` | `classroom/classroom-students-notes.jpg` | 316 KB | 2568×1444 | Why VLS gallery | Learners taking notes during a session at VLS Law Academy |
| `public/assets/vls/classroom/academy-interior.jpg` | `classroom/academy-interior.jpg` | 206 KB | 1500×1125 | Why VLS gallery | VLS Law Academy reception wall with the VLS Law Academy sign |

Downloaded, inspected and deliberately NOT used:
- `classroom/classroom-faculty-pointing.jpg`: the projector slide shows unrelated civil-procedure text. File not committed.
- `classroom/classroom-procedure-flowchart.jpg`: DRT-specific procedure slide. Not downloaded.
- `faculty/dr-sivakumar.png`: DRT faculty; not confirmed for this course. Not downloaded.
- `testimonials/*`: belong to other courses. Not downloaded.

Rules
- These are general academy photographs. Captions and alt text never describe them as pictures of this boot camp. No individual is named.
- The share card (`app/opengraph-image.tsx`) and favicon now use the genuine logo (replacing the earlier text-only card and monogram).
- Fonts: Inter (next/font) for text; Georgia (system serif) for headings, matching the existing VLS landing pages.
