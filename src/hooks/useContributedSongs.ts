"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ContributedSong } from "@/lib/types/Song";

interface ContributedSongsResult {
  songs: ContributedSong[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useContributedSongs = (): ContributedSongsResult => {
  const [songs, setSongs] = useState<ContributedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const didFetch = useRef(false);

  const refresh = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");
      const data = await response.json();
      setSongs(data.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Fetch failed"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch("/api/songs", { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to fetch songs");
        const data = await response.json();
        setSongs(data.data ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error("Fetch failed"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return { songs, isLoading, error, refresh };
};
