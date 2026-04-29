"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ContributedSong } from "@/lib/types/Song";

const STORAGE_KEY = "contributed_song_ids";

const readOwnedIds = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(STORAGE_KEY);
  return new Set<string>(stored ? JSON.parse(stored) : []);
};

interface ContributedSongsResult {
  songs: ContributedSong[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  ownedSongIds: Set<string>;
  deleteSong: (id: string) => Promise<void>;
  isDeleting: string | null;
}

export const useContributedSongs = (): ContributedSongsResult => {
  const [songs, setSongs] = useState<ContributedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [ownedSongIds, setOwnedSongIds] = useState<Set<string>>(() => readOwnedIds());
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const didFetch = useRef(false);

  const refresh = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setOwnedSongIds(readOwnedIds());
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

  const deleteSong = useCallback(async (id: string): Promise<void> => {
    setIsDeleting(id);
    try {
      const response = await fetch("/api/songs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete song");
      const stored: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      );
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(stored.filter((sid) => sid !== id))
      );
      setOwnedSongIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Delete failed"));
    } finally {
      setIsDeleting(null);
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

  return { songs, isLoading, error, refresh, ownedSongIds, deleteSong, isDeleting };
};
