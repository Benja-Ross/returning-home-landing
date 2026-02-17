import Link from "next/link";

import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";

export default function MissionAndMethodPage() {
  return (
    <PageLayout
      backHref="/"
      backLabel="← Back home"
      title="Mission and Method"
      subtitle="Returning Home is a practice for strengthening human ecology and belonging in specific places. It supports people in seeing their shared context more clearly and moving with steadier, grounded care."
    >
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900">The three-chapter arc</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The practice moves through three chapters. Each chapter invites a different way of noticing, telling
            stories, and making sense of what is happening in and around a place.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Chapter 1 · Remembering Life &amp; Place
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Attending to lived experience and memory. People name what has shaped their sense of home and what
                feels steady, fragile, or missing.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Chapter 2 · Revealing Transformation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Looking closely at what is changing—personally, collectively, and ecologically. Participants trace
                patterns instead of isolated moments.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Chapter 3 · Reconnecting Home
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Naming next steps that are small, specific, and shared. The group imagines how to tend to their place
                with more coherence and care.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What the practice does</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>Helps people tell the story of their place in a grounded, specific way.</li>
              <li>Strengthens shared understanding of what is shifting beneath the surface.</li>
              <li>Creates a calm container for listening to one another without urgency tactics.</li>
              <li>Supports more coherent, place-attentive decisions and forms of stewardship.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What the practice does not do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>It does not prescribe a single theory, ideology, or solution.</li>
              <li>It does not promise quick fixes, transformation programs, or guaranteed outcomes.</li>
              <li>It does not replace existing organizing, service, or mutual aid work.</li>
              <li>It does not rely on scarcity, pressure, or sales funnels to move people.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-700">
            If you would like to begin, you can start with a simple assessment and the first chapter.
          </p>
          <Link
            href="/begin"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Go to Begin →
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}

