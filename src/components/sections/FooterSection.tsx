"use client";

import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GoldHeart } from "@/components/ui/GoldHeart";
import { FloralOrnament } from "@/components/ui/FloralOrnament";
import { COPY } from "@/lib/constants/copy";
import { downloadIcsFile } from "@/lib/utils/generateIcsFile";

export const FooterSection = () => {
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

      <button
        onClick={downloadIcsFile}
        className="inline-flex items-center gap-2 font-sans text-sm text-gold hover:text-gold-light transition-colors underline underline-offset-4 mb-8"
      >
        <CalendarPlus className="h-4 w-4" />
        {COPY.footer.addToCalendar}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-warm-gray text-xs font-sans">
        <span>{COPY.footer.madeWith}</span>
        <GoldHeart size={14} className="text-gold/60" />
        <span>{COPY.footer.forSandra}</span>
      </div>
    </motion.footer>
  );
};
