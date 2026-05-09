"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+y\s+/g, "-y-")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CreateInviteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [celebrantAlias, setCelebrantAlias] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [allowsCompanion, setAllowsCompanion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleNameChange = (value: string) => {
    setDisplayName(value);
    if (!slugTouched) {
      setSlug(toSlug(value));
    }
  };

  const resetForm = () => {
    setDisplayName("");
    setSlug("");
    setSlugTouched(false);
    setCelebrantAlias("");
    setGuestCount(1);
    setAllowsCompanion(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!displayName.trim() || !slug.trim()) {
      setError("Nombre y slug son obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/invitees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          displayName: displayName.trim(),
          celebrantAlias: celebrantAlias.trim() || undefined,
          guestCount,
          allowsCompanion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al crear invitación");
        return;
      }

      resetForm();
      setIsOpen(false);
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-sans text-xs font-medium bg-gold text-white hover:bg-gold-light transition-colors shadow-sm shadow-gold/20"
      >
        <Plus className="h-3.5 w-3.5" />
        Nueva invitación
      </button>

      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { setIsOpen(false); resetForm(); } }}>
        <DialogContent className="bg-cream border border-gold/20 shadow-xl shadow-gold/5 max-w-sm mx-auto p-6 rounded-2xl">
          <h2 className="font-serif italic text-xl text-charcoal mb-4">
            Nueva invitación
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-1.5">
                Nombre para mostrar
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ej: Julián y Florencia"
                className="w-full px-3 py-2.5 text-sm font-sans rounded-xl border border-gold/15 bg-white/80 text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-1.5">
                Slug (URL)
              </label>
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-xs text-warm-gray/60">/invitacion/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                  placeholder="julian-y-flor"
                  className="flex-1 px-3 py-2.5 text-sm font-sans rounded-xl border border-gold/15 bg-white/80 text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-1.5">
                Alias de la homenajeada
                <span className="text-warm-gray/50 font-normal ml-1">(opcional)</span>
              </label>
              <input
                type="text"
                value={celebrantAlias}
                onChange={(e) => setCelebrantAlias(e.target.value)}
                placeholder='Ej: Sandra, Mamá, Tía Sandra'
                className="w-full px-3 py-2.5 text-sm font-sans rounded-xl border border-gold/15 bg-white/80 text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-1.5">
                Cantidad de invitados
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={guestCount}
                onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2.5 text-sm font-sans rounded-xl border border-gold/15 bg-white/80 text-charcoal focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={allowsCompanion}
                onChange={(e) => setAllowsCompanion(e.target.checked)}
                className="sr-only peer"
              />
              <span className="w-5 h-5 rounded-md border border-gold/30 bg-white/60 flex items-center justify-center transition-all duration-200 peer-checked:bg-gold/10 peer-checked:border-gold">
                {allowsCompanion && (
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="font-sans text-sm text-charcoal">
                Permite acompañante
              </span>
            </label>

            {error && (
              <p className="text-xs font-sans text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !displayName.trim() || !slug.trim()}
              className="w-full py-3 rounded-xl font-sans text-sm font-medium text-white bg-gradient-to-r from-gold to-gold-muted hover:from-gold-light hover:to-gold shadow-md shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando..." : "Crear invitación"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
