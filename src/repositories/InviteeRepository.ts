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

  async create(data: {
    slug: string;
    displayName: string;
    celebrantAlias?: string;
    allowsCompanion: boolean;
    guestCount: number;
  }): Promise<Invitee> {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data: row, error } = await supabase
      .from("invitees")
      .insert({
        slug: data.slug,
        display_name: data.displayName,
        celebrant_alias: data.celebrantAlias || null,
        allows_companion: data.allowsCompanion,
        guest_count: data.guestCount,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapRowToInvitee(row);
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
  guestCount: (row.guest_count as number) ?? 1,
});
