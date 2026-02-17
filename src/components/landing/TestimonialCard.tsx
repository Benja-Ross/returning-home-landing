export function TestimonialCard(props: { quote: string }) {
  return (
    <blockquote className="rounded-2xl bg-slate-50 p-6 text-sm leading-relaxed text-slate-700">
      {props.quote}
    </blockquote>
  );
}

