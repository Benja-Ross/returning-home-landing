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
  getRegionParticipationTotals,
} from "@/lib/voices/data";
import { getParticipationSummary } from "@/lib/voices/participation";
import {
  getReflectionContent,
  getWeeklySummaryText,
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
const VOICES_PROMPT_VIDEO_EMBED_URL = "https://www.youtube.com/embed/jTifWyCOMD4";
const PODCAST_PODBEAN_URL = "https://www.podbean.com/pw/pbblog-3svvu-1535373";
const PODCAST_SPOTIFY_URL =
  "https://open.spotify.com/show/2bQMMnPXolLByovYmw31kt?si=3788fe2cf61148ec";
const PODCAST_APPLE_URL =
  "https://podcasts.apple.com/us/podcast/the-returning-home-podcast/id1892657494";

/** Fallback arc labels when region has no cycle weeks in DB. */
const FALLBACK_ARC_WEEKS = [
  { weekLabel: "Week 1", themeTitle: "—", opensAt: null, status: "upcoming" as const },
  { weekLabel: "Week 2", themeTitle: "—", opensAt: null, status: "upcoming" as const },
  { weekLabel: "Week 3", themeTitle: "—", opensAt: null, status: "upcoming" as const },
  { weekLabel: "Week 4", themeTitle: "—", opensAt: null, status: "upcoming" as const },
  { weekLabel: "Week 5", themeTitle: "—", opensAt: null, status: "upcoming" as const },
  { weekLabel: "Week 6", themeTitle: "—", opensAt: null, status: "upcoming" as const },
];

function formatWeekOpenDate(opensAt: string | null): string | null {
  if (!opensAt) return null;
  const date = new Date(opensAt);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

type Props = { params: Promise<{ regionSlug: string }> };

export default async function VoicesRegionPage({ params }: Props) {
  const { regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region) {
    notFound();
  }

  const [activeWeek, cycleWeeks, regionParticipation] = await Promise.all([
    getActiveRegionWeek(region.slug),
    getRegionCycleWeeks(region.slug),
    getRegionParticipationTotals(region.slug),
  ]);

  const arcWeeks =
    cycleWeeks.length > 0
      ? cycleWeeks.map((w) => ({
          weekLabel: w.weekLabel,
          themeTitle: w.themeTitle,
          opensAt: w.opensAt,
          status: w.status,
        }))
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

      <section className="mx-auto w-full max-w-3xl px-6 pt-7 sm:px-8 sm:pt-8" aria-labelledby="voices-video-label">
        <details className="group rounded-lg border border-slate-300/80 bg-slate-50/70 px-4 py-3 shadow-sm">
          <summary
            id="voices-video-label"
            className="cursor-pointer list-none text-sm text-slate-700 marker:content-['']"
          >
            <span className="inline-flex w-full items-center justify-center gap-2 text-center">
              <svg
                className="h-4 w-4 text-rose-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6Zm-1.7 5.1c0-.4.5-.7.9-.5l4.6 2.7c.4.2.4.8 0 1l-4.6 2.7c-.4.2-.9 0-.9-.5V6.8Z" />
              </svg>
              <span className="font-medium text-slate-900">Watch a short video to introduce this practice and the week 1 prompt</span>
              <svg
                className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 7.5L10 12.5L15 7.5" />
              </svg>
            </span>
          </summary>
          <div className="mt-3 overflow-hidden rounded-md border border-slate-200/70">
            <div className="aspect-video w-full">
              <iframe
                title="Voices weekly prompt video"
                src={VOICES_PROMPT_VIDEO_EMBED_URL}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </details>
      </section>

      {/* Top rim: clearly visible lit edge above the slab */}
      <div
        className="h-14 w-full bg-[linear-gradient(to_bottom,white_0%,white_35%,rgba(226,232,240,0.45)_70%,rgba(203,213,225,0.7)_100%)]"
        aria-hidden
      />

      <section
        className="w-full py-7 sm:py-9 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]"
        aria-labelledby="six-week-arc-heading"
      >
        <div className="mx-auto max-w-5xl px-6 pt-8 pb-8 sm:px-8">
          <h2
            id="six-week-arc-heading"
            className="text-center text-lg font-semibold text-slate-900 sm:text-xl mb-1 sm:mb-2"
          >
            The Six Weekly Topics
          </h2>
          <div className="relative left-1/2 mt-2 w-screen -translate-x-1/2 overflow-hidden sm:mt-3">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
              <ChapterArc chapters={ARC_DUMMY_CHAPTERS} arcOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-6 sm:gap-2 sm:gap-y-0 sm:-mt-8">
            {arcWeeks.map((week, i) => {
              const isActive = i === activeWeekIndex;
              return (
                <div
                  key={i}
                  className={`text-center py-2 pb-2 sm:py-1.5 sm:pb-1.5`}
                >
                  <p
                    className={`text-base sm:text-lg ${
                      isActive ? "font-extrabold text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {week.weekLabel}
                  </p>
                  <p
                    className={`mt-0.5 text-sm leading-snug sm:text-base ${
                      isActive ? "font-semibold text-slate-900" : "font-medium text-slate-600"
                    }`}
                  >
                    {week.themeTitle}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      isActive ? "text-slate-600" : "text-slate-500"
                    }`}
                  >
                    {formatWeekOpenDate(week.opensAt) ?? " "}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom shadow: clearly visible depth below the slab */}
      <div
        className="h-12 w-full bg-gradient-to-b from-slate-300/90 via-slate-200/50 to-[#faf6f1] sm:h-14"
        aria-hidden
      />

      {activeWeek ? (
        <section className="w-full bg-[#faf6f1] py-10 sm:py-18" aria-labelledby="voice-question">
          <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
            <p className="text-base uppercase font-medium text-slate-600 sm:text-lg">
              This Week&apos;s Question
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
              <div className="space-y-0">
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Participation</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    {getParticipationSummary(
                      null,
                      regionParticipation.totalResponses,
                      regionParticipation.distinctAreas,
                      "in total"
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
                          {getWeeklySummaryText(w.weekNumber, w.summaryShort)}
                        </p>
                      </div>
                    ))
                  : (
                      <>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <div key={n} className="space-y-2">
                            <p className="font-semibold text-slate-100">Week {n} — —</p>
                            <p className="text-slate-200/85 leading-relaxed text-sm">
                              {getWeeklySummaryText(n, null)}
                            </p>
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
            <h2 className="text-2xl font-semibold text-slate-900 pb-2">Offer Your Voice to Your Place</h2>
            <VoicesForm
              regionSlug={region.slug}
              regionCycleWeekId={activeWeek.regionCycleWeekId}
              neighborhoodHint={region.neighborhoodHint}
              question={activeWeek.question}
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

        <section className="mt-14 border-t border-slate-200/70 pt-7 pb-3" aria-labelledby="podcast-links-heading">
          <h2
            id="podcast-links-heading"
            className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900"
          >
            <span>Follow our podcast</span>
            <svg
              className="h-[40px] w-[50px] shrink-0 text-amber-200"
              viewBox="0 0 26 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M3 13V9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M9 16V6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M15 14V8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M21 18V4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Want to explore the larger story behind this practice? Follow our podcast to be with us as it all unfolds.
          </p>
          <div className="mt-3 flex flex-wrap items-start gap-x-6 gap-y-3 text-sm">
            <a
              href={PODCAST_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-slate-700 underline underline-offset-2 hover:text-slate-900"
            >
              Spotify
            </a>
            <a
              href={PODCAST_APPLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-slate-700 underline underline-offset-2 hover:text-slate-900"
            >
              Apple Podcasts
            </a>
            <a
              href={PODCAST_PODBEAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-slate-700 underline underline-offset-2 hover:text-slate-900"
            >
              Podbean
            </a>
          </div>
          <div className="mt-13">
            <h3 className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900">
              <span>This week&apos;s episode</span>
              <svg
                className="h-6 w-6 shrink-0 text-amber-200"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M10 8.8L15.2 12L10 15.2V8.8Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />
              </svg>
            </h3>
            <iframe
              className="mt-[15px]"
              title="#7 If You Eat, You’re In: The Adventure of Incredible Edible"
              height="150"
              width="100%"
              style={{ border: "none", minWidth: "min(100%, 430px)", height: "150px" }}
              scrolling="no"
              data-name="pb-iframe-player"
              src="https://www.podbean.com/player-v2/?i=543r8-1ac6a71-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export function generateStaticParams(): { regionSlug: string }[] {
  return Object.keys(REGIONS).map((regionSlug) => ({ regionSlug }));
}
