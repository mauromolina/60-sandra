import { Resend } from "resend";
import type { Rsvp } from "@/lib/types/Rsvp";
import type { IEmailService } from "./interfaces/IEmailService";
import { EVENT_INFO } from "@/lib/constants/event";

export const createEmailService = (
  apiKey: string,
  organizerEmail: string
): IEmailService => {
  const resend = new Resend(apiKey);

  return {
    async sendRsvpNotification(rsvp: Rsvp): Promise<void> {
      const status = rsvp.attending ? "CONFIRMÓ asistencia" : "NO puede asistir";
      const companions = rsvp.attending
        ? ` (+${rsvp.companionsCount} acompañantes)`
        : "";
      const dietary = rsvp.dietaryRestrictions
        ? `\nRestricciones alimentarias: ${rsvp.dietaryRestrictions}`
        : "";

      await resend.emails.send({
        from: `Los ${EVENT_INFO.age} de ${EVENT_INFO.celebrantName} <noreply@resend.dev>`,
        to: organizerEmail,
        subject: `RSVP: ${rsvp.fullName} ${status}`,
        text: `${rsvp.fullName} ${status}${companions}${dietary}`,
      });
    },
  };
};
