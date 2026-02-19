import { landingContent } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm leading-relaxed text-slate-600">
        <p>{landingContent.footer.line1}</p>
        <p className="mt-2">{landingContent.footer.line2}</p>
        <p className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} {landingContent.footer.copyrightName}
        </p>
      </div>
    </footer>
  );
}
