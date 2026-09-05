"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/ErrorModal";
import { useErrorModal } from "@/hooks/useErrorModal";

const API_URL = "http://localhost:8000/api";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { error, showError, clearError } = useErrorModal();
  const [success, setSuccess] = useState("");

  const [countdown, setCountdown] = useState(45);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("signup_email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((current) => current - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const nextOtp = [...otp];
    nextOtp[index] = digit;

    setOtp(nextOtp);
    setSuccess("");

    if (digit && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const nextOtp = [...otp];
    pasted.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);

    const nextIndex = Math.min(pasted.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      showError("Enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Something went wrong. Please try again.");
      }

      sessionStorage.removeItem("signup_email");
      router.push("/dashboard/subscriptions");
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Unable to verify your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;

    setResending(true);
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Unable to resend the verification code.");
      }

      setCountdown(45);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();

      setSuccess("A new verification code has been sent.");
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Unable to resend the code. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(
        /^(.{2})(.*)(@.*)$/,
        (_, firstTwo, middle, domain) =>
          `${firstTwo}${"*".repeat(Math.min(middle.length, 6))}${domain}`
      )
    : "your email address";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <path d="M4 7.5C4 6.67 4.67 6 5.5 6h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13C4.67 18 4 17.33 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Account verification
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
              Check your email
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-slate-700">{maskedEmail}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex justify-center gap-2 sm:gap-3" aria-label="Verification code">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                  aria-label={`Verification digit ${index + 1}`}
                  className="h-12 w-11 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:h-14 sm:w-12"
                />
              ))}
            </div>

            {success && (
              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying...
                </span>
              ) : (
                "Verify my account"
              )}
            </button>
          </form>

          <div className="mt-7 text-center">
            <p className="text-sm text-slate-500">Didn&apos;t receive the code?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || resending}
              className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              {resending
                ? "Sending new code..."
                : countdown > 0
                ? `Resend code in ${countdown}s`
                : "Resend verification code"}
            </button>
          </div>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <p className="text-xs leading-5 text-slate-400">
              Check your spam or junk folder if you don&apos;t see the email.
              Make sure you entered the correct email address.
            </p>
            <Link href="/signup" className="mt-3 inline-block text-xs font-semibold text-slate-500 transition hover:text-blue-600">
              ← Use a different email
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Summit Ridge Capital. All rights reserved.
        </p>
      </div>

      <ErrorModal
        open={!!error}
        title={error?.title}
        message={error?.message ?? ""}
        onClose={clearError}
      />
    </main>
  );
}