"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { RsvpDialog } from "@/components/rsvp/RsvpDialog";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/constants/copy";
import type { Invitee } from "@/lib/types/Invitee";

interface RsvpSectionProps {
  invitee?: Invitee | null;
}

export const RsvpSection = ({ invitee }: RsvpSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center bg-cream-dark/50"
    >
      <SectionLabel>{COPY.rsvp.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-6" />

      <div className="max-w-md mx-auto">
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
          {COPY.rsvp.title}
        </h3>
        <p className="font-sans text-sm text-charcoal-light mb-8">
          {COPY.rsvp.subtitle}
        </p>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-gold hover:bg-gold-light text-white font-sans text-base px-8 py-3 h-auto"
        >
          {COPY.rsvp.submitButton}
        </Button>
      </div>

      <RsvpDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        invitee={invitee ?? null}
      />
    </motion.section>
  );
};
