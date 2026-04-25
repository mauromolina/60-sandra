import { INVITEES } from "@/lib/constants/invitees";
import type { Invitee } from "@/lib/types/Invitee";

export const InviteeRepository = {
  findBySlug(slug: string): Invitee | null {
    return INVITEES.find((i) => i.slug === slug) ?? null;
  },

  getAll(): Invitee[] {
    return INVITEES;
  },
};
