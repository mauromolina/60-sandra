import { createClient } from "@/lib/supabase/client";
import type { Invitee } from "@/lib/types/Invitee";

export const InviteeRepository = {
  async findBySlug(slug: string): Promise<Invitee | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invitees")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    return mapRowToInvitee(data);
  },

  async getAll(): Promise<Invitee[]> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("invitees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToInvitee);
  },
};

const mapRowToInvitee = (row: Record<string, unknown>): Invitee => ({
  slug: row.slug as string,
  displayName: row.display_name as string,
  celebrantAlias: (row.celebrant_alias as string) || undefined,
  allowsCompanion: (row.allows_companion as boolean) ?? false,
});
