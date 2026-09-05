"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorModal from "@/components/ErrorModal";
import { useErrorModal } from "@/hooks/useErrorModal";

const API_URL = "http://localhost:8000/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { error, showError, clearError } = useErrorModal();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    } else {
      showError("This password reset link is invalid or missing its token.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      showError("This password reset link is invalid or missing its token.");
      return;
    }

    if (!password) {
      showError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      showError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showError("Your passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      let data: { detail?: string } = {};
      try {
        data = await response.json();
      } catch {
        // Response wasn't JSON
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to reset your password. Please try again."
        );
      }

      setSuccess(true);
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Unable to reset your password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
            <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
          Password updated
        </p>

        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
          You&apos;re all set.
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500">
          Your password has been successfully updated. You can now sign in to
          your Summit Ridge Capital account with your new password.
        </p>

        <Link
          href="/login"
          className="mt-7 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md"
        >
          Continue to login
        </Link>

        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-slate-500 transition hover:text-blue-600">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7.5C8 5.57 9.57 4 11.5 4h1C14.43 4 16 5.57 16 7.5V10" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Account security
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
            Create a new password
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Choose a strong password to secure your Summit Ridge Capital account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              New password
            </label>

            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Enter your new password"
                disabled={!token || submitting}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!token || submitting}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700 disabled:opacity-50"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4 9.5 7-0.4 1.2-1.3 2.5-2.5 3.6M6.2 6.2C4.5 7.4 3.4 9.2 2.5 12c1 3 4.5 7 9.5 7 1.7 0 3.2-.4 4.5-1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">Use at least 8 characters.</p>
          </div>

          <div className="mt-5">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
              Confirm new password
            </label>

            <div className="relative mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm your new password"
                disabled={!token || submitting}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={!token || submitting}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700 disabled:opacity-50"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !token || !password || !confirmPassword}
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Updating password...
              </span>
            ) : (
              "Update password"
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-6 text-center">
          <Link href="/login" className="text-sm font-semibold text-slate-500 transition hover:text-blue-600">
            ← Back to login
          </Link>
        </div>
      </div>

      <ErrorModal
        open={!!error}
        title={error?.title}
        message={error?.message ?? ""}
        onClose={clearError}
      />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500">Loading...</p>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          For your security, password reset links are temporary and should only
          be used by you.
        </p>

        <p className="mt-2 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Summit Ridge Capital. All rights reserved.
        </p>
      </div>
    </main>
  );
}