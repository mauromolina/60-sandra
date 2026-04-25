"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema } from "@/lib/validators/rsvpSchema";
import type { Invitee } from "@/lib/types/Invitee";
import type { RsvpFormData } from "@/lib/types/Rsvp";

interface RsvpFormValues {
  fullName: string;
  attending: boolean;
  companionsCount: number;
  dietaryRestrictions: string;
}

export const useRsvpForm = (invitee: Invitee | null) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema) as never,
    defaultValues: {
      fullName: invitee?.displayName ?? "",
      attending: true,
      companionsCount: 0,
      dietaryRestrictions: "",
    },
  });

  const submit = useCallback(
    async (data: RsvpFormValues): Promise<void> => {
      setIsSubmitting(true);
      try {
        const body: RsvpFormData & { inviteeSlug?: string } = {
          fullName: data.fullName,
          attending: data.attending,
          companionsCount: data.companionsCount,
          dietaryRestrictions: data.dietaryRestrictions ?? "",
        };
        if (invitee) {
          body.inviteeSlug = invitee.slug;
        }
        const response = await fetch("/api/rsvps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("RSVP submission failed");
        setIsSuccess(true);
      } catch {
        throw new Error("Failed to submit RSVP");
      } finally {
        setIsSubmitting(false);
      }
    },
    [invitee]
  );

  return { form, submit, isSubmitting, isSuccess };
};
