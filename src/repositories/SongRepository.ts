import { createClient } from "@/lib/supabase/client";
import type { ContributedSong, SongContributionInput } from "@/lib/types/Song";

export const SongRepository = {
  async getApproved(): Promise<ContributedSong[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("song_contributions")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToSong);
  },

  async create(input: SongContributionInput): Promise<ContributedSong> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("song_contributions")
      .insert({
        spotify_track_id: input.spotifyTrackId,
        track_name: input.trackName,
        artist_name: input.artistName,
        album_image_url: input.albumImageUrl,
        preview_url: input.previewUrl,
        contributor_name: input.contributorName,
        message: input.message,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapRowToSong(data);
  },

  async getAll(): Promise<ContributedSong[]> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("song_contributions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToSong);
  },

  async updateStatus(id: string, status: "approved" | "rejected"): Promise<void> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("song_contributions")
      .update({ status })
      .eq("id", id);

    if (error) throw new Error(error.message);
  },
};

const mapRowToSong = (row: Record<string, unknown>): ContributedSong => ({
  id: row.id as string,
  spotifyTrackId: row.spotify_track_id as string,
  trackName: row.track_name as string,
  artistName: row.artist_name as string,
  albumImageUrl: (row.album_image_url as string) ?? null,
  previewUrl: (row.preview_url as string) ?? null,
  contributorName: row.contributor_name as string,
  message: (row.message as string) ?? null,
  status: row.status as ContributedSong["status"],
  createdAt: row.created_at as string,
});
