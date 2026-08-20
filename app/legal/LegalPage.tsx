import Link from "next/link";
import React from "react";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <span aria-hidden="true">←</span>
            Summit Ridge Capital Signals
          </Link>

          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              {eyebrow}
            </p>

            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <span>Summit Ridge Capital (Pty) Ltd</span>
              <span className="hidden sm:inline">•</span>
              <span>Registration No. 2025/960992/07</span>
              <span className="hidden sm:inline">•</span>
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Document */}
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <div className="legal-content">{children}</div>
        </article>

        {/* Legal navigation */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Legal
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Link
              href="/legal/refund-policy"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Refund Policy
            </Link>

            <Link
              href="/legal/privacy-policy"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/legal/disclaimer"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Risk Disclaimer
            </Link>

            <Link
              href="/legal/terms-and-conditions"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}