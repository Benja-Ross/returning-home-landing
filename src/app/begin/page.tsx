import Image from "next/image";

import { Section } from "@/components/landing/Section";
import { PageLayout } from "@/components/layout/PageLayout";

import { BeginReflectionGate } from "@/components/begin/BeginReflectionGate";

export default function BeginPage() {
  return (
    <PageLayout backHref="/" backLabel="← Back home" hidePageHeader>
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

      {/* Content below the fold: pilot note, reflection invite, Typeform, Chapter 1 */}
      <Section>
        <div className="mx-auto max-w-2xl space-y-16">
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
                Chapter 1. 
                <br />
                There will be opportunities to join discussion groups.
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
