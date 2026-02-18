import { ChapterCard } from "@/components/landing/ChapterCard";
import { ChapterArc } from "@/components/landing/ChapterArc";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { PathCard } from "@/components/landing/PathCard";
import { Section } from "@/components/landing/Section";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { landingContent } from "@/content/landing";
import { returningHomeContent } from "@/content/returning-home";

export default function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <Hero />

      {/* What it is */}
      <Section>
        <h2 className="text-2xl font-semibold">{returningHomeContent.landing.whatItIs.title}</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {returningHomeContent.landing.whatItIs.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-base leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-base font-semibold">Is</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {returningHomeContent.landing.whatItIs.isBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-base font-semibold">Is not</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {returningHomeContent.landing.whatItIs.isNotBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-600">
          {returningHomeContent.landing.whatItIs.quietLegitimacy}
        </p>
      </Section>

      {/* Why now */}
      <Section id={landingContent.whyHumanEcology.id}>
        <h2 className="text-2xl font-semibold">{landingContent.whyHumanEcology.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
          {landingContent.whyHumanEcology.body}
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {landingContent.whyHumanEcology.bullets.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* 3 chapters / arc */}
      <Section>
        <h2 className="text-2xl font-semibold">{landingContent.chapters.title}</h2>
        <ChapterArc chapters={landingContent.chapters.cards} />
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-700">
          {returningHomeContent.landing.whatItIs.beneathArcLine}
        </p>
      </Section>

      {/* Shifts */}
      <Section>
        <h2 className="text-2xl font-semibold">{landingContent.shifts.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {landingContent.shifts.pairs.map((pair) => (
            <div key={pair.from} className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">{landingContent.shifts.fromLabel}</p>
              <p className="mt-1 font-semibold">{pair.from}</p>
              <p className="mt-4 text-sm text-slate-500">{landingContent.shifts.toLabel}</p>
              <p className="mt-1 font-semibold">{pair.to}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-600">{landingContent.shifts.note}</p>
      </Section>

      {/* Testimonials */}
      <Section>
        <h2 className="text-2xl font-semibold">{landingContent.voices.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {landingContent.voices.quotes.map((q) => (
            <TestimonialCard key={q} quote={q} />
          ))}
        </div>
      </Section>

      {/* Pathways */}
      <Section>
        <h2 className="text-2xl font-semibold">{landingContent.waysToEngage.title}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {landingContent.waysToEngage.cards.map((card) => (
            <PathCard key={card.title} title={card.title} body={card.body} href={card.href} link={card.link} />
          ))}
        </div>
      </Section>

      {/* First step */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </PageLayout>
  );
}
