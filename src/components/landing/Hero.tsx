import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
          {landingContent.hero.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-3 max-w-3xl text-xl leading-relaxed text-slate-800">
          {landingContent.whatItIs.body}
        </p>
        <p className="mt-4 text-md leading-relaxed text-slate-500 tracking-wide">{landingContent.hero.body}</p>
      </div>
    </section>
  );
}

