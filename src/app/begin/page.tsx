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

      {/* Content below the fold: how-to-begin instructions, then accordions */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-20">
          {/* How to Begin: title + intro */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              How to Begin
            </h2>
            <p className="max-w-xl text-base leading-7 text-slate-800 sm:text-lg">
              <strong className="font-semibold text-slate-900">Beginning below involves three clear steps.</strong>
              {" "}
              Move at your own pace.
            </p>
            <p className="text-sm leading-7 text-slate-600">
              Chapter 1 typically takes 30–60 minutes.
            </p>
          </div>

          {/* Step 1 */}
          <article className="flex gap-5 pt-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-800 sm:h-14 sm:w-14 sm:text-2xl" aria-hidden>
              1
            </span>
            <div className="min-w-0 flex-1 space-y-5">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Step 1 - Complete Chapter 1
              </h3>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                <strong className="font-semibold text-slate-900">Complete the Chapter 1 reflection form below.</strong>
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                After submitting, a download link will appear.
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                Use the booklet (PDF):
              </p>
              <ul className="list-disc space-y-1 pl-4 text-base leading-7 text-slate-800 sm:text-lg">
                <li>With a partner (interviewer and interviewee), or</li>
                <li>As a solo reflection.</li>
              </ul>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                <strong className="font-semibold text-slate-900">When finished, return to this page.</strong>
                {" "}
                Bring one key reflection with you.
              </p>
              <p className="text-base leading-7 font-semibold text-slate-900 sm:text-lg">
                Then continue to Chapter 2 below.
              </p>
            </div>
          </article>

          {/* Step 2 */}
          <article className="flex gap-5 pt-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-800 sm:h-14 sm:w-14 sm:text-2xl" aria-hidden>
              2
            </span>
            <div className="min-w-0 flex-1 space-y-5">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Step 2 - Complete Chapter 2
              </h3>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                <strong className="font-semibold text-slate-900">Complete the Chapter 2 reflection form below.</strong>
                {" "}
                This indicates you've completed Chapter 1 and are ready to continue.
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                After submitting, a download link will appear for the Chapter 2 guide (PDF).
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                Use the guide alone or with a small group (1 to 12 people).
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                The Chapter 2 form requires your email.
              </p>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                We will reach out to ask about your interest in joining a discussion group.
              </p>
            </div>
          </article>

          {/* Step 3 */}
          <article className="flex gap-5 pt-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-800 sm:h-14 sm:w-14 sm:text-2xl" aria-hidden>
              3
            </span>
            <div className="min-w-0 flex-1 space-y-5">
              <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Step 3 - Ongoing Participation
              </h3>
              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                After completing Chapter 2:
              </p>
              <ul className="list-disc space-y-1 pl-4 text-base leading-7 text-slate-800 sm:text-lg">
                <li>Join a virtual discussion group for Chapter 3 and beyond</li>
                <li>Participate in a local story circle (where available)</li>
                <li>Help convene or facilitate future gatherings</li>
              </ul>
              <p className="text-base leading-7 font-semibold text-slate-900 sm:text-lg">
                Participation deepens only if you choose.
              </p>
            </div>
          </article>

          {/* Where This Is Happening */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Where This Is Happening
            </h3>
            <p className="text-base leading-7 text-slate-800 sm:text-lg">
              We are currently piloting in:
            </p>
            <ul className="list-disc space-y-1 pl-4 text-base leading-7 text-slate-800 sm:text-lg">
              <li>Erie-Niagara</li>
              <li>Ann Arbor</li>
              <li>Bangladesh</li>
            </ul>
            <p className="text-base leading-7 text-slate-800 sm:text-lg">
              If you're elsewhere, you can still complete Chapters 1 and 2.
              Discussion groups and story circles will expand over time.
            </p>
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
