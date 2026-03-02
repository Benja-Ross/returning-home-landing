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
      <div className={`${containerClass} pt-14 sm:pt-20`}>
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

        <section className={sectionClass}>
          <h2 className={headingClass}>Current Voice of Place Question</h2>
          {prompt ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8">
              {prompt.title && (
                <p className="text-sm font-medium text-slate-600">{prompt.title}</p>
              )}
              <p className="mt-2 text-lg leading-relaxed text-slate-900 sm:text-xl">
                {prompt.question}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                New each week. One sentence is perfect.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8 text-center">
              <p className="text-slate-700">A new question is coming soon.</p>
              <p className="mt-1 text-sm text-slate-500">Check back in a day or two.</p>
            </div>
          )}
        </section>

        {prompt && (
          <section className={sectionClass}>
            <h2 className={headingClass}>Share your reflection</h2>
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
              <h2 className={headingClass}>Public reflections</h2>
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
