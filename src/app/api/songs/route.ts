import { NextRequest, NextResponse } from "next/server";
import { SongRepository } from "@/repositories/SongRepository";
import { songContributionSchema } from "@/lib/validators/songContributionSchema";
import type { ApiResponse } from "@/lib/types/ApiResponse";
import type { ContributedSong } from "@/lib/types/Song";

export async function GET(): Promise<NextResponse<ApiResponse<ContributedSong[]>>> {
  try {
    const songs = await SongRepository.getApproved();
    return NextResponse.json({ success: true, data: songs });
  } catch (err) {
    console.error("[API] Songs fetch error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const body = await request.json();
    const { id, status } = body as { id: string; status: "approved" | "rejected" };
    await SongRepository.updateStatus(id, status);
    return NextResponse.json({ success: true, data: null });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update song status" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ContributedSong>>> {
  try {
    const body = await request.json();
    const validated = songContributionSchema.parse(body);
    const song = await SongRepository.create(validated);
    return NextResponse.json({ success: true, data: song }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create contribution";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
