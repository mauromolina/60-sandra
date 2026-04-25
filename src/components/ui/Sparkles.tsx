"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
}

const PARTICLES = [
  { x: "8%", y: "12%", size: 24, delay: 0, duration: 2.8 },
  { x: "87%", y: "8%", size: 18, delay: 0.5, duration: 3.2 },
  { x: "18%", y: "72%", size: 20, delay: 1, duration: 2.5 },
  { x: "78%", y: "78%", size: 16, delay: 1.5, duration: 3 },
  { x: "48%", y: "6%", size: 18, delay: 0.8, duration: 2.6 },
  { x: "4%", y: "42%", size: 14, delay: 2, duration: 2.4 },
  { x: "93%", y: "48%", size: 20, delay: 0.3, duration: 3.1 },
  { x: "28%", y: "22%", size: 14, delay: 1.2, duration: 2.7 },
  { x: "72%", y: "22%", size: 16, delay: 0.7, duration: 2.9 },
  { x: "42%", y: "88%", size: 18, delay: 1.8, duration: 2.6 },
  { x: "12%", y: "55%", size: 16, delay: 2.2, duration: 3 },
  { x: "90%", y: "65%", size: 14, delay: 0.4, duration: 2.5 },
  { x: "62%", y: "92%", size: 20, delay: 1.4, duration: 2.8 },
  { x: "55%", y: "35%", size: 12, delay: 2.5, duration: 2.4 },
  { x: "82%", y: "32%", size: 22, delay: 0.6, duration: 3.2 },
  { x: "25%", y: "48%", size: 16, delay: 1.6, duration: 2.7 },
  { x: "65%", y: "60%", size: 14, delay: 0.9, duration: 2.9 },
  { x: "38%", y: "15%", size: 18, delay: 2.1, duration: 2.5 },
];

const Star = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z"
      fill="#FFE17D"
    />
    <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" />
  </svg>
);

export const Sparkles = ({ className }: SparklesProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
    >
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            filter: `drop-shadow(0 0 ${p.size / 2}px #FFE17D) drop-shadow(0 0 ${p.size}px #D4AF37)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.2, 1.2, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <Star size={p.size} />
        </motion.div>
      ))}
    </div>
  );
};
