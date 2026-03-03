import { notFound } from "next/navigation";

import { PlaygroundForm } from "@/components/playground/PlaygroundForm";
import { PlaygroundHero } from "@/components/playground/PlaygroundHero";
import { SubmissionsFeed } from "@/components/playground/SubmissionsFeed";
import { PageLayout } from "@/components/layout/PageLayout";
import { getActivePrompt, getApprovedFeedPage } from "@/lib/playground/data";
import { getRegion, REGIONS } from "@/lib/playground/regions";

export const dynamic = "force-dynamic";

const containerClass = "mx-auto max-w-3xl px-6 py-12";
const sectionClass = "mt-10 space-y-4";
const headingClass = "text-2xl font-semibold text-slate-900";
const blockClass = "rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8 text-slate-600";

type Props = { params: Promise<{ regionSlug: string }> };

export default async function PlaygroundRegionPage({ params }: Props) {
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
      <PlaygroundHero regionName={region.displayName} heroImageSrc="/images/sand.jpg" />

      {prompt ? (
        <section className="w-full bg-[#faf6f1] py-10 sm:py-18" aria-labelledby="voice-question">
          <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
            <p className="text-base font-medium text-slate-600 sm:text-lg">
              This week&apos;s "voice of place" question:
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
        <div className="mx-auto max-w-3xl px-6 pt-14 pb-16 text-center sm:px-8 sm:pt-16 sm:pb-20">
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
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-200/90">
            {region.hearingSummary}
          </p>
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
            <PlaygroundForm
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
