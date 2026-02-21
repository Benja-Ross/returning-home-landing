import Image from "next/image";

import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";

import { BeginReflectionGate } from "@/components/begin/BeginReflectionGate";

export default function BeginPage() {
  return (
    <PageLayout backHref="/" backLabel="← Back home" hidePageHeader overlayNav>
      {/* Full-bleed wrapper: breaks out of any container (no max-w, no mx-auto) */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        {/* Hero: 100vh, full width; image locked to height, crops left/right when narrow */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Image: Next/Image, height-based; centered so sides crop */}
            <Image
              src="/begin-hero.png"
              alt=""
              width={2400}
              height={1350}
              priority
              sizes="100vw"
              className="absolute top-0 left-1/2 h-full w-auto min-w-full -translate-x-1/2 select-none pointer-events-none"
              style={{ filter: "brightness(1.07) contrast(0.92)" }}
            />
          {/* Soft white overlay */}
          <div className="absolute inset-0 bg-white/5" aria-hidden />
          {/* Headline: absolute inside hero, fixed vertical anchor */}
          <div className="absolute left-8 max-w-2xl sm:left-12 lg:left-16" style={{ top: "70vh" }}>
            <h1 className="text-left text-4xl font-semibold tracking-tight leading-[1.2] text-[#F8F5EE] md:text-5xl lg:text-6xl">
              Think of the place you
              <br />
              call home.
            </h1>
          </div>
        </section>
      </div>

      {/* Content below the fold: orientation, progression, pilot note, accordions */}
      <Section>
        <div className="mx-auto max-w-2xl space-y-16">
          {/* Orientation */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              How Returning Home unfolds
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Returning Home is a three-chapter practice. You'll begin with personal reflection, then
              continue into deeper participation if you choose.
            </p>
          </div>

          {/* Progression: 1–3 */}
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                1
              </span>
              <div>
                <p className="font-medium text-slate-900">Chapter 1 — Remembering Home</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                  Personal reflection and guided practice.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                2
              </span>
              <div>
                <p className="font-medium text-slate-900">Chapter 2 — Revealing the Way Home</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                  Collective awareness and next steps.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                3
              </span>
              <div>
                <p className="font-medium text-slate-900">Chapter 3 — Reconnecting Home</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                  Discussion groups and Story Circles.
                </p>
              </div>
            </li>
          </ul>

          {/* Pilot note */}
          <div className="space-y-3 border-t border-slate-200 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              A note before you begin
            </h3>
            <div className="space-y-2 text-sm leading-relaxed text-slate-700">
              <p>
                We are currently piloting the Returning Home practice in Erie–Niagara, Ann Arbor, and
                Bangladesh.
              </p>
              <p>If you're in one of these communities, we're especially glad you're here.</p>
              <p>
                If you're elsewhere, you're still welcome to participate in the reflection and
                Chapter 1. Discussion groups will expand over time.
              </p>
            </div>
          </div>

          {/* Tally embeds + Chapter 1 & 2 gates (client) */}
          <div className="border-t border-slate-200 pt-8">
            <BeginReflectionGate />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
