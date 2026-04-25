"use client";

import { cn } from "@/lib/utils";

interface FloralOrnamentProps {
  className?: string;
  variant?: "top" | "bottom" | "divider";
}

export const FloralOrnament = ({ className, variant = "divider" }: FloralOrnamentProps) => {
  if (variant === "divider") {
    return (
      <svg
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-48 h-8 text-gold/40", className)}
      >
        <path
          d="M100 15C85 5 70 10 60 15C50 20 35 15 25 10M100 15C115 5 130 10 140 15C150 20 165 15 175 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M100 15C90 25 75 20 65 15M100 15C110 25 125 20 135 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="100" cy="15" r="2" fill="currentColor" />
        <circle cx="60" cy="15" r="1.5" fill="currentColor" />
        <circle cx="140" cy="15" r="1.5" fill="currentColor" />
        <path
          d="M45 12C50 8 55 12 50 16C45 12 40 8 45 12Z"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M155 12C160 8 165 12 160 16C155 12 150 8 155 12Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    );
  }

  if (variant === "top") {
    return (
      <svg
        viewBox="0 0 300 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-72 h-16 text-gold/30", className)}
      >
        <path
          d="M150 50C120 30 90 40 60 35C30 30 10 20 5 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M150 50C180 30 210 40 240 35C270 30 290 20 295 15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M130 40C120 30 125 20 135 25C125 30 115 25 130 40Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M170 40C180 30 175 20 165 25C175 30 185 25 170 40Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M80 35C75 25 80 18 88 22C80 28 72 22 80 35Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M220 35C225 25 220 18 212 22C220 28 228 22 220 35Z"
          fill="currentColor"
          opacity="0.2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-72 h-16 text-gold/30 rotate-180", className)}
    >
      <path
        d="M150 50C120 30 90 40 60 35C30 30 10 20 5 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M150 50C180 30 210 40 240 35C270 30 290 20 295 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M130 40C120 30 125 20 135 25C125 30 115 25 130 40Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M170 40C180 30 175 20 165 25C175 30 185 25 170 40Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
};
