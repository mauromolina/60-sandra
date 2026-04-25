"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";

export const DateTimeSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pb-14 pt-6 px-6"
    >
      <div className="max-w-xs mx-auto bg-white/70 backdrop-blur-sm rounded-2xl py-10 px-8 border border-gold/15 shadow-lg shadow-gold/8 text-center">
        <p
          className="font-serif text-2xl md:text-3xl text-charcoal italic font-medium"
        >
          {COPY.dateTime.date}
        </p>

        <GoldDivider className="my-4 max-w-[140px] mx-auto" />

        <p
          className="font-serif text-5xl md:text-6xl text-gold font-bold leading-none"
        >
          {COPY.dateTime.year}
        </p>

        <p className="font-sans text-sm text-charcoal tracking-[0.25em] uppercase mt-4 font-medium">
          {COPY.dateTime.time}
        </p>
      </div>
    </motion.section>
  );
};
