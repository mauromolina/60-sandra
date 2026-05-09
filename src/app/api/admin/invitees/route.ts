import { NextRequest, NextResponse } from "next/server";
import { InviteeRepository } from "@/repositories/InviteeRepository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, displayName, celebrantAlias, guestCount, allowsCompanion } = body;

    if (!slug || !displayName) {
      return NextResponse.json(
        { success: false, error: "Slug y nombre son obligatorios" },
        { status: 400 }
      );
    }

    const invitee = await InviteeRepository.create({
      slug,
      displayName,
      celebrantAlias: celebrantAlias || undefined,
      guestCount: guestCount ?? 1,
      allowsCompanion: allowsCompanion ?? false,
    });

    return NextResponse.json({ success: true, data: invitee });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al crear invitación";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
