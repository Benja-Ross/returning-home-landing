import { notFound } from "next/navigation";

import { ChapterArc } from "@/components/landing/ChapterArc";
import { VoicesForm } from "@/components/voices/VoicesForm";
import { VoicesHero } from "@/components/voices/VoicesHero";
import { SubmissionsFeed } from "@/components/voices/SubmissionsFeed";
import { PageLayout } from "@/components/layout/PageLayout";
import { getActivePrompt, getApprovedFeedPage } from "@/lib/voices/data";
import { getRegion, REGIONS } from "@/lib/voices/regions";

const SIX_WEEK_ARC = [
  { title: "Noticing Place", subtext: "Week 1" },
  { title: "Local Belonging", subtext: "Week 2" },
  { title: "Local Story", subtext: "Week 3" },
  { title: "Change Happening", subtext: "Week 4" },
  { title: "Possibility", subtext: "Week 5" },
  { title: "Acting", subtext: "Week 6" },
] as const;

const ARC_DUMMY_CHAPTERS = [
  { number: "1", title: "", body: "" },
  { number: "2", title: "", body: "" },
  { number: "3", title: "", body: "" },
];

export const dynamic = "force-dynamic";

const containerClass = "mx-auto max-w-3xl px-6 py-12";
const sectionClass = "mt-10 space-y-4";
const headingClass = "text-2xl font-semibold text-slate-900";
const blockClass = "rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8 text-slate-600";

type Props = { params: Promise<{ regionSlug: string }> };

export default async function VoicesRegionPage({ params }: Props) {
  const { regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region) {
    notFound();
  }

  const prompt = await getActivePrompt(region.slug);

  const feed =
    prompt != null
      ? await getApprovedFeedPage({
          regionSlug: region.slug,
          promptId: prompt.id,
          limit: 12,
        })
      : null;

  return (
    <PageLayout hidePageHeader>
      <VoicesHero regionName={region.displayName} heroImageSrc="/images/leaf-voices-blur.png" />

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
            {SIX_WEEK_ARC.map((week, i) => (
              <div key={i} className="text-center">
                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">
                  {week.subtext}
                </p>
                <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                  {week.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {prompt ? (
        <section className="w-full bg-[#faf6f1] py-10 sm:py-18" aria-labelledby="voice-question">
          <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
            <p className="text-base font-medium text-slate-600 sm:text-lg">
              The {prompt.title} &quot;Voice of Place&quot; question:
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
              {prompt.question}
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
                {prompt?.title} Reflection
              </p>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                Noticing Place
              </h3>

              <div className="space-y-0">
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Participation</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    18 reflections shared this week from across the community.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Patterns Emerging</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    Many people described small details that are easy to overlook: a particular tree on a street corner, the smell of food drifting from a local bakery, the way evening light falls on a familiar building.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Voices From the Stories</h4>
                  <div className="space-y-4">
                    <blockquote className="border-l-2 border-white/15 pl-4 text-slate-200/85 italic leading-relaxed">
                      I never realized how much I look forward to hearing the church bells in the afternoon.
                    </blockquote>
                    <blockquote className="border-l-2 border-white/15 pl-4 text-slate-200/85 italic leading-relaxed">
                      There&apos;s a narrow trail behind my apartment where people walk their dogs every evening. I didn&apos;t notice how many quiet greetings happen there.
                    </blockquote>
                    <blockquote className="border-l-2 border-white/15 pl-4 text-slate-200/85 italic leading-relaxed">
                      The old bridge downtown is something I drive past every day, but when I actually stopped there last week it felt like a different place entirely.
                    </blockquote>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6 pb-4 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Voice of Place</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    These reflections point toward a place full of small details that quietly shape daily life but often pass unnoticed.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-base font-semibold text-slate-100">Emerging Story</h4>
                  <p className="text-slate-200/85 leading-relaxed">
                    The first week of the experiment began with attention.
                  </p>
                  <p className="text-slate-200/85 leading-relaxed">
                    People started noticing the ordinary features of their surroundings that carry meaning.
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
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 1 — Noticing Place</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    People are beginning with simple observations: overlooked corners, small rituals, and everyday landscapes that shape life in this place.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 2 — Local Belonging (coming next)</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    Participants will reflect on moments or places where they feel a sense of belonging in their community.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 3 — Local Story</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    Stories that help explain how this place became what it is today.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 4 — Change Happening</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    Reflections on how the community is shifting or evolving.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 5 — Possibility</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    Imagining what this place could become.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-100">Week 6 — Acting</p>
                  <p className="text-slate-200/85 leading-relaxed text-sm">
                    Where people feel called to participate in shaping the future of the place.
                  </p>
                </div>
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

        {prompt && (
          <section className={sectionClass}>
            <h2 className={headingClass}>Add your voice to your place</h2>
            <VoicesForm
              regionSlug={region.slug}
              promptId={prompt.id}
              neighborhoodHint={region.neighborhoodHint}
            />
          </section>
        )}

        <section id="responses" className={sectionClass}>
          {feed != null ? (
            <SubmissionsFeed
              regionSlug={region.slug}
              promptId={prompt!.id}
              initialItems={feed.items}
              initialTotalApproved={feed.totalApproved}
              initialNextCursor={feed.nextCursor}
            />
          ) : (
            <>
              <h2 className={headingClass}>Reflections</h2>
              <div className={blockClass}>
                <p className="text-sm">Reflections will appear here when a question is active.</p>
              </div>
            </>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

export function generateStaticParams(): { regionSlug: string }[] {
  return Object.keys(REGIONS).map((regionSlug) => ({ regionSlug }));
}
