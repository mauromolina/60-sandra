import { NextRequest, NextResponse } from "next/server";
import { InviteeRepository } from "@/repositories/InviteeRepository";
import type { ApiResponse } from "@/lib/types/ApiResponse";
import type { Invitee } from "@/lib/types/Invitee";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<ApiResponse<Invitee>>> {
  try {
    const { slug } = await params;
    const invitee = await InviteeRepository.findBySlug(slug);

    if (!invitee) {
      return NextResponse.json(
        { success: false, error: "Invitee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invitee });
  } catch (err) {
    console.error("[API] Invitee error:", err);
    const message = err instanceof Error ? err.message : "Failed to fetch invitee";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
