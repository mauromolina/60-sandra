"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import { EVENT_INFO } from "@/lib/constants/event";
import type { RsvpFormValues } from "@/lib/validators/rsvpSchema";

interface RsvpFormProps {
  form: UseFormReturn<RsvpFormValues>;
  onSubmit: (data: RsvpFormValues) => Promise<void>;
  isSubmitting: boolean;
  allowsCompanion: boolean;
}

function buildWhatsAppUrl(
  fullName: string,
  attending: boolean,
  companionsCount: number,
) {
  const phone = process.env.NEXT_PUBLIC_ORGANIZER_PHONE ?? "";
  if (!phone) return null;

  const plural = fullName.includes(" y ");
  const soy = plural ? "Somos" : "Soy";
  const confirmo = plural ? "confirmamos" : "confirmo";
  const voy = plural ? "Vamos" : "Voy";
  const noPuedo = plural ? "no vamos a poder" : "no voy a poder";

  let message: string;
  if (attending) {
    message = `Hola! ${soy} ${fullName}, ${confirmo} asistencia a los ${EVENT_INFO.age} de ${EVENT_INFO.celebrantName}.`;
    if (companionsCount > 0) {
      message += ` ${voy} con un acompañante.`;
    }
  } else {
    message = `Hola! ${soy} ${fullName}, lamentablemente ${noPuedo} asistir a los ${EVENT_INFO.age} de ${EVENT_INFO.celebrantName}.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const RsvpForm = ({ form, onSubmit, isSubmitting, allowsCompanion }: RsvpFormProps) => {
  const attending = form.watch("attending");
  const companionsCount = form.watch("companionsCount");
  const fullName = form.watch("fullName");

  const isValid = fullName.trim().length >= 2;

  const handleWhatsAppClick = async () => {
    if (!isValid || isSubmitting) return;

    const data = form.getValues();
    try {
      await onSubmit(data);
    } catch {
      // Continue to WhatsApp even if save fails
    }

    const whatsappUrl = buildWhatsAppUrl(data.fullName, data.attending, data.companionsCount);
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-5 mt-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => form.setValue("attending", true)}
          className={`flex-1 py-3.5 px-4 rounded-xl font-serif text-sm italic border transition-all duration-300 ${
            attending
              ? "border-gold bg-gold/10 text-gold shadow-sm shadow-gold/10"
              : "border-gold/15 text-warm-gray hover:border-gold/30"
          }`}
        >
          {COPY.rsvp.attendingLabel}
        </button>
        <button
          type="button"
          onClick={() => form.setValue("attending", false)}
          className={`flex-1 py-3.5 px-4 rounded-xl font-serif text-sm italic border transition-all duration-300 ${
            !attending
              ? "border-sage bg-sage/10 text-sage-dark shadow-sm shadow-sage/10"
              : "border-gold/15 text-warm-gray hover:border-gold/30"
          }`}
        >
          {COPY.rsvp.notAttendingLabel}
        </button>
      </div>

      <div>
        <Input
          placeholder={COPY.rsvp.nameLabel}
          {...form.register("fullName")}
          className="bg-white/60 border-gold/15 focus:border-gold/40 font-serif italic text-charcoal placeholder:text-warm-gray/50 h-12 rounded-xl"
        />
      </div>

      {attending && allowsCompanion && (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={companionsCount > 0}
            onChange={(e) => form.setValue("companionsCount", e.target.checked ? 1 : 0)}
            className="sr-only peer"
          />
          <span className="w-5 h-5 rounded-md border border-gold/30 bg-white/60 flex items-center justify-center transition-all duration-300 peer-checked:bg-gold/10 peer-checked:border-gold">
            {companionsCount > 0 && (
              <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="font-serif text-sm italic text-gold-muted">
            {COPY.rsvp.companionsLabel}
          </span>
        </label>
      )}

      <button
        type="button"
        onClick={handleWhatsAppClick}
        disabled={!isValid || isSubmitting}
        className={`w-full h-12 rounded-xl font-sans text-base text-white tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 ${
          isValid && !isSubmitting
            ? "bg-[#25D366] hover:bg-[#20BD5A] shadow-[#25D366]/20 cursor-pointer"
            : "bg-[#25D366]/50 shadow-none cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {COPY.rsvp.whatsappButton}
          </>
        )}
      </button>
    </div>
  );
};
