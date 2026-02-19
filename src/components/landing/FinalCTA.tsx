import { landingContent } from "@/content/landing";

export function FinalCTA() {
  const { id, title, body, primaryCta } = landingContent.finalCta;
  return (
    <section className="border-t border-slate-200" id={id}>
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-lg font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-slate-600">{body}</p>
        <a
          href={primaryCta.href}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          {primaryCta.label}
        </a>
      </div>
    </section>
  );
}
