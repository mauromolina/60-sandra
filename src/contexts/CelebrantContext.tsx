"use client";

import { createContext, useContext } from "react";
import { EVENT_INFO } from "@/lib/constants/event";

const CelebrantContext = createContext<string>(EVENT_INFO.celebrantName);

export const CelebrantProvider = ({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
}) => (
  <CelebrantContext.Provider value={name || EVENT_INFO.celebrantName}>
    {children}
  </CelebrantContext.Provider>
);

export const useCelebrantName = () => useContext(CelebrantContext);
