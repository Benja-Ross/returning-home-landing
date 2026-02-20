import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";

import { BeginReflectionGate } from "@/components/begin/BeginReflectionGate";

export default function BeginPage() {
  return (
    <PageLayout
      backHref="/"
      backLabel="← Back home"
      title="Begin"
      subtitle="A moment to reflect before you continue."
    >
      <Section>
        <div className="mx-auto max-w-2xl space-y-16">
          {/* Threshold block */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Think of the place you call home.
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              Not the idea of it.
              <br />
              The actual place.
            </p>
          </div>

          {/* Pilot note */}
          <div className="space-y-3 border-t border-slate-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              A note before you begin
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-slate-700">
              <p>
                We are currently piloting the Returning Home practice in Erie–Niagara, Ann Arbor, and
                Bangladesh.
              </p>
              <p>If you're in one of these communities, we're glad you're here.</p>
              <p>
                If you're elsewhere, you're still welcome to participate in the reflection and
                Chapter 1. Discussion groups will open after this pilot cycle.
              </p>
            </div>
          </div>

          {/* Reflection invite */}
          <div className="space-y-2 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Before continuing, take a moment to reflect.
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              There are no right answers. Just locate where you're beginning.
            </p>
          </div>

          {/* Typeform embed + Chapter 1 reveal (client) */}
          <div className="border-t border-slate-200 pt-8">
            <BeginReflectionGate />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
