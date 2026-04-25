"use client";

import { SongResultItem } from "./SongResultItem";
import type { SpotifyTrack } from "@/lib/types/Song";

interface SongResultListProps {
  results: SpotifyTrack[];
  onSelect: (track: SpotifyTrack) => void;
}

export const SongResultList = ({ results, onSelect }: SongResultListProps) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-gold/10 bg-white/90 backdrop-blur-sm divide-y divide-gold/5">
      {results.map((track) => (
        <SongResultItem key={track.id} track={track} onSelect={onSelect} />
      ))}
    </div>
  );
};
