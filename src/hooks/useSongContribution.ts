"use client";

import { useState, useCallback } from "react";
import type { SongContributionInput } from "@/lib/types/Song";

interface SongContributionResult {
  submit: (data: SongContributionInput) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

export const useSongContribution = (): SongContributionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(async (data: SongContributionInput): Promise<void> => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);
    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit song");
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Submission failed"));
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSuccess(false);
    setError(null);
  }, []);

  return { submit, isSubmitting, isSuccess, error, reset };
};
