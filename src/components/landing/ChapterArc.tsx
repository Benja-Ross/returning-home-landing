import { ChapterCard } from "@/components/landing/ChapterCard";

type Chapter = { number: string; title: string; body: string };

function ArcNode(props: {
  chapter: Chapter;
  align: "left" | "center" | "right";
  emphasized?: boolean;
  hideDescription?: boolean;
}) {
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
      <div className={["flex items-start", props.align === "right" ? "justify-end" : ""].join(" ")}>
        <div className={["min-w-0", props.align === "right" ? "text-right" : ""].join(" ")}>
          <h3 className="text-base font-semibold text-slate-900">{props.chapter.title}</h3>
          {!props.hideDescription && (
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{props.chapter.body}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChapterArc(props: {
  chapters: readonly Chapter[];
  className?: string;
  /** When true, only chapter titles are shown (no descriptions). Used on Mission & Method page. */
  hideDescriptions?: boolean;
  /** When true, render only the arc graphic (no titles or cards below). Used when page has its own mirrored title row. */
  arcOnly?: boolean;
}) {
  const chapters = props.chapters.slice(0, 3);
  const hideDescriptions = props.hideDescriptions ?? false;
  const arcOnly = props.arcOnly ?? false;

  return (
    <div className={props.className}>
      {/* Arc: visible on all viewports (architectural horizon), extends beyond viewport */}
      <div className="relative overflow-visible">
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
              d="M -160 240 C 300 20, 900 20, 1360 240"
              fill="none"
              stroke="var(--halo-yellow)"
              strokeWidth="30"
              opacity="0.15"
              filter="url(#arcBlur)"
            />
            {/* Main Arc */}
            <path
              d="M -160 240 C 300 5, 900 5, 1360 240"
              fill="none"
              stroke="#1e293b"
              strokeWidth="5.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        {!arcOnly && (
          <>
            {/* Desktop: typographic blocks below arc, top-aligned, pulled up toward arc */}
            <div className="-mt-6 sm:-mt-8 flex flex-wrap items-start justify-between gap-6 hidden sm:flex">
              <div className="flex-1 min-w-0 max-w-[17rem]">
                {chapters[0] && (
                  <ArcNode chapter={chapters[0]} align="left" hideDescription={hideDescriptions} />
                )}
              </div>
              <div className="flex-1 min-w-0 max-w-[17rem]">
                {chapters[1] && (
                  <ArcNode chapter={chapters[1]} align="center" emphasized hideDescription={hideDescriptions} />
                )}
              </div>
              <div className="flex-1 min-w-0 max-w-[17rem]">
                {chapters[2] && (
                  <ArcNode chapter={chapters[2]} align="right" hideDescription={hideDescriptions} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {!arcOnly && (
        <div className="mt-2 space-y-5 sm:hidden">
          {/* Mobile: stacked typographic blocks below arc */}
          {chapters.map((card) => (
            <ChapterCard
              key={card.number}
              number={card.number}
              title={card.title}
              body={hideDescriptions ? "" : card.body}
            />
          ))}
        </div>
      )}
    </div>
  );
}

