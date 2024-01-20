export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  permission: string;
}
