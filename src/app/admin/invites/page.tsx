export const dynamic = "force-dynamic";

import { RsvpRepository } from "@/repositories/RsvpRepository";
import { InviteeRepository } from "@/repositories/InviteeRepository";
import type { Rsvp } from "@/lib/types/Rsvp";
import type { Invitee } from "@/lib/types/Invitee";
import { UserCheck, UserX, Clock, Users } from "lucide-react";
import { InvitationsList } from "@/components/admin/InvitationsList";

function getStatus(invitee: Invitee, rsvps: Rsvp[]) {
  const rsvp = rsvps.find((r) => r.inviteeSlug === invitee.slug);
  if (!rsvp) return { status: "pending" as const, rsvp: undefined };
  return { status: rsvp.attending ? "confirmed" as const : "declined" as const, rsvp };
}

export default async function AdminRsvpsPage() {
  let rsvps: Rsvp[];
  let invitees: Invitee[];
  try {
    [rsvps, invitees] = await Promise.all([
      RsvpRepository.getAll(),
      InviteeRepository.getAll(),
    ]);
  } catch {
    rsvps = [];
    invitees = [];
  }

  const invitationsWithStatus = invitees.map((inv) => ({
    invitee: inv,
    ...getStatus(inv, rsvps),
  }));

  const confirmed = invitationsWithStatus.filter((i) => i.status === "confirmed");
  const declined = invitationsWithStatus.filter((i) => i.status === "declined");
  const pending = invitationsWithStatus.filter((i) => i.status === "pending");

  const totalExpectedGuests = confirmed.reduce((sum, i) => {
    const companions = i.rsvp?.companionsCount ?? 0;
    return sum + i.invitee.guestCount + companions;
  }, 0);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm shadow-emerald-100/50 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-serif text-3xl text-emerald-600 leading-none">{confirmed.length}</p>
            <p className="font-sans text-xs text-emerald-600/60 mt-1">Confirmados</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm shadow-red-100/50 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
            <UserX className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="font-serif text-3xl text-red-500 leading-none">{declined.length}</p>
            <p className="font-sans text-xs text-red-500/60 mt-1">No asisten</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm shadow-amber-100/50 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="font-serif text-3xl text-amber-500 leading-none">{pending.length}</p>
            <p className="font-sans text-xs text-amber-500/60 mt-1">Pendientes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gold/20 shadow-sm shadow-gold/5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="font-serif text-3xl text-gold leading-none">{totalExpectedGuests}</p>
            <p className="font-sans text-xs text-gold/60 mt-1">Personas asisten</p>
          </div>
        </div>
      </div>

      <InvitationsList invitations={invitationsWithStatus} />
    </div>
  );
}
