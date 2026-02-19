import Link from "next/link";

import { landingContent } from "@/content/landing";

export function FinalCTA() {
  const { id, headline, subline, primaryCta, secondaryText, secondaryLink } = landingContent.finalCta;
  return (
    <section className="border-t border-slate-200" id={id} style={{ backgroundColor: "var(--halo-tint)" }}>
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        {/* Headline */}
        <p className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">{headline}</p>
        {/* Subline */}
        <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600/90">{subline}</p>
        {/* Primary Button */}
        <div className="mt-8">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            {primaryCta.label}
          </Link>
        </div>
        {/* Secondary Link Section */}
        <div className="mt-10">
          <p className="text-sm leading-relaxed text-slate-600/90">{secondaryText}</p>
          <Link
            href={secondaryLink.href}
            className="mt-3 inline-flex text-sm font-medium text-slate-700 underline decoration-slate-400 underline-offset-4 hover:text-slate-900 hover:decoration-slate-600"
          >
            {secondaryLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
