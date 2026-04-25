"use client";

import { cn } from "@/lib/utils";

interface FloralCornerProps {
  className?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const FloralCorner = ({ className, position }: FloralCornerProps) => {
  const rotations: Record<string, string> = {
    "top-left": "",
    "top-right": "-scale-x-100",
    "bottom-left": "-scale-y-100",
    "bottom-right": "-scale-x-100 -scale-y-100",
  };

  const positions: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute w-32 h-32 md:w-48 md:h-48 text-gold/15",
        positions[position],
        rotations[position],
        className
      )}
    >
      <path
        d="M10 2C10 2 30 20 25 50C20 80 40 90 60 85C80 80 75 60 65 50C55 40 35 45 30 60"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M2 10C2 10 20 30 50 25C80 20 90 40 85 60C80 80 60 75 50 65C40 55 45 35 60 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 5C25 15 20 35 30 40C40 45 50 35 45 25"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M5 15C15 25 35 20 40 30C45 40 35 50 25 45"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="55" cy="55" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="15" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="15" cy="42" r="1" fill="currentColor" opacity="0.3" />
      <path
        d="M65 15C70 10 78 12 75 20C72 12 65 10 65 15Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M15 65C10 70 12 78 20 75C12 72 10 65 15 65Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M35 70C40 65 48 68 44 76C42 68 35 66 35 70Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M70 35C65 40 68 48 76 44C68 42 66 35 70 35Z"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
};
