import Link from "next/link";

export const metadata = {
  title: "About | Summit Ridge Capital Signals",
  description:
    "Learn about Summit Ridge Capital Signals and our approach to model-generated market signals.",
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Technology designed to help you
              <span className="block text-blue-600">
                read the market.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Summit Ridge Capital Signals is a market-signal platform built
              around quantitative research, structured data and machine
              learning.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Our approach
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Turning market data into structured information.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                Financial markets generate enormous amounts of data. The
                challenge is turning that information into something structured,
                consistent and understandable.
              </p>

              <p>
                Summit Ridge Capital Signals is being developed around that
                principle. Our systems process market information and apply
                quantitative and machine-learning techniques to identify
                potential market conditions.
              </p>

              <p>
                The result is presented as a structured signal containing
                information such as direction, entry, stop-loss, target and
                model confidence.
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Signal engine
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    XAUUSD
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  MODEL
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6">
                <Metric label="Direction" value="LONG" />
                <Metric label="Confidence" value="71%" />
                <Metric label="Entry" value="2,412.30" />
                <Metric label="Target" value="2,428.10" />
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Signal status
                  </span>

                  <span className="flex items-center gap-2 text-xs font-bold text-blue-600">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    GENERATED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              What matters to us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Built around clarity.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Principle
              title="Data-driven"
              description="We focus on structured market data and quantitative methods rather than subjective market commentary."
            />

            <Principle
              title="Transparent"
              description="Signals are presented with defined levels and model information so users can understand what they are receiving."
            />

            <Principle
              title="Risk-aware"
              description="Trading involves uncertainty. Our platform is designed to communicate signals without presenting them as guaranteed outcomes."
            />
          </div>
        </div>
      </section>

      {/* Company */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          The company
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Summit Ridge Capital
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Summit Ridge Capital is a registered South African company operating
          the Summit Ridge Capital Signals platform.
        </p>

        <p className="mt-4 text-sm font-semibold text-slate-700">
          Registration Number: 2025/960992/07
        </p>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Contact Summit Ridge Capital
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-6">
          <p className="text-xs leading-6 text-slate-400">
            Summit Ridge Capital Signals does not guarantee profits or
            investment outcomes. Model-generated signals are informational
            only and are not financial advice.
          </p>
        </div>
      </section>
    </main>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function Principle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
        ✓
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