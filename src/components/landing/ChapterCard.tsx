export function ChapterCard(props: { number: string; title: string; body: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-medium text-slate-400 tabular-nums" aria-hidden>
          {props.number}
        </span>
        <h3 className="text-base font-semibold text-slate-900">{props.title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.body}</p>
    </div>
  );
}

