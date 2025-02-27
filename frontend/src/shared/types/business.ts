// Define the type for the service data
export interface Service {
  id: string;
  createdAt: string;
  updatedAt: string;
  managerId: string;
  name: string;
  price: number;
  description: string;
  timeDurationInMinutes: number;
}

// Define the type for the business data
export interface Business {
  id: string;
  welcomeMessage: string;
  username: string;
  businessName: string;
  firstName: string;
  email: string;
  phone: string;
  profilePhoto: string;
}

// Define the type for the context value
export interface BusinessFullContext {
  services: Service[];
  business: Business;
  layout: string;
}
