import { RsvpRepository } from "@/repositories/RsvpRepository";
import { COPY } from "@/lib/constants/copy";
import type { Rsvp } from "@/lib/types/Rsvp";

export default async function AdminRsvpsPage() {
  let rsvps: Rsvp[];
  try {
    rsvps = await RsvpRepository.getAll();
  } catch {
    rsvps = [];
  }

  const attending = rsvps.filter((r) => r.attending);
  const notAttending = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce(
    (sum, r) => sum + 1 + r.companionsCount,
    0
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gold/10 text-center">
          <p className="font-serif text-3xl text-gold">{attending.length}</p>
          <p className="font-sans text-xs text-warm-gray">Confirmados</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gold/10 text-center">
          <p className="font-serif text-3xl text-charcoal">{totalGuests}</p>
          <p className="font-sans text-xs text-warm-gray">Total invitados</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gold/10 text-center">
          <p className="font-serif text-3xl text-warm-gray">{notAttending.length}</p>
          <p className="font-sans text-xs text-warm-gray">No asisten</p>
        </div>
      </div>

      <div className="space-y-3">
        {rsvps.map((rsvp) => (
          <div
            key={rsvp.id}
            className="bg-white rounded-xl p-4 border border-gold/10 flex items-center justify-between"
          >
            <div>
              <p className="font-sans text-sm font-medium text-charcoal">
                {rsvp.fullName}
              </p>
              <p className="font-sans text-xs text-warm-gray">
                {rsvp.attending
                  ? `Asiste (+${rsvp.companionsCount} acompañantes)`
                  : "No asiste"}
              </p>
              {rsvp.dietaryRestrictions && (
                <p className="font-sans text-xs text-charcoal-light mt-1">
                  {rsvp.dietaryRestrictions}
                </p>
              )}
              {rsvp.inviteeSlug && (
                <p className="font-sans text-[10px] text-warm-gray mt-1">
                  Invitación: {rsvp.inviteeSlug}
                </p>
              )}
            </div>
            <span
              className={`font-sans text-xs px-3 py-1 rounded-full ${
                rsvp.attending
                  ? "bg-sage/10 text-sage-dark"
                  : "bg-warm-gray/10 text-warm-gray"
              }`}
            >
              {rsvp.attending ? COPY.rsvp.attendingLabel : COPY.rsvp.notAttendingLabel}
            </span>
          </div>
        ))}

        {rsvps.length === 0 && (
          <p className="text-center font-sans text-sm text-warm-gray py-8">
            No hay confirmaciones todavía.
          </p>
        )}
      </div>
    </div>
  );
}
