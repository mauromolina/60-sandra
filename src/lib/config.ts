import { z } from "zod";

const spotifySchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
});

const emailSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  ORGANIZER_EMAIL: z.string().email(),
});

const adminSchema = z.object({
  ADMIN_PASSWORD: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_EVENT_DATE: z.string().min(1),
});

type SpotifyConfig = z.infer<typeof spotifySchema>;
type EmailConfig = z.infer<typeof emailSchema>;
type AdminConfig = z.infer<typeof adminSchema>;
type ClientConfig = z.infer<typeof clientSchema>;

const getSpotifyConfig = (): SpotifyConfig => {
  return spotifySchema.parse({
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  });
};

const getEmailConfig = (): EmailConfig => {
  return emailSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ORGANIZER_EMAIL: process.env.ORGANIZER_EMAIL,
  });
};

const getAdminConfig = (): AdminConfig => {
  return adminSchema.parse({
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  });
};

const getClientConfig = (): ClientConfig => {
  return clientSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_EVENT_DATE: process.env.NEXT_PUBLIC_EVENT_DATE,
  });
};

export { getClientConfig, getSpotifyConfig, getEmailConfig, getAdminConfig };
export type { ClientConfig, SpotifyConfig, EmailConfig, AdminConfig };
