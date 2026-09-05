"use client";

import { useEffect, useState } from "react";
import { useSubscription } from "@/lib/subscription-context";
import { Check, Loader2, ShieldCheck } from "lucide-react";

const API_URL = "http://localhost:8000/api";

type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  signal_limit: number | null;
};

export default function SubscriptionsPage() {
  const {
    subscription,
    refreshSubscription,
    isLoaded,
  } = useSubscription();

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);

  const [currency, setCurrency] = useState<"USD" | "ZAR">("USD");
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setPlansLoading(true);
        setPlansError(null);

        const response = await fetch(`${API_URL}/subscriptions/plans`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load subscription plans.");
        }

        const data: SubscriptionPlan[] = await response.json();

        setPlans(data);
      } catch (error) {
        console.error("Failed to load plans:", error);
        setPlansError("Unable to load subscription plans.");
      } finally {
        setPlansLoading(false);
      }
    };

    loadPlans();
  }, []);

  const currentPlanId = subscription.plan?.toLowerCase() || "free";

  const isSubscriptionActive =
    subscription.status?.toLowerCase() === "active";

  const hasPaidSubscription =
    isSubscriptionActive && currentPlanId !== "free";

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;

    setBusyPlan(planId);

    try {
      const response = await fetch(`${API_URL}/subscriptions/upgrade`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to update subscription."
        );
      }

      await refreshSubscription();
    } catch (error) {
      console.error("Subscription error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update subscription."
      );
    } finally {
      setBusyPlan(null);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const response = await fetch(
        `${API_URL}/subscriptions/downgrade`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to cancel subscription."
        );
      }

      await refreshSubscription();
    } catch (error) {
      console.error("Cancellation error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to cancel subscription."
      );
    } finally {
      setCancelling(false);
    }
  };

  const getPrice = (plan: SubscriptionPlan) => {
    if (currency === plan.currency) {
      return plan.price;
    }

    // Temporary conversion until proper pricing/currency
    // is supplied by the billing provider.
    if (currency === "USD" && plan.currency === "ZAR") {
      return Number((plan.price / 17).toFixed(2));
    }

    return plan.price;
  };

  const getCurrencySymbol = () => {
    return currency === "USD" ? "$" : "R";
  };

  const getSignalText = (plan: SubscriptionPlan) => {
    if (plan.signal_limit === null) {
      return "Unlimited signals";
    }

    if (plan.signal_limit === 0) {
      return "No trading signals";
    }

    return `${plan.signal_limit} signals per day`;
  };

  const isFeatured = (plan: SubscriptionPlan) => {
    return plan.id === "premium";
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Current subscription */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Current Plan
              </p>

              <p className="text-lg font-semibold text-slate-800">
                {!isLoaded
                  ? "Loading..."
                  : hasPaidSubscription
                  ? subscription.plan
                  : "Free"}
              </p>

              {isLoaded && (
                <p className="mt-0.5 text-xs text-slate-400">
                  {isSubscriptionActive
                    ? "Subscription active"
                    : "Subscription inactive"}
                </p>
              )}

              {isLoaded && subscription.expires_at && (
                <p className="mt-0.5 text-xs text-slate-400">
                  Expires on{" "}
                  {new Date(
                    subscription.expires_at
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {isLoaded && hasPaidSubscription && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              {cancelling && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {cancelling
                ? "Cancelling..."
                : "Cancel Subscription"}
            </button>
          )}
        </div>
      </div>

      {/* Currency toggle */}
      <div className="flex items-center justify-center gap-2">
        <div className="inline-flex rounded-xl bg-blue-50 p-1">
          {(["USD", "ZAR"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                currency === c
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-blue-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {plansLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-slate-500">
            Loading subscription plans...
          </span>
        </div>
      )}

      {/* Error */}
      {!plansLoading && plansError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-700">
            {plansError}
          </p>

          <p className="mt-1 text-xs text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      )}

      {/* Pricing */}
      {!plansLoading && !plansError && (
        <div className="grid gap-6 md:grid-cols-3">
          {plans
            .filter((plan) => plan.id !== "free")
            .map((plan) => {
              const isCurrent =
                isSubscriptionActive &&
                currentPlanId === plan.id;

              const price = getPrice(plan);

              const featured = isFeatured(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow ${
                    featured
                      ? "border-blue-600 shadow-xl shadow-blue-100 md:-translate-y-2"
                      : "border-blue-100 shadow-sm"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-slate-800">
                    {plan.name}
                  </h3>

                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">
                      {getCurrencySymbol()}
                      {price}
                    </span>

                    <span className="text-sm text-slate-400">
                      /{plan.interval}
                    </span>
                  </p>

                  <p className="mt-3 flex-1 text-sm text-slate-500">
                    {plan.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                      <Check className="h-4 w-4 shrink-0" />
                      {getSignalText(plan)}
                    </div>

                    {plan.features
                      .filter(
                        (feature) =>
                          !feature
                            .toLowerCase()
                            .includes("signals")
                      )
                      .map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <Check className="h-4 w-4 shrink-0 text-blue-500" />
                          {feature}
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={
                      isCurrent || busyPlan === plan.id
                    }
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-70 ${
                      isCurrent
                        ? "cursor-default bg-emerald-50 text-emerald-600"
                        : featured
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {busyPlan === plan.id && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}

                    {isCurrent
                      ? "Current Plan"
                      : hasPaidSubscription
                      ? "Switch Plan"
                      : "Subscribe"}
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {/* Free plan information */}
      {!plansLoading && !plansError && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-700">
            Free Plan
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Free accounts can access the dashboard, but trading
            signal generation requires a paid subscription.
          </p>
        </div>
      )}
    </div>
  );
}

