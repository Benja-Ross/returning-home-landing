import { ChapterCard } from "@/components/landing/ChapterCard";
import { ChapterArc } from "@/components/landing/ChapterArc";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { PathCard } from "@/components/landing/PathCard";
import { Section } from "@/components/landing/Section";
import { SocialSoilBand } from "@/components/landing/SocialSoilBand";
import { PageLayout } from "@/components/layout/PageLayout";
import { landingContent } from "@/content/landing";
import { returningHomeContent } from "@/content/returning-home";

export default function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <Hero />

      {/* 3 chapters / arc — arc extends beyond viewport, section clips horizontal overflow */}
      <Section className="overflow-x-clip mt-7 sm:mt-0" innerClassName="mx-auto max-w-5xl px-6 pt-6 pb-16">
        <h2 className="text-2xl font-semibold mb-3">{landingContent.chapters.title}</h2>
        <ChapterArc chapters={landingContent.chapters.cards} />
        <p className="mt-[60px] max-w-3xl text-sm leading-relaxed text-slate-700">
          {returningHomeContent.landing.whatItIs.beneathArcLine}
        </p>
      </Section>
      {/* From the Social Soil */}
      <div className="mt-5 mb-16">
        <SocialSoilBand />
      </div>
      {/* Testimonials — typography-forward, no cards */}
      <Section>
        <h2 className="text-2xl font-semibold text-slate-900">
          {returningHomeContent.testimonials.title}
        </h2>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {returningHomeContent.testimonials.quotes.map((quote) => (
            <blockquote
              key={quote.slice(0, 40)}
              className="border-l border-slate-300/70 pl-5 text-left text-sm sm:text-base text-slate-700 leading-relaxed"
            >
              {quote}
            </blockquote>
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
