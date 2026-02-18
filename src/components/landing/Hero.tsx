import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm tracking-wide text-slate-500">{landingContent.hero.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{landingContent.hero.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">{landingContent.hero.body}</p>
      </div>
    </section>
  );
}

