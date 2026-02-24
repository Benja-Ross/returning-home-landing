"use client";

import { useEffect, useRef } from "react";

import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";

const TYPEFORM_ID = "JHlEcNzi";

type TypeformInlineProps = {
  onSubmit?: () => void;
};

export function TypeformInline({ onSubmit }: TypeformInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { unmount } = createWidget(TYPEFORM_ID, {
      container: containerRef.current,
      height: 700,
      onSubmit: () => {
        onSubmitRef.current?.();
      },
    });

    return () => {
      unmount();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[700px] w-full rounded-lg overflow-hidden md:min-h-[700px]"
      style={{ maxWidth: "100%" }}
    />
  );
}
