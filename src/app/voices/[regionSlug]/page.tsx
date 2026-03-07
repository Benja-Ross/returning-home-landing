import { notFound } from "next/navigation";

import { ChapterArc } from "@/components/landing/ChapterArc";
import { VoicesForm } from "@/components/voices/VoicesForm";
import { VoicesHero } from "@/components/voices/VoicesHero";
import { SubmissionsFeed } from "@/components/voices/SubmissionsFeed";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  getActiveRegionWeek,
  getRegionCycleWeeks,
  getApprovedSubmissionsPageForRegion,
} from "@/lib/voices/data";
import { getParticipationSummary } from "@/lib/voices/participation";
import {
  getReflectionContent,
  REFLECTION_FALLBACKS,
} from "@/lib/voices/reflection";
import { getRegion, REGIONS } from "@/lib/voices/regions";

const ARC_DUMMY_CHAPTERS = [
  { number: "1", title: "", body: "" },
  { number: "2", title: "", body: "" },
  { number: "3", title: "", body: "" },
];

export const dynamic = "force-dynamic";

const containerClass = "mx-auto max-w-3xl px-6 py-12";
const sectionClass = "mt-10 space-y-4";
const headingClass = "text-2xl font-semibold text-slate-900";

/** Fallback arc labels when region has no cycle weeks in DB. */
const FALLBACK_ARC_WEEKS = [
  { subtext: "Week 1", title: "—" },
  { subtext: "Week 2", title: "—" },
  { subtext: "Week 3", title: "—" },
  { subtext: "Week 4", title: "—" },
  { subtext: "Week 5", title: "—" },
  { subtext: "Week 6", title: "—" },
];

type Props = { params: Promise<{ regionSlug: string }> };

