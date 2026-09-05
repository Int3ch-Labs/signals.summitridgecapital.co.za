"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <img
              src="/logo.jpg"
              alt="Summit Ridge Capital"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="leading-none">
            <div className="text-sm font-bold tracking-tight text-slate-950">
              Summit Ridge Capital
            </div>

           
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-3 py-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {open ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6L18 18" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6H20" />
              <path d="M4 12H20" />
              <path d="M4 18H20" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {[
              ["Home", "/"],
              ["Pricing", "/pricing"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}