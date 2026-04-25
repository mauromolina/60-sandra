"use client";

import type { SpotifyTrack } from "@/lib/types/Song";

interface SongResultItemProps {
  track: SpotifyTrack;
  onSelect: (track: SpotifyTrack) => void;
}

export const SongResultItem = ({ track, onSelect }: SongResultItemProps) => {
  return (
    <button
      onClick={() => onSelect(track)}
      className="flex items-center gap-3 w-full p-3 text-left rounded-lg hover:bg-gold/5 transition-colors"
    >
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={track.name}
          className="w-10 h-10 rounded object-cover flex-shrink-0"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-sans text-sm text-charcoal truncate">{track.name}</p>
        <p className="font-sans text-xs text-warm-gray truncate">{track.artist}</p>
      </div>
    </button>
  );
};
