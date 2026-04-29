"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { ContributedSong } from "@/lib/types/Song";

export default function AdminSongsPage() {
  const [songs, setSongs] = useState<ContributedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const didFetch = useRef(false);

  const fetchSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/songs");
      const data = await response.json();
      setSongs(data.data ?? []);
    } catch {
      setSongs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/songs");
        const data = await response.json();
        setSongs(data.data ?? []);
      } catch {
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteSong = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch("/api/songs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch {
      await fetchSongs();
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-white rounded-xl p-4 border border-gold/10 flex items-center gap-4"
        >
          {song.albumImageUrl && (
            <img
              src={song.albumImageUrl}
              alt={song.trackName}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-medium text-charcoal truncate">
              {song.trackName}
            </p>
            <p className="font-sans text-xs text-warm-gray truncate">
              {song.artistName}
            </p>
            <p className="font-sans text-xs text-charcoal-light mt-1">
              De: {song.contributorName}
            </p>
            {song.message && (
              <p className="font-sans text-xs text-charcoal-light italic mt-1">
                &ldquo;{song.message}&rdquo;
              </p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => deleteSong(song.id)}
            disabled={deletingId === song.id}
            className="text-xs h-7 px-2 border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
          >
            {deletingId === song.id ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Trash2 className="h-3 w-3 mr-1" />
                {COPY.admin.delete}
              </>
            )}
          </Button>
        </div>
      ))}

      {songs.length === 0 && (
        <p className="text-center font-sans text-sm text-warm-gray py-8">
          No hay canciones todavía.
        </p>
      )}
    </div>
  );
}
