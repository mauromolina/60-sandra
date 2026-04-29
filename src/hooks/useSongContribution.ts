"use client";

import { useState, useCallback } from "react";
import type { SongContributionInput } from "@/lib/types/Song";

const STORAGE_KEY = "contributed_song_ids";

interface UseSongContributionOptions {
  onSuccess?: () => void;
}

interface SongContributionResult {
  submit: (data: SongContributionInput) => Promise<void>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

export const useSongContribution = (
  options?: UseSongContributionOptions
): SongContributionResult => {
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
      const result = await response.json();
      if (result.data?.id) {
        const stored: string[] = JSON.parse(
          localStorage.getItem(STORAGE_KEY) ?? "[]"
        );
        stored.push(result.data.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      }
      setIsSuccess(true);
      options?.onSuccess?.();
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
