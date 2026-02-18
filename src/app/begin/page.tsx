import Link from "next/link";

import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";
import { returningHomeContent } from "@/content/returning-home";

export default function BeginPage() {
  return (
    <PageLayout
      backHref="/"
      backLabel="← Back home"
      title="Begin"
      subtitle={returningHomeContent.begin.subtitle}
    >
      <Section>
        <div className="max-w-3xl space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              {returningHomeContent.begin.assessment.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {returningHomeContent.begin.assessment.body}
            </p>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500">
              {returningHomeContent.begin.assessment.placeholder}
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">
              {returningHomeContent.begin.orientation.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {returningHomeContent.begin.orientation.intro}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {returningHomeContent.begin.orientation.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                {returningHomeContent.begin.cta.primaryLabel}
              </button>
              <Link
                href="/mission-and-method"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                {returningHomeContent.begin.cta.secondaryLabel}
              </Link>
            </div>
          </section>
        </div>
      </Section>
    </PageLayout>
  );
}

