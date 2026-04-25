"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gold/20 border-t-gold",
        SIZE_MAP[size],
        className
      )}
    />
  );
};
