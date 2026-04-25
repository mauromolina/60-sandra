"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
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
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-gold/10">
        {track.albumImageUrl && (
          <img
            src={track.albumImageUrl}
            alt={track.name}
            className="w-12 h-12 rounded object-cover flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1 text-left">
          <p className="font-sans text-sm text-charcoal font-medium truncate">
            {track.name}
          </p>
          <p className="font-sans text-xs text-warm-gray truncate">{track.artist}</p>
        </div>
        <button
          onClick={onCancel}
          className="p-1 text-warm-gray hover:text-charcoal transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <Input
        placeholder={COPY.spotify.contributorPlaceholder}
        value={contributorName}
        onChange={(e) => setContributorName(e.target.value)}
        className="bg-white/80 border-gold/20 focus:border-gold font-sans"
      />

      <Textarea
        placeholder={COPY.spotify.messagePlaceholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="bg-white/80 border-gold/20 focus:border-gold font-sans resize-none"
      />

      <Button
        onClick={handleSubmit}
        disabled={!contributorName.trim() || isSubmitting}
        className="w-full bg-gold hover:bg-gold-light text-white font-sans"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
        ) : (
          COPY.spotify.submitButton
        )}
      </Button>
    </div>
  );
};
