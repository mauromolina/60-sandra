"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Trash2, ChevronLeft, ChevronRight, Music } from "lucide-react";
import { SpotifyEmbed } from "./SpotifyEmbed";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { ContributedSong } from "@/lib/types/Song";

interface ContributedSongListProps {
  songs: ContributedSong[];
  isLoading: boolean;
  ownedSongIds: Set<string>;
  onDelete: (id: string) => Promise<void>;
  isDeleting: string | null;
}

export const ContributedSongList = ({
  songs,
  isLoading,
  ownedSongIds,
  onDelete,
  isDeleting,
}: ContributedSongListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    }
    checkScroll();
  }, [songs, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8">
      <h4 className="font-serif text-xl text-charcoal text-center mb-6">
        {COPY.spotify.contributedTitle}
      </h4>

      {isLoading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && songs.length === 0 && (
        <p className="font-sans text-sm text-warm-gray italic text-center">
          {COPY.spotify.emptyState}
        </p>
      )}

      {songs.length > 0 && (
        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-2 scrollbar-hide"
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="w-[calc(100vw-3.5rem)] md:w-72 flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-md bg-white"
              >
                {/* Album art hero */}
                <div className="relative h-40 bg-charcoal">
                  {song.albumImageUrl ? (
                    <img
                      src={song.albumImageUrl}
                      alt={song.trackName}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="h-12 w-12 text-warm-gray" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Song info over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-sans text-base font-semibold text-white leading-tight truncate">
                      {song.trackName}
                    </p>
                    <p className="font-sans text-sm text-white/70 truncate">
                      {song.artistName}
                    </p>
                  </div>
                  {/* Green accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-spotify-green" />
                  {/* Delete button */}
                  {ownedSongIds.has(song.id) && (
                    <button
                      onClick={() => onDelete(song.id)}
                      disabled={isDeleting === song.id}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-red-500/80 hover:text-white transition-colors disabled:opacity-50"
                      aria-label={`Quitar ${song.trackName}`}
                    >
                      {isDeleting === song.id ? (
                        <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Message & contributor */}
                <div className="px-4 py-3">
                  {song.message && (
                    <p className="font-sans text-sm text-charcoal-light italic leading-snug line-clamp-2">
                      &ldquo;{song.message}&rdquo;
                    </p>
                  )}
                  <p className="font-sans text-xs text-warm-gray mt-1">
                    — {song.contributorName}
                  </p>
                </div>

                {/* Spotify embed */}
                <div className="px-3 pb-3">
                  <SpotifyEmbed trackId={song.spotifyTrackId} />
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          {songs.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className="w-1.5 h-1.5 rounded-full bg-charcoal/20"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
