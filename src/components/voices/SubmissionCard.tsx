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

  return (
    <article
      className="rounded-2xl border border-white bg-[#D8B2AC] px-6 py-5"
      aria-labelledby={`submission-name-${submission.id}`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <p id={`submission-name-${submission.id}`} className="text-base min-w-0">
          <span className="font-semibold text-white">{submission.name ?? "Anonymous"}</span>
          <span className="text-white"> · </span>
          <span className="text-white/80 italic">{submission.neighborhood}</span>
        </p>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {weekContext && (
            <p className="font-semibold text-xs text-white" aria-hidden>
              {weekContext}
            </p>
          )}
          {dateStr && (
            <p className="font-semibold text-xs text-white" aria-hidden>
              {dateStr}
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-slate-900 leading-loose">{submission.response}</p>
    </article>
  );
}
