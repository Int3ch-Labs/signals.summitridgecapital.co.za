"use client";

import { useRouter } from "next/navigation";
import { Lock, X } from "lucide-react";

export default function SubscriptionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
          <Lock className="h-6 w-6 text-blue-600" />
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Subscription Required
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          You need an active plan to generate trading signals. Choose a plan
          to unlock signal generation.
        </p>

        <button
          onClick={() => router.push("/dashboard/subscriptions")}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          View Plans
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full py-2 text-sm text-slate-400 hover:text-slate-600"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}