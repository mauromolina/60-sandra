"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel = ({ children, className }: SectionLabelProps) => {
  return (
    <span
      className={cn(
        "text-xs font-sans uppercase tracking-[0.25em] text-gold font-medium italic",
        className
      )}
    >
      {children}
    </span>
  );
};
