"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL = "http://localhost:8000/api";

export type Subscription = {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  started_at: string;
  expires_at: string | null;
  auto_renew: boolean;
};

type SubscriptionContextType = {
  subscription: Subscription;
  isLoaded: boolean;
  refreshSubscription: () => Promise<void>;
};

const defaultSubscription: Subscription = {
  id: "",
  user_id: "",
  plan: "free",
  status: "active",
  started_at: "",
  expires_at: null,
  auto_renew: false,
};

const SubscriptionContext =
  createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [subscription, setSubscription] =
    useState<Subscription>(defaultSubscription);

  const [isLoaded, setIsLoaded] = useState(false);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setSubscription(defaultSubscription);
        return;
      }

      const data: Subscription = await response.json();

      setSubscription(data);
    } catch (error) {
      console.error("Failed to load subscription:", error);
      setSubscription(defaultSubscription);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoaded,
        refreshSubscription: fetchSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used inside SubscriptionProvider"
    );
  }

  return {
    ...context,
    subscription: {
      ...context.subscription,
      active:
        context.subscription.status === "active" &&
        context.subscription.plan !== "free",
    },
  };
}

