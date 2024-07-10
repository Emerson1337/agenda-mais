"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";
import { BusinessType } from "@/shared/types/business";
import { useParams, useRouter } from "next/navigation";
import { useGetBusiness } from "../../agendar/application/hooks/useGetBusiness";

// Create a default value for the context
const defaultValue: BusinessType = {
  services: [],
  business: {
    id: "",
    welcomeMessage: "",
    username: "",
    firstName: "",
    email: "",
    phone: "",
  },
  layout: "",
};

// Create the context
const BusinessContext = createContext<BusinessType>(defaultValue);

// Custom hook to access the context
export const useBusinessContext = () => useContext(BusinessContext);

// Provider component to wrap your app and provide the context value
export const BusinessProvider: FC<{
  children: ReactNode;
}> = ({ children }): ReactNode => {
  const { username }: { username: string } = useParams();
  const { data, isError } = useGetBusiness({ username });
  const router = useRouter();

  if (isError) router.replace("/not-found");

  return (
    <BusinessContext.Provider value={data ?? defaultValue}>
      {children}
    </BusinessContext.Provider>
  );
};
