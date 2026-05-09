export interface Invitee {
  slug: string;
  displayName: string;
  celebrantAlias?: string;
  allowsCompanion: boolean;
  guestCount: number;
}
