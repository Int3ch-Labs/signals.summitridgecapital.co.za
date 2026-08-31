"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {useRouter} from "next/navigation";

const tiers = [
  {
    id: "start",
    name: "Start",
    price: "R49",
    period: "/ month",
    description: "For getting started with structured signals.",
    features: ["10 signals / day"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R99",
    period: "/ month",
    description: "For active traders who want daily signals.",
    features: ["50 signals / day"],
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

const API_URL = "http://localhost:8000/api";

export default function SignupPage() {
  const [selectedTier, setSelectedTier] = useState("premium");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const selectedPlan =
    tiers.find((tier) => tier.id === selectedTier) ?? tiers[1];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  const formData = new FormData(e.currentTarget);

  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!firstName) {
    setError("Please enter your first name.");
    return;
  }

  if (!lastName) {
    setError("Please enter your last name.");
    return;
  }

  if (!email) {
    setError("Please enter your email address.");
    return;
  }

  if (password.length < 8) {
    setError("Your password must contain at least 8 characters.");
    return;
  }

  if (!agreed) {
    setError("Please accept the terms and policies before continuing.");
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        first_name:firstName,
        last_name:lastName,
        email,
        password,
        tier: selectedTier,
      }),
    });

    const data = await response.json();

    // Handle FastAPI errors
    if (!response.ok) {
      throw new Error(
        data?.detail || "Something went wrong. Please try again."
      );
    }


    // Save email so the OTP page knows where the code was sent
    sessionStorage.setItem("signup_email", email);
    router.push("/signup/verify-otp");

  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );


  } finally {
    setSubmitting(false);
  }
}

  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Background */}
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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        



        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 lg:hidden">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
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

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Create your account
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose your plan, create your account and start accessing
            model-generated trading signals.
          </p>
        </div>

        {/* Main content */}
        <div className="mx-auto mt-7 grid max-w-5xl items-start gap-5 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-7">
          {/* Plans */}
          <section>
            <div className="mb-3">
              <p className="text-sm font-bold text-slate-900">
                Choose your plan
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Select the plan that best matches how frequently you trade.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3">
              {tiers.map((tier) => {
                const selected = selectedTier === tier.id;

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id);
                      setError("");
                    }}
                    aria-pressed={selected}
                    className={`relative w-full rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                      selected
                        ? "border-blue-600 bg-white shadow-lg shadow-blue-600/10 ring-2 ring-blue-600/10"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm sm:right-4">
                        Most popular
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-blue-600 bg-blue-600"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>

                        <div className="min-w-0">
                          <h2 className="text-sm font-bold text-slate-950 sm:text-base">
                            {tier.name}
                          </h2>

                          <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                            {tier.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-lg font-bold text-slate-950 sm:text-xl">
                          {tier.price}
                        </span>

                        <span className="block text-[9px] text-slate-400 sm:text-[10px]">
                          {tier.period}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 border-t border-slate-100 pt-3">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-[11px] font-medium text-slate-600 sm:text-xs"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
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

            {/* Desktop reassurance */}
            <div className="mt-4 hidden rounded-2xl border border-slate-200/80 bg-white/70 p-4 lg:block">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
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
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Secure registration
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                    Your account information is protected during registration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Signup card */}
          <section className="w-full">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.28)]">
              <div className="p-5 sm:p-7">
                {/* Card header */}
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
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

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                        Your account
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Create your secure account.
                      </p>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Selected
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-blue-600">
                        {selectedPlan.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 7v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="12"
                          cy="16.5"
                          r="1"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    <p className="min-w-0 text-xs font-medium leading-5 text-red-700 sm:text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                  noValidate
                >
                  {/* Names */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        required
                        autoComplete="given-name"
                        placeholder="First Name"
                        className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        required
                        autoComplete="family-name"
                        placeholder="Last Name"
                        className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <div className="relative mt-1.5">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-16 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-xs font-semibold text-slate-400 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/20"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Use at least 8 characters.
                    </p>
                  </div>

                  {/* Selected plan */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                          Selected plan
                        </p>

                        <p className="mt-0.5 truncate text-sm font-bold text-slate-950">
                          {selectedPlan.name}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-base font-bold text-blue-600">
                          {selectedPlan.price}
                        </p>

                        <p className="text-[9px] text-slate-400">
                          {selectedPlan.period}
                        </p>
                      </div>
                    </div>
                  </div>

                

                  {/* Terms */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-1 transition-colors hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);

                        if (e.target.checked) {
                          setError("");
                        }
                      }}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600 focus:ring-blue-500"
                      required
                    />

                    <span className="text-[11px] leading-5 text-slate-500 sm:text-xs">
                      I agree to the{" "}
                      <Link
                        href="/legal/terms-and-conditions"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Terms &amp; Conditions
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
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/legal/refund-policy"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Refund Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    //disabled={!agreed || !turnstileToken || submitting}
                    disabled={!agreed || submitting}
                    className="group flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
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

                        Creating account…
                      </>
                    ) : (
                      <>
                        Create account

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

                {/* Login */}
                <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                  <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </div>

                {/* Security */}
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

                  <span>Secure account registration</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
