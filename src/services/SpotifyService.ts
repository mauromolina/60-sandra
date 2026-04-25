import type { SpotifyTrack } from "@/lib/types/Song";
import type { ISpotifyService } from "./interfaces/ISpotifyService";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyApiTrack[];
  };
}

interface SpotifyApiTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  preview_url: string | null;
  duration_ms: number;
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

const getAccessToken = async (clientId: string, clientSecret: string): Promise<string> => {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to obtain Spotify access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
};

const mapApiTrack = (track: SpotifyApiTrack): SpotifyTrack => ({
  id: track.id,
  name: track.name,
  artist: track.artists.map((a) => a.name).join(", "),
  albumImageUrl: track.album.images[0]?.url ?? null,
  previewUrl: track.preview_url,
  durationMs: track.duration_ms,
});

export const createSpotifyService = (
  clientId: string,
  clientSecret: string
): ISpotifyService => ({
  async searchTracks(query: string, limit = 10): Promise<SpotifyTrack[]> {
    const token = await getAccessToken(clientId, clientSecret);
    const params = new URLSearchParams({
      q: query,
      type: "track",
      limit: limit.toString(),
      market: "AR",
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[Spotify] Search failed:", response.status, errorBody);
      throw new Error(`Spotify search failed: ${response.status}`);
    }

    const data: SpotifySearchResponse = await response.json();
    return data.tracks.items.map(mapApiTrack);
  },

  async getTrackById(id: string): Promise<SpotifyTrack | null> {
    const token = await getAccessToken(clientId, clientSecret);
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch track");

    const data: SpotifyApiTrack = await response.json();
    return mapApiTrack(data);
  },
});
