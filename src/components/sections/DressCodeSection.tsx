"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";

export const DressCodeSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center"
    >
      <SectionLabel>{COPY.dressCode.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-8" />

      <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
        <Shirt className="h-6 w-6 text-gold" />
        <p className="font-serif text-xl text-charcoal italic">
          {COPY.dressCode.description}
        </p>
      </div>
    </motion.section>
  );
};
