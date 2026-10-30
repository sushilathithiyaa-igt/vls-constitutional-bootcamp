import { contact, course, howItWorks, registration, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/content";
import { btnPrimary, btnSecondary, Container, Eyebrow, WhatsAppIcon } from "./ui";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>Registration</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{howItWorks.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{registration.note}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#register" className={`${btnPrimary} whitespace-nowrap`}>Register for {course.fee}</a>
            <a href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} whitespace-nowrap`}>
              <WhatsAppIcon /> {registration.secondaryCta}
            </a>
          </div>
          <p className="mt-5 text-sm text-muted">Course enquiries</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-4">
            <a href={contact.courseTel} className="inline-block py-2 font-semibold text-vls underline underline-offset-2">{contact.coursePhone}</a>
            <a href={contact.academyTel} className="inline-block py-2 font-semibold text-vls underline underline-offset-2">{contact.academyPhone}</a>
          </p>
        </div>

        <ol className="divide-y divide-line border-y border-line lg:col-span-7">
          {howItWorks.steps.map((s, i) => (
            <li key={s.title} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
              <span aria-hidden="true" className="font-serif text-3xl text-vls">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-ink/75">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
