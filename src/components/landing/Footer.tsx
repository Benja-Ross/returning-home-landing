import { landingContent } from "@/content/landing";

import { AwakeningLandsWordmark } from "./AwakeningLandsWordmark";

export function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm leading-relaxed text-slate-600">
        <div className="flex items-end gap-3 flex-wrap">
          <span>{landingContent.footer.line1}</span>
          <AwakeningLandsWordmark className="h-6 w-auto opacity-90 sm:h-7" />
          <span> {landingContent.footer.line2}</span>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} {landingContent.footer.copyrightName}
        </p>
      </div>
    </footer>
  );
}
