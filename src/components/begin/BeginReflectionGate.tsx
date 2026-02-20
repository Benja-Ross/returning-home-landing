"use client";

import { useState, useEffect } from "react";

import { TypeformInline } from "./TypeformInline";

export function BeginReflectionGate() {
  const [reflectionComplete, setReflectionComplete] = useState(false);

    useEffect(() => {
      if (process.env.NODE_ENV === "development") {
        (window as any).__unlockChapter1 = () => {
          setReflectionComplete(true);
        };

        (window as any).__lockChapter1 = () => {
          setReflectionComplete(false);
        };
      }
    }, []);

  return (
    <>
      <TypeformInline onSubmit={() => setReflectionComplete(true)} />

      {/* Chapter 1 download — revealed after Typeform submit */}
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
    </>
  );
}
