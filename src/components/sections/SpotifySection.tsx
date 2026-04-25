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

export const SpotifySection = () => {
  const search = useSongSearch();
  const contribution = useSongContribution();
  const contributed = useContributedSongs();
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center bg-cream-dark/50"
    >
      <SectionLabel>{COPY.spotify.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-6" />

      <div className="max-w-md mx-auto">
        <Music className="h-8 w-8 text-gold mx-auto mb-4" />
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
          {COPY.spotify.title}
        </h3>
        <p className="font-sans text-sm text-charcoal-light mb-8">
          {COPY.spotify.subtitle}
        </p>

        {contribution.isSuccess ? (
          <div className="py-8">
            <p className="font-serif text-xl text-sage italic">
              {COPY.spotify.successMessage}
            </p>
            <button
              onClick={() => {
                contribution.reset();
                search.clearSelection();
                contributed.refresh();
              }}
              className="mt-4 font-sans text-sm text-gold underline underline-offset-4 hover:text-gold-light transition-colors"
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
          <p className="font-sans text-sm text-red-600 mt-4">
            {contribution.error.message}
          </p>
        )}
      </div>

      <ContributedSongList
        songs={contributed.songs}
        isLoading={contributed.isLoading}
      />
    </motion.section>
  );
};
