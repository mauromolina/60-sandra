"use client";

import { cn } from "@/lib/utils";

interface CountdownCellProps {
  value: number;
  label: string;
  className?: string;
}

export const CountdownCell = ({ value, label, className }: CountdownCellProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-white/80 rounded-2xl py-5 px-4 border border-gold/15 shadow-lg shadow-gold/8",
        className
      )}
    >
      <span
        className="font-serif text-4xl md:text-5xl text-gold font-bold tabular-nums leading-none"
        suppressHydrationWarning
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-gold/50 mt-2">
        {label}
      </span>
    </div>
  );
};
