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
      className="rounded-2xl border border-white bg-[#D8B2AC] px-6 py-5"
      aria-labelledby={`submission-name-${submission.id}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p id={`submission-name-${submission.id}`} className="text-base text-white min-w-0">
          <span className="font-semibold">{submission.name ?? "Anonymous"}</span>
          <span className="text-white"> · </span>
          <span className="italic text-white">{submission.neighborhood}</span>
        </p>
        {dateStr && (
          <p className="shrink-0 text-xs font-bold text-white/85" aria-hidden>
            {dateStr}
          </p>
        )}
      </div>
      <p className="mt-3 text-black leading-loose">{submission.response}</p>
    </article>
  );
}
