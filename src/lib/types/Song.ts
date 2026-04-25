export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  albumImageUrl: string | null;
  previewUrl: string | null;
  durationMs: number;
}

export type ContributionStatus = "pending" | "approved" | "rejected";

export interface ContributedSong {
  id: string;
  spotifyTrackId: string;
  trackName: string;
  artistName: string;
  albumImageUrl: string | null;
  previewUrl: string | null;
  contributorName: string;
  message: string | null;
  status: ContributionStatus;
  createdAt: string;
}

export interface SongContributionInput {
  spotifyTrackId: string;
  trackName: string;
  artistName: string;
  albumImageUrl: string | null;
  previewUrl: string | null;
  contributorName: string;
  message: string | null;
}
