"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      /*
       * TODO:
       * Send email, password and turnstileToken to your
       * Summit Ridge authentication API.
       *
       * Example:
       *
       * await fetch("/api/auth/login", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     email,
       *     password,
       *     turnstileToken,
       *   }),
       * });
       */

      console.log({
        email,
        password,
        turnstileToken,
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      setSubmitting(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);

      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-16">
        {/* Left side */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            

            <h1 className="mt-7 text-5xl font-bold tracking-[-0.035em] text-slate-950 xl:text-6xl">
              Welcome back.
              <span className="block text-blue-600">
                Read the market.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Sign in to access your Summit Ridge Capital Signals dashboard,
              generate model-based market signals and manage your subscription.
            </p>

            {/* Trust points */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Feature
                title="Model-generated signals"
                description="Structured market signals with entry, stop and target levels."
              />

              <Feature
                title="Secure account access"
                description="Protected authentication and security controls."
              />

              <Feature
                title="Built for traders"
                description="A focused interface designed around signal generation."
              />

              <Feature
                title="Your account, your control"
                description="Manage your subscription and usage from one dashboard."
              />
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="w-full">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-25px_rgba(15,23,42,0.25)] sm:p-8">
            {/* Mobile brand */}
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                

                
              </div>
            </div>

            {/* Header */}
            <div>
              
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your Summit Ridge Capital credentials to continue.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
              noValidate
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M4 6.5h16v11H4z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m5 8 7 5 7-5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/login/reset"
                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.9 5.2A11.8 11.8 0 0 1 12 5c5.2 0 8.7 4.1 9.8 6.1-.5.9-1.6 2.4-3.3 3.7"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6.2 7.1C4.4 8.5 3.2 10.2 2.2 12 3.3 14 6.8 19 12 19c1 0 2-.2 2.8-.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Turnstile */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="mb-2">
                  <p className="text-xs font-semibold text-slate-700">
                    Security verification
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Verify that you&apos;re not an automated request.
                  </p>
                </div>

           <Turnstile
  ref={turnstileRef}
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  options={{
    theme: "light",
    size: "flexible",
  }}
  onSuccess={(token) => {
    setTurnstileToken(token);
    setError("");
  }}
  onError={(error) => {
    console.error("Turnstile error:", error);

    setTurnstileToken("");
    setError(
      "Security verification failed. Please try again."
    );
  }}
  onExpire={() => {
    setTurnstileToken("");
    setError("Security verification expired. Please verify again.");
  }}
/>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 8v5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="1"
                      fill="currentColor"
                    />
                  </svg>

                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !turnstileToken}
                className="group relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {submitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-30"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    Signing you in…
                  </>
                ) : (
                  <>
                    Log in
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="m13 6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Signup */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Security notice */}
            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Secure account authentication
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="m7 12 3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}