import { audience, photos, whyVls } from "@/lib/content";
import { Container, Eyebrow, Photo } from "./ui";

export function Audience() {
  return (
    <section id="audience" className="border-b border-line">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Eyebrow>Audience</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">{audience.heading}</h2>
        <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {audience.items.map((a) => (
            <li key={a.title} className="border-b border-line py-6 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <h3 className="font-serif text-xl font-medium">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{a.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function WhyVls() {
  return (
    <section id="why-vls" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Why VLS Law Academy</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{whyVls.heading}</h2>
            <p className="mt-5 leading-relaxed text-ink/75">{whyVls.intro}</p>
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-6">
            {whyVls.points.map((p) => (
              <div key={p.title} className="py-5">
                <dt className="font-semibold">{p.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/75">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="mt-12">
          <div className="grid gap-3 sm:grid-cols-5">
            <Photo photo={photos.learners} sizes="(min-width: 1024px) 700px, (min-width: 640px) 60vw, 100vw" position="40% 50%" className="aspect-[16/10] sm:col-span-3 sm:aspect-auto sm:min-h-[22rem]" />
            <Photo photo={photos.academy} sizes="(min-width: 1024px) 470px, (min-width: 640px) 40vw, 100vw" position="55% 50%" className="aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:min-h-[22rem]" />
          </div>
          <figcaption className="mt-3 text-sm text-muted">{whyVls.galleryCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
