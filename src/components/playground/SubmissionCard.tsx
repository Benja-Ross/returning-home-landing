import type { SubmissionCardDTO } from "@/lib/playground/feed";

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

  return (
    <article
      className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
      aria-labelledby={`submission-name-${submission.id}`}
    >
      <p id={`submission-name-${submission.id}`} className="text-base font-medium text-slate-900">
        {submission.name ?? "Anonymous"}
      </p>
      <p className="mt-0.5 text-sm text-slate-600">
        <span className="font-medium text-slate-700">Neighborhood / area:</span>{" "}
        {submission.neighborhood}
      </p>
      <p className="mt-3 text-slate-800 leading-relaxed">{submission.response}</p>
      {dateStr && (
        <p className="mt-3 text-xs text-slate-400" aria-hidden>
          {dateStr}
        </p>
      )}
    </article>
  );
}
