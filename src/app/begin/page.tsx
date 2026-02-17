import Link from "next/link";

import { Section } from "@/components/landing/Section";

export default function BeginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Section innerClassName="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back home
          </Link>
        </div>

        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Begin</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            You can begin gently, at your own pace. This page will guide you into the first movements of the practice
            and offer a simple way to notice where you are in relation to your place.
          </p>
        </header>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Returning Home Assessment</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              This will become a short assessment to help you locate how you are currently relating to your place,
              community, and responsibilities. For now, it is a placeholder space for reflection, notes, or prompts you
              may already be using.
            </p>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500">
              Returning Home Assessment placeholder — this is where questions, prompts, or a short form will live.
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-xl font-semibold text-slate-900">Next step</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              After you complete the assessment, you will continue into Chapter 1: remembering life and place. For now,
              this button simply marks that intention.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Start Chapter 1
              </button>
              <Link
                href="/mission-and-method"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Read Mission and Method →
              </Link>
            </div>
          </section>
        </div>
      </Section>
    </main>
  );
}

