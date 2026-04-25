import type { Rsvp } from "@/lib/types/Rsvp";

export interface IEmailService {
  sendRsvpNotification(rsvp: Rsvp): Promise<void>;
}
