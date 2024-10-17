"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";
import { BusinessFullContext } from "@/shared/types/business";

// Create the context
const BusinessContext = createContext<
  | BusinessFullContext
  | { services: undefined; business: undefined; layout: undefined }
>({ services: undefined, business: undefined, layout: undefined });

// Custom hook to access the context
export const useBusinessContext = () => useContext(BusinessContext);

// Provider component to wrap your app and provide the context value
export const BusinessProvider: FC<{
  children: ReactNode;
  defaultValue?: BusinessFullContext;
}> = ({ children, defaultValue }): ReactNode => {
  return (
    <BusinessContext.Provider
      value={
        defaultValue ?? {
          services: undefined,
          business: undefined,
          layout: undefined,
        }
      }
    >
      {children}
    </BusinessContext.Provider>
  );
};
