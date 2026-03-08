import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section
      className="relative w-full min-h-[50vh] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/blue-sky.png)" }}
    >
      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {landingContent.hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-3 max-w-3xl text-xl leading-relaxed text-white">
            {landingContent.whatItIs.body}
          </p>
          <p className="mt-4 text-md leading-relaxed text-white tracking-wide">{landingContent.hero.body}</p>
        </div>
      </div>
    </section>
  );
}

