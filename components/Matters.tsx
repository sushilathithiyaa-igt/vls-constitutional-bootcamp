import { matters, photos } from "@/lib/content";
import { Container, Eyebrow, Photo } from "./ui";

export function Matters() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <Eyebrow>The practice</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{matters.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{matters.intro}</p>
          <ul className="mt-7 divide-y divide-line border-y border-line">
            {matters.points.map((p, i) => (
              <li key={p.title} className="grid gap-1 py-4 sm:grid-cols-[2.5rem_1fr]">
                <span aria-hidden="true" className="font-serif text-lg text-vls">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <Photo photo={photos.teaching} sizes="(min-width: 1024px) 45vw, 100vw" position="30% 40%" className="aspect-[4/3] w-full" />
        </div>
      </Container>
    </section>
  );
}
