"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";

export const GallerySection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-6 text-center"
    >
      <SectionLabel>{COPY.gallery.label}</SectionLabel>
      <GoldDivider className="mt-2 mb-8" />

      <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
        {COPY.gallery.title}
      </h3>

      <p className="font-sans text-sm text-warm-gray italic">
        {COPY.gallery.emptyState}
      </p>
    </motion.section>
  );
};
