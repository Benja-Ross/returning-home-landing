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

  return (
    <div className="relative">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="playground-name" className="block text-sm font-medium text-slate-900">
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
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm focus:border-slate-500 focus:outline focus:ring-1 focus:ring-slate-500 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="playground-neighborhood" className="block text-sm font-medium text-slate-900">
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
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm focus:border-slate-500 focus:outline focus:ring-1 focus:ring-slate-500 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="playground-response" className="block text-sm font-medium text-slate-900">
          Your reflection
        </label>
        <p id="playground-response-desc" className="mt-0.5 text-sm text-slate-500">
          One sentence is perfect. No right answer.
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
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm focus:border-slate-500 focus:outline focus:ring-1 focus:ring-slate-500 disabled:opacity-60"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="playground-consent"
          type="checkbox"
          checked={consentPublic}
          onChange={(e) => setConsentPublic(e.target.checked)}
          disabled={status === "submitting"}
          className="mt-1 h-4 w-4 rounded border-slate-300 focus:ring-slate-500"
        />
        <label htmlFor="playground-consent" className="text-sm text-slate-700">
          I&apos;m okay with this being shared publicly.
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
        className="w-full min-h-[44px] rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-slate-800 focus:outline focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit reflection"}
      </button>
    </form>
    </div>
  );
}
