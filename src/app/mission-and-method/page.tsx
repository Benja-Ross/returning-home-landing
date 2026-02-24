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
const mirrorText =
  "text-lg sm:text-xl font-semibold tracking-tight text-neutral-900";

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
          <div className="mt-8 space-y-6">
            {missionAndMethod.opening.map((paragraph, i) => (
              <p key={i} className={bodyClass}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Structure section: learning pattern + macro arc + chapter titles */}
      <section className={`border-t border-slate-200 ${sectionClass} py-24 sm:py-28`}>
        <div className={containerClass}>
          <h2 className={titleClass}>{missionAndMethod.structure.title}</h2>
          <p className={`${bodyClass} mt-6 mb-16 sm:mb-20`}>
            {missionAndMethod.structure.intro}
          </p>

          <div className={`${mirrorRow} mb-2 sm:mb-3`}>
            {missionAndMethod.structure.learningLabels.map((label, i) => (
              <span key={i} className={mirrorText}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative left-1/2 mt-6 sm:mt-8 w-screen -translate-x-1/2 overflow-x-clip">
          <div className="mx-auto max-w-6xl px-6 py-2 sm:px-8 sm:py-3">
            <ChapterArc chapters={arcChaptersForHomepage} arcOnly />
          </div>
        </div>

        <div className={containerClass}>
          <div className={`${mirrorRow} -mt-10 sm:-mt-12`}>
            {missionAndMethod.structure.chapterTitles.map((title, i) => (
              <span key={i} className={mirrorText}>
                {title}
              </span>
            ))}
          </div>

          <p className={`${bodyClass} mt-16 sm:mt-18`}>
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
                className="w-full h-auto rounded-2xl border border-neutral-200"
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

      {/* Section 7: Benji video placeholder */}
      <section className={`border-t border-slate-200 ${sectionClass}`}>
        <div className={containerClass}>
          <h2 className={titleClass}>A Note From Benji</h2>
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <div className="aspect-video w-full rounded-2xl border border-neutral-200 bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-500 text-center text-sm sm:text-base">
                Welcome video coming soon.
              </p>
            </div>
            <p className="mt-4 text-center text-sm leading-relaxed text-neutral-600">
              For now, this page holds the structure of the practice.
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {missionAndMethod.benjiNote.bullets.map((bullet, i) => (
              <p key={i} className={bodyClass}>{bullet}</p>
            ))}
            <p className={bodyClass}>{missionAndMethod.benjiNote.closing}</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
