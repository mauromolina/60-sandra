"use client";

import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
}

export const GoldDivider = ({ className }: GoldDividerProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-4", className)}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
      <div className="h-1.5 w-1.5 rounded-full bg-gold/50" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
};
