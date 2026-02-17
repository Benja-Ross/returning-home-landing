import type { ReactNode } from "react";

export function Section(props: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={props.id} className={props.className ?? "border-t border-slate-200"}>
      <div className={props.innerClassName ?? "mx-auto max-w-5xl px-6 py-16"}>{props.children}</div>
    </section>
  );
}

