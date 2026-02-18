import { ChapterCard } from "@/components/landing/ChapterCard";

type Chapter = { number: string; title: string; body: string };

function ArcNode(props: { chapter: Chapter; align: "left" | "center" | "right"; emphasized?: boolean }) {
  const alignClasses =
    props.align === "left"
      ? "text-left"
      : props.align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div
      className={[
        "w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[17rem]",
        alignClasses,
      ].join(" ")}
    >
      <div className={["flex items-start gap-3", props.align === "right" ? "justify-end" : ""].join(" ")}>
        <span
          className="text-[10px] font-medium text-slate-400 tabular-nums"
          aria-hidden
        >
          {props.chapter.number}
        </span>
        <div className={["min-w-0", props.align === "right" ? "text-right" : ""].join(" ")}>
          <h3 className="text-base font-semibold text-slate-900">{props.chapter.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.chapter.body}</p>
        </div>
      </div>
    </div>
  );
}

export function ChapterArc(props: { chapters: readonly Chapter[]; className?: string }) {
  const chapters = props.chapters.slice(0, 3);

  return (
    <div className={props.className}>
      {/* Arc: visible on all viewports (architectural horizon), extends beyond viewport */}
      <div className="relative pt-2 sm:pt-4 overflow-visible">
        <div className="rh-arc-wrapper">
          <svg
            className="rh-arc"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="arcBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            {/* Halo */}
            <path
              d="M -120 240 C 300 110, 900 110, 1320 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              opacity="0.08"
              filter="url(#arcBlur)"
            />
            {/* Main Arc */}
            <path
              d="M -120 240 C 300 110, 900 110, 1320 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        {/* Desktop: typographic blocks below arc */}
        <div className="mt-2 sm:mt-3 flex flex-wrap items-end justify-between gap-6 hidden sm:flex">
          <div className="flex-1 min-w-0 max-w-[17rem] pb-0">
            {chapters[0] && <ArcNode chapter={chapters[0]} align="left" />}
          </div>
          <div className="flex-1 min-w-0 max-w-[17rem] -mt-4 pb-0">
            {chapters[1] && <ArcNode chapter={chapters[1]} align="center" emphasized />}
          </div>
          <div className="flex-1 min-w-0 max-w-[17rem] pb-0">
            {chapters[2] && <ArcNode chapter={chapters[2]} align="right" />}
          </div>
        </div>
      </div>
      {/* Mobile: stacked typographic blocks below arc */}
      <div className="mt-4 space-y-5 sm:hidden">
        {chapters.map((card) => (
          <ChapterCard key={card.number} number={card.number} title={card.title} body={card.body} />
        ))}
      </div>
    </div>
  );
}

