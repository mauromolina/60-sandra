import { createClient } from "@/lib/supabase/client";
import type { Photo } from "@/lib/types/Photo";

export const PhotoRepository = {
  async getApproved(): Promise<Photo[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("photo_uploads")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToPhoto);
  },

  async create(input: { storagePath: string; publicUrl: string; contributorName: string }): Promise<Photo> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("photo_uploads")
      .insert({
        storage_path: input.storagePath,
        public_url: input.publicUrl,
        contributor_name: input.contributorName,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapRowToPhoto(data);
  },

  async getAll(): Promise<Photo[]> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("photo_uploads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToPhoto);
  },

  async updateStatus(id: string, status: "approved" | "rejected"): Promise<void> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("photo_uploads")
      .update({ status })
      .eq("id", id);

    if (error) throw new Error(error.message);
  },
};

const mapRowToPhoto = (row: Record<string, unknown>): Photo => ({
  id: row.id as string,
  storagePath: row.storage_path as string,
  publicUrl: row.public_url as string,
  contributorName: row.contributor_name as string,
  status: row.status as Photo["status"],
  createdAt: row.created_at as string,
});
