"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { RsvpForm } from "./RsvpForm";
import { useRsvpForm } from "@/hooks/useRsvpForm";
import { COPY } from "@/lib/constants/copy";
import type { Invitee } from "@/lib/types/Invitee";

interface RsvpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invitee: Invitee | null;
}

export const RsvpDialog = ({ isOpen, onClose, invitee }: RsvpDialogProps) => {
  const { form, submit, isSubmitting } = useRsvpForm(invitee);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-cream border border-gold/20 shadow-xl shadow-gold/5 max-w-sm mx-auto p-6 rounded-2xl">
        <div className="text-center mb-2">
          <h2 className="font-serif italic text-3xl md:text-4xl text-charcoal font-semibold mb-3">
            {COPY.rsvp.title}
          </h2>
          <GoldDivider />
        </div>

        <RsvpForm form={form} onSubmit={submit} isSubmitting={isSubmitting} allowsCompanion={invitee?.allowsCompanion ?? false} />
      </DialogContent>
    </Dialog>
  );
};
