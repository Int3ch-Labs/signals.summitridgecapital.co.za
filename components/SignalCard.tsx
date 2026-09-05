import { TradingSignal } from "@/lib/types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ReactNode } from "react";

export default function SignalCard({ signal }: { signal: TradingSignal }) {
  const isLong = signal.direction === "LONG";
  const decimals = signal.entry >= 100 ? 2 : 4;

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-blue-100">
            Model Signal
          </p>
          <p className="text-2xl font-bold tracking-tight text-white">
            {signal.pair}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
            isLong
              ? "bg-emerald-400/20 text-emerald-50"
              : "bg-red-400/20 text-red-50"
          }`}
        >
          {isLong ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          {signal.direction}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6 sm:gap-6">
        <Metric
          label="Entry"
          value={signal.entry.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        />
        <Metric
          label="Confidence"
          value={`${signal.confidence}%`}
          extra={
            <div className="mt-2 h-1.5 w-full rounded-full bg-blue-100">
              <div
                className="h-1.5 rounded-full bg-blue-600 transition-all"
                style={{ width: `${signal.confidence}%` }}
              />
            </div>
          }
        />
        <Metric
          label="Stop Loss"
          value={signal.stopLoss.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          valueClass="text-red-600"
        />
        <Metric
          label="Target"
          value={signal.target.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          valueClass="text-emerald-600"
        />
      </div>

      <div className="px-6 pb-5 text-xs text-slate-400">
        Generated {new Date(signal.generatedAt).toLocaleString()}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  valueClass = "text-slate-800",
  extra,
}: {
  label: string;
  value: string;
  valueClass?: string;
  extra?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className={`text-xl font-bold ${valueClass}`}>{value}</p>
      {extra}
    </div>
  );
}