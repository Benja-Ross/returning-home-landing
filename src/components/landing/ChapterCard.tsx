export function ChapterCard(props: { number: string; title: string; body: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900">{props.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.body}</p>
    </div>
  );
}

