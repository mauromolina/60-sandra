"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import type { SpotifyTrack } from "@/lib/types/Song";

const DEBOUNCE_DELAY = 400;
const MIN_QUERY_LENGTH = 2;

interface SongSearchResult {
  query: string;
  setQuery: (q: string) => void;
  results: SpotifyTrack[];
  isLoading: boolean;
  error: Error | null;
  selectedTrack: SpotifyTrack | null;
  selectTrack: (track: SpotifyTrack) => void;
  clearSelection: () => void;
}

export const useSongSearch = (): SongSearchResult => {
  const [query, setQuery] = useState("");
  const [fetchedResults, setFetchedResults] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);
  const isQueryValid = debouncedQuery.length >= MIN_QUERY_LENGTH;

  const results = useMemo(
    () => (isQueryValid ? fetchedResults : []),
    [isQueryValid, fetchedResults]
  );

  useEffect(() => {
    if (!isQueryValid) return;

    const controller = new AbortController();
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q: debouncedQuery });
        const response = await fetch(`/api/spotify/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setFetchedResults(data.data ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error("Search failed"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [debouncedQuery, isQueryValid]);

  const selectTrack = useCallback((track: SpotifyTrack) => {
    setSelectedTrack(track);
    setFetchedResults([]);
    setQuery("");
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTrack(null);
  }, []);

  return { query, setQuery, results, isLoading, error, selectedTrack, selectTrack, clearSelection };
};
