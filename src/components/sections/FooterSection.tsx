"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GoldHeart } from "@/components/ui/GoldHeart";
import { FloralOrnament } from "@/components/ui/FloralOrnament";
import { COPY } from "@/lib/constants/copy";
import { useCelebrantName } from "@/contexts/CelebrantContext";
import { withName } from "@/lib/utils/copyUtils";

export const FooterSection = () => {
  const celebrantName = useCelebrantName();
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 px-6 text-center"
    >
      <FloralOrnament variant="divider" className="mx-auto mb-6 opacity-50" />

      <div className="flex items-center justify-center gap-1.5 text-warm-gray text-xs font-sans">
        <span>{COPY.footer.madeWith}</span>
        <GoldHeart size={14} className="text-gold/60" />
        <span>{withName(COPY.footer.forCelebrant, celebrantName)}</span>
      </div>
    </motion.footer>
  );
};
