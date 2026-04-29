import { z } from "zod";

export const songContributionSchema = z.object({
  spotifyTrackId: z.string().min(1),
  trackName: z.string().min(1),
  artistName: z.string().min(1),
  albumImageUrl: z.string().url().nullable(),
  previewUrl: z.string().url().nullable().optional(),
  contributorName: z.string().min(1).max(100),
  message: z.string().max(500).nullable(),
});

export type SongContributionFormData = z.infer<typeof songContributionSchema>;
