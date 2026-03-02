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
      className="rounded-xl border border-stone-200/70 bg-[#f6ba53] px-6 py-5"
      aria-labelledby={`submission-name-${submission.id}`}
    >
      <p id={`submission-name-${submission.id}`} className="text-base text-slate-900">
        <span className="font-semibold">{submission.name ?? "Anonymous"}</span>
        <span className="text-slate-500"> · </span>
        <span className="italic text-slate-700">{submission.neighborhood}</span>
      </p>
      {dateStr && (
        <p className="mt-1 text-xs text-slate-400" aria-hidden>
          {dateStr}
        </p>
      )}
      <p className="mt-3 text-slate-800 leading-loose">{submission.response}</p>
    </article>
  );
}
