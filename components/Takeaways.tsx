import { takeaways } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Takeaways() {
  return (
    <section id="learn" className="border-b border-line bg-white">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>Outcomes</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">
            {takeaways.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">{takeaways.support}</p>
        </div>

        <ul className="space-y-5 lg:col-span-7">
          {takeaways.items.map((t) => (
            <li key={t} className="flex gap-4 border-b border-line pb-5 last:border-b-0">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-vls" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m4 10.5 4 4 8-9" strokeLinecap="square" />
              </svg>
              <span className="text-lg leading-snug">{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
