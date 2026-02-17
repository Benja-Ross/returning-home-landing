import { landingContent } from "@/content/landing";

export function FinalCTA() {
  return (
    <section className="border-t border-slate-200" id={landingContent.finalCta.id}>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl bg-slate-900 px-8 py-10 text-white">
          <h2 className="text-2xl font-semibold">{landingContent.finalCta.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-200">{landingContent.finalCta.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={landingContent.finalCta.primaryCta.href}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              {landingContent.finalCta.primaryCta.label}
            </a>
            <a
              href={landingContent.finalCta.secondaryCta.href}
              className="text-sm font-medium text-slate-200 hover:text-white"
            >
              {landingContent.finalCta.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

