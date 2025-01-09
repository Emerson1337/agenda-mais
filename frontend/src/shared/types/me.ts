import { ThemeStrings } from "@/registry/registry-colors";

export type MeType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  welcomeMessage: string;
  username: string;
  firstName: string;
  email: string;
  phone: string;
  profilePhoto: string;
  appointmentsPerPhone: number;
  status: string;
  roles: string[];
  plan: string;
  palette: ThemeStrings;
};
