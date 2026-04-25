"use client";

import { cn } from "@/lib/utils";
import { CountdownCell } from "./CountdownCell";
import { COPY } from "@/lib/constants/copy";

interface CountdownGridProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
}

export const CountdownGrid = ({
  days,
  hours,
  minutes,
  seconds,
  className,
}: CountdownGridProps) => {
  return (
    <div className={cn("grid grid-cols-4 gap-3 max-w-xs mx-auto", className)}>
      <CountdownCell value={days} label={COPY.countdown.days} />
      <CountdownCell value={hours} label={COPY.countdown.hours} />
      <CountdownCell value={minutes} label={COPY.countdown.minutes} />
      <CountdownCell value={seconds} label={COPY.countdown.seconds} />
    </div>
  );
};
