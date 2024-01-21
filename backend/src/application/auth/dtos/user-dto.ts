export type UserDto = {
  id: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  googleId?: string;
  roles: string[];
  plan: string;
};
