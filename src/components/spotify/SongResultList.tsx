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
    <div className="mt-3 max-h-64 overflow-y-auto rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
      {results.map((track) => (
        <SongResultItem key={track.id} track={track} onSelect={onSelect} />
      ))}
    </div>
  );
};
