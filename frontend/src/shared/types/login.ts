import { ThemeStrings } from "@/registry/registry-colors";
export interface LoginData {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface User {
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
  palette: ThemeStrings;
  plan: string;
}

export interface RefreshToken {
  access_token: string;
  refresh_token: string;
}
