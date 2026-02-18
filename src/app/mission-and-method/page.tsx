import Link from "next/link";

import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";
import { returningHomeContent } from "@/content/returning-home";

export default function MissionAndMethodPage() {
  return (
    <PageLayout
      backHref="/"
      backLabel="← Back home"
      title="Mission and Method"
      subtitle={returningHomeContent.missionAndMethod.subtitle}
    >
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900">
            {returningHomeContent.missionAndMethod.opening.heading}
          </h2>
          {returningHomeContent.missionAndMethod.opening.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            If you want a deeper framing of human ecology, you can read the short article on the home page&apos;s{" "}
            <Link href="/#how" className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-400">
              Why Human Ecology Matters
            </Link>{" "}
            section.
          </p>

          <div className="mt-8 space-y-6">
            {returningHomeContent.missionAndMethod.chapters.map((chapter) => (
              <div key={chapter.number}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Chapter {chapter.number} · {chapter.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{chapter.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {returningHomeContent.missionAndMethod.pathways.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {returningHomeContent.missionAndMethod.pathways.intro}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              {returningHomeContent.missionAndMethod.pathways.items.map((item) => (
                <li key={item.label}>
                  <span className="font-semibold">{item.label}</span> — {item.body}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {returningHomeContent.missionAndMethod.lineage.heading}
            </h2>
            {returningHomeContent.missionAndMethod.lineage.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-700">
            {returningHomeContent.missionAndMethod.cta.body}
          </p>
          <Link
            href="/begin"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            {returningHomeContent.missionAndMethod.cta.buttonLabel}
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}

