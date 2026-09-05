
"use client";

import { useState } from "react";
import { useSubscription } from "@/lib/subscription-context";
import { PAIRS } from "@/lib/pairs";
import { generateMockSignal } from "@/lib/generate-signal";
import { TradingSignal } from "@/lib/types";
import SignalCard from "@/components/SignalCard";
import SubscriptionModal from "@/components/SubscriptionModal";
import { Sparkles, Loader2, Lock } from "lucide-react";

export default function HomePage() {
  const { subscription, isLoaded } = useSubscription();

  const [pair, setPair] = useState(PAIRS[0]);
  const [signal, setSignal] = useState<TradingSignal | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const hasSignalAccess =
    subscription.plan.toLowerCase() !== "free" &&
    subscription.status.toLowerCase() === "active";

  const handleGenerate = () => {
    if (!isLoaded || loading) return;

    // Free users and inactive/expired subscriptions cannot generate signals.
    if (!hasSignalAccess) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    setSignal(null);

    // Simulated latency — replace with your real signal API call.
    setTimeout(() => {
      setSignal(generateMockSignal(pair));
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-1 flex items-center gap-2">
         

          <h2 className="text-xl font-semibold text-slate-800">
            Generate Trading Signal
          </h2>
        </div>

        <p className="mb-6 text-sm text-slate-500">
          Select a pair and let AI generate a fresh trading signal.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            disabled={!isLoaded || loading}
            className="flex-1 rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {PAIRS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading || !isLoaded}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              hasSignalAccess
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-slate-700 hover:bg-slate-800"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : !isLoaded ? (
              "Checking subscription..."
            ) : hasSignalAccess ? (
              <>
               
                Generate Signal
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Subscribe to Generate
              </>
            )}
          </button>
        </div>

        {isLoaded && !hasSignalAccess && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm font-medium text-amber-800">
              Subscription required
            </p>

            <p className="mt-1 text-xs text-amber-700">
              Your current plan is{" "}
              <span className="font-semibold capitalize">
                {subscription.plan}
              </span>
              . Subscribe to generate trading signals.
            </p>
          </div>
        )}

        {isLoaded && hasSignalAccess && (
          <p className="mt-3 text-xs text-emerald-600">
           Subscription active. You can generate trading signals.
          </p>
        )}
      </div>

      {signal && <SignalCard signal={signal} />}

      {!signal && !loading && (
        <div className="rounded-2xl border border-dashed border-blue-200 p-10 text-center">
          {!isLoaded ? (
            <p className="text-sm text-slate-400">
              Checking your subscription...
            </p>
          ) : hasSignalAccess ? (
            <p className="text-sm text-slate-400">
              Your generated signal will appear here.
            </p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>

              <p className="text-sm font-medium text-slate-600">
                Trading signals are a Premium feature.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Subscribe to unlock signal generation.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                View Subscription
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <SubscriptionModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

