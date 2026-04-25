"use client";

import { MotionConfig } from "framer-motion";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
