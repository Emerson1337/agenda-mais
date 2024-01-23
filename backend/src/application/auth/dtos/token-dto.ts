import { UserDto } from './user-dto';

export interface TokenResponse {
  user: UserDto;
  access_token: string;
  refresh_token: string;
}

export interface TokenPayload {
  sub?: string;
  username?: string;
  email?: string;
  roles?: string[];
  plan?: string;
  status?: string;
}
