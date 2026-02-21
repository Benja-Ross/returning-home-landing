"use client";

import { useEffect, useRef } from "react";

const TALLY_SCRIPT_URL = "https://tally.so/widgets/embed.js";
const TALLY_EMBED_BASE = "https://tally.so/embed";

type TallyInlineProps = {
  formId: string;
  title: string;
  onSubmit?: () => void;
};

function loadTallyScript(): Promise<void> {
  const existing = document.querySelector(`script[src="${TALLY_SCRIPT_URL}"]`);
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TALLY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Tally embed script failed to load"));
    document.body.appendChild(script);
  });
}

export function TallyInline({ formId, title, onSubmit }: TallyInlineProps) {
  const onSubmitRef = useRef(onSubmit);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  onSubmitRef.current = onSubmit;

  const embedUrl = `${TALLY_EMBED_BASE}/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    loadTallyScript()
      .then(() => {
        if (typeof (window as any).Tally?.loadEmbeds === "function") {
          (window as any).Tally.loadEmbeds();
        }
        timeoutId = setTimeout(() => {
          const iframe = iframeRef.current;
          if (iframe && !iframe.src) {
            iframe.src = embedUrl;
          }
        }, 300);
      })
      .catch(() => {});

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string" || !e.data.includes("Tally.FormSubmitted")) return;
      try {
        const parsed = JSON.parse(e.data) as { payload?: { formId?: string } };
        const payload = parsed?.payload;
        if (payload?.formId === formId) {
          onSubmitRef.current?.();
        }
      } catch {
        // ignore parse errors
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
    };
  }, [formId, embedUrl]);

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={embedUrl}
      title={title}
      className="min-h-[400px] w-full rounded-lg overflow-hidden"
      style={{ border: "none", width: "100%" }}
    />
  );
}
