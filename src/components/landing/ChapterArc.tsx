import { ChapterCard } from "@/components/landing/ChapterCard";

type Chapter = { number: string; title: string; body: string };

function ArcNode(props: { chapter: Chapter; align: "left" | "center" | "right" }) {
  const alignClasses =
    props.align === "left"
      ? "text-left"
      : props.align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div
      className={[
        "w-[15rem] rounded-2xl border border-slate-200 bg-white p-5",
        "sm:w-[16rem] md:w-[17rem]",
        alignClasses,
      ].join(" ")}
    >
      <div className={["flex items-start gap-3", props.align === "right" ? "justify-end" : ""].join(" ")}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
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
        <div className="relative h-[320px] w-full md:h-[360px]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 360"
            preserveAspectRatio="none"
          >
            <path
              d="M 60 280 C 320 70 680 70 940 280"
              fill="none"
              stroke="rgb(226 232 240)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Nodes positioned along the arc */}
          <div
            className="absolute left-[4%] top-[72%] z-10 -translate-y-1/2"
            style={{ transform: "translate(0, -50%)" }}
          >
            {chapters[0] && <ArcNode chapter={chapters[0]} align="left" />}
          </div>
          <div
            className="absolute left-1/2 top-[10%] z-10 -translate-x-1/2"
            style={{ transform: "translate(-50%, 0)" }}
          >
            {chapters[1] && <ArcNode chapter={chapters[1]} align="center" />}
          </div>
          <div
            className="absolute left-[96%] top-[72%] z-10 -translate-x-full -translate-y-1/2"
            style={{ transform: "translate(-100%, -50%)" }}
          >
            {chapters[2] && <ArcNode chapter={chapters[2]} align="right" />}
          </div>
        </div>
      </div>
    </div>
  );
}

