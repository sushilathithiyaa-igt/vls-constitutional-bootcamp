import Image from "next/image";
import { course, hero, photos, registration } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";
import { btnPrimary, Container, Eyebrow } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={photos.hero.src}
        alt={photos.hero.alt}
        fill
        priority
        quality={60}
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/85" />

      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:items-start lg:gap-14 lg:py-16">
        <div className="on-dark rise lg:col-span-7">
          <Eyebrow light>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-[2.35rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]">
            {hero.titleLead}{" "}
            <span className="block italic text-gold">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-semibold leading-snug sm:text-xl">{hero.tagline}</p>

          <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-y border-white/20 py-5 sm:grid-cols-[auto_auto_auto_auto] sm:justify-between">
            {hero.facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dd className={`order-1 text-base font-semibold leading-snug sm:text-[17px] ${f.label === "Date" ? "" : "sm:whitespace-nowrap"}`}>{f.value}</dd>
                <dt className="order-2 mt-1 text-xs uppercase tracking-[0.12em] text-white/70">{f.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#register" className={btnPrimary}>{hero.primaryCta}</a>
            <a href="#topics" className="inline-flex min-h-12 items-center text-[15px] font-semibold underline underline-offset-4 hover:text-gold">
              {hero.secondaryCta} <span aria-hidden="true" className="ml-1">↓</span>
            </a>
          </div>
          <p className="mt-3 max-w-md text-sm text-white/75">{hero.primaryNote}</p>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85">{hero.body}</p>
        </div>

        <div id="register" className="rise scroll-mt-24 border-t-4 border-vls bg-white p-5 text-ink shadow-xl sm:p-7 lg:col-span-5" style={{ animationDelay: "80ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vls">{registration.eyebrow}</p>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-[1.7rem]">{registration.heading}</h2>
          <p className="mt-2 text-sm text-muted">{registration.body}</p>
          <div className="mt-5">
            <EnquiryForm />
          </div>
        </div>
      </Container>
      <span className="sr-only">{course.name}</span>
    </section>
  );
}
