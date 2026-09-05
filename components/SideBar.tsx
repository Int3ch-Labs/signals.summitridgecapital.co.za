"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, LogOut, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();


const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Logout request failed");
      return;
    }

    router.push("/login");
    router.refresh();
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col border-r border-slate-200 bg-white text-slate-700 transition-transform duration-300 ease-in-out lg:static lg:z-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
              <Image
                src="/logo.jpg"
                alt="Summit Ridge Capital"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-800">
              Summit Ridge Capital
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-slate-100 p-4">
          <div className="rounded-xl bg-blue-50 p-4 text-xs text-slate-600">
            <p className="mb-1 font-medium text-slate-700">Need help?</p>
            <p className="text-slate-500">
              Contact support for signal or billing questions.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}