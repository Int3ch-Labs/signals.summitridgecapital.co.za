import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/40 blur-3xl"
      />

      <div className="relative w-full max-w-lg text-center">
       

        {/* 404 */}
        <div className="mt-14">
          

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            404 · Page not found
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            This page isn&apos;t available.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            The page you&apos;re looking for may have moved, been removed, or
            the address may have been entered incorrectly.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md"
          >
            Back to home
          </Link>

          <Link
            href="/pricing"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View plans
          </Link>
        </div>

        {/* Trading-style status */}
        <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Platform status
            </span>

            <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Operational
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                Signals
              </p>
              <p className="mt-1 text-xs font-bold text-slate-700">
                Online
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                Dashboard
              </p>
              <p className="mt-1 text-xs font-bold text-slate-700">
                Online
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] font-semibold uppercase text-slate-400">
                Markets
              </p>
              <p className="mt-1 text-xs font-bold text-slate-700">
                Active
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Summit Ridge Capital. All rights
          reserved.
        </p>
      </div>
    </main>
  );
}