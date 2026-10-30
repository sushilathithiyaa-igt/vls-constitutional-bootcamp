import Image from "next/image";
import { contact, course, faqs, finalCta, photos } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="border-b border-line bg-white">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">Clear answers before you register.</h2>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold sm:text-lg">
                {f.q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-vls" />
                  <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-vls transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="final-cta" className="on-dark bg-vls text-white">
      <Container className="flex flex-col items-start gap-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">{finalCta.heading}</h2>
          <p className="mt-4 leading-relaxed text-white/85">{finalCta.body}</p>
          <p className="mt-3 text-sm font-semibold">{course.dateLong} · {course.time} · {course.duration} · {course.fee}</p>
        </div>
        <a
          href="#register"
          className="inline-flex min-h-12 shrink-0 items-center justify-center bg-ivory px-7 py-3 text-[15px] font-semibold text-vls transition-colors hover:bg-white active:scale-[0.98] motion-reduce:active:scale-100"
        >
          {finalCta.cta}
        </a>
      </Container>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink pb-28 text-ivory/80 lg:pb-0">
      <Container className="grid gap-8 py-12 text-sm leading-relaxed md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src={photos.logo.src} alt={photos.logo.alt} width={photos.logo.width} height={photos.logo.height} className="h-16 w-16 bg-white p-1" />
          <address className="mt-4 not-italic">{contact.address}</address>
        </div>
        <div className="md:col-span-4">
          <p className="font-semibold text-ivory">Contact</p>
          <p className="mt-3">
            Phone:{" "}
            <a href={contact.courseTel} className="inline-block py-1.5 underline underline-offset-2 hover:text-gold">{contact.coursePhone}</a>
            {" / "}
            <a href={contact.academyTel} className="inline-block py-1.5 underline underline-offset-2 hover:text-gold">{contact.academyPhone}</a>
          </p>
          <p className="mt-1">
            Website:{" "}
            <a href={contact.website} className="inline-block py-1.5 underline underline-offset-2 hover:text-gold">vlslawacademy.com</a>
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-semibold text-ivory">Legal</p>
          <ul className="mt-2">
            <li><a href={contact.privacy} className="inline-block py-1.5 underline underline-offset-2 hover:text-gold">Privacy Policy</a></li>
            <li><a href={contact.terms} className="inline-block py-1.5 underline underline-offset-2 hover:text-gold">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
