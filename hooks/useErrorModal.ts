"use client";

import { useState, useCallback } from "react";

export function useErrorModal() {
  const [error, setError] = useState<{ title?: string; message: string } | null>(
    null
  );

  const showError = useCallback((message: string, title?: string) => {
    setError({ message, title });
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { error, showError, clearError };
}