export default async function VoicesRegionPage({ params }: Props) {
  const { regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region) {
    notFound();
  }

  const [activeWeek, cycleWeeks] = await Promise.all([
    getActiveRegionWeek(region.slug),
    getRegionCycleWeeks(region.slug),
  ]);

  const arcWeeks =
    cycleWeeks.length > 0
      ? cycleWeeks.map((w) => ({ subtext: w.weekLabel, title: w.themeTitle }))
      : FALLBACK_ARC_WEEKS;
  const activeWeekIndex =
    activeWeek != null
      ? cycleWeeks.findIndex((w) => w.regionCycleWeekId === activeWeek.regionCycleWeekId)
      : -1;

  const feed = await getApprovedSubmissionsPageForRegion({
    regionSlug: region.slug,
    limit: 12,
  });

  const realVoicesQuotes =
    activeWeek?.voicesFromStories?.filter(
      (q) => typeof q === "string" && q.trim().length > 0
    ) ?? [];

  return (
    <PageLayout hidePageHeader>
      <VoicesHero regionName={region.displayName} heroImageSrc="/images/blur.png" />

      <section className="w-full py-6 sm:py-8" aria-labelledby="six-week-arc-heading">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <h2
            id="six-week-arc-heading"
            className="text-center text-lg font-semibold text-slate-900 sm:text-xl"
          >
            The Six Weekly Topics
          </h2>
          <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden opacity-90 sm:mt-5">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
              <ChapterArc chapters={ARC_DUMMY_CHAPTERS} arcOnly />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-2 sm:-mt-10">
            {arcWeeks.map((week, i) => {
              const isActive = i === activeWeekIndex;
              return (
                <div key={i} className="text-center">
                  <p
                    className={`mt-0.5 text-xs sm:mt-1 sm:text-sm ${
                      isActive ? "text-slate-900 font-semibold" : "text-slate-800 font-medium"
                    }`}
                  >
                    {week.subtext}
                  </p>
                  <p
                    className={`text-xs sm:text-sm ${
                      isActive ? "text-slate-900 font-semibold" : "text-slate-800 font-medium"
                    }`}
                  >
                    {week.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeWeek ? (
        <section className="w-full bg-[#faf6f1] py-10 sm:py-18" aria-labelledby="voice-question">
          <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
            <p className="text-base font-medium text-slate-600 sm:text-lg">
              The {activeWeek.weekLabel} question:
            </p>
            <svg
              className="mx-auto mt-4 h-8 w-8 text-amber-700/40 sm:h-10 sm:w-10"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="16" cy="16" r="3" />
              <circle cx="16" cy="16" r="7" />
              <circle cx="16" cy="16" r="11" />
              <circle cx="16" cy="16" r="14" />
            </svg>
            <p id="voice-question" className="mt-6 text-2xl font-medium leading-relaxed text-slate-900 sm:text-3xl sm:leading-relaxed">
              {activeWeek.question}
            </p>
            <p className="mt-5 text-sm text-slate-500">
              Share a sentence or a paragraph below.
            </p>
          </div>
        </section>
      ) : (
        <section className="w-full bg-[#faf6f1] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
            <p className="text-slate-600">A new question is coming soon.</p>
            <p className="mt-1 text-sm text-slate-500">Check back in a day or two.</p>
          </div>
        </section>
      )}

      <div
        className="h-10 w-full bg-gradient-to-b from-[#faf6f1] to-slate-900 sm:h-12"
        aria-hidden
      />

      <section className="w-full bg-slate-900 border-b border-slate-700/60">
        <div className="mx-auto max-w-3xl px-6 pt-14 text-center sm:px-8 sm:pt-16">
          <svg
            className="mx-auto h-12 w-12 text-amber-300"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M8 16c3-3.5 6-5.25 8-5.25 2 0 5 1.75 8 5.25" />
            <path d="M10 20c2-2.25 4-3.4 6-3.4 2 0 4 1.15 6 3.4" />
            <path d="M13 23.5c1.2-1.2 2.4-1.8 3.5-1.8 1.1 0 2.3.6 3.5 1.8" />
          </svg>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.01em] text-white sm:text-4xl">
            What Voices of Place Are Saying
          </h2>
          <p className="text-white italic pt-2">Your voice can become a part of this</p>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-16 text-left sm:px-8 sm:pb-20">
          <div className="space-y-12 pt-12 sm:pt-14">
            {/* Block 1: This Week's Reflection */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-wide text-slate-300/70">
                {activeWeek ? `${activeWeek.weekLabel} Reflection` : "Reflection"}
              </p>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {activeWeek?.themeTitle ?? "—"}
              </h3>

              <div className="space-y-0">
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Participation</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    {getParticipationSummary(
                      activeWeek?.participationSummary ?? null,
                      activeWeek?.totalResponses ?? 0,
                      activeWeek?.distinctAreas ?? 0
                    )}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Patterns Emerging</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    {getReflectionContent(
                      activeWeek?.patternsEmerging,
                      REFLECTION_FALLBACKS.patternsEmerging
                    )}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Voices From the Stories</h4>
                  <div className="space-y-4">
                    {realVoicesQuotes.length > 0 ? (
                      realVoicesQuotes.map((quote, i) => (
                        <blockquote
                          key={i}
                          className="border-l-2 border-white/15 pl-4 text-slate-200/85 italic leading-relaxed"
                        >
                          {quote}
                        </blockquote>
                      ))
                    ) : (
                      <p className="text-slate-200/85 leading-relaxed">
                        {REFLECTION_FALLBACKS.voicesFromStories}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Voice of Place</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    {getReflectionContent(
                      activeWeek?.voiceOfPlace,
                      REFLECTION_FALLBACKS.voiceOfPlace
                    )}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Emerging Story</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    {getReflectionContent(
                      activeWeek?.emergingStory,
                      REFLECTION_FALLBACKS.emergingStory
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Block 2: Weekly Summaries */}
            <div className="space-y-6 border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-wide text-slate-300/70">
                Weekly Summaries
              </p>
              <div className="space-y-6">
                {cycleWeeks.length > 0
                  ? cycleWeeks.map((w) => (
                      <div key={w.regionCycleWeekId} className="space-y-2">
                        <p className="font-semibold text-slate-100">
                          {w.weekLabel} - {w.themeTitle}
                          {w.status === "active" ? " (current week)" : ""}
                        </p>
                        <p className="text-slate-200/85 leading-relaxed text-sm">
                          {w.summaryShort ?? "—"}
                        </p>
                      </div>
                    ))
                  : (
                      <>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <div key={n} className="space-y-2">
                            <p className="font-semibold text-slate-100">Week {n} — —</p>
                            <p className="text-slate-200/85 leading-relaxed text-sm">—</p>
                          </div>
                        ))}
                      </>
                    )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`${containerClass} pt-10 sm:pt-14`}>
        {region.stewards.length > 0 && (
          <section className={sectionClass}>
            <h2 className={headingClass}>Stewards</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {region.stewards.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </section>
        )}

        {activeWeek && (
          <section className={sectionClass}>
            <h2 className={headingClass}>Add Your Voice to Your Place</h2>
            <VoicesForm
              regionSlug={region.slug}
              regionCycleWeekId={activeWeek.regionCycleWeekId}
              neighborhoodHint={region.neighborhoodHint}
            />
          </section>
        )}

        <section id="responses" className={sectionClass}>
          <SubmissionsFeed
            regionSlug={region.slug}
            initialItems={feed.items}
            initialTotalApproved={feed.totalApproved}
            initialNextCursor={feed.nextCursor}
          />
        </section>
      </div>
    </PageLayout>
  );
}

export function generateStaticParams(): { regionSlug: string }[] {
  return Object.keys(REGIONS).map((regionSlug) => ({ regionSlug }));
}
