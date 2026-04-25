"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
}

export const useScrollAnimation = (once = true): ScrollAnimationResult => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px" });

  return { ref, isInView };
};
