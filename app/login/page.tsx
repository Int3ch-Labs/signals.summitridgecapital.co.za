"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/ErrorModal";
import { useErrorModal } from "@/hooks/useErrorModal";
import { useUser } from "@/contexts/UserContext";

const API_URL = "http://localhost:8000/api";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { error, showError, clearError } = useErrorModal();
  const { setUser } = useUser();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email) {
      showError("Please enter your email address.");
      return;
    }

    if (!password) {
      showError("Please enter your password.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Handle API errors
      if (!response.ok) {
        throw new Error(
          data?.detail || "Something went wrong. Please try again."
        );
      }

      setUser(data.user);

      // Redirect after successful login
      router.push("/dashboard");
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        {/* Desktop information panel */}
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <h1 className="mt-8 text-5xl font-bold tracking-[-0.04em] text-slate-950 xl:text-6xl">
              Welcome back.
              <span className="block text-blue-600">Read the market.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 xl:text-lg xl:leading-8">
              Sign in to access your Summit Ridge Capital Signals dashboard,
              generate model-based market signals and manage your subscription.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
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
        </section>

        {/* Login section */}
        <section className="flex w-full items-center justify-center">
          <div className="w-full max-w-[440px]">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.28)]">
              <div className="p-5 sm:p-7">
                {/* Header */}
                <div className="text-center sm:text-left">
                  <h2 className="text-[1.45rem] font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Sign in to your account
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Enter your credentials to continue.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4.5"
                  noValidate
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <div className="relative mt-1.5">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
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
                        inputMode="email"
                        placeholder="you@example.com"
                        className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Password
                      </label>

                      <Link
                        href="/login/reset"
                        className="shrink-0 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative mt-1.5">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
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
                        className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/20"
                      >
                        {showPassword ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                            aria-hidden="true"
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
                            aria-hidden="true"
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

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
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
                          aria-hidden="true"
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
                <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                  <p className="text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>

                {/* Security notice */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 sm:text-[11px]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
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

                  <span>Secure account authentication</span>
                </div>
              </div>
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

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur transition-shadow hover:shadow-md">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
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
          <p className="text-sm font-bold text-slate-900">{title}</p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}