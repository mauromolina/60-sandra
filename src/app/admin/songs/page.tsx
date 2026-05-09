"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Trash2, Music } from "lucide-react";
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
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif italic text-lg text-charcoal">Playlist</h2>
        <span className="font-sans text-xs text-warm-gray bg-white px-3 py-1.5 rounded-lg border border-gold/10">
          {songs.length} {songs.length === 1 ? "canción" : "canciones"}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gold/10 shadow-sm shadow-gold/5 overflow-hidden divide-y divide-gold/8">
        {songs.map((song) => (
          <div
            key={song.id}
            className="px-5 py-4 flex items-center gap-4 hover:bg-cream/40 transition-colors"
          >
            {song.albumImageUrl ? (
              <img
                src={song.albumImageUrl}
                alt={song.trackName}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                <Music className="h-5 w-5 text-gold/40" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-medium text-charcoal truncate">
                {song.trackName}
              </p>
              <p className="font-sans text-xs text-warm-gray truncate">
                {song.artistName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-sans text-xs text-charcoal-light">
                  De: {song.contributorName}
                </span>
                {song.message && (
                  <>
                    <span className="text-gold/20">·</span>
                    <span className="font-sans text-xs text-warm-gray italic truncate">
                      &ldquo;{song.message}&rdquo;
                    </span>
                  </>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => deleteSong(song.id)}
              disabled={deletingId === song.id}
              className="text-xs h-8 px-3 rounded-lg border-red-200/60 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex-shrink-0 transition-all"
            >
              {deletingId === song.id ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  {COPY.admin.delete}
                </>
              )}
            </Button>
          </div>
        ))}

        {songs.length === 0 && (
          <div className="px-5 py-16 text-center">
            <Music className="h-8 w-8 text-warm-gray/30 mx-auto mb-3" />
            <p className="font-sans text-sm text-warm-gray">
              No hay canciones todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
