interface SignalReadoutProps {
  instrument: string;
  direction: "LONG" | "SHORT";
  entry: string;
  sl: string;
  tp: string;
  confidence: string;
  className?: string;
}

export default function SignalReadout({
  instrument,
  direction,
  entry,
  sl,
  tp,
  confidence,
  className = "",
}: SignalReadoutProps) {
  const isLong = direction === "LONG";

  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-xl
        shadow-blue-900/10
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Model Signal
          </p>

          <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">
            {instrument}
          </p>
        </div>

        <div
          className={`
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
            tracking-wide
            ${
              isLong
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }
          `}
        >
          {direction}
        </div>
      </div>

      {/* Main values */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Entry
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {entry}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
              Confidence
            </p>

            <p className="mt-1 text-lg font-bold text-blue-700">
              {confidence}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
              Stop Loss
            </p>

            <p className="mt-1 text-lg font-bold text-red-600">
              {sl}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Target
            </p>

            <p className="mt-1 text-lg font-bold text-emerald-600">
              {tp}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span className="h-2 w-2 rounded-full bg-blue-500" />

          <p className="text-xs text-slate-500">
            Example model output
          </p>
        </div>
      </div>
    </div>
  );
}