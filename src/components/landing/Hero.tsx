import Image from "next/image";

import { landingContent } from "@/content/landing";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-2xl">
        <div className="relative h-14 w-[260px]">
          <Image
            src="/returning-home-title.png"
            alt="Returning Home"
            fill
            className="object-contain object-left"
            priority
            sizes="260px"
          />
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">{landingContent.hero.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{landingContent.hero.body}</p>
      </div>
    </section>
  );
}

