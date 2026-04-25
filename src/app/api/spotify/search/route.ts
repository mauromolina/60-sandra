import { NextRequest, NextResponse } from "next/server";
import { createSpotifyService } from "@/services/SpotifyService";
import { getSpotifyConfig } from "@/lib/config";
import type { ApiResponse } from "@/lib/types/ApiResponse";
import type { SpotifyTrack } from "@/lib/types/Song";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SpotifyTrack[]>>> {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json(
      { success: false, error: "Query must be at least 2 characters" },
      { status: 400 }
    );
  }

  try {
    const config = getSpotifyConfig();
    const spotify = createSpotifyService(
      config.SPOTIFY_CLIENT_ID,
      config.SPOTIFY_CLIENT_SECRET
    );
    const tracks = await spotify.searchTracks(query);
    return NextResponse.json({ success: true, data: tracks });
  } catch (err) {
    console.error("[API] Spotify search error:", err);
    return NextResponse.json(
      { success: false, error: "Spotify search failed" },
      { status: 500 }
    );
  }
}
