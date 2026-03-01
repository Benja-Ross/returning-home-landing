import { notFound } from "next/navigation";

import { PageLayout } from "@/components/layout/PageLayout";
import { getRegion, REGIONS } from "@/lib/playground/regions";

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

  return (
    <PageLayout
      backHref="/"
      backLabel="← Back home"
      title={region.displayName}
      subtitle="Playground"
    >
      <div className={containerClass}>
        {region.introParagraphs.length > 0 && (
          <section className={sectionClass}>
            {region.introParagraphs.map((p, i) => (
              <p key={i} className="text-base leading-7 text-slate-800">
                {p}
              </p>
            ))}
          </section>
        )}

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
          <div className={blockClass}>
            <p className="text-sm">(Placeholder — question will be loaded here.)</p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Submission Form (Coming Next Step)</h2>
          <div className={blockClass}>
            <p className="text-sm">Form will be embedded or linked here.</p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Public Reflections Feed (Coming Next Step)</h2>
          <div className={blockClass}>
            <p className="text-sm">Reflections will appear here.</p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export function generateStaticParams(): { regionSlug: string }[] {
  return Object.keys(REGIONS).map((regionSlug) => ({ regionSlug }));
}
