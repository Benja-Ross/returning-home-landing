"use client";

import { useState, useEffect, useRef } from "react";

import { TallyInline } from "@/components/TallyInline";

export function BeginReflectionGate() {
  const [reflectionComplete, setReflectionComplete] = useState(false);
  const [chapter2Complete, setChapter2Complete] = useState(false);
  const [chapter1Open, setChapter1Open] = useState(true);
  const [chapter2Open, setChapter2Open] = useState(false);
  const chapter2PanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      (window as any).__unlockChapter1 = () => setReflectionComplete(true);
      (window as any).__lockChapter1 = () => setReflectionComplete(false);
      (window as any).__unlockChapter2 = () => setChapter2Complete(true);
      (window as any).__lockChapter2 = () => setChapter2Complete(false);
    }
  }, []);

  useEffect(() => {
    if (chapter2Open && chapter2PanelRef.current) {
      chapter2PanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chapter2Open]);

  const toggleChapter2 = () => {
    setChapter2Open((prev) => !prev);
  };

  return (
    <>
      {/* Chapter 1 — disclosure, expanded by default */}
      <div className="mt-20 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setChapter1Open((o) => !o)}
          className="flex w-full items-center justify-between py-6 text-left text-2xl font-semibold text-slate-900 sm:text-3xl"
          aria-expanded={chapter1Open}
        >
          Chapter 1
          <span className="text-slate-400" aria-hidden>{chapter1Open ? "−" : "+"}</span>
        </button>
        {chapter1Open && (
          <div className="pb-8">
            <TallyInline
              formId="aQ6lVv"
              title="Chapter 1 Begin Form"
              onSubmit={() => setReflectionComplete(true)}
            />
            <div
              className={
                reflectionComplete
                  ? "mt-12 opacity-100 translate-y-0 transition-all duration-500 ease-out"
                  : "mt-12 opacity-0 translate-y-4 pointer-events-none transition-all duration-500 ease-out"
              }
              aria-hidden={!reflectionComplete}
            >
              <p className="text-lg font-medium text-slate-900">Chapter 1 is ready.</p>
              <a
                href="/returning-home/chapter-1.pdf"
                download
                className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Download Chapter 1 (PDF)
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Chapter 2 — disclosure, collapsed by default; scroll into view on expand */}
      <div className="mt-16 border-b border-slate-200" ref={chapter2PanelRef}>
        <button
          type="button"
          onClick={toggleChapter2}
          className="flex w-full items-center justify-between py-6 text-left text-2xl font-semibold text-slate-900 sm:text-3xl"
          aria-expanded={chapter2Open}
        >
          <span className="block text-left">
            <span className="block">Chapter 2</span>
            <span className="mt-0.5 block text-sm font-normal text-slate-600">Continue when ready.</span>
          </span>
          <span className="text-slate-400" aria-hidden>{chapter2Open ? "−" : "+"}</span>
        </button>
        {chapter2Open && (
          <div className="pb-8">
            <TallyInline
              formId="MebGkX"
              title="Chapter 2 Begin Form"
              onSubmit={() => setChapter2Complete(true)}
            />
            <div
              className={
                chapter2Complete
                  ? "mt-12 opacity-100 translate-y-0 transition-all duration-500 ease-out"
                  : "mt-12 opacity-0 translate-y-4 pointer-events-none transition-all duration-500 ease-out"
              }
              aria-hidden={!chapter2Complete}
            >
              <p className="text-lg font-medium text-slate-900">Chapter 2 is ready.</p>
              <a
                href="/returning-home/chapter-2-walking-game.pdf"
                download
                className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Download Chapter 2 (PDF)
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
