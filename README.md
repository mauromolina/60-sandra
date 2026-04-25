# Los 60 de Sandra

Digital invitation web app for Sandra's 60th birthday celebration. Single-scroll landing page with personalized invitations, RSVP, Spotify song contributions, and photo gallery.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Database:** Supabase (PostgreSQL + Storage + RLS)
- **Animations:** Framer Motion (scroll-triggered, reduced-motion aware)
- **Forms:** react-hook-form + Zod validation
- **Email:** Resend (RSVP notifications)
- **Music:** Spotify Web API (Client Credentials Flow)
- **UI:** shadcn/ui (Button, Input, Textarea, Dialog, Sonner)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- Spotify Developer App (Client Credentials)
- Resend account

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `SPOTIFY_CLIENT_ID` | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret |
| `RESEND_API_KEY` | Resend API key |
| `ADMIN_PASSWORD` | Password for the admin panel |
| `NEXT_PUBLIC_EVENT_DATE` | Event date in ISO 8601 format |
| `ORGANIZER_EMAIL` | Email to receive RSVP notifications |

### 3. Database setup

Run the migration against your Supabase project:

```bash
supabase db push
```

Or manually execute `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.

Create a **public storage bucket** named `gallery` in Supabase Storage for photo uploads.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                    # Next.js App Router pages and API routes
    admin/                # Admin panel (songs, photos, RSVPs moderation)
    api/                  # REST API routes (songs, rsvps, photos, spotify)
    invitacion/[slug]/    # Personalized invitation pages
  components/
    sections/             # Page sections (Hero, Countdown, Venue, etc.)
    spotify/              # Spotify song contribution components
    rsvp/                 # RSVP dialog and form components
    countdown/            # Countdown timer components
    ui/                   # Primitives (FloralOrnament, GoldHeart, shadcn)
  hooks/                  # Custom React hooks (all business logic)
  repositories/           # Data access layer (Supabase queries)
  services/               # External service integrations
    interfaces/           # Service contracts
  lib/
    constants/            # Copy, colors, event config, invitees
    types/                # TypeScript interfaces
    validators/           # Zod schemas
    utils/                # Pure utility functions
    supabase/             # Supabase client factories
```

## Personalized Invitations

Send guests a personalized link: `/invitacion/{slug}`

Invitees are configured in `src/lib/constants/invitees.ts`. Each entry has a `slug`, `displayName`, and `maxCompanions`.

## Admin Panel

Access at `/admin?password=YOUR_ADMIN_PASSWORD`.

- **RSVPs:** View all responses with attendance stats
- **Songs:** Approve or reject song contributions
- **Photos:** Moderate uploaded photos

## Deploy

Deploy to Vercel:

```bash
npx vercel
```

Set all environment variables in the Vercel dashboard.
