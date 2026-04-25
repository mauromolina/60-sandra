import type { SpotifyTrack } from "@/lib/types/Song";

export interface ISpotifyService {
  searchTracks(query: string, limit?: number): Promise<SpotifyTrack[]>;
  getTrackById(id: string): Promise<SpotifyTrack | null>;
}
