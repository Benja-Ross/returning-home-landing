import type { ReactNode } from "react";
import Link from "next/link";

import { GlobalNav } from "./GlobalNav";

function PageHeader(props: { eyebrow?: string; title?: string; subtitle?: string }) {
  return (
    <header className="max-w-3xl mb-12">
      {props.eyebrow && (
        <p className="text-sm tracking-wide text-slate-500">{props.eyebrow}</p>
      )}
      {props.title && (
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          {props.title}
        </h1>
      )}
      {props.subtitle && (
        <p className="mt-4 max-w-3xl text-base text-slate-700">
          {props.subtitle}
        </p>
      )}
    </header>
  );
}

export function PageLayout(props: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  const hasHeader = Boolean(props.backHref || props.title);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <GlobalNav />
        {hasHeader && (
          <div className="py-16 sm:py-20">
            {props.backHref && (
              <div className="mb-4">
                <Link
                  href={props.backHref}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  {props.backLabel ?? "← Back"}
                </Link>
              </div>
            )}
            {props.title && (
              <PageHeader title={props.title} subtitle={props.subtitle} />
            )}
          </div>
        )}
      </div>
      {props.children}
    </main>
  );
}
