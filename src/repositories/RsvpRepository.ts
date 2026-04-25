import { createAdminClient } from "@/lib/supabase/admin";
import type { Rsvp, RsvpFormData } from "@/lib/types/Rsvp";

export const RsvpRepository = {
  async create(data: RsvpFormData, inviteeSlug?: string): Promise<Rsvp> {
    const supabase = createAdminClient();
    const { data: row, error } = await supabase
      .from("rsvps")
      .insert({
        invitee_slug: inviteeSlug ?? null,
        full_name: data.fullName,
        attending: data.attending,
        companions_count: data.companionsCount,
        dietary_restrictions: data.dietaryRestrictions || null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return mapRowToRsvp(row);
  },

  async getAll(): Promise<Rsvp[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRowToRsvp);
  },
};

const mapRowToRsvp = (row: Record<string, unknown>): Rsvp => ({
  id: row.id as string,
  inviteeSlug: (row.invitee_slug as string) ?? null,
  fullName: row.full_name as string,
  attending: row.attending as boolean,
  companionsCount: row.companions_count as number,
  dietaryRestrictions: (row.dietary_restrictions as string) ?? null,
  createdAt: row.created_at as string,
});
