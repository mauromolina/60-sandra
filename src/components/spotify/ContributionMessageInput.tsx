"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SpotifyEmbed } from "./SpotifyEmbed";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import { useCelebrantName } from "@/contexts/CelebrantContext";
import { withName } from "@/lib/utils/copyUtils";
import type { SpotifyTrack, SongContributionInput } from "@/lib/types/Song";

interface ContributionMessageInputProps {
  track: SpotifyTrack;
  onSubmit: (data: SongContributionInput) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ContributionMessageInput = ({
  track,
  onSubmit,
  onCancel,
  isSubmitting,
}: ContributionMessageInputProps) => {
  const celebrantName = useCelebrantName();
  const [contributorName, setContributorName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!contributorName.trim()) return;

    await onSubmit({
      spotifyTrackId: track.id,
      trackName: track.name,
      artistName: track.artist,
      albumImageUrl: track.albumImageUrl,
      previewUrl: track.previewUrl,
      contributorName: contributorName.trim(),
      message: message.trim() || null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Selected track header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {track.albumImageUrl && (
            <img
              src={track.albumImageUrl}
              alt={track.name}
              className="w-10 h-10 rounded-md object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0 text-left">
            <p className="font-sans text-sm text-charcoal font-medium truncate">
              {track.name}
            </p>
            <p className="font-sans text-xs text-warm-gray truncate">
              {track.artist}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-1 text-warm-gray hover:text-charcoal transition-colors flex-shrink-0 ml-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Spotify embed player */}
      <SpotifyEmbed trackId={track.id} />

      {/* Contributor name */}
      <input
        placeholder={COPY.spotify.contributorPlaceholder}
        value={contributorName}
        onChange={(e) => setContributorName(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder:text-warm-gray focus:border-spotify-green focus:outline-none focus:ring-1 focus:ring-spotify-green transition-colors"
      />

      {/* Message textarea */}
      <textarea
        placeholder={withName(COPY.spotify.messagePlaceholder, celebrantName)}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder:text-warm-gray focus:border-spotify-green focus:outline-none focus:ring-1 focus:ring-spotify-green transition-colors resize-none"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!contributorName.trim() || isSubmitting}
        className="w-full rounded-full bg-spotify-green py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-spotify-green-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
        ) : (
          COPY.spotify.submitButton
        )}
      </button>
    </div>
  );
};
