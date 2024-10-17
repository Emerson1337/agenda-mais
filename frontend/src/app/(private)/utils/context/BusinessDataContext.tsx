"use client";

import { MeType } from "@/shared/types/me";
import { useRouter } from "next/navigation";
import React, { createContext, FC, ReactNode, useContext } from "react";
import { useGetManager } from "@/private/dashboard/hooks/useGetManager";
import { cn } from "@/lib/utils";

// Create a default value for the context
const defaultValue: MeType = {
  id: "",
  welcomeMessage: "",
  username: "",
  firstName: "",
  email: "",
  phone: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  appointmentsPerPhone: 0,
  status: "",
  roles: [],
  plan: "",
  palette: "",
};

// Create the context
const BusinessContext = createContext<MeType>(defaultValue);

// Custom hook to access the context
export const useBusinessContext = () => useContext(BusinessContext);

// Provider component to wrap your app and provide the context value
export const BusinessProvider: FC<{
  children: ReactNode;
}> = ({ children }): ReactNode => {
  const { data, isError } = useGetManager();
  const router = useRouter();

  if (isError) router.replace("/not-found");

  return (
    <BusinessContext.Provider value={data ?? defaultValue}>
      {children}
    </BusinessContext.Provider>
  );
};

export function BusinessWrapper({ children }: { children: React.ReactNode }) {
  const { palette } = useBusinessContext();

  if (!palette) return;

  return <div className={cn(palette)}>{children}</div>;
}
