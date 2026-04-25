"use client";

import { useMemo } from "react";
import { InviteeRepository } from "@/repositories/InviteeRepository";
import type { Invitee } from "@/lib/types/Invitee";

interface InviteeResult {
  invitee: Invitee | null;
  isLoading: boolean;
}

export const useInvitee = (slug: string | undefined): InviteeResult => {
  const invitee = useMemo(() => {
    if (!slug) return null;
    return InviteeRepository.findBySlug(slug);
  }, [slug]);

  return { invitee, isLoading: false };
};
