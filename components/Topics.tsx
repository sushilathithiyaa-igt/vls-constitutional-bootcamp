import { topics } from "@/lib/content";
import { Container, Eyebrow } from "./ui";

const [writs, appeals, special] = topics.clusters;

function Num({ n, light = false }: { n: string; light?: boolean }) {
  return (
    <span aria-hidden="true" className={`font-serif text-sm tabular-nums ${light ? "text-gold" : "text-vls"}`}>
      {n}
    </span>
  );
}

export function Topics() {
  return (
    <section id="topics" className="border-b border-line bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow>13 key topics</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">{topics.heading}</h2>
          <p className="mt-5 leading-relaxed text-ink/75">{topics.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Writs & original remedies: red rule, open list */}
          <div className="border-t-4 border-vls pt-5 lg:col-span-5">
            <h3 className="font-serif text-2xl font-medium">{writs.title}</h3>
            <ul className="mt-5 divide-y divide-line">
              {writs.items.map((t) => (
                <li key={t.n} data-topic={t.name} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                  <Num n={t.n} />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Appeals & corrective remedies: charcoal panel */}
          <div className="on-dark bg-ink p-6 text-ivory sm:p-8 lg:col-span-7">
            <h3 className="font-serif text-2xl font-medium text-gold">{appeals.title}</h3>
            <ul className="mt-5 divide-y divide-ivory/15">
              {appeals.items.map((t) => (
                <li key={t.n} data-topic={t.name} className="grid grid-cols-[2rem_1fr] gap-2 py-4">
                  <Num n={t.n} light />
                  <div className="grid gap-1 sm:grid-cols-[15rem_1fr] sm:gap-6">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm leading-relaxed text-ivory/75">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Special proceedings: gold rule, four across */}
          <div className="border-t-4 border-gold pt-5 lg:col-span-12">
            <h3 className="font-serif text-2xl font-medium">{special.title}</h3>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {special.items.map((t) => (
                <li key={t.n} data-topic={t.name} className="border-t border-line py-4 lg:border-l lg:border-t-0 lg:py-0 lg:pl-5 first:lg:border-l-0 first:lg:pl-0">
                  <Num n={t.n} />
                  <p className="mt-1 font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-3xl border-l-2 border-gold pl-4 text-sm leading-relaxed text-ink/75">{topics.note}</p>
      </Container>
    </section>
  );
}
