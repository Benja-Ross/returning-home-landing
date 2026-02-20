import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
          {landingContent.hero.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{landingContent.hero.body}</p>
      </div>
    </section>
  );
}

