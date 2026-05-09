"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { GoldHeart } from "@/components/ui/GoldHeart";
import { COPY } from "@/lib/constants/copy";
import { useCelebrantName } from "@/contexts/CelebrantContext";
import { withName } from "@/lib/utils/copyUtils";

export const FamilyMessageSection = () => {
  const celebrantName = useCelebrantName();
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center bg-cream-dark/50"
    >
      <SectionLabel>{COPY.familyMessage.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-8" />

      <div className="max-w-md mx-auto">
        <GoldHeart className="mx-auto mb-6 opacity-60" size={28} />
        <p className="font-serif text-lg md:text-xl text-charcoal italic font-medium leading-relaxed">
          &ldquo;{withName(COPY.familyMessage.message, celebrantName)}&rdquo;
        </p>
      </div>
    </motion.section>
  );
};
