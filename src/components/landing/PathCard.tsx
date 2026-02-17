export function PathCard(props: { title: string; body: string; href: string; link: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h3 className="text-base font-semibold">{props.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.body}</p>
      <a href={props.href} className="mt-4 inline-flex text-sm font-medium text-slate-900 hover:underline">
        {props.link} →
      </a>
    </div>
  );
}

