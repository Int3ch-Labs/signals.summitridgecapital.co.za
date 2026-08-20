import Link from "next/link";

const plans = [
  {
    name: "Start",
    price: "R49",
    description: "A simple way to start exploring structured market signals.",
    features: [
      "3 signals per week",
      "XAUUSD signals",
      "Entry, stop & target levels",
      "Signal confidence",
      "Personal dashboard",
    ],
  },
  {
    name: "Premium",
    price: "R99",
    description: "Designed for traders who want access to signals every day.",
    popular: true,
    features: [
      "Daily signals",
      "XAUUSD signals",
      "Entry, stop & target levels",
      "Signal confidence",
      "Personal dashboard",
      "Signal history",
    ],
  },
  {
    name: "Premium+",
    price: "R149",
    description: "Maximum access for traders who want unlimited signals.",
    features: [
      "Unlimited signals",
      "XAUUSD signals",
      "Entry, stop & target levels",
      "Signal confidence",
      "Personal dashboard",
      "Signal history",
      "Priority access to new features",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Choose the level of access that
            <span className="block text-blue-600">
              fits your trading.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Access model-generated market signals from Summit Ridge Capital.
            Choose a plan based on how frequently you want to use the platform.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-blue-600 shadow-blue-600/10"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                  {plan.description}
                </p>

                <div className="mt-7">
                  <span className="text-4xl font-bold tracking-tight text-slate-950">
                    {plan.price}
                  </span>

                  <span className="ml-1 text-sm text-slate-400">
                    / month
                  </span>
                </div>

                <div className="my-7 h-px bg-slate-100" />

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Includes
                </p>

                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        ✓
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={`/signup?plan=${plan.name.toLowerCase().replace("+", "-")}`}
                  className={`flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-bold transition ${
                    plan.popular
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                      : "border border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  Get started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How billing works */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Start in a few simple steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Step
              number="01"
              title="Create your account"
              description="Register your Summit Ridge Capital Signals account using your email address."
            />

            <Step
              number="02"
              title="Choose your plan"
              description="Select the subscription level that matches your desired signal access."
            />

            <Step
              number="03"
              title="Access Signals"
              description="Once your subscription is active, use your dashboard to access available signals."
            />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
          <p className="text-sm font-bold text-slate-900">
            Important
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Summit Ridge Capital Signals provides model-generated information
            for informational purposes only. Signals do not constitute
            financial advice, investment advice or a recommendation to buy or
            sell any financial instrument. Trading involves substantial risk
            and you may lose money.
          </p>

          <Link
            href="/legal/disclaimer"
            className="mt-4 inline-block text-sm font-bold text-blue-600 hover:underline"
          >
            Read the full Risk Disclaimer →
          </Link>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
        {number}
      </div>

      <h3 className="mt-5 font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}