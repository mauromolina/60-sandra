export interface Rsvp {
  id: string;
  inviteeSlug: string | null;
  fullName: string;
  attending: boolean;
  companionsCount: number;
  dietaryRestrictions: string | null;
  createdAt: string;
}

export interface RsvpFormData {
  fullName: string;
  attending: boolean;
  companionsCount: number;
  dietaryRestrictions: string;
}
