"use client";

import { useEffect, useState } from "react";

import {
  PrimaryButton,
  SecondaryButton,
  SignalReadout,
  Card,
} from "@/components/ui";

type Currency = "ZAR" | "USD";

const tiers = [
  {
    name: "Start",
    usdPrice: 5,
    zarPrice: 49,
    description:
      "Get started with structured model-generated setups and build your trading routine.",
    limit: "10 signals per day",
  },
  {
    name: "Premium",
    usdPrice: 15,
    zarPrice: 99,
    description:
      "For traders who want regular market setups and more frequent signal access.",
    limit: "50 signals per day",
    featured: true,
  },
  {
    name: "Premium+",
    usdPrice: 25,
    zarPrice: 149,
    description:
      "For active traders who want unrestricted access to available model signals.",
    limit: "Unlimited signals",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your market",
    description:
      "Select the instruments and markets you want to follow, then review the available model-generated setups.",
  },
  {
    number: "02",
    title: "Read the setup",
    description:
      "Review the direction, entry, stop loss, take profit and confidence score in a familiar trading format.",
  },
  {
    number: "03",
    title: "Make your decision",
    description:
      "Use the setup as one source of market information and decide whether it fits your own strategy and risk management.",
  },
];

const setupItems = [
  ["Instrument", "XAUUSD"],
  ["Direction", "LONG"],
  ["Entry", "2,412.30"],
  ["Stop Loss", "2,405.80"],
  ["Take Profit", "2,428.10"],
  ["Risk / Reward", "1 : 2.43"],
  ["Confidence", "71%"],
];

export default function HomePage() {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;

    const isSouthAfrica =
      timezone === "Africa/Johannesburg" ||
      locale.toLowerCase().includes("-za");

    setCurrency(isSouthAfrica ? "ZAR" : "USD");
  }, []);

  const formatPrice = (tier: (typeof tiers)[number]) => {
    const price = currency === "ZAR" ? tier.zarPrice : tier.usdPrice;

    return currency === "ZAR"
      ? `R${price}`
      : `$${price}`;
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          {/* Hero copy */}
          <div className="max-w-2xl">
           

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
              Find the setup.
              <br />
              <span className="text-blue-600">
                Know the levels.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Get structured model-generated trading setups with the levels
              traders already understand — direction, entry, stop loss, take
              profit and confidence.
            </p>

           

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href="/signup"
                className="w-full sm:w-auto"
              >
                Start trading smarter
              </PrimaryButton>

              <SecondaryButton
                href="/pricing"
                className="w-full sm:w-auto"
              >
                View plans
              </SecondaryButton>
            </div>

            {/* Trust points */}
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-slate-500 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Clear setups
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Defined risk levels
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Flexible plans
              </div>
            </div>

            <p className="mt-7 max-w-xl text-xs leading-5 text-slate-400">
              Signals are model-generated and provided for informational
              purposes only. They are not financial advice or a guarantee of
              trading results. Always consider your own strategy and risk
              tolerance before trading.
            </p>
          </div>

          {/* Signal preview */}
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Market setup
              </span>

              <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                READY
              </span>
            </div>

            <SignalReadout
              instrument="XAUUSD"
              direction="LONG"
              entry="2,412.30"
              sl="2,405.80"
              tp="2,428.10"
              confidence="71%"
            />

            {/* Quick stats */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Entry
                </p>
                <p className="mt-1 text-xs font-bold text-slate-800">
                  2,412.30
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Stop
                </p>
                <p className="mt-1 text-xs font-bold text-red-500">
                  2,405.80
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Target
                </p>
                <p className="mt-1 text-xs font-bold text-emerald-600">
                  2,428.10
                </p>
              </div>
            </div>

            <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
              Example setup for illustration only. Not a live trading
              recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Your trading workflow
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              From market idea to structured setup.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              No need to decode complicated model output. See the information
              in the format traders are already familiar with.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="group border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRADER FEATURES
      ===================================================== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Built for traders
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Everything important.
                <br />
                Nothing unnecessary.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Summit Ridge turns model analysis into a structured setup so
                you can quickly understand what the model sees without digging
                through unnecessary information.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "LONG and SHORT market direction",
                  "Defined entry level",
                  "Predefined stop-loss level",
                  "Take-profit target",
                  "Risk / reward context",
                  "Model confidence score",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading setup card */}
            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Trading setup
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-950">
                    XAUUSD
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  LONG
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {setupItems.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between ${
                      index !== 0
                        ? "border-t border-slate-100 pt-4"
                        : ""
                    }`}
                  >
                    <span className="text-sm text-slate-500">
                      {label}
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        label === "Direction"
                          ? "text-emerald-600"
                          : label === "Stop Loss"
                            ? "text-red-500"
                            : label === "Take Profit"
                              ? "text-emerald-600"
                              : label === "Confidence"
                                ? "text-blue-600"
                                : label === "Risk / Reward"
                                  ? "text-blue-600"
                                  : "text-slate-900"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Model confidence
                  </span>

                  <span className="text-sm font-bold text-blue-600">
                    71%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: "71%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Plans & access
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Pick the plan that matches your trading frequency.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Start small, get familiar with the platform and upgrade when you
              need more signal access.
            </p>

            {/* Currency indicator */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Prices shown in {currency === "ZAR" ? "South African Rand (R)" : "US Dollars ($)"}
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col transition hover:-translate-y-1 ${
                  tier.featured
                    ? "border-blue-500 shadow-xl shadow-blue-900/10"
                    : "border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
                }`}
              >
                {tier.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {tier.name}
                  </h3>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-950">
                      {formatPrice(tier)}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      / month
                    </span>
                  </div>

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-500">
                    {tier.description}
                  </p>

                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Signal access
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {tier.limit}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      ✓
                    </span>
                    Dashboard access included
                  </div>
                </div>

                <div className="mt-7">
                  {tier.featured ? (
                    <PrimaryButton
                      href="/signup"
                      className="w-full"
                    >
                      Choose Premium
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton
                      href="/signup"
                      className="w-full"
                    >
                      Choose {tier.name}
                    </SecondaryButton>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <SecondaryButton href="/pricing">
              Compare all plans
            </SecondaryButton>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-slate-400">
            Subscription access provides access to model-generated signals and
            platform features. It does not guarantee profitable trades or
            trading performance.
          </p>
        </div>
      </section>
    </main>
  );
}