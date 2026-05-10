"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { COPY } from "@/lib/constants/copy";

const PHOTOS = [
  {
    year: "1978",
    src: "/photos/1.jpeg",
    rotation: "-rotate-3",
    position: "center 20%",
  },
  {
    year: "1990",
    src: "/photos/2.jpeg",
    rotation: "rotate-2",
    position: "center 15%",
  },
  {
    year: "2016",
    src: "/photos/5.jpg",
    rotation: "-rotate-2",
    position: "30% 20%",
  },
  {
    year: "2026",
    src: "/photos/6.jpeg",
    rotation: "rotate-3",
    position: "center 15%",
    scale: 1.2,
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const polaroidVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const TimelineSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 px-6 text-center bg-cream">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="italic text-3xl md:text-4xl text-gold-strong font-medium mb-10"
        style={{
          fontFamily: "var(--font-playfair)",
        }}
      >
        {COPY.timeline.label}
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 gap-4 max-w-md mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {PHOTOS.map((photo) => (
          <motion.div
            key={photo.year}
            variants={polaroidVariant}
            className={`bg-white rounded-sm p-2.5 pb-8 shadow-lg shadow-charcoal/10 ${photo.rotation}`}
          >
            <div className="aspect-square rounded-sm overflow-hidden">
              <img
                src={photo.src}
                alt={photo.year}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: photo.position,
                  ...("scale" in photo && {
                    transform: `scale(${photo.scale})`,
                  }),
                }}
              />
            </div>
            <p className="mt-3 font-serif text-sm italic text-warm-gray tracking-wide">
              {photo.year}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
