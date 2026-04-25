"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { COPY } from "@/lib/constants/copy";
import type { RsvpFormValues } from "@/lib/validators/rsvpSchema";

interface RsvpFormProps {
  form: UseFormReturn<RsvpFormValues>;
  onSubmit: (data: RsvpFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const RsvpForm = ({ form, onSubmit, isSubmitting }: RsvpFormProps) => {
  const attending = form.watch("attending");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
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
        {form.formState.errors.fullName && (
          <p className="mt-1.5 text-xs text-red-600/80 font-serif italic">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>

      {attending && (
        <>
          <div>
            <label className="block text-left font-serif text-sm italic text-gold-muted mb-2">
              {COPY.rsvp.companionsLabel}
            </label>
            <Input
              type="number"
              min={0}
              max={10}
              {...form.register("companionsCount", { valueAsNumber: true })}
              className="bg-white/60 border-gold/15 focus:border-gold/40 font-serif text-charcoal w-24 h-12 rounded-xl"
            />
          </div>

          <div>
            <Textarea
              placeholder={COPY.rsvp.dietaryPlaceholder}
              {...form.register("dietaryRestrictions")}
              rows={2}
              className="bg-white/60 border-gold/15 focus:border-gold/40 font-serif italic text-charcoal placeholder:text-warm-gray/50 rounded-xl resize-none"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl font-serif italic text-base text-white tracking-wide bg-gradient-to-r from-gold to-gold-muted hover:from-gold-light hover:to-gold shadow-md shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
        ) : (
          COPY.rsvp.submitButton
        )}
      </button>
    </form>
  );
};
