"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SongSearchInput } from "@/components/spotify/SongSearchInput";
import { SongResultList } from "@/components/spotify/SongResultList";
import { ContributionMessageInput } from "@/components/spotify/ContributionMessageInput";
import { ContributedSongList } from "@/components/spotify/ContributedSongList";
import { useSongSearch } from "@/hooks/useSongSearch";
import { useSongContribution } from "@/hooks/useSongContribution";
import { useContributedSongs } from "@/hooks/useContributedSongs";
import { COPY } from "@/lib/constants/copy";
import { useCelebrantName } from "@/contexts/CelebrantContext";
import { withName } from "@/lib/utils/copyUtils";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export const SpotifySection = () => {
  const celebrantName = useCelebrantName();
  const search = useSongSearch();
  const contributed = useContributedSongs();
  const contribution = useSongContribution({
    onSuccess: contributed.refresh,
  });
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
      className="py-16 px-4 text-center bg-background"
    >
      <SectionLabel>{COPY.spotify.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-6" />

      <div className="max-w-md mx-auto mb-10">
        <Music className="h-7 w-7 text-gold mx-auto mb-4 opacity-60" />
        <h3 className="font-display text-3xl md:text-4xl text-charcoal mb-3 italic">
          {withName(COPY.spotify.sectionTitle, celebrantName)}
        </h3>
        <p className="font-sans text-sm text-charcoal-light leading-relaxed">
          {COPY.spotify.subtitle}
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-3xl px-6 py-10 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8 text-spotify-green">
          <SpotifyIcon />
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-spotify-green">
            {COPY.spotify.title}
          </h3>
        </div>

        {contribution.isSuccess ? (
          <div className="py-8 text-center">
            <p className="font-serif text-xl text-spotify-green italic">
              {COPY.spotify.successMessage}
            </p>
            <button
              onClick={() => {
                contribution.reset();
                search.clearSelection();
                contributed.refresh();
              }}
              className="mt-4 font-sans text-sm text-spotify-green underline underline-offset-4 hover:text-spotify-green-hover transition-colors"
            >
              Dedicar otra canción
            </button>
          </div>
        ) : (
          <>
            {!search.selectedTrack && (
              <>
                <SongSearchInput
                  query={search.query}
                  onQueryChange={search.setQuery}
                  isLoading={search.isLoading}
                />
                <SongResultList
                  results={search.results}
                  onSelect={search.selectTrack}
                />
              </>
            )}

            {search.selectedTrack && (
              <ContributionMessageInput
                track={search.selectedTrack}
                onSubmit={contribution.submit}
                onCancel={search.clearSelection}
                isSubmitting={contribution.isSubmitting}
              />
            )}
          </>
        )}

        {contribution.error && (
          <p className="font-sans text-sm text-red-600 mt-4 text-center">
            {contribution.error.message}
          </p>
        )}
      </div>

      <ContributedSongList
        songs={contributed.songs}
        isLoading={contributed.isLoading}
        ownedSongIds={contributed.ownedSongIds}
        onDelete={contributed.deleteSong}
        isDeleting={contributed.isDeleting}
      />
    </motion.section>
  );
};
