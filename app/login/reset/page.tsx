"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import ErrorModal from "@/components/ErrorModal";
import { useErrorModal } from "@/hooks/useErrorModal";

const API_URL = "http://localhost:8000/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { error, showError, clearError } = useErrorModal();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      showError("Please enter your email address.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      showError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "We couldn't process your request right now. Please try again."
        );
      }

      setSuccess(true);
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "We couldn't process your request right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const maskedEmail = email
    ? email.replace(
        /^(.{2})(.*)(@.*)$/,
        (_, firstTwo, middle, domain) =>
          `${firstTwo}${"*".repeat(Math.min(middle.length, 6))}${domain}`
      )
    : "your email address";

  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-sky-200/25 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <h1 className="mt-8 text-5xl font-bold tracking-[-0.04em] text-slate-950 xl:text-6xl">
              Get back
              <span className="block text-blue-600">into your account.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 xl:text-lg xl:leading-8">
              Forgot your password? No problem. Enter the email address
              associated with your Summit Ridge Capital account and we&apos;ll
              help you get back in.
            </p>

            <div className="mt-9 space-y-3">
              <RecoveryFeature
                title="Simple recovery"
                description="Enter your account email and we'll guide you through the next step."
              />
              <RecoveryFeature
                title="Secure verification"
                description="Security verification helps protect your account from unauthorized requests."
              />
              <RecoveryFeature
                title="Your account stays protected"
                description="Password recovery does not change your account until you complete the reset process."
              />
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center">
          <div className="w-full max-w-[440px]">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.28)]">
              {success ? (
                /* --- Confirmation screen, replaces the form entirely --- */
                <div className="p-6 text-center sm:p-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                      <path d="M4 7.5C4 6.67 4.67 6 5.5 6h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13C4.67 18 4 17.33 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.7" />
                      <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m9.5 13.2 1.8 1.8 3.2-3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                    Reset link sent
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.7rem]">
                    Check your inbox
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                    If an account exists for{" "}
                    <span className="font-semibold text-slate-700">{maskedEmail}</span>,
                    you&apos;ll receive an email shortly with instructions to
                    reset your password.
                  </p>

                  <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left">
                    <p className="text-xs leading-5 text-slate-500">
                      The link expires shortly for your security. Don&apos;t
                      see it? Check your spam or junk folder.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Use a different email
                  </button>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex items-center justify-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    ← Back to login
                  </Link>
                </div>
              ) : (
                /* --- Request form --- */
                <div className="p-5 sm:p-7">
                  <div className="text-center sm:text-left">
                    <h2 className="text-[1.45rem] font-bold tracking-tight text-slate-950 sm:text-2xl">
                      Forgot your password?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Enter your email address and we&apos;ll send instructions
                      to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                        Email address
                      </label>

                      <div className="relative mt-1.5">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                          <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
                            <path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                            <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
                        Use the email address associated with your account.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                    >
                      {submitting ? (
                        <>
                          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Reset Password
                          <svg viewBox="0 0 24 24" fill="none" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="mr-1.5 h-4 w-4" aria-hidden="true">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="m11 18-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Back to login
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 sm:text-[11px]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                      <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Secure password recovery</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <ErrorModal
        open={!!error}
        title={error?.title}
        message={error?.message ?? ""}
        onClose={clearError}
      />
    </main>
  );
}

function RecoveryFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="m7 12 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}