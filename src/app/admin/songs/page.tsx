"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { ContributedSong, ContributionStatus } from "@/lib/types/Song";

export default function AdminSongsPage() {
  const [songs, setSongs] = useState<ContributedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const updateStatus = async (id: string, status: ContributionStatus) => {
    await fetch(`/api/songs`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchSongs();
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
          <div className="flex flex-col gap-2 flex-shrink-0">
            <span
              className={`font-sans text-[10px] px-2 py-0.5 rounded-full text-center ${
                song.status === "approved"
                  ? "bg-sage/10 text-sage-dark"
                  : song.status === "rejected"
                    ? "bg-red-50 text-red-600"
                    : "bg-gold/10 text-gold"
              }`}
            >
              {song.status === "approved"
                ? COPY.admin.approved
                : song.status === "rejected"
                  ? COPY.admin.rejected
                  : COPY.admin.pending}
            </span>
            {song.status === "pending" && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={() => updateStatus(song.id, "approved")}
                  className="bg-sage hover:bg-sage-dark text-white text-xs h-7 px-2"
                >
                  {COPY.admin.approve}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(song.id, "rejected")}
                  className="text-xs h-7 px-2 border-red-200 text-red-600 hover:bg-red-50"
                >
                  {COPY.admin.reject}
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      {songs.length === 0 && (
        <p className="text-center font-sans text-sm text-warm-gray py-8">
          No hay canciones todavia.
        </p>
      )}
    </div>
  );
}
