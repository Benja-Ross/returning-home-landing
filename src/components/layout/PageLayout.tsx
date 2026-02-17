import Link from "next/link";

export function PageLayout(props: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  const hasHeader = props.backHref ?? props.title;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {hasHeader && (
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          {props.backHref && (
            <div className="mb-6">
              <Link
                href={props.backHref}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                {props.backLabel ?? "← Back"}
              </Link>
            </div>
          )}
          {props.title && (
            <header className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {props.title}
              </h1>
              {props.subtitle && (
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {props.subtitle}
                </p>
              )}
            </header>
          )}
        </div>
      )}
      {props.children}
    </main>
  );
}
