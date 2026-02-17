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
        // Keep typography the same; reduce widths at smaller desktop sizes to prevent overlap.
        "w-[12rem] rounded-xl border bg-white p-5 shadow-sm",
        props.emphasized ? "border-slate-300/70" : "border-slate-200/60",
        "md:w-[14rem] lg:w-[16rem] xl:w-[17rem]",
        alignClasses,
      ].join(" ")}
    >
      <div className={["flex items-start gap-3", props.align === "right" ? "justify-end" : ""].join(" ")}>
        <div
          className={[
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white",
            props.emphasized ? "bg-slate-950" : "bg-slate-900",
          ].join(" ")}
        >
          {props.chapter.number}
        </div>
        <div className={["min-w-0", props.align === "right" ? "text-right" : ""].join(" ")}>
          <h3 className="text-base font-semibold">{props.chapter.title}</h3>
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
      {/* Mobile: simple stack (no arc) */}
      <div className="mt-10 space-y-4 sm:hidden">
        {chapters.map((card) => (
          <ChapterCard key={card.number} number={card.number} title={card.title} body={card.body} />
        ))}
      </div>

      {/* Desktop: arc + nodes */}
      <div className="relative mt-10 hidden sm:block">
        <div className="relative h-[380px] w-full md:h-[420px]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chapterArcGradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgb(226 232 240)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="rgb(226 232 240)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="rgb(226 232 240)" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M 60 330 C 320 90 680 90 940 330"
              fill="none"
              stroke="url(#chapterArcGradient)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Nodes positioned along the arc */}
          <div
            className="absolute left-[2%] top-[78%] z-10 -translate-y-1/2"
          >
            {chapters[0] && <ArcNode chapter={chapters[0]} align="left" />}
          </div>
          <div
            className="absolute left-1/2 top-[4%] z-10 -translate-x-1/2"
          >
            {chapters[1] && <ArcNode chapter={chapters[1]} align="center" emphasized />}
          </div>
          <div
            className="absolute right-[2%] top-[78%] z-10 -translate-y-1/2"
          >
            {chapters[2] && <ArcNode chapter={chapters[2]} align="right" />}
          </div>
        </div>
      </div>
    </div>
  );
}

