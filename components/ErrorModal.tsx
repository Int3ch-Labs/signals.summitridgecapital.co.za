"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  title?: string;
  message: string;
  actionLabel?: string;
  onClose: () => void;
}

export default function ErrorModal({
  open,
  title = "Something went wrong",
  message,
  actionLabel = "OK",
  onClose,
}: ErrorModalProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  // Mount/unmount with a small delay so the exit transition can play
  useEffect(() => {
    if (open) {
      setRendered(true);
      // next tick, so the enter transition actually animates from 0
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setRendered(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Autofocus the OK button once it's visible
  useEffect(() => {
    if (visible) okButtonRef.current?.focus();
  }, [visible]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!rendered) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-message"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
        visible ? "bg-slate-900/50 backdrop-blur-sm opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl transition-all duration-150 sm:p-7 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <h2
          id="error-modal-title"
          className="text-lg font-semibold text-slate-800"
        >
          {title}
        </h2>
        <p
          id="error-modal-message"
          className="mt-2 text-sm leading-relaxed text-slate-500"
        >
          {message}
        </p>

        <button
          ref={okButtonRef}
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}