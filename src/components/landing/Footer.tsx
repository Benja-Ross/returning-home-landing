import { landingContent } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-slate-600">
        <p>{landingContent.footer.body}</p>
        <p className="mt-2">
          © {new Date().getFullYear()} {landingContent.footer.copyrightName}
        </p>
      </div>
    </footer>
  );
}

