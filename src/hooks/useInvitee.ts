"use client";

import { useState, useEffect } from "react";
import type { Invitee } from "@/lib/types/Invitee";

interface InviteeResult {
  invitee: Invitee | null;
  isLoading: boolean;
}

export const useInvitee = (slug: string | undefined): InviteeResult => {
  const [invitee, setInvitee] = useState<Invitee | null>(null);
  const [isLoading, setIsLoading] = useState(!!slug);

  useEffect(() => {
    if (!slug) return;

    const fetchInvitee = async () => {
      try {
        const res = await fetch(`/api/invitees/${slug}`);
        const json = await res.json();
        if (json.success) {
          setInvitee(json.data);
        }
      } catch {
        // Invitee not found — continue without personalization
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitee();
  }, [slug]);

  return { invitee, isLoading };
};
