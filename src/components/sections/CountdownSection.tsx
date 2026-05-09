"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CountdownGrid } from "@/components/countdown/CountdownGrid";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { COPY } from "@/lib/constants/copy";
import { EVENT_DATE } from "@/lib/constants/event";

export const CountdownSection = () => {
  const { days, hours, minutes, seconds, isPast } = useCountdown(EVENT_DATE);
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pt-14 pb-4 px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-sans text-[10px] uppercase tracking-[0.35em] text-warm-gray mb-4"
      >
        {COPY.countdown.label}
      </motion.p>
      <GoldDivider className="mb-8 max-w-[200px] mx-auto" />

      {isPast ? (
        <p
          className="italic text-3xl text-gold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {COPY.countdown.expired}
        </p>
      ) : (
        <CountdownGrid days={days} hours={hours} minutes={minutes} seconds={seconds} />
      )}
    </motion.section>
  );
};
