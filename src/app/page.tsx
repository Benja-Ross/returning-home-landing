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

      {/* 3 chapters / arc — arc extends beyond viewport, section clips horizontal overflow */}
      <Section className="overflow-x-clip" innerClassName="mx-auto max-w-5xl px-6 pt-12 pb-16">
        <h2 className="text-2xl font-semibold">{landingContent.chapters.title}</h2>
        <ChapterArc chapters={landingContent.chapters.cards} />
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-700">
          {returningHomeContent.landing.whatItIs.beneathArcLine}
        </p>
      </Section>
      {/* What it is */}
      <Section>
        <h2 className="text-2xl font-semibold">{returningHomeContent.landing.whatItIs.title}</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
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
      {/* Testimonials */}
      <Section>
        <h2 className="text-2xl font-semibold">{landingContent.voices.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {landingContent.voices.quotes.map((q) => (
            <TestimonialCard key={q} quote={q} />
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
