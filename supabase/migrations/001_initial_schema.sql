create table song_contributions (
  id uuid primary key default gen_random_uuid(),
  spotify_track_id text not null,
  track_name text not null,
  artist_name text not null,
  album_image_url text,
  preview_url text,
  contributor_name text not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table rsvps (
  id uuid primary key default gen_random_uuid(),
  invitee_slug text,
  full_name text not null,
  attending boolean not null,
  companions_count integer not null default 0,
  dietary_restrictions text,
  created_at timestamptz not null default now()
);

create table photo_uploads (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url text not null,
  contributor_name text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index idx_song_contributions_status on song_contributions(status);
create index idx_rsvps_slug on rsvps(invitee_slug);
create index idx_photo_uploads_status on photo_uploads(status);

alter table song_contributions enable row level security;
alter table rsvps enable row level security;
alter table photo_uploads enable row level security;

create policy "Public can read approved songs"
  on song_contributions for select
  using (status = 'approved');

create policy "Public can insert songs"
  on song_contributions for insert
  with check (true);

create policy "Public can insert rsvps"
  on rsvps for insert
  with check (true);

create policy "Public can insert photos"
  on photo_uploads for insert
  with check (true);

create policy "Public can read approved photos"
  on photo_uploads for select
  using (status = 'approved');
