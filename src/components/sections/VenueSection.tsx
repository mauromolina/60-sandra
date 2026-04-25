"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";
import { VENUE } from "@/lib/constants/event";

export const VenueSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center bg-cream-dark/50"
    >
      <SectionLabel>{COPY.venue.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-8" />

      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
        <MapPin className="h-6 w-6 text-gold/60" strokeWidth={1.5} />
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal italic font-light">
          {VENUE.name}
        </h3>
        <p className="font-serif text-base text-charcoal-light tracking-wide">
          {VENUE.address}
        </p>
        <p className="font-serif text-sm text-gold-muted italic">
          {VENUE.city}
        </p>

        {VENUE.mapUrl && (
          <a
            href={VENUE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-serif text-sm text-gold italic hover:text-gold-light transition-colors underline underline-offset-4 decoration-gold/30"
          >
            {COPY.venue.howToArrive}
          </a>
        )}
      </div>
    </motion.section>
  );
};
