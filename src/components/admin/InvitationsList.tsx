"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, Clock, Users, Search } from "lucide-react";
import { CreateInviteForm } from "./CreateInviteForm";
import type { Invitee } from "@/lib/types/Invitee";
import type { Rsvp } from "@/lib/types/Rsvp";

type InvitationStatus = "confirmed" | "declined" | "pending";

interface InvitationItem {
  invitee: Invitee;
  status: InvitationStatus;
  rsvp: Rsvp | undefined;
}

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-100",
    label: "Confirmado",
    labelClass: "text-emerald-700",
    badgeBg: "bg-emerald-100 border border-emerald-200",
  },
  declined: {
    icon: AlertTriangle,
    iconClass: "text-red-500",
    bgClass: "bg-red-100",
    label: "No asiste",
    labelClass: "text-red-600",
    badgeBg: "bg-red-100 border border-red-200",
  },
  pending: {
    icon: Clock,
    iconClass: "text-amber-500",
    bgClass: "bg-amber-100",
    label: "Pendiente",
    labelClass: "text-amber-600",
    badgeBg: "bg-amber-100 border border-amber-200",
  },
} as const;

const filterBadges: { value: InvitationStatus; label: string; activeClass: string; inactiveClass: string }[] = [
  { value: "confirmed", label: "Confirmados", activeClass: "bg-emerald-100 border-emerald-300 text-emerald-700", inactiveClass: "bg-white border-gold/15 text-warm-gray hover:border-emerald-200 hover:text-emerald-600" },
  { value: "declined", label: "No asisten", activeClass: "bg-red-100 border-red-300 text-red-600", inactiveClass: "bg-white border-gold/15 text-warm-gray hover:border-red-200 hover:text-red-500" },
  { value: "pending", label: "Pendientes", activeClass: "bg-amber-100 border-amber-300 text-amber-600", inactiveClass: "bg-white border-gold/15 text-warm-gray hover:border-amber-200 hover:text-amber-500" },
];

interface InvitationsListProps {
  invitations: InvitationItem[];
}

export const InvitationsList = ({ invitations }: InvitationsListProps) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<InvitationStatus | null>(null);

  const filtered = invitations.filter((i) => {
    if (activeFilter && i.status !== activeFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return i.invitee.slug.toLowerCase().includes(q) || i.invitee.displayName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif italic text-lg text-charcoal">Invitaciones</h2>
            <CreateInviteForm />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="pl-9 pr-4 py-2 w-48 text-sm font-sans rounded-lg border border-gold/15 bg-white/80 text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {filterBadges.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(isActive ? null : f.value)}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium border transition-all duration-200 ${
                  isActive ? f.activeClass : f.inactiveClass
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gold/10 shadow-sm shadow-gold/5 overflow-hidden divide-y divide-gold/8">
        {filtered.map(({ invitee, status, rsvp }) => {
          const config = statusConfig[status];
          const Icon = config.icon;

          return (
            <div
              key={invitee.slug}
              className="px-5 py-4 flex items-center justify-between hover:bg-cream/40 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-9 h-9 rounded-lg ${config.bgClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-4.5 w-4.5 ${config.iconClass}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-medium text-charcoal truncate">
                    {invitee.displayName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="font-sans text-xs text-warm-gray/60">
                      {invitee.slug}
                    </p>
                    <span className="text-gold/20">·</span>
                    <p className="font-sans text-xs text-warm-gray/60">
                      {invitee.guestCount} {invitee.guestCount === 1 ? "invitado" : "invitados"}
                    </p>
                    {status === "confirmed" && rsvp && rsvp.companionsCount > 0 && (
                      <>
                        <span className="text-gold/20">·</span>
                        <p className="font-sans text-xs text-warm-gray">
                          +{rsvp.companionsCount} acompañante{rsvp.companionsCount > 1 ? "s" : ""}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className={`font-sans text-xs px-3 py-1.5 rounded-lg flex-shrink-0 font-medium ${config.badgeBg} ${config.labelClass}`}>
                {config.label}
              </span>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="px-5 py-16 text-center">
            <Users className="h-8 w-8 text-warm-gray/30 mx-auto mb-3" />
            <p className="font-sans text-sm text-warm-gray">
              {search.trim() || activeFilter ? "No se encontraron invitaciones." : "No hay invitaciones todavía."}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
