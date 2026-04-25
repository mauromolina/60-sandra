import { z } from "zod";

export const rsvpSchema = z.object({
  fullName: z.string().min(2, "El nombre es obligatorio").max(100),
  attending: z.boolean(),
  companionsCount: z.number().int().min(0).max(10),
  dietaryRestrictions: z.string().max(300).default(""),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
