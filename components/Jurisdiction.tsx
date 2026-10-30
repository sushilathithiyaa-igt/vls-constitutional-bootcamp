import { jurisdiction } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Jurisdiction() {
  return (
    <section id="jurisdiction" className="border-b border-line">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow>Courts and provisions</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{jurisdiction.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{jurisdiction.intro}</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {jurisdiction.courts.map((c) => (
            <div key={c.name} className="border-t-4 border-ink pt-5">
              <h3 className="font-serif text-2xl font-medium">{c.name}</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {c.items.map((i) => (
                  <li key={i} className="py-3 text-[15px] leading-snug">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
