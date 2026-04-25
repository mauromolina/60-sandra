"use client";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { ContributedSong } from "@/lib/types/Song";

interface ContributedSongListProps {
  songs: ContributedSong[];
  isLoading: boolean;
}

export const ContributedSongList = ({ songs, isLoading }: ContributedSongListProps) => {
  return (
    <div className="mt-12 max-w-md mx-auto">
      <h4 className="font-serif text-xl text-charcoal mb-6">
        {COPY.spotify.contributedTitle}
      </h4>

      {isLoading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && songs.length === 0 && (
        <p className="font-sans text-sm text-warm-gray italic">
          {COPY.spotify.emptyState}
        </p>
      )}

      {songs.length > 0 && (
        <div className="space-y-3">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-gold/5"
            >
              {song.albumImageUrl && (
                <img
                  src={song.albumImageUrl}
                  alt={song.trackName}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1 text-left">
                <p className="font-sans text-sm text-charcoal truncate">
                  {song.trackName}
                </p>
                <p className="font-sans text-xs text-warm-gray truncate">
                  {song.artistName}
                </p>
                {song.message && (
                  <p className="font-sans text-xs text-charcoal-light italic mt-1 truncate">
                    &ldquo;{song.message}&rdquo;
                  </p>
                )}
                <p className="font-sans text-[10px] text-warm-gray mt-0.5">
                  — {song.contributorName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
