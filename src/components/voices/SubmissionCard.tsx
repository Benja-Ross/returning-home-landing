import type { SubmissionCardDTO } from "@/lib/voices/feed";

type Props = { submission: SubmissionCardDTO };

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function SubmissionCard({ submission }: Props) {
  const dateStr = formatDate(submission.created_at);
  const weekContext =
    submission.weekLabel != null && submission.themeTitle != null
      ? `${submission.weekLabel} · ${submission.themeTitle}`
      : null;
  const metadataParts = [weekContext, dateStr].filter(Boolean);
  const metadataLine = metadataParts.join(" · ");

  return (
    <article
      className="rounded-xl border border-slate-200 bg-white/70 p-4 sm:p-5 md:p-6"
      aria-labelledby={`submission-name-${submission.id}`}
    >
      {/* Speaker identity with metadata stacked beneath — tighter, more literary */}
      <header className="space-y-0.5">
        <p id={`submission-name-${submission.id}`} className="min-w-0 text-base">
          <span className="font-semibold text-slate-900">
            {submission.name ?? "Anonymous"}
          </span>
          <span className="text-slate-400" aria-hidden>
            {" · "}
          </span>
          <span className="text-slate-500 italic">{submission.neighborhood}</span>
        </p>
        {metadataLine && (
          <p className="text-sm text-slate-500" aria-hidden>
            {metadataLine}
          </p>
        )}
      </header>

      {/* The voice — reflection with a subtle place accent */}
      <div className="mt-3 sm:mt-4 flex gap-3">
        <div
          className="w-1 shrink-0 self-stretch rounded-full bg-amber-200/50"
          aria-hidden
        />
        <p className="text-base leading-relaxed text-slate-900 min-w-0 max-w-prose">
          {submission.response}
        </p>
      </div>
    </article>
  );
}
