"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  interestType: string;
  message: string;
  website: string;
};

const interestOptions = [
  { value: "participate", label: "Participating" },
  { value: "host", label: "Hosting a local experience" },
  { value: "facilitate", label: "Facilitation" },
  { value: "partner", label: "Partnership" },
  { value: "general", label: "General question" },
] as const;

const initialFormState: FormState = {
  name: "",
  email: "",
  interestType: "",
  message: "",
  website: "",
};

const inputClass =
  "mt-1 block w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-slate-800 transition-[box-shadow,border-color] focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 disabled:opacity-60";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<FormState>(initialFormState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setStatus("success");
      setForm(initialFormState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-slate-200/70 bg-[#fcf9f6] px-6 py-8 sm:px-8"
        aria-live="polite"
      >
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
          Message sent
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Thank you for reaching out.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
          Your note has been received. We will read it with care and follow up as we are able.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrorMessage("");
          }}
          className="mt-6 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/70 bg-[#fcf9f6] px-6 py-8 sm:px-8"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            maxLength={80}
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            disabled={status === "submitting"}
            className={inputClass}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            maxLength={120}
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            disabled={status === "submitting"}
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="contact-interest" className="block text-sm font-medium text-slate-800">
            Interest type
          </label>
          <select
            id="contact-interest"
            name="interestType"
            required
            value={form.interestType}
            onChange={(event) =>
              setForm((current) => ({ ...current, interestType: event.target.value }))
            }
            disabled={status === "submitting"}
            className={inputClass}
          >
            <option value="">Select one</option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={6}
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            disabled={status === "submitting"}
            className={`${inputClass} min-h-[168px] resize-y px-4 py-3.5`}
          />
        </div>

        <div className="absolute -left-[9999px] opacity-0" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) =>
              setForm((current) => ({ ...current, website: event.target.value }))
            }
          />
        </div>
      </div>

      {errorMessage && (
        <p className="mt-5 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
