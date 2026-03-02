"use client";

import { useState } from "react";

type Props = {
  regionSlug: string;
  promptId: string;
  neighborhoodHint: string;
};

export function PlaygroundForm({ regionSlug, promptId, neighborhoodHint }: Props) {
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [response, setResponse] = useState("");
  const [consentPublic, setConsentPublic] = useState(true);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/playground/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regionSlug,
          promptId,
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

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-medium text-slate-900">Thank you.</p>
        <p className="mt-2 text-slate-700">Your reflection will appear once reviewed.</p>
        <a
          href="#responses"
          className="mt-6 inline-block min-h-[44px] rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          See responses
        </a>
      </div>
    );
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-[box-shadow,border-color] focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30 disabled:opacity-60";

  return (
    <div className="relative rounded-2xl border border-slate-200/60 bg-[#fcf9f6] px-6 py-10 sm:px-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="playground-name" className="block text-sm font-medium text-slate-800">
            Name
          </label>
          <p id="playground-name-desc" className="mt-0.5 text-sm text-slate-500">
            First name or nickname is fine.
          </p>
          <input
            id="playground-name"
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="playground-name-desc"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="playground-neighborhood" className="block text-sm font-medium text-slate-800">
            Neighborhood / Area
          </label>
          <p id="playground-neighborhood-desc" className="mt-0.5 text-sm text-slate-500">
            {neighborhoodHint}
          </p>
          <input
            id="playground-neighborhood"
            type="text"
            required
            maxLength={80}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="playground-neighborhood-desc"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="playground-response" className="block text-sm font-medium text-slate-800">
            Your reflection
          </label>
          <p id="playground-response-desc" className="mt-0.5 text-sm text-slate-500">
            One sentence is great. A paragraph works too!
          </p>
          <textarea
            id="playground-response"
            required
            minLength={5}
            maxLength={500}
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={status === "submitting"}
            aria-describedby="playground-response-desc"
            className={`${inputClass} min-h-[140px] px-5 py-4`}
          />
        </div>

        <div className="mt-4 flex items-start gap-4">
          <input
            id="playground-consent"
            type="checkbox"
            checked={consentPublic}
            onChange={(e) => setConsentPublic(e.target.checked)}
            disabled={status === "submitting"}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-slate-700 focus:ring-2 focus:ring-slate-400/30 focus:ring-offset-0"
          />
          <label htmlFor="playground-consent" className="text-sm text-slate-700">
            Please share this reflection publicly.
          </label>
        </div>

        <div className="absolute -left-[9999px] opacity-0" aria-hidden>
          <label htmlFor="playground-website">Website</label>
          <input
            id="playground-website"
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
