"use client";

import { Plus } from "lucide-react";
import type { SpotifyTrack } from "@/lib/types/Song";

interface SongResultItemProps {
  track: SpotifyTrack;
  onSelect: (track: SpotifyTrack) => void;
}

export const SongResultItem = ({ track, onSelect }: SongResultItemProps) => {
  return (
    <div className="flex items-center gap-3 w-full px-3 py-3 hover:bg-gray-50 transition-colors">
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={track.name}
          className="w-12 h-12 rounded-md object-cover flex-shrink-0"
        />
      )}
      <div className="min-w-0 flex-1 text-left">
        <p className="font-sans text-sm font-medium text-charcoal truncate">
          {track.name}
        </p>
        <p className="font-sans text-xs text-warm-gray truncate">
          {track.artist}
        </p>
      </div>
      <button
        onClick={() => onSelect(track)}
        className="flex-shrink-0 w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center hover:bg-spotify-green-hover transition-colors"
        aria-label={`Agregar ${track.name}`}
      >
        <Plus className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};
