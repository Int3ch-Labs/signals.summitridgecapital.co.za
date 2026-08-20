"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const tiers = [
  {
    id: "start",
    name: "Start",
    price: "R49",
    period: "/ month",
    description: "For getting started with structured signals.",
    features: ["3 signals / week"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R99",
    period: "/ month",
    description: "For active traders who want daily signals.",
    features: ["Daily signals"],
    popular: true,
  },
  {
    id: "premium-plus",
    name: "Premium+",
    price: "R149",
    period: "/ month",
    description: "For traders who want maximum signal access.",
    features: ["Unlimited signals"],
  },
];

export default function SignupPage() {
  const [selectedTier, setSelectedTier] = useState("premium");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");

  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!agreed) {
      setError("Please accept the Terms & Conditions before continuing.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const firstName = String(formData.get("firstName") || "");
      const lastName = String(formData.get("lastName") || "");
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      /*
       * TODO:
       * Send these values to your Summit Ridge authentication API.
       *
       * Example:
       *
       * const response = await fetch("/api/auth/signup", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     firstName,
       *     lastName,
       *     email,
       *     password,
       *     tier: selectedTier,
       *     turnstileToken,
       *   }),
       * });
       */

      console.log({
        firstName,
        lastName,
        email,
        password,
        tier: selectedTier,
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
      {/* Background */}
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

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Mobile brand */}
        

        {/* Page heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="hidden items-center justify-center gap-2 lg:flex">
           
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Create your account
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose your plan, create your account and start accessing
            model-generated trading signals.
          </p>
        </div>

        {/* Main layout */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1fr_440px] lg:items-start">
          {/* Plans */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-bold text-slate-900">
                Choose your plan
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Select the plan that best matches how frequently you trade.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {tiers.map((tier) => {
                const selected = selectedTier === tier.id;

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative w-full rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? "border-blue-600 bg-white shadow-lg shadow-blue-600/10 ring-2 ring-blue-600/10"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Most popular
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-blue-600 bg-blue-600"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>

                        <div>
                          <h2 className="font-bold text-slate-950">
                            {tier.name}
                          </h2>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {tier.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-xl font-bold text-slate-950">
                          {tier.price}
                        </span>

                        <span className="block text-[10px] text-slate-400">
                          {tier.period}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs font-medium text-slate-600"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            ✓
                          </span>

                          {feature}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            
          </div>

          {/* Signup card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-25px_rgba(15,23,42,0.25)] sm:p-8">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M5 20c.7-3.4 3.2-5.5 7-5.5s6.3 2.1 7 5.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your secure Summit Ridge Capital account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
              noValidate
            >
              {/* Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Donald"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Mohlala"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters. A longer password is recommended.
                </p>
              </div>

              {/* Selected plan summary */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Selected plan
                    </p>

                    <p className="mt-1 font-bold text-slate-950">
                      {
                        tiers.find((tier) => tier.id === selectedTier)
                          ?.name
                      }
                    </p>
                  </div>

                  <p className="text-lg font-bold text-blue-600">
                    {
                      tiers.find((tier) => tier.id === selectedTier)
                        ?.price
                    }
                  </p>
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
                  siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                  }
                  options={{
                    theme: "light",
                    size: "flexible",
                  }}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setError("");
                  }}
                  onError={() => {
                    setTurnstileToken("");
                    setError(
                      "Security verification failed. Please try again."
                    );
                  }}
                  onExpire={() => {
                    setTurnstileToken("");
                  }}
                />
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) {
                      setError("");
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
                  required
                />

                <span className="text-xs leading-5 text-slate-500">
                  I have read and agree to the{" "}
                  <Link
                    href="/legal/terms-and-conditions"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                  ,{" "}
                  <Link
                    href="/legal/disclaimer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Risk Disclaimer
                  </Link>
                  ,{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link
                    href="/legal/refund-policy"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Refund Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                >
                  <span className="text-red-500">!</span>

                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!agreed || !turnstileToken || submitting}
                className="group flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
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

                    Creating account…
                  </>
                ) : (
                  <>
                    Create account

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

            {/* Login */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Security */}
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

              Secure account registration
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}