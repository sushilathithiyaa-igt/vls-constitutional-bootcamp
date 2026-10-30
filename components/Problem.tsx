import { problem } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

export function Problem() {
  return (
    <section className="on-dark bg-ink text-ivory">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow light>The gap</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{problem.heading}</h2>
          <p className="mt-5 leading-relaxed text-ivory/75">{problem.intro}</p>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
            {problem.questions.map((q) => (
              <li key={q} className="py-5 font-serif text-xl leading-snug sm:text-2xl">{q}</li>
            ))}
          </ul>
          <p className="mt-7 border-l-2 border-gold pl-4 font-serif text-lg italic text-gold sm:text-xl">{problem.closing}</p>
        </div>
      </Container>
    </section>
  );
}
