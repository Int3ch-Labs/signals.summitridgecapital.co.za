"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/SideBar";
import Navbar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { SubscriptionProvider } from "@/lib/subscription-context";

const TITLES: Record<string, string> = {
  "/dashboard": "Home",
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/profile": "Profile & Security",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const title = TITLES[pathname] ?? "Dashboard";

  return (
    <ProtectedRoute>
      <SubscriptionProvider>
        <div className="flex h-screen bg-blue-50/40">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <Navbar
              title={title}
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </SubscriptionProvider>
    </ProtectedRoute>
  );
}