"use client";

import { useState } from "react";

type Props = {
  regionSlug: string;
  regionCycleWeekId: string;
  neighborhoodHint: string;
  question: string;
};

export function VoicesForm({ regionSlug, regionCycleWeekId, neighborhoodHint, question }: Props) {
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [response, setResponse] = useState("");
  const [consentPublic, setConsentPublic] = useState(true);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/voices/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regionSlug,
          regionCycleWeekId,
          name: name.trim(),
          neighborhood: neighborhood.trim(),
          response: response.trim(),
          consentPublic,
          website: website || undefined,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-10 sm:py-12 text-center min-h-[280px] flex flex-col justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600"
            aria-hidden
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-2xl font-medium text-slate-900">Thanks.</p>
          <p className="mt-2 text-base text-slate-600 font-medium">
            Reflections are reviewed and accepted daily.<br/>
            Please come back to see yours published below.
          </p>
          <div className="mt-6 mb-15 mx-auto max-w-xl rounded-lg bg-amber-200/20 border border-slate-200 px-4 py-4">
            <p className="text-base text-slate-800 leading-relaxed">
              Each week, there will be another opportunity to add reflections.
              <br />
              Continue to add your voice and hear the voice of place emerging.
            </p>
          </div>
          <p className="mt-8 mb-4 max-w-2xl mx-auto text-sm text-slate-600 leading-relaxed">
            Know someone else in your community <br />who might want to share their voice? 
          </p>
          <div className="mt-4 flex flex-col items-center">
            <div
              className="rh-voices-arrow-nudge mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600"
              aria-hidden="true"
            >
              <svg
                className="h-7 w-5 shrink-0"
                width="28"
                height="36"
                viewBox="0 0 28 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.5C12.5 14 11 19.5 14 24.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22.5L14 30L19 22.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button
              type="button"
              onClick={handleCopyPageLink}
              className="min-h-[44px] rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Copy Page Link
            </button>
            {linkCopied && (
              <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                Link copied
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-[box-shadow,border-color] focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30 disabled:opacity-60";

  return (
    <div className="relative rounded-2xl border border-slate-200/60 bg-[#fcf9f6] px-6 py-10 sm:px-8">
      <div className="text-center">
        <p className="text-s uppercase tracking-wider text-slate-500">
          This week&apos;s question
        </p>
        <p className="mt-4 text-lg font-medium text-slate-900 text-center max-w-lg mx-auto leading-relaxed pt-2">
          {question}
        </p>
        <div className="mx-auto mt-6 mb-6 h-px max-w-lg bg-slate-200" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="voices-name" className="block text-sm font-medium text-slate-800">
            Name
          </label>
          <p id="voices-name-desc" className="mt-0.5 text-sm text-slate-500">
            First name or nickname is fine.
          </p>
          <input
            id="voices-name"
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="voices-name-desc"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="voices-neighborhood" className="block text-sm font-medium text-slate-800">
            Neighborhood / Area
          </label>
          <p id="voices-neighborhood-desc" className="mt-0.5 text-sm text-slate-500">
            {neighborhoodHint}
          </p>
          <input
            id="voices-neighborhood"
            type="text"
            required
            maxLength={80}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="voices-neighborhood-desc"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="voices-response" className="block text-sm font-medium text-slate-800">
            Your reflection
          </label>
          <p id="voices-response-desc" className="mt-0.5 text-sm text-slate-500">
            One sentence is great. A paragraph works too!
          </p>
          <textarea
            id="voices-response"
            required
            minLength={5}
            maxLength={1500}
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="voices-response-desc"
            className={`${inputClass} min-h-[140px] px-5 py-4`}
          />
        </div>

        <div className="mt-4 flex items-start gap-4">
          <input
            id="voices-consent"
            type="checkbox"
            checked={consentPublic}
            onChange={(e) => setConsentPublic(e.target.checked)}
            disabled={status === "submitting"}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-slate-700 focus:ring-2 focus:ring-slate-400/30 focus:ring-offset-0"
          />
          <label htmlFor="voices-consent" className="text-sm text-slate-700">
            Please share this reflection publicly.
          </label>
        </div>

        <div className="absolute -left-[9999px] opacity-0" aria-hidden>
          <label htmlFor="voices-website">Website</label>
          <input
            id="voices-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full min-h-[52px] rounded-xl bg-slate-900 px-6 py-4.5 text-base font-medium text-white transition-colors hover:bg-slate-800 focus:outline focus:ring-2 focus:ring-slate-400/30 focus:ring-offset-2 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit reflection"}
        </button>
      </form>
    </div>
  );
}
