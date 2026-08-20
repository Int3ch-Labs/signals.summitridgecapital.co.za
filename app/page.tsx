import {
  PrimaryButton,
  SecondaryButton,
  SignalReadout,
  Card,
} from "@/components/ui";

const tiers = [
  {
    name: "Start",
    price: "R49",
    description: "A simple way to start exploring model-generated signals.",
    limit: "3 signals per week",
  },
  {
    name: "Premium",
    price: "R99",
    description: "Daily access for traders who want more frequent signals.",
    limit: "Daily signals",
    featured: true,
  },
  {
    name: "Premium+",
    price: "R149",
    description: "Unlimited access for active traders.",
    limit: "Unlimited signals",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Create your Summit Ridge account and choose the plan that fits your trading frequency.",
  },
  {
    number: "02",
    title: "Open your dashboard",
    description:
      "Your subscription, signal usage and available features are managed securely from your dashboard.",
  },
  {
    number: "03",
    title: "Generate your signal",
    description:
      "Generate a model signal and review the direction, entry, stop, target and confidence before making your own decision.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-white">
        {/* Decorative background */}
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
              Make every market decision with{" "}
              <span className="text-blue-600">
                better information.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Access model-generated trading signals from Summit Ridge
              Capital. See the market direction, entry, stop, target and
              confidence in one clear view.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href="/signup"
                className="w-full sm:w-auto"
              >
                Create your account
              </PrimaryButton>

              <SecondaryButton
                href="/pricing"
                className="w-full sm:w-auto"
              >
                Explore plans
              </SecondaryButton>
            </div>

            {/* Trust points */}
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-slate-500 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Model-generated
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Simple dashboard
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                  ✓
                </span>
                Flexible plans
              </div>
            </div>

            <p className="mt-7 max-w-xl text-xs leading-5 text-slate-400">
              Signals are provided for informational purposes only and do not
              constitute financial advice. Trading involves risk, including
              the potential loss of capital.
            </p>
          </div>

          {/* Signal preview */}
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Example signal
              </span>

              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Model ready
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

            <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
              Illustration only. This is not a live trading recommendation.
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
              How it works
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A simpler way to read a trading setup.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Everything you need to understand the model output is presented
              in one straightforward signal.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="group border-slate-200 p-6 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
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
          FEATURES
      ===================================================== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Built for clarity
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Less noise. More structure.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Instead of overwhelming you with complex charts and
                indicators, Summit Ridge presents the model&apos;s output as
                a structured trading setup.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Clear market direction",
                  "Defined entry level",
                  "Predefined stop-loss",
                  "Model target",
                  "Confidence score",
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

            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Signal structure
              </p>

              <div className="mt-6 space-y-4">
                {[
                  ["Instrument", "XAUUSD"],
                  ["Direction", "LONG"],
                  ["Entry", "2,412.30"],
                  ["Stop Loss", "2,405.80"],
                  ["Target", "2,428.10"],
                  ["Confidence", "71%"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between ${
                      index !== 0 ? "border-t border-slate-100 pt-4" : ""
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
                            : label === "Target"
                              ? "text-emerald-600"
                              : label === "Confidence"
                                ? "text-blue-600"
                                : "text-slate-900"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
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
              Simple pricing
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Choose the access that fits you.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Start with the basics and upgrade whenever you need more signal
              access.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.featured
                    ? "border-blue-500 shadow-xl shadow-blue-900/10"
                    : ""
                }`}
              >
                {tier.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {tier.name}
                  </h3>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-950">
                      {tier.price}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      / month
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {tier.description}
                  </p>

                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Included
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {tier.limit}
                    </p>
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
        </div>
      </section>

      
    </main>
  );
}