import { ContactForm } from "@/components/contact/ContactForm";
import { PageLayout } from "@/components/layout/PageLayout";

export default function ContactPage() {
  return (
    <PageLayout hidePageHeader>
      <section>
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
              Reach out
            </p>
            <div className="mt-4 h-px w-16 bg-slate-200" aria-hidden />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Have a question, idea, or possible collaboration?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              Use the form to get in touch. We&apos;d be glad to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </PageLayout>
  );
}
