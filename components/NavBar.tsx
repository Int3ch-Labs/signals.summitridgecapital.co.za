"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import NotificationsMenu from "@/components/NotificationsMenu";
import { useUser } from "@/contexts/UserContext";

export default function Navbar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const { user, loading } = useUser();

  const getInitials = () => {
    if (!user) return "U";

    const first = user.first_name?.trim() || "";
    const last = user.last_name?.trim() || "";

    if (first && last) {
      return `${first[0]}${last[0]}`.toUpperCase();
    }

    if (first) return first[0].toUpperCase();
    if (last) return last[0].toUpperCase();

    return user.email?.[0]?.toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (!user) return "User";

    if (user.first_name) {
      return user.first_name;
    }

    if (user.username) {
      return user.username;
    }

    return user.email.split("@")[0];
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-blue-100 bg-white/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-blue-700 transition hover:bg-blue-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <NotificationsMenu />

        <button
          type="button"
          onClick={() => router.push("/dashboard/profile")}
          className="group flex items-center gap-2 rounded-full bg-blue-50 py-1 pl-1 pr-3 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open profile"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm">
            {loading ? (
              <div className="h-4 w-4 animate-pulse rounded-full bg-blue-300" />
            ) : (
              getInitials()
            )}
          </div>

          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {loading ? "Loading..." : getDisplayName()}
          </span>
        </button>
      </div>
    </header>
  );
}