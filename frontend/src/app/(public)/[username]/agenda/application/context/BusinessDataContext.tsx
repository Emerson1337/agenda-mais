import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { BusinessType } from "@/shared/types/business";

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
  initialData: BusinessType;
  children: ReactNode;
}> = ({ initialData, children }) => {
  const [businessData] = useState<BusinessType>(initialData);

  return (
    <BusinessContext.Provider value={businessData}>
      {children}
    </BusinessContext.Provider>
  );
};
