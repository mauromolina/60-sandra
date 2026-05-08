"use client";

import { motion } from "framer-motion";
import { FloralCorner } from "@/components/ui/FloralCorner";
import { Sparkles } from "@/components/ui/Sparkles";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";
import { EVENT_INFO } from "@/lib/constants/event";

interface HeroSectionProps {
  inviteeName?: string;
  celebrantAlias?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

export const HeroSection = ({ inviteeName, celebrantAlias }: HeroSectionProps) => {
  const greeting = inviteeName
    ? `${COPY.hero.preTitle}, ${inviteeName}`
    : COPY.hero.preTitle;
  const displayName = celebrantAlias || EVENT_INFO.celebrantName;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-dark" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-[0.04]" />

      <Sparkles />

      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute top-[15%] left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-sage/[0.07]" />
        <div className="absolute top-[25%] right-[12%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-gold/[0.06]" />
        <div className="absolute bottom-[20%] left-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gold/[0.05]" />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-sage/[0.06]" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.18, delayChildren: 0.3 },
          },
        }}
      >
        <motion.div variants={fadeUp} className="mb-14 md:mb-16">
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-warm-gray">
            {COPY.hero.preTitle}
          </p>
          {inviteeName && (
            <p
              className="mt-2 text-2xl md:text-3xl italic text-gold/80 tracking-wide"
              style={{ fontFamily: "var(--font-bodoni)", fontVariationSettings: "'opsz' 72", fontWeight: 700 }}
            >
              {inviteeName}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-[55%] text-[150px] md:text-[200px] leading-[1] select-none pointer-events-none text-[#b89556]/20"
            aria-hidden="true"
            style={{ fontFamily: "var(--font-bodoni)", fontWeight: 700 }}
          >
            {EVENT_INFO.age}
          </div>

          <h1
            className="relative z-10 italic text-[#b89556] leading-none mix-blend-multiply tracking-[-2px] text-[80px] md:text-[110px]"
            style={{ fontFamily: "var(--font-bodoni)", fontVariationSettings: "'opsz' 96, 'wght' 500", marginBottom: "-40px" }}
          >
            {displayName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="relative z-20 mt-14">
          <GoldDivider className="mb-6" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-serif text-base md:text-lg text-charcoal-light italic leading-relaxed max-w-sm"
        >
          {COPY.hero.subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
};
