import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm tracking-wide text-slate-500">{landingContent.hero.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{landingContent.hero.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">{landingContent.hero.body}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={landingContent.hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            {landingContent.hero.primaryCta.label}
          </a>
          <a
            href={landingContent.hero.secondaryCta.href}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {landingContent.hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {landingContent.hero.cards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

