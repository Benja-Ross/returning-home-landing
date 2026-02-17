export function ChapterCard(props: { number: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
          {props.number}
        </div>
        <h3 className="text-base font-semibold">{props.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">{props.body}</p>
    </div>
  );
}

