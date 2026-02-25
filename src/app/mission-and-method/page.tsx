import Image from "next/image";
import Link from "next/link";

import { ChapterArc } from "@/components/landing/ChapterArc";
import { PageLayout } from "@/components/layout/PageLayout";
import { missionAndMethod } from "@/content/mission-and-method";

const containerClass = "mx-auto max-w-4xl px-6 sm:px-8";
const sectionClass = "py-20 sm:py-24";
const titleClass = "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl";
const bodyClass = "text-base leading-relaxed text-neutral-800 sm:text-lg";
// Fundamental Nature: mirrored learning labels + chapter titles (same grid, same typography)
const mirrorRow =
  "grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0 sm:gap-x-12 text-center";

export default function MissionAndMethodPage() {
  const arcChaptersForHomepage = missionAndMethod.arcChapters.map((ch, i) => ({
    number: String(i + 1),
    title: ch.title,
    body: ch.description,
  }));

  return (
    <PageLayout backHref="/" backLabel="← Back home" hidePageHeader>
      {/* Section 1: Opening */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>Why This Practice Exists</h2>

          <div className="relative mt-10 sm:mt-12 w-full h-[400px] sm:h-[500px] rounded-1xl overflow-hidden shadow-sm">
            <Image
              src="/images/why-this-exists.jpg"
              alt="Tree roots near the surface of soil"
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="pointer-events-none absolute inset-0 bg-white/12" aria-hidden />
          </div>

          <div className="mt-16 sm:mt-20 space-y-6">
            {missionAndMethod.opening.map((paragraph, i) => (
              <p key={i} className={bodyClass}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Structure section: learning pattern + macro arc + chapter titles */}
      <section className={`border-t border-slate-200 ${sectionClass} bg-stone-50 py-24 sm:py-28`}>
        <div className={containerClass}>
          <h2 className={`${titleClass} mb-16 sm:mb-20 text-center`}>{missionAndMethod.structure.title}</h2>
          <p className={`${bodyClass} mt-6 mb-16 sm:mb-20 text-center max-w-2xl mx-auto`}>
            {missionAndMethod.structure.intro}
          </p>

          <div className={`${mirrorRow} mb-2 sm:mb-3`}>
            {missionAndMethod.structure.learningLabels.map((label, i) => (
              <span key={i} className="text-lg sm:text-xl font-medium tracking-wide text-neutral-600">
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative left-1/2 mt-1 sm:mt-3 w-screen -translate-x-1/2 overflow-x-clip">
          <div className="mx-auto max-w-6xl px-6 py-2 sm:px-8 sm:py-3">
            <ChapterArc chapters={arcChaptersForHomepage} arcOnly />
          </div>
        </div>

        <div className={containerClass}>
          <div className={`${mirrorRow} -mt-10 sm:-mt-12`}>
            {missionAndMethod.structure.chapterTitles.map((title, i) => (
              <span key={i} className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
                {title}
              </span>
            ))}
          </div>

          <p className={`${bodyClass} mt-12 sm:mt-14 text-center max-w-2xl mx-auto`}>
            {missionAndMethod.structure.reinforcement}
          </p>
        </div>
      </section>

      {/* Section 4: Chapters (Remembering, Revealing, Reconnecting) */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>The Three Chapters</h2>

          <div className="mt-12 space-y-16">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Remembering Home</h3>
              <p className="mt-1 italic text-neutral-700 sm:text-lg">
                {missionAndMethod.arcChapters[0].description}
              </p>
              <div className="mt-4 space-y-4">
                {missionAndMethod.chapters.remembering.map((p, i) => (
                  <p key={i} className={bodyClass}>{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">Revealing the Way Home</h3>
              <p className="mt-1 italic text-neutral-700 sm:text-lg">
                {missionAndMethod.arcChapters[1].description}
              </p>
              <div className="mt-4 space-y-4">
                {missionAndMethod.chapters.revealing.map((p, i) => (
                  <p key={i} className={bodyClass}>{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">Reconnecting & Walking Home</h3>
              <p className="mt-1 italic text-neutral-700 sm:text-lg">
                {missionAndMethod.arcChapters[2].description}
              </p>
              <div className="mt-4 space-y-4">
                {missionAndMethod.chapters.reconnecting.map((p, i) => (
                  <p key={i} className={bodyClass}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Human ecology + forest image (slight breakout) */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>Seeing Our Human Ecology</h2>
          <div className="mt-8 space-y-4">
            {missionAndMethod.humanEcology.intro.map((p, i) => (
              <p key={i} className={bodyClass}>{p}</p>
            ))}
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="mx-auto max-w-5xl px-6 sm:px-8">
              <Image
                src="/images/forest-ecology.jpg"
                alt="A healthy forest thrives because of interconnection: roots, mycelium networks, and the full picture of interconnectivity."
                width={1200}
                height={675}
                className="w-full h-auto rounded-1xl border border-neutral-200"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>

          <ul className="mt-10 space-y-3">
            {missionAndMethod.humanEcology.bullets.map((bullet, i) => (
              <li key={i} className={`${bodyClass} pl-4 border-l-2 border-slate-200`}>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4">
            {missionAndMethod.humanEcology.closing.map((p, i) => (
              <p key={i} className={bodyClass}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-neutral-600">
            If you want a deeper exploration of human ecology, you can read our Substack article on on that subject here: {" "}
            <Link 
              href="https://awakeninglands.substack.com/p/a-search-for-the-meaning-of-human" 
              className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Why Human Ecology Matters
            </Link>{""}
          </p>
        </div>
      </section>

      {/* Section 6: How this grows */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>How This Grows</h2>
          <div className="mt-8 space-y-6">
            {missionAndMethod.howThisGrows.map((p, i) => (
              <p key={i} className={bodyClass}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: A Note From Benji */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>A Note From Benji</h2>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <Image
                src="/images/benji.png"
                alt="Benji Ross"
                width={140}
                height={140}
                className="rounded-md object-cover"
              />
            </div>
            <div className="max-w-prose space-y-4">
              {missionAndMethod.benjiNote.bullets.map((bullet, i) => (
                <p key={i} className={bodyClass}>{bullet}</p>
              ))}
              <p className={bodyClass}>{missionAndMethod.benjiNote.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lineage */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>{missionAndMethod.lineage.title}</h2>
          <p className={`${bodyClass} mt-6`}>{missionAndMethod.lineage.body}</p>
        </div>
      </section>

      {/* Brand signature */}
      <section className="mt-20 pb-20">
        <div className={`${containerClass} flex flex-col items-center text-center`}>
          <p className="text-sm text-neutral-600 text-center">
            Returning Home is part of Awakening Lands.
          </p>
          <Image
            src="/images/logo.png"
            alt="Awakening Lands"
            width={220}
            height={80}
            className="mx-auto mt-5 w-full max-w-[220px] h-auto"
          />
        </div>
      </section>
    </PageLayout>
  );
}
