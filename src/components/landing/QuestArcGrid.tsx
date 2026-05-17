import { ChapterArc } from "@/components/landing/ChapterArc";

const ARC_DUMMY_CHAPTERS = [
  { number: "1", title: "", body: "" },
  { number: "2", title: "", body: "" },
  { number: "3", title: "", body: "" },
] as const;

const questItemClass =
  "flex min-h-[4rem] w-full flex-col items-center justify-center px-0.5 py-1";

const questTitleClass =
  "mx-auto line-clamp-2 max-w-[15ch] text-balance text-center text-[0.75rem] font-bold leading-[1.35] text-slate-600 sm:text-[0.8125rem]";

export function QuestArcGrid(props: { quests: readonly string[] }) {
  return (
    <>
      <div className="relative left-1/2 mt-2 w-screen -translate-x-1/2 overflow-hidden sm:mt-3">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <ChapterArc chapters={ARC_DUMMY_CHAPTERS} arcOnly />
        </div>
      </div>
      <div className="relative left-1/2 w-screen -translate-x-1/2 sm:-mt-8">
        <ul
          className="mx-auto grid w-full max-w-[34rem] list-none grid-cols-2 gap-x-2.5 gap-y-2 px-6 max-[380px]:max-w-[17.5rem] max-[380px]:grid-cols-1 sm:px-8 lg:max-w-[1080px] lg:grid-cols-6 lg:gap-2"
          aria-label="Quests"
        >
          {props.quests.map((title) => (
            <li key={title} className="min-w-0">
              <div className={questItemClass}>
                <p className={questTitleClass}>{title}</p>
                <span
                  className="mt-[calc(0.375rem+10px)] block h-px w-[2.275rem] shrink-0 bg-[rgba(244,178,60,0.42)]"
                  aria-hidden
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
