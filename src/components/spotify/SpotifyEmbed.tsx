"use client";

interface SpotifyEmbedProps {
  trackId: string;
}

export const SpotifyEmbed = ({ trackId }: SpotifyEmbedProps) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      width="100%"
      height="80"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl border-0"
      title="Spotify preview"
    />
  );
};
