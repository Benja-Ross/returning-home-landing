import Link from "next/link";

import { landingContent } from "@/content/landing";

export function FinalCTA() {
  const { id, headline, subline, primaryCta, secondaryText, secondaryLink } = landingContent.finalCta;
  return (
    <section className="border-t border-slate-200" id={id}>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Headline */}
        <p className="text-xl font-medium leading-relaxed text-slate-900">{headline}</p>
        {/* Subline */}
        <p className="mt-3 text-base leading-relaxed text-slate-700">{subline}</p>
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
        <div className="mt-10 space-y-2">
          <p className="text-sm leading-relaxed text-slate-600">{secondaryText}</p>
          <Link
            href={secondaryLink.href}
            className="inline-block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {secondaryLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
