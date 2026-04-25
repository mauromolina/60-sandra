import { NextRequest, NextResponse } from "next/server";
import { RsvpRepository } from "@/repositories/RsvpRepository";
import { rsvpSchema } from "@/lib/validators/rsvpSchema";
import type { ApiResponse } from "@/lib/types/ApiResponse";
import type { Rsvp } from "@/lib/types/Rsvp";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Rsvp>>> {
  try {
    const body = await request.json();
    const { inviteeSlug, ...formData } = body;
    const validated = rsvpSchema.parse(formData);
    const rsvp = await RsvpRepository.create(validated, inviteeSlug);

    try {
      const { createEmailService } = await import("@/services/EmailService");
      const { getEmailConfig } = await import("@/lib/config");
      const config = getEmailConfig();
      const emailService = createEmailService(
        config.RESEND_API_KEY,
        config.ORGANIZER_EMAIL
      );
      await emailService.sendRsvpNotification(rsvp);
    } catch {
      // Email notification is best-effort
    }

    return NextResponse.json({ success: true, data: rsvp }, { status: 201 });
  } catch (err) {
    console.error("[API] RSVP error:", err);
    const message = err instanceof Error ? err.message : "Failed to create RSVP";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
